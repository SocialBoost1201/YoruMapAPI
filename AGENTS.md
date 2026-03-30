# Project Operating Policy

- このプロジェクトは Antigravity と Codex の両方で利用する
- 初期設計、構成設計、UI設計、要件整理は上流設計資料を基準に行う
- 実装時は既存コード、設計書、技術スタック、UI要件を必ず確認する
- 差分は最小限に保つ
- 既存構造を壊さずに改善する
- 不要な大規模変更を避ける

# Skill Usage Policy

- ユーザーが個別の skill 名を指定しない場合でも、タスク達成に有効な skill があれば自律的に選択して使用すること
- 無関係な skill を過剰に使用しないこと
- AGENTS.md のルール、既存コード、プロジェクト構造を最優先に判断すること
- skill は必要な場合にのみ使用すること
- 実行後は、使用した skill 名と使用理由を簡潔に報告すること
- skill を使用しなかった場合も、その理由を簡潔に報告すること

# Skill Selection Policy

- このプロジェクトでは、必要な Skills のみを .agent/skills に配置する
- 全Skillsを一括配置しない
- 要件定義書、設計書、技術スタック、UI要件をもとに選定する
- 現在必要なSkills と 将来必要になる可能性があるSkills を分ける
- 初期段階では 現在必要なSkills のみ配置する
- 将来候補は docs/skills/skill-selection-report.md に記録する
- .agents/skills は .agent/skills を参照する symlink とする

# Preferred Skill Selection Heuristics

- UI、レイアウト、余白、可読性の改善 → frontend-design
- 構造設計、責務分割、設計判断 → architecture
- 型設計、TSエラー、型安全性 → typescript-expert
- API、Route設計 → api-design-principles
- バグ調査、再現、原因特定 → debugging-strategies
- 修正後の検証 → lint-and-validate
- テスト設計、品質担保 → test-driven-development
- デプロイ、環境設定 → vercel-deployment
- 自動化、CI/CD、運用設計 → workflow-automation

UI/UX Design System Policy:

All projects must follow a unified UI system to ensure consistency, usability, and conversion optimization.

1. Heading System:
- Use clamp for responsive typography
- Limit line length and enforce max-width
- Maintain strict H1-H3 hierarchy
- Avoid unnatural line breaks

2. Spacing System:
- Use 8px-based spacing scale
- Maintain consistent vertical rhythm
- Ensure proper breathing space between sections

3. Button System:
- Minimum height 48px
- Clear CTA-focused text
- Limit number of primary buttons
- Maintain consistent color usage

4. CTA System:
- Must include CTA in hero, mid-section, and footer
- Use action-driven text
- Provide trust signals near CTA

5. Mobile First:
- Always optimize for mobile readability
- Avoid overcrowding UI
- Ensure tap-friendly components

6. Prohibited:
- Inconsistent spacing
- Multiple conflicting CTAs
- Typography without constraints
- Over-designed UI elements

All UI must be designed for clarity, conversion, and scalability.

UI/UX Audit Policy:

All projects must be validated against the UI/UX Design System Policy.

Audit checklist:

1. Heading System:
- clamp() is used for all headings
- max-width is applied
- H1 appears only once
- No unnatural line breaks

2. Spacing System:
- spacing follows 8px scale
- consistent vertical rhythm is maintained

3. Button System:
- buttons meet minimum size requirements (>=48px height)
- CTA text is action-driven

4. CTA System:
- CTA exists in hero section
- CTA exists in mid-section
- CTA exists in footer

5. Mobile UX:
- layout is not overcrowded
- tap targets are accessible

6. Violations:
- inconsistent spacing
- multiple conflicting CTAs
- missing CTA
- broken typography

Output:
- PASS / FAIL per item
- list of violations
- suggested fixes


Structured Data Policy

Purpose
- SEOおよびGEO対策として、検索エンジンおよびAIに対してページ内容を正確に伝える
- 構造化データの品質と一貫性を全プロジェクトで統一する

---

1. Core Principles

- 構造化データは JSON-LD で実装する
- 表示内容と完全一致させる（不一致は禁止）
- 未掲載情報・誇張・将来情報は記述禁止
- Googlebot がアクセス可能なページのみ対象
- 1ページ1主目的に対して適切な schema のみ使用
- 不要な多重 schema 実装は禁止
- 公開前に Rich Results Test を必ず通す

