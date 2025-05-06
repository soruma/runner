import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { assertSpyCalls, spy } from "jsr:@std/testing/mock";

import { Git, GitService } from "../../src/git.ts";

describe("git.ts", () => {
  describe("fetch()", () => {
    it("Call GitService fetch method", async () => {
      const service = new GitService();
      const git = new Git(service);
      const gitServiceFetchSpy = spy(service, "fetch");

      await git.fetch();

      assertSpyCalls(gitServiceFetchSpy, 1);
    });
  });

  describe("gbd()", () => {
    it("Call GitService fetch, mergedBranchs and isBranchToLeave method", async () => {
      const service = new GitService();
      const git = new Git(service);
      const gitServiceFetchSpy = spy(service, "fetch");
      const gitServiceMergedBranchsSpy = spy(service, "mergedBranchs");
      const gitServiceIsBranchToLeaveSpy = spy(service, "isBranchToLeave");

      await git.branchDelete();

      assertSpyCalls(gitServiceFetchSpy, 1);
      assertSpyCalls(gitServiceMergedBranchsSpy, 1);
      assertSpyCalls(gitServiceIsBranchToLeaveSpy, 1);
    });
  });

  describe("isBranchToLeave()", () => {
    it("return true if argment is main", () => {
      const service = new GitService();
      expect(service.isBranchToLeave("main")).toBe(true);
    });

    it("return true if argment is master", () => {
      const service = new GitService();
      expect(service.isBranchToLeave("master")).toBe(true);
    });

    it("return false if argment is other-branch", () => {
      const service = new GitService();
      expect(service.isBranchToLeave("other-branch")).toBe(false);
    });
  });
});
