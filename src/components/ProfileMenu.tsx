import {
  Avatar,
  createStyles,
  Flex,
  Grid,
  Menu,
  Text,
  UnstyledButton
} from "@mantine/core";
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
  buttonLogOut: {
    color: theme.colors.red[0],
    backgroundColor: theme.colors.red[8],
    ":hover": {
      backgroundColor: theme.colors.red[9]
    }
  }
}));

function ProfileMenu() {
  const { classes } = useStyles();

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
          className={classes.buttonLogOut}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ProfileMenu;
