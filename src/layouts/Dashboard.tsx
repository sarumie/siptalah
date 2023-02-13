import { useCallback } from "react";
import {
  AppShell,
  Navbar,
  Text,
  Box,
  Flex,
  Avatar,
  Title,
  NavLink,
  Grid,
  createStyles
} from "@mantine/core";
import { useRouter } from "next/router";
import {
  RiArrowDropRightLine,
  RiDashboardFill,
  RiGroupFill,
  RiUser3Fill
} from "react-icons/ri";
import Link from "next/link";
import { useToggle } from "@mantine/hooks";
import ProfileMenu from "@/components/ProfileMenu";

interface NavLinkProp {
  label: string;
  Icon: JSX.Element;
  href: `${"/d/"}${string}`;
  pathURI: string;
}

const useStyles = createStyles((theme) => ({
  title: { borderBottom: `1px solid ${theme.colors.gray[3]}` },
  box: {
    borderTop: "1px solid",
    borderColor: theme.colors.gray[3]
  }
}));

export default function Dashboard({ children }: React.ComponentProps<"div">) {
  const [opened, setOpened] = useToggle();
  // const [active, setActive] = useState(true);

  const { classes } = useStyles();
  const route = useRouter();

  const navLinkProp: NavLinkProp[] = [
    {
      label: "Presensi",
      Icon: <RiDashboardFill size={16} />,
      href: "/d/presensi",
      pathURI: "presensi"
    },
    {
      label: "Daftar Siswa",
      Icon: <RiUser3Fill size={16} />,
      href: "/d/siswa",
      pathURI: "siswa"
    },
    {
      label: "Daftar Pengurus",
      Icon: <RiUser3Fill size={16} />,
      href: "/d/pengurus",
      pathURI: "pengurus"
    },
    {
      label: "Daftar Jurusan",
      Icon: <RiGroupFill size={16} />,
      href: "/d/jurusan",
      pathURI: "jurusan"
    }
  ];

  return (
    <AppShell
      navbar={
        <Navbar
          // p="xs"-0`
          hiddenBreakpoint="md"
          // hidden={opened}
          hidden={true}
          width={{ sm: 203, lg: 303 }}>
          <Flex direction="column" h="100%" justify="space-between">
            <Flex w="inherit" direction="inherit" gap="md">
              <Title order={1} py="xs" px="md" className={classes.title}>
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

            <ProfileMenu />
          </Flex>
        </Navbar>
      }>
      {/* CONTENT GOES HERE */}
      {children}
    </AppShell>
  );
}
