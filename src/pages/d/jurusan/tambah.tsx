import ButtonLink from "@/components/ButtonLink";
import { LIST } from "@/constants";
import {
  Button,
  Center,
  Flex,
  NumberInput,
  Radio,
  Select,
  Stack,
  TextInput,
  Title
} from "@mantine/core";
import { RiArrowLeftLine } from "react-icons/ri";

function AddMajorPage() {
  return (
    <Center h="100vh">
      <Flex gap="md" direction="column" maw="400px">
        <Title order={1}>Tambah Data Pengurus</Title>
        <TextInput
          name="fullName"
          label="Nama Lengkap"
          placeholder="Nama pengurus"
          autoComplete="none"
        />
        <NumberInput
          name="NIP"
          label="NIP"
          placeholder="NIP Pengurus"
          autoComplete="none"
          hideControls
        />
        <NumberInput
          name="phone"
          label="No. Telepon"
          placeholder="No. Telepon yang aktif"
          autoComplete="none"
          hideControls
        />
        <Radio.Group name="role" label="Peran">
          <Radio value="administrator" label="Administrator" />
          <Radio value="supporter" label="Supporter" />
        </Radio.Group>
        <Stack>
          <Radio.Group name="isAccessAllClass" label="Peran">
            <Radio value="0" label="Kustom" />
            <Radio value="1" label="Semua" />
          </Radio.Group>
          <Flex gap="sm">
            <Select
              name="access[class]"
              searchable
              nothingFound="Tidak ada Kelas"
              data={LIST.CLASS}
            />
            <Select
              name="access[major]"
              searchable
              nothingFound="Tidak ada Jurusan"
              data={LIST.MAJOR}
            />
            <Select
              name="access[class]"
              searchable
              nothingFound="Tidak ada Kelompok"
              data={LIST.CLASS_GROUP}
            />
          </Flex>
          <Button>Tambah</Button>
          <ButtonLink leftIcon={<RiArrowLeftLine />}>
            Kembali ke halaman daftar jurusan
          </ButtonLink>
        </Stack>
      </Flex>
    </Center>
  );
}

export default AddMajorPage;
