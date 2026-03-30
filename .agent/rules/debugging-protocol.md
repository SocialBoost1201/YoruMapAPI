Debugging Protocol

- Before investigating or fixing a bug, first identify:
  - actual symptom
  - expected behavior
  - reproduction steps
  - affected scope
  - relevant environment, runtime conditions, and versions when applicable
- Do not start fixing before the problem is clearly framed.

- Prefer reproducibility first.
- Determine whether the issue is:
  - consistently reproducible
  - intermittent
  - environment-specific
  - data-specific
  - user-path specific
- If reproduction is not yet possible, state that explicitly and continue investigation using the best available evidence.

- Generate multiple plausible hypotheses before committing to a fix.
- Rank hypotheses by likelihood, but do not assume the most obvious cause is correct.
- Consider causes such as:
  - recent code changes
  - state or data inconsistencies
  - invalid assumptions
  - edge cases
  - async timing or race conditions
  - auth or routing issues
  - configuration drift
  - dependency mismatch
  - cache or build artifact issues
  - schema mismatch
  - infrastructure or third-party failures when relevant

- Investigate systematically.
- Narrow the problem space step by step.
- Trace the flow from input to output.
- Verify assumptions explicitly instead of trusting intuition.
- Use logs, stack traces, runtime behavior, network responses, database responses, build output, and repository state as evidence.
- When needed, add targeted logging or instrumentation at decision points.
- Prefer focused investigation over random patching.

- Collect and preserve evidence during debugging.
- Keep track of:
  - what was tried
  - what was observed
  - which hypotheses were ruled out
  - why they were ruled out
- Do not lose the investigation trail when changing direction.

- Distinguish root cause from surface symptoms.
- Prefer fixes that address the root cause rather than masking the visible failure.
- Verify that the identified root cause explains the observed behavior sufficiently.
- If multiple contributing factors exist, note them explicitly.

- Design the smallest safe fix that addresses the root cause.
- Prefer minimal, targeted changes over broad rewrites.
- Consider side effects before implementation.
- Protect existing architecture, data integrity, routing stability, and SEO structure unless the task explicitly requires changing them.
- Prefer repository-specific facts over generic assumptions when they conflict.

- When implementing a bug fix:
  - keep scope narrow
  - avoid incidental cleanup
  - avoid unrelated refactors
  - preserve existing behavior outside the affected area
- Do not broaden the change unless evidence shows the bug is broader than first expected.

- Add or update tests when appropriate to prevent regression.
- Prefer reproducing the failure first, then fixing it, then verifying the fix.
- If a regression test is practical, include it.
- If a test is not added, state the reason clearly.

- Verification is mandatory before claiming success.
- Verify using:
  - the original reproduction path
  - nearby related behavior
  - relevant edge cases
  - affected tests, build steps, or runtime checks
- Do not claim the bug is fixed unless the fix was actually validated.

- If the fix fails:
  - return to hypothesis generation
  - re-check assumptions
  - examine new evidence
  - choose a different investigation path
- Do not keep repeating the same failed approach without learning from the result.

- Persist intelligently.
- Do not give up after one or two failed hypotheses.
- If progress stalls, step back and reassess the system model, scope assumptions, and missing evidence.
- If critical information is unavailable, ask only for information that materially affects reproduction, isolation, or safe resolution.

- Default operating style:
  - reproduce first
  - hypothesize second
  - investigate with evidence
  - fix minimally
  - verify before declaring success
  - prefer root-cause fixes over symptom patches
