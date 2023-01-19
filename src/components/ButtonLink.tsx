import { Button, DefaultProps, Selectors } from "@mantine/core";
import { forwardRef, ReactNode } from "react";
import useStyles from "@/components/styles/ButtonLink.styles";

type ComponentStylesNames = Selectors<typeof useStyles>;

interface Props extends DefaultProps<ComponentStylesNames> {
  children: ReactNode;
}

// Pakai ref karena error pas di render (Kurang tau kenapa)
export const ButtonLink = forwardRef(function ButtonLink(
  { children, className, styles, unstyled, ...others }: Props,
  ref
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
