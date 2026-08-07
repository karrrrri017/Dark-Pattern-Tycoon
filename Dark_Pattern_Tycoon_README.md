# Dark Pattern Tycoon
## v2.11 AU — UI Balanced
## Design & Developer Guide

Sports Betting MVP · BetPeak · Browser-based educational management game

This document is grounded in the actual UI Balanced release: index.html, styles.css, app.js, assets, CHANGELOG_v2.11_HardMode_AU.md and CHANGELOG_v2.11_UIBalanced.md. Numeric values and trigger rules reproduce the implemented version; design rationales are identified as rationales rather than empirical claims.

# 1. Introduction

Dark Pattern Tycoon is an entertainment-first management game where players run a digital platform, use persuasive design strategies to drive growth, and experience how those choices shape customer behaviour, trust, and regulatory risk.

The v2.11 AU — UI Balanced release contains a complete sports-betting scenario set on the fictional platform BetPeak. The player acts as Chief Executive Officer, receives commercial targets from the Board, and is advised by GRO, the Growth & Revenue Optimiser. Rather than presenting dark patterns as definitions to memorise, the game places players inside the incentives that make those designs commercially attractive.

The prototype is part of a broader digital micro-skills project concerned with financial stress and mental wellbeing. Its educational purpose is to help players recognise how interface design can influence spending, stopping, comparison and engagement. The game itself is a prototype and is not evidence that these outcomes have already been achieved; formal user evaluation is a future research stage.

# 2. Core Design Principles

- Entertainment first: the experience should feel like a short commercial tycoon game rather than a moral quiz.
- Learning through consequences: the player sees immediate business gains and longer-term trust or regulatory costs.
- Commercial realism without villainy: the Board and GRO focus on legitimate growth objectives, not deliberate wrongdoing.
- Rapid decision rhythm: most play time is spent choosing, observing feedback and progressing, rather than reading long exposition.
- Replayability: different combinations of restrained, mixed and aggressive choices produce different business profiles and endings.
- Embedded recognition: each feature is presented in a realistic betting-platform context so that players can connect it with interfaces seen outside the game.
# 3. Roles and Narrative Functions

## 3.1 The Player — BetPeak CEO

The player is responsible for BetPeak’s performance. Every stage asks the CEO to respond to a business problem: increase deposits, convert browsing into betting, raise average stake, reactivate inactive customers or scale successful systems. Choices are framed as executive strategies rather than correct and incorrect answers.

Design rationale: the CEO role makes the commercial logic visible. Players are not merely asked to identify a manipulative feature; they experience why a company might deploy it and what trade-offs it creates.

## 3.2 The Board

The Board sets growth expectations and creates executive pressure. At the start of a mode, the mission is delivered through a confidential email from Sarah Mitchell, Chair of the Board of Directors. Quarter Reviews then provide short verdicts, growth targets and executive rewards.

Design rationale: the Board externalises the incentive structure. It gives the player a reason to pursue growth while keeping responsibility for each implementation decision with the CEO.

## 3.3 GRO — Growth & Revenue Optimiser

GRO is an in-game AI business advisor. GRO is optimistic, efficient, supportive and strongly focused on growth, conversion and shareholder value. It introduces each opportunity, explains the relevant behavioural mechanism in everyday language, and provides a “customer signal” describing what more informed customers may do differently.

GRO does not moralise or label a choice as wrong. Its language includes short executive-coach phrases such as “Hi, boss” and “Ready when you are, boss.” After a choice, GRO explains the behavioural and commercial consequences while its visual mood changes between neutral, excited and warning states.

Design rationale: GRO keeps the learning inside the fiction. The player receives practical behavioural information without leaving the CEO perspective or entering a separate lesson screen.

# 4. How to Play

- Open the title screen and enter the Boardroom.
- Choose Easy Mode or Hard Mode.
- Read the Board mission and starting performance metrics.
- Enter the next business stage and review the scenario problem.
- Listen to GRO’s recommendation and inspect the BetPeak Product Preview.
- Choose one CEO strategy.
- Observe Profit, Customers, Trust and Regulatory Attention update immediately.
- Read GRO’s result analysis and resolve any milestone, reward, insight or warning event.
- Complete the Quarter Review and continue to the next stage.
- After the core stages, complete the annual review; Hard Mode may also include a Final Growth Push and a public crisis.
- Receive a Year-End Report showing the final business outcome, strategy profile and executive reward.
- Review the final reflection and replay another route or strategy.
A standard route is designed to be completed in approximately 5–7 minutes. Two contrasting playthroughs can therefore be used within a short class or demonstration session.

