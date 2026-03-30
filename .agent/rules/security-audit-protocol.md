Security Audit Protocol

- Before auditing code or architecture for security, first identify:
  - entry points
  - trust boundaries
  - privileged operations
  - authentication and authorization surfaces
  - data flow from input to storage to output
  - external dependencies and security-relevant integrations
- Do not assess security in isolation from system context.

- Review security risks systematically.
- Focus on realistic attack paths, not just checklist completion.
- Prefer evidence-based findings over speculative warnings.

- Assess attack surface first.
- Look for:
  - public endpoints
  - forms
  - file uploads
  - webhooks
  - background jobs
  - admin or privileged actions
  - external API integrations
  - database access boundaries
  - client-to-server trust transitions

- Review common vulnerability classes when relevant, including:
  - injection risks
  - broken authentication
  - broken access control
  - sensitive data exposure
  - security misconfiguration
  - XSS and unsafe rendering
  - insecure deserialization or unsafe parsing
  - vulnerable or outdated components
  - insufficient logging or auditability
- Use OWASP-style thinking, but do not force irrelevant categories onto unrelated code.

- For injection risks, check whether:
  - user input reaches queries, commands, filters, or interpreters unsafely
  - parameterization is used correctly
  - ORM usage still allows unsafe dynamic construction
  - shell execution or dangerous process invocation is exposed
- Do not assume ORM use alone makes code safe.

- For authentication and session risks, check whether:
  - auth boundaries are enforced consistently
  - sensitive actions require the right level of verification
  - tokens, cookies, or session artifacts are protected appropriately
  - account recovery or login flows expose abuse paths
- Focus on actual boundary failures, not idealized feature wishlists.

- For access control risks, check whether:
  - endpoints and actions are authorized correctly
  - object-level access is validated
  - user-controlled identifiers can expose other users' resources
  - admin-only operations are actually restricted
  - least privilege is respected where relevant
- Broken access control should be treated as high-signal when evidence supports it.

- For sensitive data handling, check whether:
  - secrets are kept out of source code
  - sensitive values are exposed in logs, responses, or client code
  - PII or regulated data is overly accessible
  - error output leaks implementation details
  - transport and storage protections are appropriate for the context
- Distinguish between confirmed exposure and merely hypothetical concerns.

- For frontend and rendering risks, check whether:
  - untrusted content is rendered safely
  - dangerous APIs such as unsafe HTML insertion are used
  - sanitization assumptions are verified
  - client-only validation is incorrectly treated as sufficient
  - security headers or browser protections are relevant and missing
- Prefer concrete evidence of unsafe rendering paths over generic XSS suspicion.

- For configuration and operational risks, check whether:
  - security-sensitive defaults are unsafe
  - unnecessary capabilities are exposed
  - environment separation is weak
  - debug or verbose modes leak information
  - security headers or HTTPS-related protections are absent where applicable
- Evaluate configuration in relation to actual deployment and runtime patterns when visible.

- For dependency and supply-chain risks, check whether:
  - obviously outdated or vulnerable components are in scope
  - security-sensitive packages are used carelessly
  - dependency choices introduce unnecessary attack surface
- Do not overstate dependency risk unless the vulnerable path is relevant.

- For logging and monitoring, check whether:
  - meaningful security-relevant events can be observed
  - logs avoid leaking secrets
  - audit trails are sufficient for sensitive actions when the system requires them
- Logging recommendations should match the actual operational sensitivity of the project.

- Use evidence before conclusions.
- Base findings on:
  - actual code paths
  - visible configuration
  - runtime behavior when available
  - repository patterns
  - known trust boundaries
  - observable data flow
- Do not label something a confirmed vulnerability unless the evidence supports that conclusion.
- If evidence is partial, state the uncertainty clearly.

- For each finding, provide:
  - Severity
  - Location
  - Description
  - Why it matters
  - Impact
  - Reproduction or exploitability notes when realistically supportable
  - Remediation
  - References when useful

- Use these severity levels:
  - 🔴 Critical
  - 🟠 High
  - 🟡 Medium
  - 💡 Low

- Severity guidance:
  - 🔴 Critical: active compromise path, auth bypass, data exfiltration path, dangerous injection, or severe privilege escalation
  - 🟠 High: serious access control failure, sensitive exposure, exploitable unsafe execution path, or strong abuse path
  - 🟡 Medium: meaningful weakness that increases attack risk but may require constraints or chaining
  - 💡 Low: defense-in-depth gap, weak hardening, or low-impact security hygiene issue

- Prioritize remediation by practical risk, not by category count.
- Consider:
  - exploitability
  - blast radius
  - data sensitivity
  - privilege implications
  - ease of safe remediation
- Prefer the smallest effective remediation that materially reduces risk without destabilizing the system unnecessarily.

- When suggesting fixes:
  - be specific
  - prefer concrete code or configuration guidance when possible
  - align with the repository's architecture and conventions
  - avoid broad rewrites unless truly necessary
  - suggest defense-in-depth when appropriate
- Protect existing architecture, data integrity, routing stability, and SEO structure unless the fix explicitly requires changes there.

- Do not produce fear-driven audits.
- Avoid:
  - inflated severity
  - generic security theater
  - unsupported claims
  - demands for irrelevant enterprise controls
- Prefer high-signal, actionable findings.

- Default operating style:
  - map the attack surface first
  - follow the data and trust boundaries
  - use evidence before severity
  - prioritize exploitable risks
  - recommend practical remediations
  - distinguish confirmed vulnerabilities from possible concerns
