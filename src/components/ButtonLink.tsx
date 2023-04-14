import { Button, ButtonProps, DefaultProps, Selectors } from "@mantine/core";
import { forwardRef } from "react";
import useStyles from "@/components/styles/ButtonLink.styles";

type ComponentStylesNames = Selectors<typeof useStyles>;

type Props = DefaultProps<ComponentStylesNames> & ButtonProps;

// Pakai ref karena error pas di render (Kurang tau kenapa)
export const ButtonLink = forwardRef(function ButtonLink(
  { children, className, styles, unstyled, ...others }: Props
) {
  const { classes, cx } = useStyles({}, { name: "ButtonLink", unstyled });

  return (
    <Button
      variant="subtle"
      className={cx(classes.root, className)}
      {...others}>
      {children}
    </Button>
  );
});

export default ButtonLink;