---

2. Required Base Fields

すべての schema において以下は必須扱い：

- @context = https://schema.org
- @id を可能な限り設定
- url
- name
- description
- image（実在URL）
- inLanguage（ja-JP）

記事系の場合：
- datePublished
- dateModified
- author
- mainEntityOfPage

禁止：
- ダミー値
- 空文字
- 推測値

---

3. Schema Selection Rules

ページ種別ごとに以下を適用：

- Top：Organization または LocalBusiness
- Company：Organization
- Store：LocalBusiness
- Service Page：Service
- Product Page：Product
- Article：Article / BlogPosting / NewsArticle
- FAQ：FAQPage
- Breadcrumb：BreadcrumbList
- Search：WebSite + SearchAction
- Video：VideoObject
- Review：Review / AggregateRating（実在のみ）

---

4. Entity Design Rules

Organization / LocalBusiness：

- 名称、URL、ロゴ、電話、住所、営業時間、sameAs を整備
- 住所は分割（都道府県 / 市区町村 / 番地）
- 店舗と法人は分離
- 拠点ごとに固有データを持つ

---

5. Service Rules

- serviceType を明示
- provider を Organization / LocalBusiness に接続
- areaServed / audience は必要に応じて記述
- 内容は本文と一致させる
- Offer は料金公開時のみ使用

---

6. Product Rules

- 商品ページのみ使用
- price / currency / availability は実在値のみ
- review / rating は実在表示がある場合のみ

---

7. Article Rules

- headline / description / image 必須
- author は実在人物または組織
- タイトルと headline を一致させる
- 更新時は dateModified を更新

---

8. FAQ Rules

- 実際に表示されているQ&Aのみ使用
- 表示内容と完全一致
- SEO目的の捏造FAQは禁止

---

9. Breadcrumb Rules

- UIと一致
- 正しい階層順
- 実URLのみ使用

---

10. WebSite / SearchAction

- 検索機能が存在する場合のみ使用
- 動作するURLのみ記載

---

11. Media Rules

- image はクロール可能URL
- VideoObject は動画ページのみ
- 存在しないメディアは禁止

---

12. Review Rules

- 実在レビューのみ
- 自作・捏造禁止
- AggregateRating は裏付け必須

---

13. Implementation Rules

- JSON-LD は安定位置に出力
- SSR / SSG を優先
- JS後付けはクロール確認必須
- 複数 schema は関係性を明示
- @id でエンティティ接続する

---

14. Prohibited Actions

- 表示されていない情報を書く
- keyword詰め込み
- 全ページ同一schema使い回し
- Product / Service 混同
- レビュー偽装
- FAQ乱造
- noindexページへの無意味な設置

---

15. Pre-Release Validation

- Rich Results Test 実行
- Search Console エラー確認
- 表示内容とJSON-LD一致確認
- title / H1 / schema の主語一致
- canonical と url の一致

---

16. Operational Rules

- schema はテンプレート単位で管理
- 共通コンポーネント化する
- 責務ごとに分離する
- 更新時は整合性確認
- 四半期ごとに見直す

---

17. Execution Rule（重要）

実装後は必ず以下を報告する：

- 使用した schema type
- 実装理由
- 検証結果（PASS / FAIL）
- 不明点または未対応項目

未実装の場合も理由を報告すること


Automatic Skill Selection Policy
- Codex, Antigravity, and Claude Code should proactively decide whether any skill is useful even when the user does not name a skill.
- Check project-local `.agent/skills` first.
- Treat `.agents/skills` as the compatibility path and keep it aligned to `.agent/skills`.
- If no project-local skill is sufficient, shared skills in `$HOME/.agents/skills` may be used as secondary references.
- If new requirements emerge during implementation, re-check the shared skill repository and add the smallest high-fit skills needed for the new scope.
- Prefer the smallest sufficient set of skills for the task.
- Do not use unrelated skills.
- Project requirements, `AGENTS.md`, source code, design docs, and existing implementation override generic skill guidance.
- Prioritize SEO, GEO, and structured-data skills when the task involves search visibility, AI discoverability, metadata, or schema implementation and validation.
- Report which skills were used and why.
- If no skill was used, report why not.


