import { User } from "types";

export type LoginReq = {
  username: string;
  password: string;
};

export type LoginRes = any;

export type RegisterReq = {
  username: string;
  password: string;
  confirmepass: string;
};

export type RegisterRes = User;
