import Table from "@/components/TableList";
import Dashboard from "@/layouts/Dashboard";
import { Button, Flex, Input, Tabs, Title } from "@mantine/core";
import Link from "next/link";
import { RiAddFill, RiSearchLine } from "react-icons/ri";

function ListStudent() {
  return (
    <Dashboard>
      <Title order={3}>Daftar Siswa</Title>
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
                <Button variant="outline" disabled>
                  Edit
                </Button>
                <Button variant="outline" disabled>
                  Reset Info Perangkat
                </Button>
              </Flex>
              <Input icon={<RiSearchLine />} placeholder="Cari siswa..." />
            </Flex>
            <Table />
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
