import fs from "fs";

export default function changeFileText(
  filepath: string, content: string
): Promise<void> {
  return new Promise<void>((
    resolve: () => void,
    reject: (error: unknown) => void
  ) => {
    fs.writeFile(filepath, content, (error: unknown) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      };
    });
  })
};

