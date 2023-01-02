import { convertFilesToMap } from "@/data/convertFilesToMap";
import { ChannelsInterface } from "@/types/channels.interface";

const context = require.context("./", false, /.+\.json$/);

export const channels = convertFilesToMap<ChannelsInterface[]>(context);
