import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import * as path from "https://deno.land/std@0.120.0/path/mod.ts";
import { SettingLoader, defaultSetting } from "../../src/setting.ts";

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

Rhum.testPlan("setting.ts", () => {
  Rhum.testSuite("execute()", () => {
    Rhum.testCase("When configuration file does not exist, load default settings", async () => {
      const settingStubbed = new StubbedSettingLoader("dummy");

      Rhum.asserts.assertEquals((await settingStubbed.execute()), defaultSetting);
    });

    Rhum.testCase("When configuration file exists, read the configuration file", async () => {
      const settingStubbed = new StubbedSettingLoader("tests/testdata");
      settingFileData = resolve(JSON.parse(await Deno.readTextFile(settingStubbed.settingFilePath()) as Setting);

      Rhum.asserts.assertEquals((await settingStubbed.execute()), settingFileData);
    });
  });
});

Rhum.run();
