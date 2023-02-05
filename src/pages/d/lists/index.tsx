import { Button, Flex, Input, Tabs, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiAddFill, RiSearchLine } from "react-icons/ri";
import Table from "@/components/TableList";
import Dashboard from "@/layouts/Dashboard";

function ListStudent() {
  const [students, setStudents] = useState<Student[]>([]);

  const getStudents = async (count: number = 9) => {
    return await fetch(
      `https://api.mockaroo.com/api/6fa63520?count=${count}&key=ab26b160`
    )
      .then((resolve) => resolve.json())
      .then((data) => setStudents(() => data))
      .catch((err) => console.log("Data siswa tidak bisa diambil", err));
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <Dashboard>
      <Title order={1}>Daftar Siswa</Title>
      <Tabs defaultValue="student" mt="md">
        <Tabs.List>
          <Tabs.Tab value="responsible">Pengurus</Tabs.Tab>
          <Tabs.Tab value="student">Siswa</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="student" mt="md">
          <Flex direction="column" gap="md">
            <Flex justify="space-between" mr="xl">
              <Flex gap="sm">
                <Button
                  leftIcon={<RiAddFill />}
                  component={Link}
                  href="/d/lists/add">
                  Tambah Siswa
                </Button>
                <Button variant="outline" disabled>
                  Hapus
                </Button>
                <Button variant="outline" component={Link} href="/d/lists/edit">
                  Edit
                </Button>
                <Button variant="outline" disabled>
                  Reset Info Perangkat
                </Button>
              </Flex>
              <Input icon={<RiSearchLine />} placeholder="Cari siswa..." />
            </Flex>
            <Table
              data={students}
              unique="NIS"
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
        </Tabs.Panel>

        <Tabs.Panel value="responsible" mt="md">
          Pengurus
        </Tabs.Panel>
      </Tabs>
    </Dashboard>
  );
}

export default ListStudent;
