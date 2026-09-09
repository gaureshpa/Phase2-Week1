import { runCommand } from "./command/runCommand";

const command: string | undefined = process.argv[2];

runCommand(command);
