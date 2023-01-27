/**
 * DEPRECATED
 */
import { createStyles, ButtonProps } from "@mantine/core";

export default createStyles((theme, params: ButtonProps) => ({
  root: {
    color: theme.black,
    textDecoration: "underline",
    padding: 0,
    ":hover": {
      color: theme.colors.dark[2],
      cursor: "pointer"
    }
  }
}));
