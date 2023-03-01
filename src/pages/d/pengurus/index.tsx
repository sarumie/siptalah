// Mantine
import { Button, Flex, Tabs, TextInput, Title } from "@mantine/core";

// React
import { useState, useEffect } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiPencilFill,
  RiSearchLine
} from "react-icons/ri";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import Table from "@/components/TableList";

// Utils
import { LocalStorage } from "@/lib/utils/LocalStorage";

function Pengurus() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const router = useRouter();

  // const getManagers = async () => {
  //   return await fetch("https://spps.free.mockoapp.net/managers")
  //     .then((resolve) => resolve.json())
  //     .then((data) => setManagers(() => data))
  //     .catch((error) => console.log("Data pengurus tidak bisa diambil", error));
  // };
  useEffect(() => {
    const loginStatus = LocalStorage({
      method: "get",
      key: "spps.userInfo"
    });

    if (!loginStatus) router.push("/login");
    // getManagers();
  }, [router]);

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
