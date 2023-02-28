import styled from "@emotion/styled";
import {
  Flex,
  Button,
  Text,
  Input,
  Title,
  NumberInput,
  Menu,
  DEFAULT_THEME,
  createPolymorphicComponent,
  ButtonProps,
  UnstyledButton,
  useMantineTheme
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { RiWhatsappLine, RiArrowRightSLine } from "react-icons/ri";

const InheritStyledForm = styled.form`
  all: inherit;
`;

const _ButtonLink = styled(UnstyledButton)`
  color: ${DEFAULT_THEME.black};
  text-decoration: underline;
  padding: 0;
  &:hover {
    color: ${DEFAULT_THEME.colors.dark[3]};
    cursor: pointer;
  }
`;

const ButtonLink = createPolymorphicComponent<"button", ButtonProps>(
  _ButtonLink
);

async function auth(
  fullName: string,
  nip: string,
  href: string,
  loadingDispath: React.Dispatch<boolean>
) {
  loadingDispath(true);
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/${fullName}/${nip}`
  );

  console.log(data);
  console.log(nip);
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      fullName: "",
      nip: ""
    }
  });

  const whatsappContacts = [
    { fullName: "Muhammad Iqbal", number: "+6282649273472" },
    {
      fullName: "Jonathan Kurniawan",
      number: "+628327428174"
    },
    {
      fullName: "Kita Abdurrahman Saleh",
      number: "+6291047238394"
    }
  ];

  const getAuth = form.onSubmit((values) =>
    auth(values.fullName, values.nip, "/d/presensi", setLoading)
  );

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
          <Text c="dark.3">Sistem Pengelolaan Data Presensi Siswa</Text>
        </Flex>
        <InheritStyledForm onSubmit={getAuth}>
          <Flex direction="column" align="center" gap="sm">
            <Title order={4}>Login</Title>
            <Input
              w="100%"
              name="fullName"
              placeholder="Nama Lengkap"
              {...form.getInputProps("fullName")}
            />
            <NumberInput
              w="100%"
              name="nip"
              placeholder="NIP"
              hideControls
              {...form.getInputProps("nip")}
            />
            <Button type="submit" disabled={loading} fullWidth>
              {loading ? "Autentikasi..." : "Masuk"}
            </Button>
          </Flex>
        </InheritStyledForm>
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
              <ButtonLink fz="xs">
                Hubungi admin untuk pembuatan akun baru
              </ButtonLink>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Daftar Kontak</Menu.Label>
              {whatsappContacts.map(({ fullName, number }) => (
                <Menu.Item
                  key={number}
                  icon={
                    <RiWhatsappLine size={20} color={theme.colors.dark[3]} />
                  }
                  rightSection={<RiArrowRightSLine size={20} />}
                  px="md"
                  component="a"
                  href={`https://wa.me/${number}`}
                  target="_blank"
                  sx={(theme) => ({ gap: theme.spacing.sm })}>
                  <Flex direction="column" mr="md">
                    <Text fz="sm" fw={600}>
                      {fullName}
                    </Text>
                    <Text fz="xs" c="dark.3">
                      {number}
                    </Text>
                  </Flex>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}
