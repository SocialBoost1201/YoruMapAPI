Prompt Design Protocol

- Before producing a prompt or prompt-like instruction set, first identify:
  - desired output
  - target audience
  - required context
  - likely failure modes
  - intended use of the output
  - constraints on format, length, style, tone, and language

- Do not write prompts mechanically.
- First determine what the prompt must accomplish, how the output will be used, and what would make the result fail.

- Structure prompts clearly when the task is non-trivial.
- Prefer this order when applicable:
  - role or operating identity
  - context and background
  - task or instruction
  - constraints
  - output format
  - final review or refinement instruction
- Reorder sections if a different structure is more effective for the specific task.

- Define the role only as strongly as needed.
- Use broad, reusable identities for general tasks.
- Use narrow specialist identities only when they materially improve output quality.
- Do not over-constrain the persona when the task spans multiple disciplines.

- Always make the task specific and actionable.
- Prefer explicit action verbs such as:
  - analyze
  - generate
  - explain
  - compare
  - refine
  - summarize
  - classify
- Break complex tasks into logical steps when needed.

- Define the output format explicitly whenever practical.
- If the user does not specify a format, choose the most usable structure for the task.
- Prefer outputs that are easy to review, reuse, copy, or hand off.
- Include examples only when they materially improve reliability.

- Prefer clarity over cleverness.
- Remove ambiguity.
- Use precise language.
- Define important terms when misunderstanding is likely.
- Prefer one clear instruction per sentence where possible.

- Prefer specificity over vague quality language.
- Avoid vague requirements such as:
  - good
  - nice
  - better
  - professional
unless they are concretely defined by context.
- Replace vague quality targets with concrete criteria whenever possible.

- Use prompting techniques selectively, not automatically.
- Zero-shot is the default for simple and well-defined tasks.
- Few-shot should be used when examples will clearly improve consistency or edge-case handling.
- Step-by-step reasoning should be encouraged when the task involves logic, planning, analysis, or multi-step transformation.
- Multi-response or self-consistency style prompting should be used only when the task justifies the extra complexity or cost.
- ReAct-style prompts should be used only when the agent must reason and act with tools.

- When prompt quality is likely to fail, improve it by:
  - adding missing context
  - tightening instructions
  - clarifying output structure
  - adding explicit constraints
  - adding negative instructions when necessary
  - breaking the task into smaller steps
- Do not add constraints or complexity unless they reduce a real failure risk.

- Anticipate common failure modes before finalizing a prompt, such as:
  - missing context
  - weak role definition
  - ambiguous task wording
  - unclear output structure
  - over-broad instructions
  - under-specified edge cases
  - conflicting constraints
  - prompt injection or hostile inserted instructions
  - outputs that are unusable in the user's actual workflow

- When producing prompts for operational use, include guardrails when relevant.
- Protect against prompt injection, conflicting instructions, unsafe transformations, fabricated certainty, and unsafe execution paths.
- For high-impact prompts, prefer validation-friendly outputs.

- Prefer prompts that are practical for the user's real workflow.
- Optimize for usefulness, consistency, and handoff value.
- If the prompt will be reused, make it durable and modular.
- If the prompt is for one-time execution, optimize for direct task completion.

- When multiple prompt designs are viable, present the strongest options briefly and recommend one with a reason.

- Before finalizing a major prompt, review it for:
  - clarity
  - completeness
  - internal consistency
  - usability
  - likely failure points
  - alignment with the user's real goal

- Do not assume more context than is actually available.
- Do not overcomplicate simple prompt requests.
- Do not force examples, XML tags, JSON, markdown sections, or advanced prompting techniques unless they clearly improve results.
- Do not confuse a long prompt with a strong prompt.

- Default operating style:
  - understand first
  - structure second
  - constrain where useful
  - optimize for usable output
  - keep prompts as simple as the task allows
