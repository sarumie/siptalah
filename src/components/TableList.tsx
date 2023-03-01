import {
  ActionIcon,
  AspectRatio,
  Button,
  Center,
  createStyles,
  Divider,
  Flex,
  Modal,
  Pagination,
  Stack,
  Table,
  Text,
  Title
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useState } from "react";
import {
  RiArrowRightLine,
  RiFileCopyLine,
  RiWhatsappFill
} from "react-icons/ri";

interface Props<T> {
  data: T[] | null | undefined;
  /**
   * data will not be shown in the table
   */
  ignore?: (keyof T)[] | keyof T;
  ths: NonEmptyArray<string>;
}

const useStyles = createStyles((theme) => ({
  thead: {
    backgroundColor: theme.colors.gray[1]
  },
  tr: {
    cursor: "pointer"
  }
}));

function TableList<T extends { [key: string]: any }>({
  data,
  ths,
  ignore
}: Props<T>) {
  const { classes } = useStyles();
  const [emptyDisplay, toggleEmptyDisplay] = useToggle();
  const [opened, toggleOpened] = useToggle();
  const [ignores] = useState(Array.isArray(ignore) ? ignore : [ignore]);
  // const [content, setContent] = useState([]);

  return (
    <>
      {/* <Modal
        opened={opened}
        onClose={() => toggleOpened()}
        withCloseButton={false}
        centered>
        <Stack spacing="sm">
          <Flex justify="space-between" align="center">
            <Title order={4}>Informasi siswa</Title>
            <ActionIcon variant="filled">
              <RiFileCopyLine />
            </ActionIcon>
          </Flex>
          <Divider />
          <Stack spacing={0}>
            <Text fw={600}>Informasi akun SPS anda:</Text>
            <Text>Nama: Abdul Aziz Rahmat Ibnu Fani</Text>
            <Text>Kelas: XII RPL A</Text>
            <Text>Password: 29hjwUnwW9N23ms</Text>
          </Stack>
          <Button leftIcon={<RiWhatsappFill />} fullWidth>
            Hubungi
          </Button>
        </Stack>
      </Modal> */}

      {/* Content */}
      <Flex direction="column" gap="sm">
        <Table
          withBorder
          verticalSpacing="md"
          horizontalSpacing="md"
          highlightOnHover={!emptyDisplay}
          mih="30rem">
          <thead className={classes.thead}>
            <tr>
              {ths.map((value) => (
                <th key={value}>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {
              // * Uncommend
              // data?.length
              !emptyDisplay ? (
                data?.map((dataInArr) => (
                  <tr
                    key={dataInArr.id}
                    onClick={() => toggleOpened()}
                    className={classes.tr}>
                    {Object.entries(dataInArr).map(([key, value]) =>
                      ignores.includes(key) || key == "id" ? null : (
                        <td key={key}>{value}</td>
                      )
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={999}>
                    <AspectRatio
                      ratio={128 / 128}
                      sx={{ maxWidth: 128 }}
                      mx="auto">
                      <object
                        title="Tidak ada orang"
                        data="/no_data.svg"
                        type="image/svg+xml"
                      />
                    </AspectRatio>
                    <Center mt="md">
                      <Text fw={600} fz="sm" c="dark.3">
                        Tidak ada informasi yang ditampilkan
                      </Text>
                    </Center>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <Flex justify="space-between">
          <Pagination total={10} />
          <Button variant="outline" rightIcon={<RiArrowRightLine />}>
            Lompat ke halaman...
          </Button>
          {/* <Button onClick={() => toggleEmptyDisplay()}>toggle empty</Button> */}
        </Flex>
      </Flex>
    </>
  );
}

export default TableList;
