import { Command } from "@cliffy/command";

import { Git, GitService } from "./src/git.ts";
import { Grep, GrepService } from "./src/grep.ts";

const gbd = new Command()
  .name("gbd")
  .description("Remove unnecessary git branches")
  .action(async () => {
    const git = new Git(new GitService());
    await git.branchDelete();
  });

const grep = new Command()
  .name("grep")
  .description("Run grep without unnecessary directory searches")
  .arguments("<pattern:string>")
  .action(async (_option, pattern: string) => {
    const grep = new Grep(await GrepService.init());
    grep.grep(pattern);
  });

await new Command()
  .name("runner")
  .version("1.1.0")
  .description("Utility commands runner")
  .command("gbd", gbd)
  .command("grep", grep)
  .parse(Deno.args);
