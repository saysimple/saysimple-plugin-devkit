import { convertFilesToMap } from "@/data/convertFilesToMap";
import { ContactsInterface } from "@/types/contacts.interface";

const context = require.context("./", false, /.+\.json$/);

export const contacts = convertFilesToMap<ContactsInterface>(context);
