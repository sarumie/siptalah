import ButtonLink from "@/components/ButtonLink";
import { LIST, maxValAbsent } from "@/constants";
import {
  Button,
  Center,
  createStyles,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import {
  Dropzone,
  MS_EXCEL_MIME_TYPE,
  MIME_TYPES,
  type FileWithPath
} from "@mantine/dropzone";
import {
  RiArrowLeftLine,
  RiFile3Fill,
  RiFileAddFill,
  RiFileForbidFill
} from "react-icons/ri";
import readXlsxFile from "read-excel-file";

const useStyles = createStyles((theme) => ({
  pointer: {
    pointerEvents: "none"
  },
  dropZone: {
    "&[data-accept]": {
      backgroundColor: theme.colors.green[1],
      borderColor: theme.colors.green[3]
    },
    "&[data-reject]": {
      backgroundColor: theme.colors.red[1],
      borderColor: theme.colors.red[3]
    }
  }
}));

function AddStudentPage() {
  const { classes, theme } = useStyles();

  async function onFileDropped(file: FileWithPath[] | null) {
    if (!file) return console.warn("No file");

    const map = {
      Absen: "absent",
      "Nama Lengkap": "fullName",
      Kelas: "class",
      NIS: "nis",
      "No. Telepon": "phoneNumber",
      Email: "email"
    };

    readXlsxFile(await file[0].arrayBuffer(), { map }).then((parsed) => {
      console.log("Excel jadi object:", parsed.rows);
    });
  }

  return (
    <Center h="100vh">
      <Flex gap="md" direction="column" maw="400px">
        <Title order={1}>Tambah Data Siswa</Title>
        <Flex gap="md">
          <NumberInput
            name="absent"
            label="No. Absen"
            hideControls
            min={1}
            max={maxValAbsent}
          />

          <Select
            name="class"
            label="Kelas"
            searchable
            nothingFound="Kelas tidak ditemukan"
            data={LIST.CLASS}
          />

          <Select
            name="major"
            label="Jurusan"
            searchable
            nothingFound="Jurusan tidak ditemukan"
            data={LIST.MAJOR}
          />

          <Select
            name="part"
            label="Bagian"
            searchable
            nothingFound="Bagian kelas tidak ditemukan"
            data={LIST.CLASS_GROUP}
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
        <Divider my="xs" label="atau" labelPosition="center" />
        <Dropzone
          onDrop={onFileDropped}
          onReject={(files) => console.log("Rejected file:", files[0])}
          maxSize={3 * 1024 ** 2}
          accept={[MIME_TYPES.csv, ...MS_EXCEL_MIME_TYPE]}
          multiple={false}
          bg="gray.1"
          classNames={{ root: classes.dropZone }}>
          <Group
            position="center"
            spacing="md"
            py="sm"
            className={classes.pointer}>
            <Dropzone.Accept>
              <RiFileAddFill size={32} color={theme.colors.green[9]} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <RiFileForbidFill size={32} color={theme.colors.red[9]} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <RiFile3Fill size={32} />
            </Dropzone.Idle>

            <Stack spacing="xs">
              <Text size="lg" fw={600} inline>
                Import dari Dokumen
              </Text>
              <Text size="sm" color="dimmed" inline>
                Menerima file: .CSV, .XLS, dan .XLSX
              </Text>
            </Stack>
          </Group>
        </Dropzone>
        <ButtonLink leftIcon={<RiArrowLeftLine />}>
          Kembali ke halaman daftar siswa
        </ButtonLink>
      </Flex>
    </Center>
  );
}

export default AddStudentPage;