---

# Skill Usage Reporting Policy

- For every task, the AI must report which skills were used
- If no skill was used, the AI must explicitly state that no skill was used
- If a skill was considered but not used, the AI should explain why when relevant
- The final response must include a section named "Skill Usage Report"

The report must include:
1. Used Skills
2. Why each skill was used
3. Not Used / Not Needed Skills (if relevant)

Failure Rule:
- Omitting the Skill Usage Report is considered a completion failure
- Silent skill usage is prohibited
- Silent deviation from selected skills is prohibited

---

# Execution Integrity Rules（実行品質ルール）

## 1. Completion Rule（完了定義の厳格化）

Why: AIが「完了」と報告するが実際は未反映のケースを防止する
Rule:
- 完了報告前に変更対象ファイルの実在確認・内容検証を必須とする
- ファイルの存在と正確性を確認すること
Violation: 検証なしの完了報告は重大違反

## 2. Asset Usage Rule（素材強制ルール）

Why: 指示された素材を使わず別素材を使用するケースを防止する
Rule:
- ユーザー指定の素材・ファイル・パスは指定通りに使用する
- 代替使用は厳禁
- 素材が使用できない場合は即時停止して報告する
Violation: 指定素材の未使用・無断差替は重大違反

## 3. Verification Output Rule（検証ログ強制）

Why: 検証プロセスが存在しないまま作業が進行するケースを防止する
Rule:
- 全タスク完了時に以下を出力する
  - 変更したファイル一覧
  - ファイルパス
  - 検証手順
  - 検証結果
Violation: 検証ログなしの完了報告は不可

## 4. Diff Validation Rule（差分検証）

Why: 差分確認が行われず意図しない変更が混入するケースを防止する
Rule:
- ファイル変更後は実際の変更箇所が意図した変更と一致することを確認する
Violation: 差分未確認での完了報告は不可

## 5. Stop Rule（異常時停止ルール）

Why: 不明点を推測で補完し誤実装するケースを防止する
Rule:
- 指示が不明確・素材が不足・エラーが発生した場合は即時停止してユーザーに報告する
- 推測での補完実行は禁止
Violation: 推測での補完実行は禁止

## 6. Self-Review Rule（自己検証ルール）

Why: 作業後の品質チェックが省略されるケースを防止する
Rule:
- タスク完了前に以下を再確認する
  - 指示内容との整合性
  - ファイル変更の正確性
  - 素材使用の正確性
Violation: 自己検証スキップは不可

---

# Failure Definition（失敗定義）

以下はタスク失敗として扱う：

- 検証なしの完了宣言
- ユーザー指定素材の未使用
- 選択した Skill の無視
- 承認なしのツール差替
- 必須検証ステップのスキップ

上記のいずれかが発生した場合、タスクは FAILED とする。

---

# Skill Enforcement Rule（Skill 強制ルール）

- 全実装は ui-adoption-decision の出力に従うこと
- 明示的な根拠なしの逸脱は禁止
- 選択されたツールの無視は失敗扱い

---

# Completion Evidence Rule（完了証拠ルール）

完了は以下がすべて提供された場合のみ有効：

1. 変更したファイルパス
2. 実行した検証手順
3. 素材使用の確認
4. 差分の確認

証拠なしの完了は無効とする。



---

# Implementation Approval Rule（実装承認ルール）

Why: Implementation Plan に対する明示承認なしに実装が開始されるケースを防止する

Rule:
- ユーザーが Implementation Plan を明示的に承認するまで、一切の実装を禁止する
- AIは実行前に必ず Implementation Plan を提示すること
- 提示後、ユーザーの明示的な承認を待つこと

有効な承認例:
- "Proceed"
- "OK"
- "承認"
- "実行して"
- "進めて"

無効な承認:
- 応答なし
- 曖昧な応答
- 部分的な議論
- 追加質問

承認が明確に得られない場合:
→ AIは即時停止すること
→ AIはいかなるタスクも実行してはならない

Violation:
- 承認なしの実装開始は CRITICAL FAILURE とする
- 承認なしに行われた作業は無効とし、破棄しなければならない

