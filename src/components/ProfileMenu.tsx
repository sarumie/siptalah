import supabase from "@/lib/supabase";
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
import { useRouter } from "next/router";
import { type MouseEventHandler, useState } from "react";
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

export default function ProfileMenu() {
  const route = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const { classes } = useStyles();

  const onClickLogOut: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsDisabled(true);
    const { error } = await supabase.auth.signOut();
    if (!error) return route.push("/login");

    showNotification({
      title: "Gagal logout",
      message: error?.message || "Terjadi kesalahan saat logout",
      color: "red"
    });
    setIsDisabled(false);
  };

  return (
    <Menu position="right-end" withArrow>
      <Menu.Target>
        <UnstyledButton className={classes.button}>
          <Grid align="center">
            <Grid.Col span="auto">
              <Avatar
                // TODO: Change this to user's avatar link
                src="https://waifu.now.sh/sfw/neko"
                radius={999}
              />
            </Grid.Col>

            <Grid.Col span={8}>
              <Flex direction="column">
                <Text fw={600} truncate>
                  Sandy Raja Alamsyah
                </Text>
                <Text color="dark.3" size="xs" truncate>
                  lagimakanpecelbuimas@gmail.com
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
          disabled={isDisabled}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