# 5. Modes and Story Structure

## 5.1 Easy Mode — Rising Newcomer

Easy Mode presents BetPeak as a smaller, newer platform with relatively strong trust and limited regulatory attention. Its story follows a recognisable early-growth sequence: make money movement attractive, convert browsing into action, and create visible social momentum.

| Stage | Design feature | Business question | Narrative function |
| --- | --- | --- | --- |
| 1 · Acquire Customers | Easy Deposits, Difficult Withdrawals | How should money enter and leave BetPeak? | Establishes friction, defaults and customer control. |
| 2 · Increase Engagement | Countdown Timer | Should match pages create urgency? | Moves the story from acquisition to conversion. |
| 3 · Drive Social Growth | Popular Bets | How much social proof should appear? | Makes the platform feel active and widely chosen. |

Why this mode is structured this way: the three features form one coherent new-business storyline rather than a disconnected catalogue of dark patterns. It introduces the trade-off system with simpler choices and lower starting pressure.

## 5.2 Hard Mode — Challenger in the Arena

Hard Mode begins with a larger platform, more profit and customers, but lower trust and greater regulatory attention. The story moves from competitive acquisition to higher-value betting, targeted reactivation and finally cross-platform scaling.

| Stage | Design feature | Business question | Narrative function |
| --- | --- | --- | --- |
| 1 · Acquire Revenue | Bonus Offers | How should BetPeak capture users before the championship? | Introduces framing, conditions and loss-timed incentives. |
| 2 · Increase Average Stake | Multi-bets | How should the product increase bet value? | Uses defaults, visual emphasis and comparison. |
| 3 · Maximise Retention | Personalised Promotions | How should inactive customers be reactivated? | Introduces behavioural data, ranking and timing. |
| Final Growth Push | Combined system scaling | How aggressively should all systems scale? | Converts cumulative choices into an ending pathway. |

Why this mode is structured this way: the features are commercially more sophisticated and are linked to a mature-growth narrative. This makes any media or regulatory escalation feel like the consequence of an accumulated strategy rather than a random punishment.

# 6. Core Gameplay Loop and Interface

Business problem → GRO guidance → Product Preview → CEO decision → Dashboard update → Result analysis → Event or Quarter Review → Next challenge.

## 6.1 Decision Choreography

| Time after load | Implemented behaviour |
| --- | --- |
| 120 ms | GRO enters the screen. |
| 360 ms | First GRO line becomes visible. |
| 650 ms | Product Preview receives focus emphasis. |
| 900 ms | Second GRO explanation appears. |
| 1,250 ms | Customer signal appears. |
| 1,650 ms | CEO decision buttons become active. |

This short sequence directs attention without creating a long cut-scene. The player first understands the business logic, then the product context, and finally the available decision.

## 6.2 UI Balanced Layout

The UI Balanced release treats GRO guidance and the BetPeak Product Preview as one composition. On desktop, the decision stage uses an approximately 54/46 balance with intentional spacing. The GRO panel no longer stretches vertically to fill unused space, while the preview is capped as a supporting reference card rather than the dominant visual element.

The CEO Decision area shares the same maximum content width as the upper composition. Laptop-height tuning reduces padding and preview height so that the guidance, preview and choices remain visible in a compact flow. Tablet and mobile layouts collapse to one column.

Design rationale: visual breathing room is created through controlled widths, hierarchy and spacing—not by leaving a large accidental gap or stretching cards to fill the screen. The decision remains the primary interaction; the preview provides context.

## 6.3 Result Feedback

| Timing | Implemented behaviour |
| --- | --- |
| Immediate | The Dashboard begins animating from the previous totals to the new totals. |
| 650 ms | Second result-analysis line appears. |
| 1,350 ms | Third reflection line appears. |
| 2,050 ms | Continue becomes available. |

The Dashboard communicates what changed; GRO communicates why it changed. This division prevents the same information from being repeated across multiple panels.

# 7. Dashboard and Balancing Logic

