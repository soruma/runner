import Denomander from "https://deno.land/x/denomander@0.9.1/mod.ts";
import { Git, GitService } from "./git.ts";
import { Grep, GrepService } from "./grep.ts"

const program = new Denomander({
  app_name: "Commands runner",
  app_description: "Utility commands runner",
  app_version: "1.0.0",
});

program
  .command("gbd", "Remove unnecessary git branches")
  .action(() => {
    const git = new Git(new GitService());
    git.branchDelete();
  });

program
  .command("grep [args...]", "Run grep without unnecessary directory searches")
  // deno-lint-ignore no-explicit-any
  .action(({ args }: any) => {
    const grep = new Grep(new GrepService());
    grep.grep(args[0]);
  });

program.parse(Deno.args);
