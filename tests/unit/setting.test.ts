import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import * as path from "jsr:@std/path";

import { defaultSetting, Setting, SettingLoader } from "../../src/setting.ts";

class StubbedSettingLoader extends SettingLoader {
  dir: string;

  constructor(dir: string) {
    super();

    this.dir = dir;
  }

  settingFilePath(): string {
    return path.join(this.dir, ".runner.json");
  }
}

describe("git.ts", () => {
  describe("execute()", () => {
    it("When configuration file does not exist, load default settings", async () => {
      const settingStubbed = new StubbedSettingLoader("dummy");

      expect(await settingStubbed.execute()).toEqual(defaultSetting());
    });

    it("When configuration file exists, read the configuration file", async () => {
      const settingStubbed = new StubbedSettingLoader("tests/testdata");
      const settingFileData = JSON.parse(
        await Deno.readTextFile(settingStubbed.settingFilePath()),
      ) as Setting;

      expect(await settingStubbed.execute()).toEqual(settingFileData);
    });
  });
});
