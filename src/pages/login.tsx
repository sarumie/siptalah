import TextLink, { ButtonLink } from "@/components/ButtonLink";
import {
  Flex,
  Button,
  Text,
  Input,
  Title,
  NumberInput,
  Menu
} from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { RiWhatsappLine, RiArrowRightSLine } from "react-icons/ri";

interface FormLogin {
  fullName?: string;
  nip?: number;
}

export default function Login() {
  const [contactOpened, setContactOpened] = useState(false);

  const form = useForm({
    initialValues: {
      fullName: "",
      nip: ""
    }
  });

  const whatsappContacts = [
    { fullName: "Puan Nijika Kurnia", number: "+6282649273472" },
    {
      fullName: "Jonathan Kurniawan",
      number: "+628327428174"
    }
  ];

  return (
    <Flex h="100vh" justify="center" align="center">
      <Flex gap="lg" direction="column" wrap="wrap">
        <Flex direction="column" align="center">
          <Title order={3}>SPPS</Title>
          <Text c="dark.3">Sistem Pengelolaan Data Absensi Sekolah</Text>
        </Flex>
        <form
          onSubmit={form.onSubmit((values) => console.log(values))}
          style={{
            all: "inherit"
          }}>
          <Flex direction="column" align="center" gap="xs">
            <Title order={5}>Login</Title>
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
            <Button type="submit" fullWidth>
              Continue
            </Button>
          </Flex>
        </form>
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
              <Menu.Label>Kontak</Menu.Label>
              {whatsappContacts.map(({ fullName, number }) => (
                <Menu.Item
                  key={number}
                  icon={<RiWhatsappLine size={20} />}
                  rightSection={<RiArrowRightSLine size={20} />}
                  px="md"
                  component="a"
                  href={`https://wa.me/${number}`}
                  target="_blank">
                  <Flex direction="column">
                    <Text fz="sm">{fullName}</Text>
                    <Text fz="xs" fw="bold" c="dark.3">
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
