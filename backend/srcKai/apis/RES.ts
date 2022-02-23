export default interface RES {
  send(data: Data): void;
};

export interface Data {
  result: boolean;
  msg: string;
  content: unknown | null;
};