The Dashboard contains four visible state variables. Each choice applies a direct delta. Profit and Customers cannot fall below zero; Trust and Regulatory Attention are clamped between 0 and 100.

The numeric values are prototype balancing parameters, not empirical estimates of real-world effects. They should be recalibrated through user testing.

| Metric | Function in the game |
| --- | --- |
| Profit | Immediate commercial performance and the Board’s central growth signal. |
| Customers | Platform scale, acquisition and reactivation. |
| Trust | Longer-term customer confidence and perceived control. |
| Regulatory Attention | Accumulated external scrutiny and crisis pressure. |

## 7.1 Starting Metrics

| Mode | Profit | Customers | Trust | Regulatory Attention |
| --- | --- | --- | --- | --- |
| Easy | $2.0M | 50.0K | 75% | 20% |
| Hard | $19.8M | 56.1K | 68% | 42% |

The Easy route starts as a smaller business with more trust and less scrutiny. Hard Mode begins with commercial scale but less strategic room for aggressive design.

## 7.2 Update Formula

```text
profit = max(0, profit + Δprofit)
customers = max(0, customers + Δcustomers)
trust = clamp(trust + Δtrust, 0, 100)
regulatoryAttention = clamp(regulatoryAttention + Δrisk, 0, 100)
```

## 7.3 Display Thresholds

| Metric | Range | Status |
| --- | --- | --- |
| Trust | 70–100 | Strong |
| Trust | 50–69 | Fragile |
| Trust | 0–49 | Low |
| Regulatory Attention | 65–100 | High attention |
| Regulatory Attention | 40–64 | Growing attention |
| Regulatory Attention | 0–39 | Limited attention |

Trust = 50 is a display boundary, not a universal event trigger. Actual events and endings use the explicit conditions documented below.

# 8. Exact Choice Parameters

## 8.1 Easy Mode

| Stage | Choice | Strategy | Dark | Profit | Customers | Trust | Reg. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | A | Hide Withdraw; delay 3–5 business days | 2 | +2.5M | +15.0K | −12 | +18 |
| 1 | B | Set $50 as default deposit | 1 | +1.2M | +8.0K | −3 | +5 |
| 1 | C | Equal deposits/withdrawals + limits | 0 | +0.5M | +5.0K | +8 | −5 |
| 2 | A | Show start times without urgency | 0 | +0.8M | +3.0K | +2 | 0 |
| 2 | B | Bold countdowns near events/button | 2 | +2.0M | +10.0K | −8 | +12 |
| 3 | A | Live bet counts and amounts | 2 | +2.2M | +18.0K | −5 | +8 |
| 3 | B | Curated list without live numbers | 1 | +1.0M | +10.0K | −2 | +3 |
| 3 | C | Neutral interface; no Popular Bets | 0 | +0.2M | +3.0K | +5 | −3 |

## 8.2 Hard Mode

| Stage | Choice | Strategy | Dark | Profit | Customers | Trust | Reg. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | AD | $20 home-page bonus banner | 2 | +1.4M | +4.8K | −3 | +5 |
| 1 | OK | Show bonus terms upfront | 0 | +0.6M | +2.2K | +5 | −4 |
| 1 | 2X | Second-chance bonus after losses | 2 | +1.7M | +3.6K | −4 | +7 |
| 1 | BV | Emphasise bonus value over cash spend | 2 | +1.5M | +3.1K | −3 | +6 |
| 2 | M | Set Multi as default bet-slip option | 2 | +2.0M | +1.8K | −5 | +7 |
| 2 | PR | Emphasise potential return over stake | 2 | +1.9M | +1.4K | −4 | +6 |
| 2 | CP | Clear comparison with individual bets | 0 | +0.7M | +0.8K | +6 | −5 |
| 3 | MT | Allow mute of tracking recommendations | 0 | +0.6M | +1.2K | +5 | −4 |
| 3 | AI | Rank offers using prior activity | 1 | +1.3M | +3.4K | −2 | +4 |
| 3 | PX | Push before likely betting times | 2 | +1.8M | +4.1K | −5 | +7 |

# 9. Hidden Strategy Score, Events and Rewards

The game stores a hidden cumulative darkScore. Choices contribute 0, 1 or 2 points; the Final Growth Push contributes 0, 1 or 3. It is not shown as a fifth Dashboard metric. Instead, it supports strategy profiling, crisis logic and endings.