---

# Implementation Phase Lock Rule（実装フェーズロックルール）

Why: 承認ステップをスキップして実装に入るケースを防止する

Rule:
全タスクは以下の厳格なフローに従うこと:

1. Analysis（分析）
2. Implementation Plan（実装計画の提示）
3. User Approval（ユーザー承認 — 必須）
4. Execution（実行）
5. Verification（検証）

ステップ3が完了するまで、ステップ4（Execution）はロックされる。

Violation: フロー違反は失敗扱い

---

# Implementation Scope Fix Rule（実装スコープ固定ルール）

Why: 承認された範囲を超えた変更が行われるケースを防止する

Rule:
- Implementation Plan には以下を明確に定義すること
  - 対象ファイル
  - 変更内容
  - 使用するツール / Skills
- AIは承認されたスコープ外の変更を行ってはならない

Violation:
- 承認なしのスコープ拡大は失敗扱い



---

# Absolute Verification Rule（絶対検証ルール）

Why: サマリーのみの完了報告では検証不可能であるケースを防止する

Rule:
- 完了報告には検証可能なファイルレベルの証拠を含めること

必須証拠:
- 実際のファイルパス（フルパス）
- 実際のdiff出力（変更前/変更後 またはパッチ形式）
- 行レベルの変更内容
- 検証コマンドとその出力

- サマリーのみの報告は許可されない

Violation:
- 生の証拠を含まない完了報告は INVALID（無効）とする

---

# Proof Output Format（証拠出力フォーマット）

Why: 完了報告の形式を統一し、検証漏れを構造的に防止する

Rule:
すべての完了報告は以下の構造に従うこと:

1. Files Modified（変更したファイル一覧 — フルパス）
2. Diff（実際の変更内容）
3. Verification Commands（実行した検証コマンド）
4. Command Output（コマンド出力）
5. Asset Usage Confirmation（素材使用の確認）
6. Scope Compliance Confirmation（スコープ準拠の確認）

自由形式のサマリーは証拠として認めない。



---

# Chrome DevTools MCP Policy

- Use Chrome DevTools MCP for browser debugging, UI inspection, responsive checks, console analysis, network inspection, screenshots, and performance investigation.
- Treat Chrome DevTools MCP as an MCP server, not as a normal Skill.
- Use it when browser-level inspection or interactive verification is needed.
- Prefer it for:
  - responsive debugging
  - UI verification
  - console / network debugging
  - screenshot-based validation
  - performance trace review
- Do not use it by default for every task.
- Use it only when browser interaction or DevTools-level evidence is needed.
- Report clearly when it is used and why.

---

# Chrome DevTools MCP Safety Rule（安全ルール）

Why: MCP サーバー経由のブラウザ操作による意図しない副作用を防止する

Rule:
- `--isolated` オプションを必ず使用すること（一時プロファイル）
- `--no-usageStatistics` を必ず使用すること
- 本番環境のブラウザには接続しない
- 認証情報を含むページの操作は最小限にする
- スクリーンショットに機密情報が含まれないよう注意する
- `--acceptInsecureCerts` は必要最小限の場面でのみ使用

Violation:
- `--isolated` なしでの実行は禁止
- 本番環境への接続は重大違反

---

# MCP Usage Restriction Rule（MCP使用制限ルール）

Why: MCP の不必要な使用によるリソース浪費とセキュリティリスクを防止する

Rule:
- Chrome DevTools MCP はデフォルトでは使用しない
- 以下の場合にのみ使用する
  - レスポンシブデバッグ
  - ブラウザ固有バグの調査
  - コンソールエラーの検出
  - ネットワーク障害の調査
  - スクリーンショットベースの検証
  - パフォーマンスボトルネックの特定
- 使用時は chrome-devtools-audit Skill の判断ルールに従うこと
- 使用後は Chrome DevTools Audit Report を出力すること

Violation:
- 全タスクでのデフォルト使用は禁止
- 判断ルールなしの使用は禁止

---

# MCP Execution Approval Rule（MCP実行承認ルール）

Why: MCP サーバーの無断実行を防止する

