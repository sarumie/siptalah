import { Button, Flex, Tabs, TextInput, Title } from "@mantine/core";
import { useState, useEffect } from "react";
import Link from "next/link";
import { RiAddFill, RiSearchLine } from "react-icons/ri";
import Table from "@/components/TableList";
import Dashboard from "@/layouts/Dashboard";
import { useToggle } from "@mantine/hooks";

function ListStudent() {
  const [students, setStudents] = useState<Student[]>([]);
  const [admins, setAdmins] = useState<Manager[]>([]);
  const [title, toggleTitle] = useToggle<"Siswa" | "Pengurus">([
    "Siswa",
    "Pengurus"
  ] as const);

  const getStudents = async () => {
    return await fetch("https://spps.free.mockoapp.net/students")
      .then((resolve) => resolve.json())
      .then((data) => setStudents(() => data))
      .catch((error) => console.log("Data siswa tidak bisa diambil", error));
  };

  const getAdmins = async () => {
    return await fetch("https://spps.free.mockoapp.net/managers")
      .then((resolve) => resolve.json())
      .then((data) => setAdmins(() => data))
      .catch((error) => console.log("Data siswa tidak bisa diambil", error));
  };

  const handleTabChange = (value: "Siswa" | "Pengurus") => toggleTitle(value);

  useEffect(() => {
    getStudents();
    getAdmins();
  }, []);

  return (
    <>
      <Title order={1}>Daftar {title}</Title>
      <Tabs defaultValue="student" mt="md" onTabChange={handleTabChange}>
        <Tabs.List>
          <Tabs.Tab value="student">Siswa</Tabs.Tab>
          <Tabs.Tab value="manager">Pengurus</Tabs.Tab>
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
              </Flex>
              <TextInput icon={<RiSearchLine />} placeholder="Cari siswa..." />
            </Flex>
            <Table
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
        </Tabs.Panel>

        <Tabs.Panel value="manager" mt="md">
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
              <TextInput
                icon={<RiSearchLine />}
                placeholder="Cari pengurus..."
              />
            </Flex>
            <Table
              data={admins}
              ths={[
                "Nama Lengkap",
                "NIP",
                "Akses Kelas",
                "Peran",
                "No. Telepon"
              ]}
            />
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default ListStudent;
