import { Button, Flex, TextInput, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  RiAddFill,
  RiDeleteBinFill,
  RiPencilFill,
  RiSearchLine
} from "react-icons/ri";
import TableList from "@/components/TableList";

function Index() {
  const [students, setStudents] = useState<Student[]>([]);

  const getStudents = async () => {
    return await fetch("https://spps.free.mockoapp.net/students")
      .then((resolve) => resolve.json())
      .then((data) => setStudents(() => data))
      .catch((error) => console.log("Data siswa tidak bisa diambil", error));
  };

  useEffect(() => {
    getStudents();
  }, []);

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
