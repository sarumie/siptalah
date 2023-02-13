import ButtonLink from "@/components/ButtonLink";
import { LIST } from "@/constants";
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

function EditSiswa() {
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
            defaultValue="XII"
            data={LIST.CLASS}
          />

          <Select name="major" label="Jurusan" searchable data={LIST.MAJOR} />

          <Select
            name="part"
            label="Bagian"
            searchable
            defaultValue="A"
            data={LIST.CLASS_GROUP}
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

export default EditSiswa;
