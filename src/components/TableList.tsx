import { Button, createStyles, Flex, Pagination, Table } from "@mantine/core";
import { RiArrowRightLine } from "react-icons/ri";

interface Props<T> {
  data: T[];
  unique: keyof T;
  ths?: NonEmptyArray<string>;
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
  unique,
  ths
}: Props<T>) {
  const { classes } = useStyles();

  return (
    <Flex direction="column" gap="sm">
      <Table verticalSpacing="md" highlightOnHover>
        <thead className={classes.thead}>
          <tr>
            {ths
              ? ths.map((value) => <th key={value}>{value}</th>)
              : Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {data?.map((field) => (
            <tr key={field[unique]}>
              {Object.values(field).map((val) => (
                <td key={val}>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Flex justify="space-between">
        <Pagination total={10} classNames={{ item: classes.item }} />
        <Button variant="outline" rightIcon={<RiArrowRightLine />}>
          Lompat ke halaman...
        </Button>
      </Flex>
    </Flex>
  );
}

export default TableList;