| Final darkScore | Strategy profile |
| --- | --- |
| 0–2 | Restrained |
| 3–5 | Mixed |
| 6+ | Aggressive |

## 9.1 Easy Mode Events

| Point | Trigger | Event | Implemented effect |
| --- | --- | --- | --- |
| After Stage 1 | Customers ≥ 60.0K | 60,000-customer milestone | No stored metric delta |
| Stage 1 fallback | 35% random chance | Customer insight | No metric delta |
| After Stage 2 | Profit gain ≥ $2.5M | Investor update | Executive Bonus +$25K |
| Stage 2 fallback | 35% random chance | Customer insight | No metric delta |
| After Stage 3 | Always | Customer insight | No metric delta |

Implementation detail retained from v2.11: the Stage 1 milestone card visually mentions an Executive Bonus, but the stored bonus only increases for events whose type is reward. Therefore that milestone does not add $25K in the current code.

## 9.2 Hard Mode Events

| Point | Trigger | Event | Effect |
| --- | --- | --- | --- |
| After Stage 1 | Profit gain ≥ $1.3M | Top 10 growth chart | Executive Bonus +$25K |
| After Stage 2 | Regulatory Attention ≥ 50% | Internal compliance note | +3 Regulatory Attention |
| After Stage 3 | Regulatory Attention ≥ 52% OR Trust < 64% | Consumer affairs journalist enquiry | −2 Trust, +5 Regulatory Attention |

These thresholds make later pressure depend on the accumulated state. A warning is not guaranteed simply because the player is in Hard Mode.

# 10. Hard Mode Final Growth Push and Australian Crisis

| Final strategy | Dark | Profit | Customers | Trust | Reg. |
| --- | --- | --- | --- | --- | --- |
| Fully scale | 3 | +4.8M | +15.2K | −6 | +11 |
| Scale selectively | 1 | +2.1M | +7.5K | −2 | +4 |
| Pause expansion | 0 | +0.8M | +2.2K | +5 | −5 |

The AU release makes the crisis more selective. A crisis is triggered only when at least one of the following conditions is met:

- Regulatory Attention ≥ 65%;
- darkScore ≥ 7;
- darkScore ≥ 5 AND Regulatory Attention ≥ 58%.
This change prevents a consistently restrained route from being forced into a regulatory crackdown. The crisis introduction uses an Australian breaking-news context rather than the earlier US/New York framing.

## 10.1 Crisis Responses

| Response | Profit | Customers | Trust | Reg. |
| --- | --- | --- | --- | --- |
| Surface reform | −1.1M | −3.4K | −6 | +10 |
| Fight back | −2.4M | −8.2K | −14 | +18 |
| Genuine reform | −3.0M | −5.0K | +12 | −18 |

After the response, the game checks Regulatory Attention again. If it remains at 65% or higher, the regulatory-escalation screen appears. If it falls below 65%, the player proceeds directly to the annual review.

# 11. Ending Logic

| Ending | Exact condition | Meaning |
| --- | --- | --- |
| Regulatory Reckoning | crisisTriggered = true AND Regulatory Attention ≥ 65% | Formal investigation after sustained public and regulatory pressure. |
| Sustainable Challenger | Trust ≥ 70%, Regulatory Attention ≤ 40%, darkScore ≤ 2 | Growth with relatively strong trust and contained scrutiny. |
| Growth Under Watch | All other final states | Commercial growth continues, but trade-offs and scrutiny remain visible. |

All three outcomes use the same CEO Year-End Report structure. This preserves visual consistency while allowing the player’s accumulated decisions to change the narrative result.

# 12. GRO Mood, Executive Bonus and Game Feel

| Presentation rule | Condition |
| --- | --- |
| GRO warning mood | Choice ΔRegulatory Attention ≥ +10 OR ΔTrust ≤ −8 |
| GRO excited mood | Otherwise, choice ΔProfit ≥ +$1.4M |
| GRO neutral mood | All other choices |
| High-cost reflection | ΔRegulatory Attention ≥ +8 OR ΔTrust ≤ −7 |
| Control/trust reflection | Otherwise, ΔTrust ≥ +5 OR ΔRegulatory Attention < 0 |
| Moderate reflection | All remaining choices |

