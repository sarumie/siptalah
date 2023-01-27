import { useState } from "react";
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
import {
  RiArrowDropDownFill,
  RiArrowDropUpFill,
  RiArrowLeftLine
} from "react-icons/ri";

const useStylesName = createStyles((theme) => ({
  input: {
    backgroundColor: theme.black,
    color: theme.white
  }
}));

function AddStudentPage() {
  const [absent, setAbsent] = useState(0);
  const { classes } = useStylesName();

  const changeAbsentValue = (valueEvent?: "increment" | "decrement") => {
    if (valueEvent == "increment")
      return () => setAbsent((vBefore) => ++vBefore);
    if (valueEvent == "decrement")
      return () => setAbsent((vBefore) => --vBefore);
  };

  return (
    <Dashboard>
      <Center h="100vh">
        <Flex gap="md" direction="column" maw="30em">
          <Title order={3}>Tambah Data Siswa</Title>
          <Flex gap="md">
            <Flex direction="column" gap="sm">
              <Text fw={600} fz="sm">
                No Absen
              </Text>
              <Flex gap="sm">
                <Button
                  compact
                  mih="100%"
                  onClick={changeAbsentValue("decrement")}>
                  <RiArrowDropDownFill size={24} />
                </Button>
                <NumberInput
                  name="absent"
                  value={absent}
                  hideControls
                  min={1}
                  max={100}
                  onChange={(val) => setAbsent((valBefore) => val || valBefore)}
                />
                <Button compact mih="100%">
                  <RiArrowDropUpFill
                    size={24}
                    onClick={changeAbsentValue("increment")}
                  />
                </Button>
              </Flex>
            </Flex>

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
