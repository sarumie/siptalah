import {
  AppShell,
  Navbar,
  Flex,
  Title,
  NavLink,
  createStyles
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiDashboardFill, RiGroupFill, RiUser3Fill } from "react-icons/ri";
import ProfileMenu from "@/components/ProfileMenu";
import { GetServerSidePropsContext } from "next";

interface TNavLink {
  label: string;
  Icon: JSX.Element;
  pagePath: string;
  // href: `${"/d/"}${string}`;
  // pathURI: string;
  isAdminOnly: boolean;
}

const useStyles = createStyles((theme) => ({
  title: { borderBottom: `1px solid ${theme.colors.gray[3]}` },
  box: {
    borderTop: "1px solid",
    borderColor: theme.colors.gray[3]
  },
  navLink: {
    borderRadius: theme.radius.md
  }
}));

const navLinkItems: TNavLink[] = [
  {
    label: "Presensi",
    Icon: <RiDashboardFill size={16} />,
    pagePath: "presensi",
    isAdminOnly: false
  },
  {
    label: "Daftar Siswa",
    Icon: <RiUser3Fill size={16} />,
    pagePath: "siswa",
    isAdminOnly: true
  },
  {
    label: "Daftar Pengurus",
    Icon: <RiUser3Fill size={16} />,
    pagePath: "pengurus",
    isAdminOnly: true
  },
  {
    label: "Daftar Jurusan",
    Icon: <RiGroupFill size={16} />,
    pagePath: "jurusan",
    isAdminOnly: true
  }
];

export default function Dashboard({ children }: React.PropsWithChildren<{}>) {
  // const [opened, setOpened] = useToggle();
  const route = useRouter();
  const { classes } = useStyles();

  return (
    <AppShell
      navbar={
        <Navbar
          // p="xs"-0`
          hiddenBreakpoint="md"
          // hidden={opened}
          // hidden={true}
          width={{ sm: 203, lg: 303 }}>
          <Flex direction="column" h="100%" justify="space-between">
            <Flex w="inherit" direction="inherit" gap="md">
              <Title order={1} py="xs" px="md" className={classes.title}>
                SPPS
              </Title>
              {/* Navigations */}
              <Flex gap="sm" direction="inherit" px="md">
                {navLinkItems.map(({ label, pagePath, Icon, isAdminOnly }) => (
                  <NavLink
                    key={label}
                    variant={
                      route.asPath.split("/").includes(pagePath)
                        ? "filled"
                        : "light"
                    }
                    component={Link}
                    href={`/d/${pagePath}`}
                    label={label}
                    icon={Icon}
                    className={classes.navLink}
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

export function getServerSideProps(ctx: GetServerSidePropsContext) {}

