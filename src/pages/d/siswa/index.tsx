// Mantine
import { Button, Flex, TextInput, Title } from "@mantine/core";

// Next
import Link from "next/link";
import { useRouter } from "next/router";

// React
import { useState, useEffect } from "react";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiPencilFill,
  RiSearchLine
} from "react-icons/ri";

// Components
import TableList from "@/components/TableList";

// Utils
import { LocalStorage } from "@/lib/utils/LocalStorage";

// Axios
import axios from "axios";

function Index({ initialData }: any) {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loginStatus = LocalStorage({
      method: "get",
      key: "spps.userInfo"
    });

    if (!loginStatus) router.push("/login");
  }, [router]);

  return (
    <Flex direction="column" gap="md">
      <Title order={1}>Daftar Siswa</Title>
      <Flex direction="column" gap="md">
        <Flex justify="space-between" mr="xl">
          <Flex gap="sm">
            <Button
              leftIcon={<RiAddFill />}
              component={Link}
              href="/d/siswa/tambah">
              Tambah Siswa
            </Button>
            <Button
              variant="outline"
              leftIcon={<RiPencilFill />}
              component={Link}
              href="/d/siswa/edit">
              Edit
            </Button>
            <Button variant="outline" leftIcon={<RiDeleteBinFill />}>
              Hapus
            </Button>
          </Flex>
          <TextInput icon={<RiSearchLine />} placeholder="Cari siswa..." />
        </Flex>
        <TableList
          data={students}
          ths={[
            "No. Absen",
            "Nama Lengkap",
            "Kelas",
            "NIS",
            "Kata Sandi",
            "No. Telpon"
          ]}
        />
      </Flex>
    </Flex>
  );
}

export default Index;
