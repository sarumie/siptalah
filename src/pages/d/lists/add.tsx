import ButtonLink from "@/components/ButtonLink";
import Dashboard from "@/layouts/Dashboard";
import {
  Button,
  Center,
  createStyles,
  Flex,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { RiArrowLeftLine } from "react-icons/ri";

const useStylesName = createStyles((theme) => ({
  input: {
    backgroundColor: theme.black,
    color: theme.white
  }
}));

function AddStudentPage() {
  const maxValAbsent = 100;
  const { classes } = useStylesName();

  return (
    <Dashboard>
      <Center h="100vh">
        <Flex gap="md" direction="column" maw="30em">
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
              placeholder="Kelas"
              label="Kelas"
              searchable
              nothingFound="Kelas tidak ditemukan"
              classNames={classes}
              data={["XII A", "XII B", "XII C"]}
            />

            <Select
              name="major"
              placeholder="Jurusan"
              label="Jurusan"
              searchable
              nothingFound="Jurusan tidak ditemukan"
              classNames={classes}
              data={[
                "Rekayasa Perangkat Lunak",
                "Desain Grafis",
                "Produksi Grafika",
                "Animasi",
                "Multimedia"
              ]}
            />
            <Select
              name="major"
              placeholder="Jurusan"
              label="Jurusan"
              searchable
              nothingFound="Jurusan tidak ditemukan"
              classNames={classes}
              data={[
                "Rekayasa Perangkat Lunak",
                "Desain Grafis",
                "Produksi Grafika",
                "Animasi",
                "Multimedia"
              ]}
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
