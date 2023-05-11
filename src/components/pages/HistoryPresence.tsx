import { Button, createStyles, Flex, TextInput } from "@mantine/core";
import { Presence } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  RiDeleteBin2Fill,
  RiInformationFill,
  RiSearchLine
} from "react-icons/ri";
import TableList from "@/components/TableList";

const useStyles = createStyles((theme) => ({
  btnInfo: {
    transitionDuration: "150ms",
    boxShadow: `2px 4px 16px ${theme.black}19`,
    ":hover": {
      boxShadow: `2px 4px 16px ${theme.black}4C`
    }
  },
  btnDelete: {
    border: `1px solid ${theme.colors.red[0]}`,
    color: theme.colors.red[0],
    backgroundColor: theme.colors.red[7],
    ":hover": {
      backgroundColor: theme.colors.red[8]
    }
  }
}));

function HistoryPresence() {
  const [history, setHistory] = useState<Presence[]>([]);

  const { classes } = useStyles();
  // const [isSkeleton, setIsSkeleton] = useState<boolean>(true);

  // const getHistory = async (count: number = 9) => {
  //   return await fetch("https://spps.free.mockoapp.net/presences")
  //     .then((resolve) => resolve.json())
  //     .then((data) => setHistory(() => data))
  //     .catch((err) =>
  //       console.log("Data riwayat presensi tidak bisa diambil", err)
  //     );
  // };

  useEffect(() => {
    // getHistory();
  }, []);

  return (
    <Flex direction="column" gap="md">
      <Flex justify="space-between">
        <Flex gap="sm">
          <Button leftIcon={<RiInformationFill />} className={classes.btnInfo}>
            Lihat Detail
          </Button>
          <Button
            variant="white"
            leftIcon={<RiDeleteBin2Fill />}
            className={classes.btnDelete}>
            Hapus
          </Button>
        </Flex>
        <TextInput icon={<RiSearchLine />} placeholder="Cari histori..." />
      </Flex>
      <TableList
        data={history}
        ignore="id"
        ths={[
          "Tanggal",
          "Waktu Buka",
          "Waktu Tutup",
          "Hadir",
          "Terlambat",
          "Izin/Sakit",
          "Alpha"
        ]}
      />
    </Flex>
  );
}

export default HistoryPresence;
