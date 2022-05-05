import * as path from "https://deno.land/std@0.120.0/path/mod.ts";
import * as Colors from "https://deno.land/std@0.120.0/fmt/colors.ts";
import { GrepSetting, SettingLoader } from "./setting.ts";

export class GrepService {
  grepSetting: GrepSetting;

  private constructor(grepSetting: GrepSetting) {
    this.grepSetting = grepSetting;
  }

  public async grep(pattern: string, directory: string) {
    for await (const dirEntry of Deno.readDir(directory)) {
      if (this.hitIgnoreList(dirEntry)) {
        continue;
      }

      const fullPath = path.join(directory, dirEntry.name);
      if (dirEntry.isDirectory) {
        this.grep(pattern, fullPath);
      } else {
        const text: string = await Deno.readTextFile(fullPath);
        text.split("\n").forEach((line, index) => {
          if (line.includes(pattern)) {
            const coloredLine = line.replace(pattern, Colors.yellow(pattern));
            console.log(`${fullPath}: ${index}: ${coloredLine}`);
          }
        });
      }
    }
  }

  public hitIgnoreList(dirEntry: Deno.DirEntry) {
    let hit = false;
    for (const ignoreFile of this.grepSetting.ignore.files) {
      if (dirEntry.name.match(ignoreFile)) {
        hit = true;
        break;
      }
    }
    for (const ignoreFolder of this.grepSetting.ignore.folders) {
      if (dirEntry.name.match(ignoreFolder)) {
        hit = true
        break;
      }
    }

    return hit;
  }

  public static init = async () => {
    const settingLoader = new SettingLoader();
    const grepSetting: GrepSetting = (await settingLoader.execute()).grep;

    return new GrepService(grepSetting);
  }
}

export class Grep {
  constructor(private service: GrepService) {}

  async grep(pattern: string, directory = ".") {
    await this.service.grep(pattern, directory);
  }
}
