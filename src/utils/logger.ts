import fs from "fs";
import path from "path";

const customLogPath = path.join(__dirname, "../logs/app.log");

export function logToFile(message: string) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(customLogPath, `[${timestamp}] ${message}\n`);
}
