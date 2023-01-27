import Dashboard from "@/layouts/Dashboard";
import { Flex, Space, Tabs, Text, Title } from "@mantine/core";

export default function Presensi() {
  const totalStudent = 2013;
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
    <Dashboard>
      <Flex direction="column" gap="md">
        <Flex direction="column">
          <Title order={3}>Presensi Hari Ini</Title>
          <Text fw={600} fz="lg">
            Jum&#39;at, 13 Januari 2023
          </Text>
        </Flex>
        <Tabs defaultValue="presence">
          <Tabs.List>
            <Tabs.Tab value="presence">Presensi</Tabs.Tab>
            <Tabs.Tab value="history">Riwayat Kegiatan Presensi</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="presence" pt="md">
            <Text fw={600}>Statistik presensi hari ini</Text>
            <Text fw={600}>Dibuka pukul 06.02</Text>
            <Space h="md" />
            {/* Statistik presensi */}
            <Flex gap="md" wrap="wrap">
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

              <Flex></Flex>
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
