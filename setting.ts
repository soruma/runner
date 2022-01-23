import * as path from "https://deno.land/std@0.120.0/path/mod.ts";

export type Setting = { grep: { ignore: { files: string[], folders: string[]} } };

export class SettingLoader {
  public static execute(): Promise<Setting> {
    return new Promise((resolve, _reject) => {
      Deno.readTextFile(SettingLoader.settingFilePath()).then((value) => {
        resolve(JSON.parse(value) as Setting);
      }).catch(() => {
        resolve(SettingLoader.defaultSetting());
      });
    });

  }

  public static settingFilePath(): string {
    return path.join(Deno.env.get("HOME")!, ".runner.json");
  }

  private static defaultSetting(): Setting {
    return {
      grep: {
        ignore: {
          files: [
            "~$"
          ],
          folders: [
            ".git",
            "node_modules"
          ]
        }
      }
    }
  }
}
