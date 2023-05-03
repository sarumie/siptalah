import { axios } from "@/lib/client";
import {
  Avatar,
  createStyles,
  Flex,
  Grid,
  Menu,
  Text,
  UnstyledButton
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { RiArrowDropRightLine, RiLogoutCircleLine } from "react-icons/ri";

const useStyles = createStyles((theme) => ({
  button: {
    borderTop: "1px solid",
    borderColor: theme.colors.gray[3],
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    // color: theme.black,
    "&:hover": {
      backgroundColor: theme.colors.gray[3]
    }
  },
  btnLogout: {
    color: theme.colors.red[0],
    backgroundColor: theme.colors.red[8],
    ":hover": {
      backgroundColor: theme.colors.red[9]
    }
  }
}));

const logOut = async () => {
  const res = await axios.get("/auth/logout");
  res.status !== 200 && new Error("Tidak bisa logout");
};

export default function ProfileMenu() {
  const route = useRouter();
  const { classes } = useStyles();
  const { isLoading, mutate: doLogOut } = useMutation(logOut, {
    onError: ({ message }: Error) =>
      showNotification({
        title: "Gagal keluar",
        message,
        color: "red"
      })
  });

  const onClickLogOut = () => doLogOut();

  return (
    <Menu position="right-end" withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.button}>
          <Grid align="center">
            <Grid.Col span="auto">
              <Avatar
                // src="https://waifu.now.sh/sfw/neko"
                radius={999}
              />
            </Grid.Col>

            <Grid.Col span={8}>
              <Flex direction="column">
                <Text fw={600} truncate>
                  Gloria G. Johnsonnnnnnnn
                </Text>
                <Text color="dark.3" size="xs" truncate>
                  mumumumumumumumumumu@gmail.com
                </Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span="auto">
              <RiArrowDropRightLine size={24} />
            </Grid.Col>
          </Grid>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          icon={<RiLogoutCircleLine />}
          p="lg"
          className={classes.btnLogout}
          onClick={onClickLogOut}
          disabled={isLoading}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

