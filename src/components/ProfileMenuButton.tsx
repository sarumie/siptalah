import useStyles from "@/components/styles/ProfileMenuButton.styles";
import { DefaultProps, Selectors, UnstyledButton } from "@mantine/core";
import { HTMLAttributes } from "react";

type ComponentStylesNames = Selectors<typeof useStyles>;

type Props = DefaultProps<ComponentStylesNames> & HTMLAttributes<HTMLElement>;

function ProfileMenuButton({ children, ...others }: Props) {
  const { classes } = useStyles();

  return (
    <UnstyledButton className={classes.root} {...others}>
      {children}
    </UnstyledButton>
  );
}

export default ProfileMenuButton;
