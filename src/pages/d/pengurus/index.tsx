import { Button, Flex, Tabs, TextInput, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiPencilFill,
  RiSearchLine
} from "react-icons/ri";
import Table from "@/components/TableList";

function Pengurus() {
  const [managers, setManagers] = useState<Manager[]>([]);

  const getManagers = async () => {
    return await fetch("https://spps.free.mockoapp.net/managers")
      .then((resolve) => resolve.json())
      .then((data) => setManagers(() => data))
      .catch((error) => console.log("Data pengurus tidak bisa diambil", error));
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
              href="/d/pengurus/tambah">
              Tambah Pengurus
            </Button>
            <Button
              variant="outline"
              leftIcon={<RiPencilFill />}
              component={Link}
              href="/d/pengurus/edit">
              Edit
            </Button>
            <Button variant="outline" leftIcon={<RiDeleteBinFill />}>
              Hapus
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
