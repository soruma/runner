import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { Git, GitService } from "../../src/git.ts";

Rhum.testPlan("git.ts", () => {
  Rhum.testSuite("fetch()", () => {
    Rhum.testCase("Call GitService fetch method", async () => {
      const mock = Rhum.mock(GitService).create();
      const git = new Git(mock);
      Rhum.asserts.assertEquals(mock.calls.fetch, 0);
      await git.fetch();
      Rhum.asserts.assertEquals(mock.calls.fetch, 1);
    });
  });

  Rhum.testSuite("gbd()", () => {
    Rhum.testCase("Call GitService fetch method", async () => {
      const mock = Rhum.mock(GitService).create();
      const git = new Git(mock);
      Rhum.asserts.assertEquals(mock.calls.fetch, 0);
      await git.branchDelete();
      Rhum.asserts.assertEquals(mock.calls.fetch, 1);
    });

    Rhum.testCase("Call GitService mergedBranchs method", async () => {
      const mock = Rhum.mock(GitService).create();
      const git = new Git(mock);
      Rhum.asserts.assertEquals(mock.calls.mergedBranchs, 0);
      await git.branchDelete();
      Rhum.asserts.assertEquals(mock.calls.mergedBranchs, 1);
    });

    Rhum.testCase("Call GitService isBranchToLeave method", async () => {
      const mock = Rhum.mock(GitService).create();
      const git = new Git(mock);
      Rhum.asserts.assertEquals(mock.calls.isBranchToLeave, 0);
      await git.branchDelete();
      Rhum.asserts.assertEquals(mock.calls.isBranchToLeave, 1);
    });
  });

  Rhum.testSuite("isBranchToLeave()", () => {
    Rhum.testCase("return true if argment is main", () => {
      const gitService = new GitService();
      Rhum.asserts.assertEquals(gitService.isBranchToLeave("main"), true);
    });

    Rhum.testCase("return true if argment is master", () => {
      const gitService = new GitService();
      Rhum.asserts.assertEquals(gitService.isBranchToLeave("master"), true);
    });

    Rhum.testCase("return false if argment is other-branch", () => {
      const gitService = new GitService();
      Rhum.asserts.assertEquals(
        gitService.isBranchToLeave("other-branch"),
        false,
      );
    });
  });
});

Rhum.run();
