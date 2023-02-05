import Dashboard from "@/layouts/Dashboard";
import {
  Box,
  Center,
  createStyles,
  Flex,
  Space,
  Tabs,
  Text,
  Title
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  timeBox: {
    borderRadius: theme.radius.sm
  }
}));

const totalStudent = 2013;

const StatisticPresences = () => {
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
          bg={index == 0 ? "black" : ""}
          c={index == 0 ? "white" : ""}
          px="md"
          py="sm"
          sx={(theme) => ({
            borderRadius: theme.defaultRadius,
            border: index > 0 ? `1px solid ${theme.colors.dark[0]}` : ""
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

export default function Presensi() {
  const { classes } = useStyles();

  return (
    <Dashboard>
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
        <Tabs defaultValue="presence">
          <Tabs.List>
            <Tabs.Tab value="presence">Presensi</Tabs.Tab>
            <Tabs.Tab value="history">Riwayat Kegiatan Presensi</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="presence" pt="md">
            <Flex gap="md" wrap="wrap">
              <StatisticPresences />
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="history" pt="xs">
            History tab content
          </Tabs.Panel>
        </Tabs>
      </Flex>
    </Dashboard>
  );
}
