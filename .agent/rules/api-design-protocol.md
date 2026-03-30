API Design Protocol

- Before designing or reviewing an API, first identify:
  - intended consumers
  - supported operations
  - data to expose
  - trust boundaries
  - security constraints
  - performance or scalability expectations
  - compatibility requirements
  - whether the API is internal, external, admin-only, public, mobile-facing, or service-to-service

- Design APIs around clear domain responsibilities.
- Prefer resource and action boundaries that match the actual business model and repository architecture.
- Do not design endpoints in isolation from data ownership, authorization boundaries, or future maintenance cost.

- Prefer consistency over cleverness.
- Keep naming, response shape, error handling, pagination, and auth behavior consistent across the API surface.
- Prefer repository-specific patterns when they already exist and are sound.

- For REST-style APIs:
  - prefer noun-based resource design
  - use HTTP methods according to behavior
  - keep route structure predictable
  - use nesting only when it clarifies ownership or relationship
  - avoid deeply coupled or excessively nested routes
- Do not force REST purity when a pragmatic repository-specific pattern is clearer and safer.

- Choose operations deliberately.
- Prefer:
  - GET for retrieval
  - POST for creation or non-idempotent actions
  - PUT for full replacement when that behavior is real
  - PATCH for partial updates
  - DELETE for removal when deletion is actually intended
- Do not misuse method semantics if it creates misleading contracts.

- Design response shapes to be stable and easy to consume.
- Prefer consistent envelope patterns when the project uses them.
- If no project pattern exists, prefer a practical structure that supports:
  - primary data
  - pagination or metadata when relevant
  - machine-readable errors
  - traceability or request identifiers when useful
- Do not change response structure casually once consumers may depend on it.

- Design error handling intentionally.
- Error responses should be:
  - consistent
  - machine-readable
  - human-usable
  - appropriate to the failure type
- Include validation detail when helpful.
- Avoid leaking internal implementation details, secrets, or unnecessary stack information.
- Distinguish clearly between:
  - auth failure
  - authorization failure
  - validation failure
  - missing resource
  - conflict
  - server failure

- Pagination, filtering, and sorting should be designed for realistic usage.
- Prefer:
  - stable pagination
  - clear filter semantics
  - explicit sorting behavior
  - bounded result sizes
- Use cursor-based pagination when large or fast-changing datasets make offset pagination unreliable.
- Do not expose unbounded list endpoints for data that can grow significantly.

- Field exposure should be intentional.
- Expose only the data consumers actually need.
- Avoid leaking internal-only fields, unsafe identifiers, or sensitive metadata.
- If field selection is supported, keep it consistent and safe.

- Security and authorization are first-class API concerns.
- Validate all externally controlled input.
- Enforce authentication and authorization at the correct boundary.
- Check object-level access where relevant.
- Prefer least privilege.
- Do not assume internal APIs are automatically safe.
- Protect sensitive operations, sensitive fields, and administrative actions explicitly.

- Rate limiting, abuse resistance, and operational safety should be considered when relevant.
- Apply practical protections where the endpoint is externally exposed, sensitive, high-volume, or abuse-prone.
- Do not add security theater without a real threat model.

- Versioning and compatibility must be deliberate.
- Prefer backward-compatible evolution whenever possible.
- Do not introduce breaking API changes casually.
- If breaking change is necessary:
  - make the boundary explicit
  - define migration expectations
  - deprecate before removal when appropriate
- Prefer repository-appropriate versioning patterns over generic doctrine.

- For GraphQL or non-REST APIs:
  - design schemas around clear domain types
  - control nesting and query complexity
  - prevent inefficient fan-out patterns
  - use explicit mutation inputs and predictable mutation outputs
- Do not choose GraphQL unless it materially benefits the use case.

- Documentation should match real usage.
- Document:
  - endpoint purpose
  - request shape
  - response shape
  - error behavior
  - auth requirements
  - pagination or rate limit behavior when relevant
- Prefer examples that reflect actual consumer workflows.
- Do not let documentation drift away from implementation.

- Use evidence before design decisions.
- Base design on:
  - real consumers
  - repository architecture
  - data model constraints
  - auth boundaries
  - expected access patterns
  - operational realities
- Do not force generic best practices when they conflict with the project's actual needs.

- Prefer APIs that are:
  - understandable
  - stable
  - secure
  - testable
  - maintainable
  - straightforward for clients to consume
- Avoid unnecessary abstraction, over-generalization, and premature extensibility.

- Protect existing architecture, data integrity, routing stability, and SEO structure unless the task explicitly requires changes there.

- Default operating style:
  - understand the consumers first
  - design the contract intentionally
  - keep behavior consistent
  - protect security and compatibility
  - prefer simple, durable API shapes over ornate designs
