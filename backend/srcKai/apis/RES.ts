export default interface RES {
  send(data: Data): void;
};

interface Data {
  result: boolean;
  msg?: string;
  content: unknown;
};

