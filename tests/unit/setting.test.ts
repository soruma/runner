import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { assertSpyCalls, stub } from "jsr:@std/testing/mock";

import * as path from "jsr:@std/path";

import { defaultSetting, SettingLoader } from "../../src/setting.ts";

describe("SettingLoader", () => {
  describe("execute()", () => {
    it("When configuration file does not exist, load default settings", async () => {
      const settingLoader = new SettingLoader();
      const settingFilePathStub = stub(settingLoader, "settingFilePath", () => {
        return "dummy";
      });

      expect(await settingLoader.execute()).toEqual(defaultSetting());
      assertSpyCalls(settingFilePathStub, 1);
    });

    it("When configuration file exists, read the configuration file", async () => {
      const settingLoader = new SettingLoader();
      const settingFilePathStub = stub(settingLoader, "settingFilePath", () => {
        return path.join(Deno.cwd(), "tests", "testdata", ".runner.json");
      });

      const setting = await Deno.readTextFile(
        path.join(Deno.cwd(), "tests", "testdata", ".runner.json"),
      );
      const jsonSetting = JSON.parse(setting);

      expect(await settingLoader.execute()).toEqual(jsonSetting);
      assertSpyCalls(settingFilePathStub, 1);
    });
  });
});
