import "./test.js";
import chalk from "chalk";
import SVN from "./SVN.js";

const commonLog = console.log.bind(undefined);

console.log = (...logs: any[]) => commonLog(chalk.green(...logs));
console.warn = (...warns: any[]) => commonLog(chalk.yellow(...warns));
console.error = (...errors: any[]) => commonLog(chalk.red(...errors));

(new SVN(1024)).main();

