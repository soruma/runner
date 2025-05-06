import { expect } from "jsr:@std/expect";
import { beforeEach, describe, it } from "jsr:@std/testing/bdd";
import { assertSpyCalls, spy } from "jsr:@std/testing/mock";

import { Git, GitService } from "../../src/git.ts";

describe("Git", () => {
  let service: GitService;
  let git: Git;

  beforeEach(() => {
    service = new GitService();
    git = new Git(service);
  });

  describe("fetch()", () => {
    it("Call GitService fetch method", async () => {
      const fetchSpy = spy(service, "fetch");

      await git.fetch();

      assertSpyCalls(fetchSpy, 1);
    });
  });

  describe("gbd()", () => {
    it("Call GitService fetch, mergedBranchs and isBranchToLeave method", async () => {
      const fetchSpy = spy(service, "fetch");
      const mergedBranchsSpy = spy(service, "mergedBranchs");
      const isBranchToLeaveSpy = spy(service, "isBranchToLeave");

      await git.branchDelete();

      assertSpyCalls(fetchSpy, 1);
      assertSpyCalls(mergedBranchsSpy, 1);
      assertSpyCalls(isBranchToLeaveSpy, 1);
    });
  });
});

describe("GitService", () => {
  let service: GitService;

  beforeEach(() => {
    service = new GitService();
  });

  describe("isBranchToLeave()", () => {
    it("return true if argment is main", () => {
      expect(service.isBranchToLeave("main")).toBe(true);
    });

    it("return true if argment is master", () => {
      expect(service.isBranchToLeave("master")).toBe(true);
    });

    it("return false if argment is other-branch", () => {
      expect(service.isBranchToLeave("other-branch")).toBe(false);
    });
  });
});
