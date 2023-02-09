import {
  AspectRatio,
  Button,
  Center,
  createStyles,
  Flex,
  Pagination,
  Table,
  Text
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { RiArrowRightLine } from "react-icons/ri";

interface Props<T> {
  data: T[] | null | undefined;
  /**
   * aliases for id
   */
  ignore?: keyof T;
  ths: NonEmptyArray<string>;
}

const useStyles = createStyles((theme) => ({
  item: {
    border: 0
  },
  thead: {
    backgroundColor: theme.colors.gray[1]
  }
}));

function TableList<T extends { [key: string]: any }>({
  data,
  ths,
  ignore
}: Props<T>) {
  const { classes } = useStyles();
  const [emptyDisplay, toggleEmptyDisplay] = useToggle();

  return (
    <Flex direction="column" gap="sm">
      <Table
        verticalSpacing="md"
        horizontalSpacing="md"
        highlightOnHover={emptyDisplay}
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
            // data?.length
            emptyDisplay ? (
              data?.map((dataInArr) => (
                <tr key={dataInArr["id"]}>
                  {Object.entries(dataInArr).map((val) => {
                    if (val[0] == ignore || val[0] == "id") return;
                    return <td key={val[0]}>{val[1]}</td>;
                  })}
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
                    <Text fw={600} c="dark.3">
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
        <Pagination total={10} classNames={{ item: classes.item }} />
        <Button variant="outline" rightIcon={<RiArrowRightLine />}>
          Lompat ke halaman...
        </Button>
        <Button onClick={() => toggleEmptyDisplay()}>toggle empty</Button>
      </Flex>
    </Flex>
  );
}

export default TableList;
