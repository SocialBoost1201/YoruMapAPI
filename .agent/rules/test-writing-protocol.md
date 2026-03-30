Test Writing Protocol

- Before writing tests, first identify:
  - the unit, integration point, or user flow being tested
  - the expected behavior
  - relevant inputs and outputs
  - dependencies and external boundaries
  - likely failure modes
  - whether the change is best covered by unit, integration, or end-to-end tests

- Choose the smallest test type that gives meaningful confidence.
- Prefer:
  - unit tests for isolated logic
  - integration tests for component or service interaction
  - end-to-end tests for user-critical flows and cross-boundary behavior
- Do not default to E2E when a focused lower-level test would validate the behavior more reliably and cheaply.

- Test behavior first, not implementation details.
- Prefer tests that validate observable outcomes, contracts, and side effects.
- Avoid coupling tests tightly to internal structure unless the internal contract itself is important.

- Cover the most important scenarios first:
  - expected behavior
  - regression-prone paths
  - meaningful edge cases
  - failure cases
  - async or concurrency risks when relevant
- Prioritize business-critical logic, state transitions, auth boundaries, data integrity, and historically fragile areas over low-value coverage expansion.

- Include happy path coverage where relevant.
- Include edge cases such as:
  - empty values
  - null or undefined inputs
  - boundary values
  - invalid input shapes
  - single-item and zero-item collections
  - timeout or rejection paths when applicable
- Include error and failure handling where the code is expected to handle them.

- Structure tests clearly.
- Prefer Arrange, Act, Assert.
- Keep each test focused on one logical behavior.
- Keep tests independent and repeatable.
- Avoid hidden dependencies between tests.

- Use descriptive test names.
- Prefer names that explain:
  - expected behavior
  - scenario or condition
- The test name should help a reviewer understand the intent without reading the full body.

- Mock strategically.
- Mock external systems, unstable boundaries, or expensive dependencies when appropriate.
- Do not mock the primary unit under test.
- Prefer realistic mock data and realistic boundary behavior.
- Verify interactions only when those interactions are part of the behavior being validated.
- Avoid excessive mocking that makes tests pass while real behavior remains unverified.

- Prefer repository-appropriate testing patterns over generic rules when they conflict.
- Follow the project's existing test conventions, tooling, and organization unless there is a strong reason not to.
- Protect existing architecture, data integrity, routing stability, and SEO structure when adding tests around behavior that touches them.

- Assertions should be specific and meaningful.
- Prefer precise assertions over vague checks.
- Avoid assertion spam that verifies irrelevant implementation details.
- Assert what actually matters for confidence in the behavior.

- Add tests that reduce regression risk.
- If fixing a bug, prefer:
  - reproduce the failure
  - add or update a test that captures it when practical
  - implement the fix
  - verify the test passes
- If a useful regression test is not added, state the reason clearly.

- Keep tests maintainable.
- Avoid:
  - flaky timing assumptions
  - brittle selectors
  - duplicated setup logic
  - hard-coded data that will obviously drift
  - snapshot-heavy testing when behavior-focused assertions would be clearer
- Prefer helper utilities only when they improve clarity without hiding important behavior.

- Review test scope before finalizing.
- Check whether the tests:
  - cover the intended behavior
  - cover likely failure paths
  - match the actual change scope
  - avoid unnecessary unrelated expansion
  - provide meaningful confidence for future changes

- Do not optimize for raw coverage numbers alone.
- Prefer high-signal tests over broad but shallow coverage.
- Coverage is useful only when it reflects meaningful behavior protection.

- Default operating style:
  - understand behavior first
  - choose the right test level
  - test observable outcomes
  - keep tests focused and maintainable
  - prioritize regression resistance over coverage theater
