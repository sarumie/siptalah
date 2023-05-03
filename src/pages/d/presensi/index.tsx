import HistoryPresence from "@/components/pages/HistoryPresence";
import TableList from "@/components/TableList";
import {
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
import { useState } from "react";
import { RiPlayFill, RiSearchLine, RiStopFill } from "react-icons/ri";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import StatisticPresence from "@/components/StatisticPresence";

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
  }
}));

export default function PresencePage() {
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

  axios.get<{ result: Presence[] }>("/presence/1").then((value) => {});

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
      <Tabs defaultValue="today">
        <Tabs.List>
          <Tabs.Tab value="today">Presensi</Tabs.Tab>
          <Tabs.Tab value="history">Riwayat</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="today" pt="md">
          <Flex gap="md" wrap="wrap">
            <StatisticPresence />
          </Flex>
          <Space h="md" />
          <Flex direction="column" gap="md">
            <Flex justify="space-between">
              <Flex gap="sm">
                <Button
                  leftIcon={buttonState.icon}
                  variant="white"
                  onClick={() => toggleButtonState()}
                  className={classes.startBtn}>
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

// export function getStaticProps() {
//   return {
//     props: {
//       id: // nomor
//     }
//   };
// }

