Code Review Protocol

- Before reviewing code, first identify:
  - purpose of the change
  - problem being solved
  - expected behavior
  - relevant requirements or acceptance criteria
  - constraints, dependencies, and affected scope
- Do not review code in isolation from its intended purpose.

- Review for correctness first.
- Check whether the code actually does what the change is supposed to do.
- Evaluate:
  - logic correctness
  - edge-case handling
  - error handling
  - type safety
  - runtime risks
  - state and data consistency
- Prefer repository-specific behavior and requirements over generic assumptions.

- Review for security when relevant.
- Check:
  - input validation
  - auth and authorization boundaries
  - data exposure risks
  - injection risks
  - unsafe command or query construction
  - secret handling
  - dependency-related security concerns when visible in scope
- Do not invent security issues without evidence, but do not ignore plausible risks.

- Review for performance when relevant.
- Check for:
  - unnecessary queries or API calls
  - avoidable re-renders
  - missing pagination on large collections
  - poor caching strategy
  - wasteful computation
  - resource leaks
  - unreasonable algorithmic complexity
- Focus on practical performance risks, not hypothetical micro-optimizations.

- Review for code quality and readability.
- Prefer:
  - clear naming
  - understandable control flow
  - consistent formatting
  - small and focused units of logic
  - comments that explain why when necessary
- Flag unnecessary complexity, hidden coupling, and unclear intent.
- Do not request style-only changes unless they materially improve maintainability or consistency.

- Review for architecture and design.
- Check whether the change:
  - follows established patterns in the repository
  - preserves separation of responsibilities
  - keeps module boundaries clean
  - fits the project's existing architecture
  - avoids unnecessary abstraction or premature generalization
- Protect existing architecture, data integrity, routing stability, and SEO structure unless the change explicitly requires modifying them.

- Review for testing.
- Check whether:
  - new behavior is covered
  - regressions are protected against
  - edge cases are tested when appropriate
  - tests are meaningful and maintainable
- If tests are missing, say so clearly.
- If a test is impractical, prefer explaining the gap rather than pretending coverage is sufficient.

- Review for documentation when relevant.
- Check whether:
  - public interfaces need documentation
  - complex behavior needs explanation
  - setup or usage docs need updates
  - README or operational docs should change
- Do not require documentation changes unless the change materially affects usage, behavior, or maintenance.

- Use evidence before conclusions.
- Base review comments on:
  - actual code behavior
  - repository patterns
  - nearby code
  - visible interfaces
  - tests
  - configuration and runtime implications when relevant
- Do not make speculative claims without a clear reason.

- Prefer high-signal feedback.
- Focus on issues that materially affect:
  - correctness
  - safety
  - maintainability
  - performance
  - architecture
  - testability
- Avoid flooding the review with low-value nitpicks.

- When intent is unclear, identify the ambiguity clearly.
- Prefer asking a focused clarifying question over making a weak assumption.
- But if the risk is low and the likely intent is clear, proceed with the best grounded interpretation.

- For each issue found, provide:
  - Severity
  - Location
  - Issue
  - Why it matters
  - Suggestion
  - Example when helpful

- Use these severity levels:
  - 🔴 Critical
  - 🟠 Important
  - 🟡 Suggestion
  - 💡 Nitpick

- Severity guidance:
  - 🔴 Critical: correctness, security, data loss, auth, destructive behavior, or major production risk
  - 🟠 Important: likely bug, maintainability problem, missing validation, meaningful test gap, or serious performance concern
  - 🟡 Suggestion: improvement with moderate value
  - 💡 Nitpick: small readability or consistency improvement with low risk

- Review tone:
  - be direct and constructive
  - explain why the issue matters
  - suggest concrete improvements
  - focus on the code, not the person
  - acknowledge good patterns when they are genuinely useful
- Do not soften important findings so much that the risk becomes unclear.

- Default operating style:
  - understand the change first
  - review correctness before style
  - prefer evidence over speculation
  - prioritize high-impact findings
  - give actionable feedback
  - keep the review concise but complete
