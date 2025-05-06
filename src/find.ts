export class FindService {
  async find(path: string, names: Array<string>) {
    const joinNames = `-name ${names.join(" -or -name ")}`.split(" ");
    const command: Deno.Command = new Deno.Command("find", {
      args: [path, ...joinNames],
    });
    const { success, stdout, stderr } = await command.output();
    if (!success) {
      console.error(new TextDecoder().decode(stderr));
      console.error(`Path: ${path}`);
      console.error(`Names: ${names}`);
      Deno.exit(1);
    }

    const result = new TextDecoder().decode(stdout);

    return result.split("\n").filter((line) => line !== "");
  }
}

const HIDDEN_FILES = [".DS_Store", "._*"];

export class Find {
  constructor(private service: FindService) {}

  async find(path: string, names: Array<string>) {
    const result = await this.service.find(path, names);
    console.info(result.join("\n"));

    return result;
  }

  async findHiddenFiles(path: string) {
    const result = await this.service.find(path, HIDDEN_FILES);

    return result;
  }
}
