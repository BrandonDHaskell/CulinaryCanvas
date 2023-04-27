import chalk from 'chalk';

const loggingEnabled = process.env.LOGGING_ENABLED === 'true';

export default class Logger {
    public static log = (args: any) => this.info(args);

    public static info = (args: any) => loggingEnabled && console.log(chalk.blue(`[${new Date().toISOString()}][INFO] `), typeof args === 'string' ? chalk.blueBright(args) : args);

    public static warn = (args: any) => loggingEnabled && console.log(chalk.yellow(`[${new Date().toISOString()}][WARN] `), typeof args === 'string' ? chalk.yellowBright(args) : args);

    public static error = (args: any) => loggingEnabled && console.log(chalk.red(`[${new Date().toISOString()}][ERROR] `), typeof args === 'string' ? chalk.redBright(args) : args);
}
