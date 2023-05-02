import { TOTAL_STUDENT } from "@/constants";
import { Flex, Text, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  presenceMain: {
    backgroundColor: theme.black,
    color: theme.white
  }
}));

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

export default function StatisticPresence() {
  const { classes } = useStyles();

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
              {val.count} / {TOTAL_STUDENT}
            </Title>
          </Flex>
          <Text fz="sm">siswa</Text>
        </Flex>
      ))}
    </>
  );
}

