import { Button, Flex, Tabs, TextInput, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiAddFill, RiSearchLine } from "react-icons/ri";
import Table from "@/components/TableList";
import { useToggle } from "@mantine/hooks";

function Pengurus() {
  const [managers, setManagers] = useState<Manager[]>([]);

  const getManagers = async () => {
    return await fetch("https://spps.free.mockoapp.net/managers")
      .then((resolve) => resolve.json())
      .then((data) => setManagers(() => data))
      .catch((error) => console.log("Data siswa tidak bisa diambil", error));
  };
  useEffect(() => {
    getManagers();
  }, []);

  return (
    <Flex direction="column" gap="md">
      <Title order={1}>Daftar Pengurus</Title>
      <Flex direction="column" gap="md">
        <Flex justify="space-between" mr="xl">
          <Flex gap="sm">
            <Button
              leftIcon={<RiAddFill />}
              component={Link}
              href="/d/lists/add">
              Tambah Pengurus
            </Button>
            <Button variant="outline" disabled>
              Hapus
            </Button>
            <Button variant="outline" component={Link} href="/d/lists/edit">
              Edit
            </Button>
          </Flex>
          <TextInput icon={<RiSearchLine />} placeholder="Cari pengurus..." />
        </Flex>
        <Table
          data={managers}
          ths={["Nama Lengkap", "NIP", "Akses Kelas", "Peran", "No. Telepon"]}
        />
      </Flex>
    </Flex>
  );
}

export default Pengurus;