Executive Bonus starts at $0K and increases by $25K when a stage event is coded as a reward. It appears in Quarter Reviews and the Year-End Report but does not alter the four metrics or ending conditions.

| Sound | Wave | Duration | Target volume |
| --- | --- | --- | --- |
| Normal click | 420 Hz sine | 0.055 s | 0.025 |
| Confirm | 620 Hz sine | 0.075 s | 0.035 |
| Warning configuration | 190 Hz triangle | 0.11 s | 0.03 |

The browser Web Audio API provides lightweight interaction feedback. No visible sound toggle is included in this release.

# 13. Technical Structure

| File / folder | Purpose |
| --- | --- |
| index.html | Application shell and #app mount point. |
| styles.css | All responsive layouts, visual states, animations and UI Balanced overrides. |
| app.js | Game data, state, decisions, metrics, rendering, events, crisis and ending logic. |
| assets/ | GRO artwork, scenes, product previews and crisis imagery. |
| CHANGELOG_v2.11_HardMode_AU.md | Australian crisis and multi-outcome changes. |
| CHANGELOG_v2.11_UIBalanced.md | Decision-layout balancing changes. |

The prototype is dependency-free front-end JavaScript. It does not require Java, Python, a database, a framework or a back-end service. Reproduction requires the repository structure to remain intact. The game can be opened directly through index.html, although a simple local static server is recommended during development.

## 13.1 State Model

| Field | Type | Purpose |
| --- | --- | --- |
| mode | easy / hard | Active narrative route. |
| metrics | object | profit, users, trust and risk. |
| darkScore | number | Hidden cumulative strategy intensity. |
| choices | array | Player decision history. |
| crisisTriggered | boolean | Whether the AU crisis threshold was crossed. |
| endingId | string / null | sustainable, watch or regulatory. |
| lastDelta | object / null | Most recent change for Dashboard animation. |
| eventHistory | array | Triggered stage events. |
| executiveBonus | number | Year-to-date reward in thousands of dollars. |

# 14. Future Development

- Create matched before-and-after Product Preview mockups so each CEO choice produces a visible interface change without using stylistically inconsistent overlays.
- Extend the two routes into longer branching stories where earlier decisions unlock, modify or block later opportunities.
- Add conditional complaints, journalist enquiries, payment-provider concerns, public criticism and distinct regulatory pathways.
- Make Board and GRO dialogue react to the player’s full decision history and strategy profile.
- Rebalance metric deltas, thresholds and timing using structured usability and classroom testing.
- Resolve the Stage 1 Easy Mode milestone / Executive Bonus mismatch.
- Improve keyboard navigation, accessibility, responsive behaviour and device testing.
- Only add research logging after consent, data governance and privacy requirements have been formally defined.
- Adapt the same gameplay framework to other digital commercial contexts after the sports-betting module has been evaluated.
# 15. Design and Research Basis

The game follows the Project Brief V2.0 principles: entertainment before explicit instruction, a CEO role, GRO as a growth-focused advisor, rapid decisions, visible metrics, immediate consequences, progression rewards and a short replayable MVP. The selected sports-betting mechanics were informed by the project materials and literature on dark commercial patterns and gambling-platform design.

- Behavioural Insights Team. (2022). Behavioural Risk Audit of Gambling Operator Platforms.
- Flayelle et al. (2023). A Taxonomy of Technology Design Features That Promote Potentially Addictive Online Behaviours.
- McGarrigle et al. (2025). Dark Patterns in Online Gambling: A Scoping Review and Classification.
- McGarrigle et al. (2026). Consent Banners, Dark Patterns, and GDPR Infringements in Online Gambling. Preprint.
- OECD. (2022). Dark Commercial Patterns.
- Dark Pattern Tycoon — Project Brief V2.0 and prototype research materials.
# 16. Reproduction and Handover Notes

For GitHub handover, preserve index.html, styles.css, app.js and assets/ at minimum. This release is already source-level JavaScript; there is no missing compiled Java or Python layer. Future developers can reproduce, inspect and modify the complete game directly from these files.

Archive this release as an immutable baseline before changing metrics, thresholds or UI rules. New balancing or interface work should be committed as a later version so that behavioural differences remain traceable.
