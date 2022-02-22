import { unlink } from "fs";
import path from "path";

export default (filename: string): Promise<void> => {
  return new Promise<void>(
    (resolve: () => void, reject: (error: unknown) => void): void => {
      unlink(path.resolve("files", filename), (error: unknown) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        };
      });
    }
  );
};

