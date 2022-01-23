import * as path from "https://deno.land/std@0.120.0/path/mod.ts";
import * as Colors from "https://deno.land/std@0.120.0/fmt/colors.ts";
import { SettingLoader } from "./setting.ts";

export class GrepService {
  async grep(pattern: string, directory: string) {
      const grepSetting = (await SettingLoader.execute()).grep;

    for await (const dirEntry of Deno.readDir(directory)) {
      const fullPath = path.join(directory, dirEntry.name);

      if (grepSetting.ignore.files.includes(fullPath)) {
        continue;
      }
      if (grepSetting.ignore.folders.includes(fullPath)) {
        continue;
      }

      if (dirEntry.isFile) {
        const text: string = await Deno.readTextFile(fullPath);
        text.split("\n").forEach((line, index) => {
          if (line.includes(pattern)) {
            const coloredLine = line.replace(pattern, Colors.yellow(pattern));
            console.log(`${fullPath}: ${index}: ${coloredLine}`);
          }
        });
      } else {
        this.grep(pattern, fullPath);
      }
    }
  }
}

export class Grep {
  constructor(private service: GrepService) {}

  async grep(pattern: string, directory = ".") {
    await this.service.grep(pattern, directory);
  }
}
