export class RemoveHiddenFiles {
  remove(names: Array<string>) {
    for (const name of names) {
      console.info(`Remove ${name}`);
      Deno.remove(name);
    }
  }
}
