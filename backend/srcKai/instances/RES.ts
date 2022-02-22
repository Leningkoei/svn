export default interface RES {
  send(response: Response): void;
};

interface Response {
  result: boolean;
  msg?: string;
  data?: unknown;
};

