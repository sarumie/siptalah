import {
  Flex,
  Button,
  Text,
  Title,
  Menu,
  UnstyledButton,
  ScrollArea,
  createStyles,
  TextInput
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "@/lib/axios";
import { RiWhatsappLine, RiArrowRightSLine } from "react-icons/ri";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { Admin } from "@prisma/client";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { requireSupaUnAuth } from "@/hogssp";

const useStyles = createStyles((theme) => ({
  form: {
    all: "inherit"
  },
  buttonLink: {
    color: theme.black,
    textDecoration: "underline",
    padding: 0,
    "&:hover": {
      color: theme.colors.dark[3],
      cursor: "pointer"
    }
  },
  menuItem: { gap: theme.spacing.sm },
  scrollArea: { height: 250 }
}));

const getAuth = async (email: string) =>
  await axios.post("/auth/login", { email });

export default function Login({
  contacts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { isLoading, mutate: authenticate } = useMutation(getAuth, {
    onSuccess: (res) => {
      showNotification({
        title: "Email terkirim!",
        message: res.data.message,
        color: "blue"
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showNotification({
        title: "Gagal login",
        message: error.response?.data.message || error.message,
        color: "red"
      });
    }
  });
  const { classes, theme } = useStyles();
  const form = useForm({ initialValues: { email: "" } });

  const onSubmit = form.onSubmit(async (values) => authenticate(values.email));

  return (
    <Flex h="100vh" justify="center" align="center">
      <Flex
        gap="lg"
        maw={468}
        miw="fit-content"
        w="max"
        direction="column"
        wrap="wrap">
        <Flex direction="column" align="center">
          <Title order={1}>SPPS</Title>
          <Text c="dark.3">Sistem Pengelolaan Presensi Siswa</Text>
        </Flex>

        <form onSubmit={onSubmit} className={classes.form}>
          <Flex direction="column" align="center" gap="sm">
            <Title order={4}>Login</Title>
            <TextInput
              w="100%"
              name="email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
            <Button type="submit" disabled={isLoading} fullWidth>
              Login
            </Button>
          </Flex>
        </form>
        {contacts.length ? (
          <Flex direction="column" align="center">
            <Text fz="xs" fw={600}>
              Tidak punya akun?
            </Text>
            <Menu
              shadow="sm"
              position="top"
              trigger="hover"
              openDelay={100}
              closeDelay={400}>
              <Menu.Target>
                <UnstyledButton fz="xs" className={classes.buttonLink}>
                  Hubungi admin untuk pembuatan akun baru
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Daftar Kontak</Menu.Label>
                <ScrollArea className={classes.scrollArea}>
                  {contacts.map(({ fullName, phoneNumber }) => (
                    <Menu.Item
                      key={phoneNumber}
                      icon={
                        <RiWhatsappLine
                          size={20}
                          color={theme.colors.dark[3]}
                        />
                      }
                      rightSection={<RiArrowRightSLine size={20} />}
                      px="md"
                      component="a"
                      href={`https://wa.me/${phoneNumber}`}
                      target="_blank"
                      className={classes.menuItem}>
                      <Flex direction="column" mr="md">
                        <Text fz="sm" fw={600}>
                          {fullName}
                        </Text>
                        <Text fz="xs" c="dark.3">
                          {phoneNumber}
                        </Text>
                      </Flex>
                    </Menu.Item>
                  ))}
                </ScrollArea>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = requireSupaUnAuth<{ contacts: Admin[] }>(
  async (ctx) => {
    const {
      data: { result: contacts }
    } = await axios.get<{ result: Admin[] }>("contact");
    return {
      props: {
        contacts
      }
    };
  }
);
