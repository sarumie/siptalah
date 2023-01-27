import { Button, createStyles, Flex, Pagination, Table } from "@mantine/core";
import { useCallback, useState } from "react";
import { RiArrowRightLine } from "react-icons/ri";

interface Student {
  id: string;
  absent: number;
  full_name: string;
  class: string;
  NIS: number;
  phone: number;
}

const useStylesPagination = createStyles((theme) => ({
  item: {
    border: 0
  },
  td: {
    paddingBlock: theme.spacing.md,
    Background: theme.black
  }
}));

function TableList() {
  const [students, setStudents] = useState<Student[]>();
  const { classes } = useStylesPagination();

  const getStudents = async (count: number = 8) => {
    return await fetch(
      `https://api.mockaroo.com/api/6fa63520?count=${count}&key=ab26b160`
    )
      .then((resolve) => resolve.json())
      .then((data: Student[]) => setStudents(() => data))
      .catch((err) => console.log("Data siswa tidak bisa diambil", err));
  };

  const rows = useCallback(
    () =>
      students?.map(({ id, ...others }) => (
        <tr key={id}>
          {Object.values(others).map((val) => (
            <td key={val} className={classes.td}>
              {val}
            </td>
          ))}
        </tr>
      )),
    [students, classes.td]
  );

  return (
    <Flex direction="column" gap="sm">
      <Table>
        <thead>
          <tr>
            <th>No. Absen</th>
            <th>Nama</th>
            <th>Kelas</th>
            <th>NIS</th>
            <th>No. Telepon</th>
          </tr>
        </thead>
        <tbody>{rows()}</tbody>
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
