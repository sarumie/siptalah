import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  root: {
    maxWidth: "100%",
    width: "100%",
    color: theme.black,
    background: "none",
    // borderRadius: theme.radius.md,
    transition: "all",
    transitionDuration: "150ms",
    ":hover": {
      backgroundColor: theme.colors.gray[3]
    }
  }
}));
