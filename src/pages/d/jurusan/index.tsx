// Mantine
import { Button, Flex, TextInput, Title } from "@mantine/core";

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

// Utils
import { LocalStorage } from "@/lib/utils/LocalStorage";

// Components
import TableList from "@/components/TableList";

function Index() {
  const [majors, setMajors] = useState<Major[]>([]);
  const router = useRouter();

  // const getMajors = async () => {
  //   return await fetch("https://spps.free.mockoapp.net/majors")
  //     .then((resolve) => resolve.json())
  //     .then((data) => setMajors(() => data))
  //     .catch((error) => console.log("Data jurusan tidak bisa diambil", error));
  // };

  useEffect(() => {
    const loginStatus = LocalStorage({
      method: "get",
      key: "spps.userInfo"
    });

    if (!loginStatus) router.push("/login");
    // getMajors();
  }, [router]);

  return (
    <Flex direction="column" gap="md">
      <Title order={1}>Daftar Jurusan</Title>
      <Flex direction="column" gap="md">
        <Flex justify="space-between" mr="xl">
          <Flex gap="sm">
            <Button
              leftIcon={<RiAddFill />}
              component={Link}
              href="/d/jurusan/tambah">
              Tambah Jurusan
            </Button>
            <Button
              variant="outline"
              leftIcon={<RiPencilFill />}
              component={Link}
              href="/d/jurusan/edit">
              Edit
            </Button>
            <Button variant="outline" leftIcon={<RiDeleteBinFill />}>
              Hapus
            </Button>
          </Flex>
          <TextInput icon={<RiSearchLine />} placeholder="Cari jurusan..." />
        </Flex>
        <TableList
          data={majors}
          ths={["Nama", "Akronim", "Total kelas", "Total kelompok"]}
        />
      </Flex>
    </Flex>
  );
}

export default Index;
