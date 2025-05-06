import * as path from "jsr:@std/path";

function defaultGrepSetting() {
  return {
    ignore: {
      files: [
        "~$",
        "ignore_file",
      ],
      folders: [
        "ignore_folder",
      ],
    },
  };
}

export function defaultSetting() {
  return {
    grep: defaultGrepSetting(),
  };
}

export type GrepSetting = ReturnType<typeof defaultGrepSetting>;
export type Setting = ReturnType<typeof defaultSetting>;

export class SettingLoader {
  execute(): Promise<Setting> {
    return new Promise((resolve, _reject) => {
      Deno.readTextFile(this.settingFilePath()).then((value) => {
        resolve(JSON.parse(value) as Setting);
      }).catch(() => {
        resolve(defaultSetting());
      });
    });
  }

  settingFilePath(): string {
    return path.join(Deno.env.get("HOME")!, ".runner.json");
  }
}
