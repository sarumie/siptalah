import ButtonLink from "@/components/ButtonLink";
import Dashboard from "@/layouts/Dashboard";
import {
  Button,
  Center,
  Flex,
  NumberInput,
  Select,
  TextInput,
  Title
} from "@mantine/core";
import { RiArrowLeftLine } from "react-icons/ri";

function AddStudentPage() {
  const maxValAbsent = 100;
  return (
    <Dashboard>
      <Center h="100vh">
        <Flex gap="md" direction="column" maw="400px">
          <Title order={3}>Tambah Data Siswa</Title>
          <Flex gap="md">
            <NumberInput
              label="No. Absent"
              name="absent"
              hideControls
              min={1}
              max={maxValAbsent}
            />

            <Select
              name="class"
              label="Kelas"
              searchable
              nothingFound="Kelas tidak ditemukan"
              data={["XII A", "XII B", "XII C"]}
            />

            <Select
              name="major"
              label="Jurusan"
              searchable
              nothingFound="Jurusan tidak ditemukan"
              data={["RPL", "DG", "PD", "ANI", "DKV"]}
            />

            <Select
              name="part"
              label="Bagian"
              searchable
              nothingFound="Bagian kelas tidak ditemukan"
              data={["A", "B", "C"]}
            />
          </Flex>
          <TextInput
            name="fullName"
            label="Nama"
            placeholder="Nama siswa"
            autoComplete="none"
          />
          <NumberInput
            name="NIS"
            label="NIS"
            placeholder="NIS siswa"
            hideControls
          />
          <Button>Tambah</Button>
          <ButtonLink leftIcon={<RiArrowLeftLine />}>
            Kembali ke halaman utama
          </ButtonLink>
        </Flex>
      </Center>
    </Dashboard>
  );
}

export default AddStudentPage;
