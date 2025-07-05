import { Find, FindService } from "./find.ts";

export class RemoveHiddenFiles {
  private constructor(public path: string, public hiddenFiles: string[]) {}

  static async create(path: string): Promise<RemoveHiddenFiles> {
    const find = new Find(new FindService());
    const hiddenFiles = await find.findHiddenFiles(path);

    return new RemoveHiddenFiles(path, hiddenFiles);
  }

  remove() {
    for (const name of this.hiddenFiles) {
      console.info(`Remove ${name}`);
      Deno.remove(name);
    }
  }
}
