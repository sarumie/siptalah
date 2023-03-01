// Utils
import { DeepPartial } from "../utils/deepPartial";

// Type
import { NextRouter } from "next/router";
import React from "react";

type AuthPropType = {
  fullName?: string;
  nip?: string;
  href: string;
  router: NextRouter;
  loginDispatch: React.Dispatch<LoginReducerPropType>;
};

type LoginReducerPropType = {
  type:
    | "handleLoading"
    | "handleFail"
    | "handleSuccess"
    | "handleMessage"
    | "handleReset";
  payload?: DeepPartial<LoginStateType>;
};

type LoginReducerType = (
  state: LoginStateType,
  { type, payload }: LoginReducerPropType
) => LoginStateType;

type LoginStateType = {
  isLoading: boolean | undefined;
  message: string | undefined;
  pass: boolean | undefined;
};
