import chalk from "chalk";

const commonLog = console.log.bind(undefined);

console.log = (...logs: any[]) => commonLog(chalk.green(...logs));
console.warn = (...warns: any[]) => commonLog(chalk.yellow(...warns));

