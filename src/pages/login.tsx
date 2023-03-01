// Emotion
import styled from "@emotion/styled";

// Mantine
import {
  Flex,
  Button,
  Text,
  Input,
  Title,
  NumberInput,
  Menu,
  DEFAULT_THEME,
  createPolymorphicComponent,
  ButtonProps,
  UnstyledButton,
  useMantineTheme,
  Notification,
  createStyles
} from "@mantine/core";
import { useForm } from "@mantine/form";

// Types
import {
  LoginReducerPropType,
  LoginStateType,
  LoginReducerType,
  AuthPropType
} from "@/lib/types/login/loginType";
import { NextRouter } from "next/router";
import axios from "axios";
import { LocalStorage } from "@/lib/utils/LocalStorage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";
import { RiWhatsappLine, RiArrowRightSLine } from "react-icons/ri";

const useStyles = createStyles((theme) => ({
  form: {
    all: "inherit"
  },
  buttonLink: {
    color: theme.black,
    textDecoration: "underline",
    padding: 0,
    ":hover": {
      color: theme.colors.dark[3],
      cursor: "pointer"
    }
  }
}));

const InheritStyledForm = styled.form`
  all: inherit;
`;

const _ButtonLink = styled(UnstyledButton)`
  color: ${DEFAULT_THEME.black};
  text-decoration: underline;
  padding: 0;
  &:hover {
    color: ${DEFAULT_THEME.colors.dark[3]};
    cursor: pointer;
  }
`;

const ButtonLink = createPolymorphicComponent<"button", ButtonProps>(
  _ButtonLink
);

const initialState: LoginStateType = {
  isLoading: false,
  pass: false,
  message: ""
};

const reducer: LoginReducerType = (state, { type, payload }) => {
  switch (type) {
    case "handleLoading":
      return {
        ...state,
        isLoading: payload.isLoading
      };

    case "handleFail":
      return {
        ...state,
        message: payload.message,
        isLoading: payload.isLoading
      };

    case "handleSuccess":
      return {
        ...state,
        message: "",
        isLoading: false,
        pass: payload.pass
      };
  }
};

async function auth({
  fullName,
  nip,
  href,
  router,
  loginDispatch
}: AuthPropType) {
  // Actived Loading State
  loginDispatch({
    type: "handleLoading",
    payload: {
      isLoading: true
    }
  });

  // Start Authentication
  const { data } = await axios.post("/api/auth/login", {
    nip,
    fullName
  });

  if (!data) {
    loginDispatch({
      type: "handleFail",
      payload: {
        isLoading: false,
        message: "Nama atau NIP anda salah!"
      }
    });
    return;
  }

  // Redirect
  console.log(data);
  LocalStorage({
    key: "spps.userInfo",
    method: "set",
    value: data
  });
  router.push(href);
}

export default function Login() {
  const [loginState, setLoginState] = useReducer(reducer, initialState);
  const router = useRouter();
  const { classes, theme } = useStyles();
  const form = useForm({
    initialValues: {
      fullName: "",
      nip: ""
    }
  });

  const whatsappContacts = [
    { fullName: "Muhammad Iqbal", number: "+6282649273472" },
    {
      fullName: "Jonathan Kurniawan",
      number: "+628327428174"
    },
    {
      fullName: "Kita Abdurrahman Saleh",
      number: "+6291047238394"
    }
  ];

  const getAuth = form.onSubmit((values) =>
    auth({
      router,
      fullName: values.fullName,
      nip: values.nip,
      href: "/d/presensi",
      loginDispatch: setLoginState
    })
  );

  return (
    <Flex h="100vh" justify="center" align="center">
      <Flex
        gap="lg"
        maw={468}
        miw="fit-content"
        w="max"
        direction="column"
        wrap="wrap">
        <Flex direction="column" align="center">
          <Title order={1}>SPPS</Title>
          <Text c="dark.3">Sistem Pengelolaan Data Presensi Siswa</Text>
        </Flex>

        {loginState.message && (
          <Notification>
            <p>{loginState.message}</p>
          </Notification>
        )}

        <form onSubmit={getAuth} className={classes.form}>
          <Flex direction="column" align="center" gap="sm">
            <Title order={4}>Login</Title>
            <Input
              w="100%"
              name="fullName"
              placeholder="Nama Lengkap"
              {...form.getInputProps("fullName")}
            />
            <NumberInput
              w="100%"
              name="nip"
              placeholder="NIP"
              hideControls
              {...form.getInputProps("nip")}
            />
            <Button type="submit" disabled={loginState.isLoading} fullWidth>
              {loginState.isLoading ? "Autentikasi..." : "Masuk"}
            </Button>
          </Flex>
        </form>
        <Flex direction="column" align="center">
          <Text fz="xs" fw={600}>
            Tidak punya akun?
          </Text>
          <Menu
            shadow="sm"
            position="top"
            trigger="hover"
            openDelay={100}
            closeDelay={400}>
            <Menu.Target>
              <ButtonLink fz="xs">
                Hubungi admin untuk pembuatan akun baru
              </ButtonLink>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Daftar Kontak</Menu.Label>
              {whatsappContacts.map(({ fullName, number }) => (
                <Menu.Item
                  key={number}
                  icon={
                    <RiWhatsappLine size={20} color={theme.colors.dark[3]} />
                  }
                  rightSection={<RiArrowRightSLine size={20} />}
                  px="md"
                  component="a"
                  href={`https://wa.me/${number}`}
                  target="_blank"
                  sx={(theme) => ({ gap: theme.spacing.sm })}>
                  <Flex direction="column" mr="md">
                    <Text fz="sm" fw={600}>
                      {fullName}
                    </Text>
                    <Text fz="xs" c="dark.3">
                      {number}
                    </Text>
                  </Flex>
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </Flex>
  );
}
