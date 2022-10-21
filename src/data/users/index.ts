import { UsersInterface } from "@/types/users.interface";
import { convertFilesToMap } from "@/data/convertFilesToMap";

const context = require.context("./", false, /\.json$/);

export const users = convertFilesToMap<UsersInterface>(context);
