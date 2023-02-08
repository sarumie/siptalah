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

function EditStudent() {
  const maxValAbsent = 100;
  return (
    <Center h="100vh">
      <Flex gap="md" direction="column" maw="400px">
        <Title order={1}>Edit Data Siswa</Title>
        <Flex gap="md">
          <NumberInput
            label="No. Absent"
            name="absent"
            hideControls
            defaultValue={12}
            min={1}
            max={maxValAbsent}
          />

          <Select
            name="class"
            label="Kelas"
            searchable
            nothingFound="Kelas tidak ditemukan"
            defaultValue="XII"
            data={["XII", "XI", "X"]}
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
            defaultValue="A"
            nothingFound="Bagian kelas tidak ditemukan"
            data={["A", "B", "C"]}
          />
        </Flex>
        <TextInput
          name="fullName"
          label="Nama"
          placeholder="Nama siswa"
          defaultValue="Abdul Kyouka Narami"
          autoComplete="none"
        />
        <NumberInput
          name="NIS"
          label="NIS"
          placeholder="NIS siswa"
          hideControls
        />
        <Button>Ubah</Button>
        <ButtonLink leftIcon={<RiArrowLeftLine />}>
          Kembali ke halaman daftar siswa
        </ButtonLink>
      </Flex>
    </Center>
  );
}

export default EditStudent;
