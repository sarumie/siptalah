import ButtonLink from "@/components/ButtonLink";
import {
  ActionIcon,
  Button,
  Center,
  Chip,
  Flex,
  Grid,
  Input,
  TextInput,
  Title
} from "@mantine/core";
import { RiAddFill, RiArrowLeftLine, RiDeleteBinLine } from "react-icons/ri";

function EditMajorPage() {
  return (
    <Center h="100vh">
      <Flex gap="md" direction="column" maw="400px">
        <Title order={1}>Edit Data Jurusan</Title>

        <Grid>
          <Grid.Col span="auto">
            <TextInput
              name="name"
              label="Nama Jurusan"
              placeholder="ex: Rekayasa Perangkat Lunak"
              autoComplete="none"
              defaultValue="Rekayasa Perangkat Lunak"
            />
          </Grid.Col>
          <Grid.Col span={3}>
            <TextInput
              name="acronym"
              label="Akronim"
              placeholder="ex: RPL"
              maxLength={4}
              autoComplete="none"
              defaultValue="RPL"
            />
          </Grid.Col>
        </Grid>

        <Input.Wrapper label="Kelas">
          <Flex gap="xs">
            <ActionIcon variant="filled" mb="xs">
              <RiAddFill />
            </ActionIcon>
            <ActionIcon variant="filled" mb="xs" color="red">
              <RiDeleteBinLine />
            </ActionIcon>
          </Flex>
          <Chip.Group>
            <Chip name="class" value="x">
              X
            </Chip>
            <Chip name="class" value="xi">
              XI
            </Chip>
            <Chip name="class" value="xii" defaultChecked>
              XII
            </Chip>
          </Chip.Group>
        </Input.Wrapper>

        <Input.Wrapper label="Kelompok">
          <Flex gap="xs">
            <ActionIcon variant="filled" mb="xs">
              <RiAddFill />
            </ActionIcon>
            <ActionIcon variant="filled" mb="xs" color="red">
              <RiDeleteBinLine />
            </ActionIcon>
          </Flex>
          <Chip.Group>
            <Chip name="group" value="A" defaultChecked>
              A
            </Chip>
            <Chip name="group" value="B">
              B
            </Chip>
            <Chip name="group" value="C">
              C
            </Chip>
          </Chip.Group>
        </Input.Wrapper>

        <Button>Tambah</Button>
        <ButtonLink leftIcon={<RiArrowLeftLine />}>
          Kembali ke halaman daftar jurusan
        </ButtonLink>
      </Flex>
    </Center>
  );
}

export default EditMajorPage;
