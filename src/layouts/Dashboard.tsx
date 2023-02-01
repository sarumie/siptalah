import { useCallback } from "react";
import ProfileMenuButton from "@/components/ProfileMenuButton";
import {
  AppShell,
  Navbar,
  Text,
  useMantineTheme,
  Box,
  Flex,
  Avatar,
  Title,
  NavLink,
  Grid
} from "@mantine/core";
import { useRouter } from "next/router";
import {
  RiArrowDropRightLine,
  RiDashboardFill,
  RiUser3Fill
} from "react-icons/ri";
import Link from "next/link";

export default function Dashboard({ children }: React.ComponentProps<"div">) {
  // const [opened, setOpened] = useState(true);
  // const [active, setActive] = useState(true);
  const imageProfile = useCallback(() => "https://waifu.now.sh/sfw/neko", []);

  const theme = useMantineTheme();
  const route = useRouter();

  const navLinkProp = [
    {
      label: "Dashboard",
      Icon: <RiDashboardFill size={16} />,
      href: "/d/presence",
      pathURI: "presence"
    },
    {
      label: "Daftar pengurus dan siswa",
      Icon: <RiUser3Fill size={16} />,
      href: "/d/lists",
      pathURI: "lists"
    }
  ];

  return (
    <AppShell
      navbar={
        <Navbar
          // p="xs"
          hiddenBreakpoint="md"
          // hidden={opened}
          hidden={true}
          width={{ sm: 203, lg: 303 }}>
          <Flex direction="column" h="100%" justify="space-between">
            <Flex w="inherit" direction="inherit" gap="md">
              <Title
                order={3}
                py="xs"
                px="md"
                sx={{ borderBottom: `1px solid ${theme.colors.gray[3]}` }}>
                SPPS
              </Title>
              {/* Navigations */}
              <Flex gap="sm" direction="inherit">
                {navLinkProp.map(({ label, pathURI, href, Icon }) => (
                  <NavLink
                    key={label}
                    variant={
                      route.asPath.split("/").includes(pathURI)
                        ? "filled"
                        : "light"
                    }
                    component={Link}
                    href={href}
                    label={label}
                    icon={Icon}
                  />
                ))}
              </Flex>
            </Flex>

            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: theme.colors.gray[3]
              }}>
              <ProfileMenuButton py="md" px="md">
                <Grid align="center">
                  <Grid.Col span="auto">
                    <Avatar src={imageProfile()} radius="xl" />
                  </Grid.Col>

                  <Grid.Col span={8}>
                    <Flex direction="column">
                      <Text size="sm" fw={600} truncate>
                        Gloria G. Johnson
                      </Text>
                      <Text color="dark.3" size="xs" truncate>
                        mumumumumu@gmail.com
                      </Text>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span="auto">
                    <RiArrowDropRightLine size={24} />
                  </Grid.Col>
                </Grid>
              </ProfileMenuButton>
            </Box>
          </Flex>
        </Navbar>
      }>
      {/* CONTENT GOES HERE */}
      {children}
    </AppShell>
  );
}
