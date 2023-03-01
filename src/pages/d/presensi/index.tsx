// Components
import HistoryPresence from "@/components/pages/HistoryPresence";
import TableList from "@/components/TableList";

// Utils
import { LocalStorage } from "@/lib/utils/LocalStorage";

// Mantine
import {
  Box,
  Button,
  Center,
  createStyles,
  Flex,
  Space,
  Tabs,
  Text,
  TextInput,
  Title
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";

// React
import { useState, useEffect } from "react";
import { RiPlayFill, RiSearchLine, RiStopFill } from "react-icons/ri";

// Next
import { useRouter } from "next/router";

const totalStudent = 2013;

const useStyles = createStyles((theme) => ({
  timeBox: {
    borderRadius: theme.radius.sm
  },
  stopBtn: {
    backgroundColor: theme.colors.red[6],
    color: theme.colors.red[1],
    boxShadow: `2px 4px 16px ${theme.colors.red[6]}33`,
    transitionDuration: "150ms",
    ":hover": {
      boxShadow: `2px 4px 16px ${theme.colors.red[6]}66`
    }
  },
  startBtn: {
    backgroundColor: theme.colors.blue[6],
    color: theme.colors.blue[1],
    boxShadow: `2px 4px 16px ${theme.colors.blue[6]}33`,
    transitionDuration: "150ms",
    ":hover": {
      boxShadow: `2px 4px 16px ${theme.colors.blue[6]}66`
    }
  },
  presenceMain: {
    backgroundColor: theme.black,
    color: theme.white
  }
}));

const StatisticPresences = () => {
  const { classes } = useStyles();

  const presenceStatistic = [
    {
      title: "Presensi terisi",
      count: 1280
    },
    {
      title: "Hadir",
      count: 653
    },
    {
      title: "Terlambat",
      count: 12
    },
    {
      title: "Izin / Sakit",
      count: 62
    },
    {
      title: "Alpha",
      count: 32
    }
  ];

  return (
    <>
      {presenceStatistic.map((val, index) => (
        <Flex
          key={val.title}
          maw="fit-content"
          gap="xs"
          align="flex-end"
          px="md"
          py="sm"
          className={index == 0 ? classes.presenceMain : ""}
          sx={(theme) => ({
            borderRadius: theme.defaultRadius,
            border: `1px solid ${theme.colors.dark[0]}`
          })}>
          <Flex direction="column">
            <Text fw={600}>{val.title}</Text>
            <Title order={6}>
              {val.count} / {totalStudent}
            </Title>
          </Flex>
          <Text fz="sm">siswa</Text>
        </Flex>
      ))}
    </>
  );
};

function PresensiIndex() {
  const [buttonState, toggleButtonState] = useToggle<{
    title: string;
    class: "stopBtn" | "startBtn";
    icon: JSX.Element;
  }>([
    {
      title: "Tutup presensi",
      class: "stopBtn",
      icon: <RiStopFill />
    },
    {
      title: "Buka presensi",
      class: "startBtn",
      icon: <RiPlayFill />
    }
  ]);
  const [presences, setPresences] = useState<Presence[]>([]);
  const { classes } = useStyles();
  const router = useRouter();

  // const getPresences = async () => {
  //   return await fetch("https://spps.free.mockoapp.net/presences/today")
  //     .then((resolve) => resolve.json())
  //     .then((data) => setPresences(() => data))
  //     .catch((err) => console.log("Data presensi tidak bisa diambil", err));
  // };

  useEffect(() => {
    const loginStatus = LocalStorage({
      method: "get",
      key: "spps.userInfo"
    });

    if (!loginStatus) router.push("/login");

    // getPresences();
  });

  return (
    <Flex direction="column" gap="md">
      <Flex direction="column">
        <Title order={1}>Presensi Hari Ini</Title>
        <Flex gap="sm" align="center">
          {/* Jika lebih dari jam 7 akan berwarna merah */}
          <Center px="sm" py="xs" bg="blue.1" className={classes.timeBox}>
            <Text fw="bold" c="blue.9">
              06.02
            </Text>
          </Center>
          <Text fw={600}>Jum&#39;at, 13 Januari 2023</Text>
        </Flex>
      </Flex>
      <Tabs defaultValue="hari-ini">
        <Tabs.List>
          <Tabs.Tab value="hari-ini">Presensi</Tabs.Tab>
          <Tabs.Tab value="riwayat">Riwayat</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="hari-ini" pt="md">
          <Flex gap="md" wrap="wrap">
            <StatisticPresences />
          </Flex>
          <Space h="md" />
          <Flex direction="column" gap="md">
            <Flex justify="space-between">
              <Flex gap="sm">
                <Button
                  leftIcon={buttonState.icon}
                  variant="white"
                  onClick={() => toggleButtonState()}
                  className={classes[buttonState.class]}>
                  {buttonState.title}
                </Button>
              </Flex>
              <TextInput
                icon={<RiSearchLine />}
                placeholder="Cari rekaman presensi..."
              />
            </Flex>
            <TableList
              data={presences}
              ignore="id"
              ths={["Absen", "Nama", "NIS", "Kelas", "Status"]}
            />
          </Flex>
        </Tabs.Panel>

        <Tabs.Panel value="riwayat" pt="md">
          <HistoryPresence />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
}

export default PresensiIndex;
