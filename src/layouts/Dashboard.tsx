// Mantine
import {
  AppShell,
  Navbar,
  Flex,
  Title,
  NavLink,
  createStyles
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

// React
import { useEffect, useState } from "react";
import { RiDashboardFill, RiGroupFill, RiUser3Fill } from "react-icons/ri";

// Components
import ProfileMenu from "@/components/ProfileMenu";

// Utils
import { LocalStorage } from "@/lib/utils/LocalStorage";

interface NavLinkProp {
  label: string;
  Icon: JSX.Element;
  href: `${"/d/"}${string}`;
  pathURI: string;
  level: "BASIC" | "HIGHEST" | "ALL";
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

const initialState = {
  isLoading: true,
  userInfo: {
    fullName: "",
    level: "",
    access: []
  }
};

const navLinkProp: NavLinkProp[] = [
  {
    label: "Presensi",
    Icon: <RiDashboardFill size={16} />,
    href: "/d/presensi",
    pathURI: "presensi",
    level: "ALL"
  },
  {
    label: "Daftar Siswa",
    Icon: <RiUser3Fill size={16} />,
    href: "/d/siswa",
    pathURI: "siswa",
    level: "HIGHEST"
  },
  {
    label: "Daftar Pengurus",
    Icon: <RiUser3Fill size={16} />,
    href: "/d/pengurus",
    pathURI: "pengurus",
    level: "HIGHEST"
  },
  {
    label: "Daftar Jurusan",
    Icon: <RiGroupFill size={16} />,
    href: "/d/jurusan",
    pathURI: "jurusan",
    level: "HIGHEST"
  }
];

export default function Dashboard({ children }: React.ComponentProps<"div">) {
  const [oathState, setOathSet] = useState(initialState);
  const [opened, setOpened] = useToggle();
  const route = useRouter();
  const { classes } = useStyles();

  useEffect(() => {
    const userInfo = LocalStorage({
      method: "get",
      key: "spps.userInfo"
    });

    if (!userInfo) {
      route.push("/login");
    } else {
      console.log(userInfo.result);
      setOathSet((state) => {
        return {
          isLoading: false,
          userInfo: {
            ...userInfo.result
          }
        };
      });
    }
  }, [route]);

  console.log(oathState);

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
              <Flex gap="sm" direction="inherit" px="md">
                {!oathState.isLoading &&
                  navLinkProp.map(({ label, pathURI, href, Icon, level }) => {
                    console.log(oathState.userInfo?.level);
                    if (
                      level === "ALL" ||
                      oathState.userInfo?.level === level
                    ) {
                      return (
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
                          className={classes.navLink}
                        />
                      );
                    }
                  })}
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
