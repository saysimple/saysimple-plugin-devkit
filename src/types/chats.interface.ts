export interface ChatsInterface {
  id: number;
  conversation?: {
    start: Date;
    status: "open" | "closed";
  };
  messages?: {
    direction: "in" | "out";
    time: Date;
    status: string;
    message: string;
  }[];
  tags?: string[];
}
