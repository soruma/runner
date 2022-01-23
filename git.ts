export class GitService {
  async fetch() {
    const p: Deno.Process = Deno.run({
      cmd: ["git", "fetch", "-p"],
    });
    const status: Deno.ProcessStatus = await p.status();
    p.close();
    if (!status.success) {
      throw new Error("Faild git fetch.");
    }
  }

  async mergedBranchs(): Promise<string[]> {
    const p: Deno.Process = Deno.run({
      cmd: ["git", "branch", "--format", "%(refname:short)", "--merged"],
      stdout: "piped",
    });
    const decodedOutput = new TextDecoder()
      .decode(await p.output())
      .trim();
    p.close();

    return decodedOutput.split("\n");
  }

  branchDelete(branch: string) {
    const p: Deno.Process = Deno.run({
      cmd: ["git", "branch", "-d", branch],
    });

    p.status().then((result) => {
      if (!result.success) {
        throw new Error(`Faild ${branch} branch delete.`);
      }
    });
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
