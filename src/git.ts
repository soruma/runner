export class GitService {
  async fetch() {
    const command: Deno.Command = new Deno.Command("git", {
      args: ["fetch", "-p"],
    });
    const { success } = await command.output();
    if (!success) {
      throw new Error("Faild git fetch.");
    }
  }

  async mergedBranchs(): Promise<string[]> {
    const command: Deno.Command = new Deno.Command("git", {
      args: ["branch", "--format", "%(refname:short)", "--merged"],
      stdout: "piped",
    });
    const { success, stdout } = await command.output();
    if (!success) {
      throw new Error("Faild git branch --merged.");
    }

    const decodedOutput = new TextDecoder()
      .decode(stdout)
      .trim();

    return decodedOutput.split("\n");
  }

  async branchDelete(branch: string) {
    const command: Deno.Command = new Deno.Command("git", {
      args: ["branch", "-d", branch],
    });
    const { success } = await command.output();
    if (!success) {
      throw new Error(`Faild ${branch} branch delete.`);
    }
  }

  isBranchToLeave(branch: string): boolean {
    return ["main", "master"].indexOf(branch) >= 0;
  }
}

export class Git {
  constructor(private service: GitService) {}

  async fetch() {
    await this.service.fetch();
  }

  async branchDelete() {
    await this.service.fetch();
    (await this.service.mergedBranchs()).forEach((branch) => {
      if (this.service.isBranchToLeave(branch)) return;
      this.service.branchDelete(branch);
    });
  }
}
