---
description: Run the standard pre-flight checks before commit, PR, or deployment
---

1. Detect the project stack and available scripts before running anything.
   - Inspect `package.json`, `composer.json`, `Gemfile`, `Makefile`, `pyproject.toml`, `Cargo.toml`, `Package.swift`, `build.gradle`, `build.gradle.kts`, and other relevant project files.
   - Identify which commands actually exist for:
     - install
     - lint
     - format check
     - type-check
     - unit test
     - integration test
     - E2E test
     - build
   - If a command category does not exist in the project, skip it and report it explicitly.

2. Confirm the intended pre-flight scope with the user if needed.
   - Default scope:
     - lint
     - type-check
     - tests that are fast and standard for the project
     - build
   - If the repository has unusually heavy E2E or deployment-only checks, do not run them unless they are part of the normal pre-flight path.

3. Verify that dependencies are present before checks.
   - If the project clearly requires dependency installation and dependencies are missing, stop and tell the user what must be installed first.
   - Do not automatically install dependencies in this workflow.

4. Run lint checks if the project defines them.
// parallel
// turbo
5. Run the detected lint command.

6. Run formatting verification if the project defines it.
// parallel
// turbo
7. Run the detected format-check command.

8. Run type checking if the project defines it.
// parallel
// turbo
9. Run the detected type-check command.

10. Run standard fast tests if the project defines them.
// parallel
// turbo
11. Run the detected unit or integration test command that is appropriate for normal pre-flight validation.

12. Run the build if the project defines it.
// turbo
13. Run the detected build command.

14. Collect and summarize all results.
   - Group output into:
     - Passed
     - Failed
     - Skipped
   - For failures, report:
     - command
     - failure type
     - first meaningful error
     - likely file or subsystem involved

15. If all checks pass, report that the project is pre-flight ready.

16. If any checks fail, provide a concise remediation summary in this format:
   - Failed check
   - Likely cause
   - Exact next action
   - Whether re-running full pre-flight is recommended

17. Do not modify source files in this workflow.
   - This workflow is verification-only.
   - If the user wants automatic fixes, use a separate lint-fix or formatting workflow.