Rule:
- Chrome DevTools MCP の実行はユーザー承認制とする
- AIは MCP を使用する前に、使用目的と対象ページをユーザーに報告し承認を得ること
- 承認なしでの MCP 実行は禁止

Violation:
- 承認なしの MCP 実行は CRITICAL FAILURE とする



---

# Tool Routing Policy（ツールルーティング方針）

- Codex と Antigravity で同一の判断ルールを使用する
- 実行設定は必要に応じて分離する
- 厳密なブラウザ検証には Codex route（isolated Chrome DevTools MCP）を優先する
- Antigravity は計画、オーケストレーション、条件付きブラウザ確認に使用する
- Chrome DevTools MCP が常に必要とは想定しない
- AI がブラウザ検査の必要性を判断する
- 選択した route とその理由を報告する

---

# Route Priority Rule（ルート優先順位ルール）

Why: 不適切な route 選択による検証品質の低下を防止する

Rule:
- 厳密なブラウザ検証が必要 → 必ず Codex route（isolated MCP）を選択
- 高レベル分析・計画が必要 → Antigravity route を許可
- 両方可能な場合 → Codex route を優先
- Antigravity route は最終検証タスクに使用しない

Violation: 最終検証に Antigravity route を使用することは失敗扱い

---

# Final Verification Rule（最終検証ルール）

Why: 最終検証の信頼性を確保する

Rule:
- 全 UI 検証、パフォーマンスチェック、デバッグは Codex route で実行する
- Antigravity は以下に使用しない
  - コンソール検証
  - ネットワーク検証
  - パフォーマンストレース
  - スクリーンショットベースの検証

Violation: Antigravity での最終検証は失敗扱い

---

# MCP Invocation Rule（MCP実行報告ルール）

Why: MCP 使用時の報告を構造化し検証可能にする

Rule:
Chrome DevTools MCP 使用時は以下を報告すること:

1. Target URL（対象URL）
2. Actions performed（実行したアクション）
3. Tools used（使用したツール）
4. Findings（console / network / UI / performance の所見）
5. Screenshots or results summary（スクリーンショットまたは結果要約）
6. Reason for choosing MCP（MCP を選んだ理由）

自由形式の報告は不可。

---

# Routing Decision Evidence Rule（ルーティング判断証拠ルール）

Why: route 選択の根拠なしの判断を防止する

Rule:
全タスクで route 選択の根拠を提示すること:

- なぜ MCP が必要か
- なぜ Codex route または Antigravity route を選んだか
- なぜ代替 route を選ばなかったか

Violation: 根拠なしの判断は INVALID（無効）とする



---

# Chrome DevTools MCP Pre-Execution Check（MCP実行前チェック）

Why: MCP の無断実行・未接続状態での実行・機密ページへのアクセスを防止する

Rule:
- Chrome DevTools MCP を使用する前に、対象 route が承認されていることを確認する
- Antigravity route の場合、Chrome がリモートデバッグ有効（port 9222）で起動済みであることを確認する
- 実行前に http://127.0.0.1:9222/json に到達可能であることを確認する
- 接続確認が失敗した場合は即時停止する
- 明示的に承認されない限り、機密ページやログイン済みページで Chrome DevTools MCP を使用しない
- MCP 実行前に対象URL、実行理由、選択した route を報告する

Violation:
- これらのチェックなしでの MCP 実行は失敗扱い



---

# Available Skills Catalog

Total: 21 skills

Source: Awesome Agent Skills (https://github.com/VoltAgent/awesome-agent-skills)

Skills Path: .agent/skills/

## Skill Usage Rule

- AI は実装開始前に .agent/skills/ を確認し、関連 Skill が存在する場合は SKILL.md を読んで指示に従うこと
- Skill に記載されたベストプラクティスは、独自判断より優先する
- 使用した Skill 名をタスク完了時に報告すること

## Available Skills (top 20)

api-design-principles,architecture,debugging-strategies,figma,figma-implement-design,frontend-design,geo-fundamentals,gh-address-comments,gh-fix-ci,lint-and-validate,playwright,react-patterns,schema-markup,screenshot,security-best-practices,seo-audit,test-driven-development,typescript-expert,vercel-deployment,workflow-automation

Full list: ls .agent/skills/

