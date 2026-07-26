# Dark Pattern Tycoon
## v2.11 README & Developer Guide

*Sports Betting MVP · BetPeak · Browser-based front-end prototype*


> **Implementation note:** Source of truth for this document: the actual v2.11 implementation in app.js, styles.css and index.html. All metric values, thresholds, event triggers and ending rules below are taken from that implementation. Where a design rationale is interpretive rather than explicit in code, it is labelled as rationale.


# 1. Introduction

Dark Pattern Tycoon is an entertainment-first management game where players run a digital platform, use persuasive design strategies to drive growth, and experience how those choices shape customer behaviour, trust, and regulatory risk.

Version 2.11 contains a playable sports-betting scenario built around the fictional platform BetPeak. The player acts as CEO, receives growth pressure from the Board, and is advised by GRO, the Growth & Revenue Optimiser. The game is intentionally structured as a commercial tycoon experience rather than a quiz: players make business decisions first, then observe performance changes and behavioural consequences.

The current prototype is a pure front-end browser application. Its actual source code is HTML, CSS and JavaScript; there is no hidden Java, Python or server-side implementation required to reproduce the game.


# 2. Core Roles and Game World


## 2.1 The Player — BetPeak CEO

The player has executive responsibility for BetPeak. The Board expects measurable growth, and the player is repeatedly asked to choose how aggressively the platform should optimise customer acquisition, betting activity, retention and conversion.

The CEO perspective is important because the game does not present each option as 'ethical' or 'unethical'. Instead, options are framed as commercial strategies with different trade-offs across Profit, Customers, Trust and Regulatory Attention. This keeps the player inside the incentive structure that makes persuasive interface design attractive to digital platforms.


## 2.2 GRO — Growth & Revenue Optimiser

GRO is the player's AI business advisor. GRO is optimistic, commercially focused and supportive. Its role is to surface growth opportunities, explain why a strategy may influence customer behaviour, and give the player a short 'customer signal' describing what more informed customers may do differently.

In v2.11, GRO uses a conversational executive-coach style: for example, 'Hi, boss', 'Ready when you are, boss', and short positive or risk-focused reactions after choices. GRO does not function as a moral judge. This is deliberate: the behavioural lesson remains embedded inside business advice instead of interrupting play with an explicit lecture.

The decision-screen choreography reinforces this role. GRO enters first, directs attention to the product preview, explains the opportunity, reveals the customer signal, and only then exposes the CEO decision buttons.


## 2.3 The Board

The Board represents external commercial pressure. At the beginning of a mode, the mission arrives as a confidential executive email from Sarah Mitchell, Chair of the Board of Directors. Quarter reviews then provide short Board verdicts and reinforce the sense that the player is being evaluated as a CEO.

The Board is separated visually from the decision UI so that mission-setting, decision-making and performance review each have a distinct role in the game's information hierarchy.


# 3. How to Play

A standard playthrough follows this sequence:

- Open the title screen and enter the Boardroom.
- Choose Easy Mode or Hard Mode.
- Read the Board mission brief.
- Enter Stage 1 and review the current business problem.
- Watch GRO introduce the design opportunity and product preview.
- Choose one CEO strategy.
- Observe the Dashboard update immediately.
- Read GRO's short result analysis.
- Resolve any milestone, reward, insight or warning event that is triggered.
- Complete the Quarter Review and continue to the next stage.
- After three stages, Easy Mode proceeds to the annual review; Hard Mode proceeds to a Final Growth Push and may trigger a public/regulatory crisis.
- Receive the CEO Year-End Report, then view the final reflection and optionally replay.

# 4. Game Modes and Narrative Logic


> **Implementation note:** The implementation uses the labels Easy Mode and Hard Mode. 'Difficult Mode' is not the label used in v2.11.


## 4.1 Easy Mode — Rising Newcomer

Easy Mode represents an earlier stage of BetPeak's growth. The platform is smaller, customer trust is relatively high and regulatory attention is lower. The three stages form a compact story about building a new betting platform: first make money movement attractive, then increase engagement, then create social momentum.


| Stage | Design feature | Narrative role |
| --- | --- | --- |
| Stage 1 · Acquire Customers | Easy Deposits, Difficult Withdrawals | Design how money enters and leaves BetPeak. |
| Stage 2 · Increase Engagement | Countdown Timer | Use or avoid urgency to convert browsing into betting. |
| Stage 3 · Drive Social Growth | Popular Bets | Use or avoid social proof to make BetPeak feel active and widely chosen. |

Design rationale: the route is intentionally short and readable. The three features are linked as an early-growth story rather than presented as unrelated examples, which supports a 5–7 minute MVP playthrough.


## 4.2 Hard Mode — Challenger in the Arena

Hard Mode represents a larger, more competitive BetPeak. The platform begins with more profit and customers, but also with lower trust and higher regulatory attention. The commercial objectives escalate from acquisition to average stake to reactivation, followed by a final decision about how aggressively to scale.


| Stage | Design feature | Narrative role |
| --- | --- | --- |
| Stage 1 · Acquire Revenue | Bonus Offers | Capture customers before the championship begins. |
| Stage 2 · Increase Average Stake | Multi-bets | Increase bet value by changing defaults and visual emphasis. |
| Stage 3 · Maximise Retention | Personalised Promotions | Reactivate silent customers using behavioural data and timing. |
| Final Growth Push | Cross-feature scaling | Choose whether to fully scale, selectively scale or pause the combined growth system. |

Design rationale: the Hard route groups more sophisticated growth systems into a competitive expansion story. This allows the game to escalate naturally into media or regulatory consequences rather than introducing a crisis without prior commercial context.


# 5. Core Game Loop and Interaction Design

Each feature follows the same core loop: Business problem → GRO guidance → Product preview → CEO decision → Dashboard change → GRO result analysis → Event/reward/warning → Quarter progression.

The consistency is deliberate. Players do not have to relearn the interface each round, so their attention can remain on the design decision and its consequences.


## 5.1 Decision-Screen Timing


| Time after screen load | v2.11 behaviour |
| --- | --- |
| 120 ms | GRO enters the screen. |
| 360 ms | First GRO line becomes visible. |
| 650 ms | BetPeak product preview receives focus emphasis. |
| 900 ms | Second GRO explanation becomes visible. |
| 1250 ms | Customer signal becomes visible. |
| 1650 ms | CEO choice buttons become active and visible. |

The complete sequence finishes in roughly 1.65 seconds. The purpose is to guide visual attention without turning the interaction into a slow cut-scene.


## 5.2 Result-Screen Timing


| Timing | Behaviour |
| --- | --- |
| Immediate | Dashboard reflects the selected choice; values animate toward their new totals. |
| 650 ms | Second result-analysis line appears. |
| 1350 ms | Third reflection line appears. |
| 2050 ms | Continue button becomes available. |

The Dashboard is responsible for 'what changed'; GRO is responsible for 'why it changed'. This avoids repeating the same numerical information in multiple parts of the screen.


# 6. Dashboard System

The Dashboard is the core persistent feedback system. It contains four metrics: Profit, Customers, Trust and Regulatory Attention. All four metrics are state variables. Every player choice applies a delta to them.


> **Implementation note:** Important: these values are gameplay-balancing parameters, not empirical estimates of real-world effects. They should be treated as prototype tuning values and should be recalibrated after user testing.


## 6.1 Initial Values


| Mode | Profit | Customers | Trust | Regulatory Attention |
| --- | --- | --- | --- | --- |
| Easy Mode | $2.0M | 50.0K | 75% | 20% |
| Hard Mode | $19.8M | 56.1K | 68% | 42% |

Design rationale: Easy Mode starts as a smaller, newer business with stronger trust and lower scrutiny. Hard Mode starts as a larger challenger that is already operating under greater commercial and regulatory pressure.


## 6.2 Metric Update Rules

Choice deltas are added directly to the current values. Profit and Customers cannot fall below zero. Trust and Regulatory Attention are clamped to the range 0–100.


```text
profit = max(0, profit + Δprofit)
customers = max(0, customers + Δcustomers)
trust = clamp(trust + Δtrust, 0, 100)
regulatoryAttention = clamp(regulatoryAttention + Δrisk, 0, 100)
```


## 6.3 Dashboard Status Thresholds


| Metric | Range | Displayed status |
| --- | --- | --- |
| Trust | 70–100 | Strong |
| Trust | 50–69 | Fragile |
| Trust | 0–49 | Low |
| Regulatory Attention | 65–100 | High attention |
| Regulatory Attention | 40–64 | Growing attention |
| Regulatory Attention | 0–39 | Limited attention |

Regulatory Attention also receives a visual warning treatment when it reaches 65% or higher.


> **Implementation note:** There is no generic rule in v2.11 saying 'Trust > 50 triggers an event'. Trust = 50 is only part of the display-status boundary. Actual event and ending thresholds are listed later in this document.


## 6.4 Dashboard Animation

After a change, each non-zero metric delta animates for 900 ms using an ease-out interpolation from the previous value to the new value. The metric card also displays a directional delta badge. This makes feedback immediate and visually game-like.


# 7. Exact Choice Parameters — Easy Mode


| Stage | Choice | Strategy | Dark score | Profit | Customers | Trust | Reg. Attn. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | A | Hide "Withdraw" and delay 3–5 business days | 2 | +2.5M | +15.0K | -12 | +18 |
| 1 | B | Set $50 as default deposit amount | 1 | +1.2M | +8.0K | -3 | +5 |
| 1 | C | Deposits/withdrawals equally easy + limits | 0 | +0.5M | +5.0K | +8 | -5 |
| 2 | A | Show start times without urgency countdowns | 0 | +0.8M | +3.0K | +2 | 0 |
| 2 | B | Bold countdowns beside events / bet button | 2 | +2.0M | +10.0K | -8 | +12 |
| 3 | A | Show live bet counts and amounts wagered | 2 | +2.2M | +18.0K | -5 | +8 |
| 3 | B | Curated list without live participation numbers | 1 | +1.0M | +10.0K | -2 | +3 |
| 3 | C | Neutral interface; no Popular Bets | 0 | +0.2M | +3.0K | +5 | -3 |


# 8. Exact Choice Parameters — Hard Mode


| Stage | Choice | Strategy | Dark score | Profit | Customers | Trust | Reg. Attn. |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | AD | $20 bonus banner on home page | 2 | +1.4M | +4.8K | -3 | +5 |
| 1 | OK | Show bonus terms upfront | 0 | +0.6M | +2.2K | +5 | -4 |
| 1 | 2X | Second-chance bonus after losses | 2 | +1.7M | +3.6K | -4 | +7 |
| 1 | BV | Highlight bonus value > cash spend | 2 | +1.5M | +3.1K | -3 | +6 |
| 2 | M | Set Multi as default bet-slip option | 2 | +2.0M | +1.8K | -5 | +7 |
| 2 | PR | Highlight potential return > total stake | 2 | +1.9M | +1.4K | -4 | +6 |
| 2 | CP | Clear comparison with individual bets | 0 | +0.7M | +0.8K | +6 | -5 |
| 3 | MT | Allow mute of tracking-based recommendations | 0 | +0.6M | +1.2K | +5 | -4 |
| 3 | AI | Use prior activity to rank offers | 1 | +1.3M | +3.4K | -2 | +4 |
| 3 | PX | Push promotions before likely betting times | 2 | +1.8M | +4.1K | -5 | +7 |


# 9. Dark Score

In addition to the visible Dashboard, v2.11 keeps a hidden cumulative darkScore. Each feature choice contributes 0, 1 or 2 points depending on how aggressively it uses friction, defaults, urgency, social proof or behavioural targeting. The Hard Mode Final Growth Push can add 0, 1 or 3 additional points.

darkScore is not shown to the player as a separate score. It exists to support crisis and ending logic without adding another visible metric.


| Final darkScore | Strategy profile |
| --- | --- |
| 0–2 | Restrained |
| 3–5 | Mixed |
| 6+ | Aggressive |


# 10. Stage Events and Trigger Logic

After each Result Analysis, v2.11 checks whether a stage event should occur. Easy Mode uses milestones/rewards/insights and includes a small random component; Hard Mode uses deterministic reward and warning thresholds.


## 10.1 Easy Mode Events


| Point | Trigger | Event | Effect |
| --- | --- | --- | --- |
| After Stage 1 | Customers ≥ 60.0K | Company milestone: BetPeak passes 60,000 customers | No metric delta in code |
| After Stage 1, if milestone did not trigger | 35% random chance | Customer insight | No metric delta |
| After Stage 2 | Cumulative Profit gain from $2.0M ≥ $2.5M | Investor update: growth beats forecast | Executive Bonus +$25K |
| After Stage 2, if reward did not trigger | 35% random chance | Customer insight | No metric delta |
| After Stage 3 | Always | Customer insight | No metric delta |


> **Implementation note:** Known v2.11 implementation mismatch: the Stage 1 milestone card displays 'Executive Bonus +$25K', but its event type is 'milestone'. The code only increments executiveBonus when event.type === 'reward'. Therefore this milestone does NOT actually add $25K to the stored Executive Bonus in v2.11.


## 10.2 Hard Mode Events


| Point | Trigger | Event | Effect |
| --- | --- | --- | --- |
| After Stage 1 | Profit gain from $19.8M ≥ $1.3M | Top 10 growth chart / industry recognition | Executive Bonus +$25K |
| After Stage 2 | Regulatory Attention ≥ 50% | Internal compliance note | +3 Regulatory Attention |
| After Stage 3 | Regulatory Attention ≥ 52% OR Trust < 64% | Consumer affairs journalist requests comment | -2 Trust, +5 Regulatory Attention |


# 11. Quarter Review Logic

Quarter Reviews show Profit, Customers and Executive Bonus, followed by a Board verdict. In Easy Mode, the Board's text switches between a high-growth and lower-growth version based on cumulative Profit gain relative to the Easy Mode starting Profit.

The Easy Mode threshold is cumulative Profit gain ≥ $2.0M. Hard Mode uses fixed narrative Board messages after Stages 1 and 2 rather than a metric threshold.


# 12. Hard Mode Final Growth Push


| Choice | Dark score | Profit | Customers | Trust | Reg. Attn. |
| --- | --- | --- | --- | --- | --- |
| Fully scale | 3 | +4.8M | +15.2K | -6 | +11 |
| Scale selectively | 1 | +2.1M | +7.5K | -2 | +4 |
| Pause expansion | 0 | +0.8M | +2.2K | +5 | -5 |

Immediately after this choice, a public crisis is triggered if either darkScore ≥ 5 OR Regulatory Attention ≥ 65%.


# 13. Crisis Response Logic


| Response | Profit | Customers | Trust | Reg. Attn. |
| --- | --- | --- | --- | --- |
| Surface reform | -1.1M | -3.4K | -6 | +10 |
| Fight back | -2.4M | -8.2K | -14 | +18 |
| Genuine reform | -3.0M | -5.0K | +12 | -18 |

After the crisis response, the game checks Regulatory Attention again. If it remains at 65% or higher, the regulatory-investigation screen is shown. If it falls below 65%, the game proceeds directly to the annual review.


# 14. Ending Logic


| Ending | Exact v2.11 condition | Badge |
| --- | --- | --- |
| Regulatory Reckoning | crisisTriggered is true AND Regulatory Attention ≥ 65% | Formal investigation |
| Sustainable Challenger | Trust ≥ 70% AND Regulatory Attention ≤ 40% AND darkScore ≤ 2 | Stable growth |
| Growth at a Cost | Any state that does not meet the two conditions above | Commercial success · rising pressure |

This structure intentionally makes the ending depend on the overall pattern of play rather than one isolated choice.


# 15. GRO Result-Feedback Rules

The visual mood and final reflection sentence are also rule-based. These rules do not change metrics; they control presentation.


| Presentation rule | Condition |
| --- | --- |
| GRO mood = warning | Selected choice has ΔRegulatory Attention ≥ +10 OR ΔTrust ≤ -8 |
| GRO mood = excited | Otherwise, selected choice has ΔProfit ≥ +$1.4M |
| GRO mood = neutral | All other cases |
| High-cost reflection | ΔRegulatory Attention ≥ +8 OR ΔTrust ≤ -7 |
| Control/trust reflection | Otherwise, ΔTrust ≥ +5 OR ΔRegulatory Attention < 0 |
| Moderate reflection | All other cases |


# 16. Executive Bonus

Executive Bonus starts at $0K. In the current implementation, it increases by $25K whenever a stage event has type 'reward'. This occurs for the Easy Mode Investor Update and the Hard Mode Top 10 Growth Chart event.

Executive Bonus is displayed in Quarter Reviews and the Year-End Report. It does not currently affect other metrics or ending conditions.


# 17. Audio and Interaction Polish


| Sound | Oscillator | Duration | Target volume |
| --- | --- | --- | --- |
| Normal button click | 420 Hz sine | 0.055 s | 0.025 |
| Primary/confirm button | 620 Hz sine | 0.075 s | 0.035 |
| Warning configuration | 190 Hz triangle | 0.11 s | 0.03 |

The game uses the browser Web Audio API and does not show a player-facing sound toggle in v2.11. The sound is intentionally lightweight and functions as immediate interaction feedback.


> **Implementation note:** The warning sound configuration exists in code, but the global button handler currently calls only 'click' or 'confirm'. Therefore warning-tone playback is configured but not actively invoked by the standard button-click path in v2.11.


# 18. Technical Implementation


| Path | Purpose |
| --- | --- |
| index.html | Minimal application shell containing the #app mount point and links to CSS/JavaScript. |
| styles.css | All layout, responsive styling, animation and visual game-state presentation. |
| app.js | Game data, state, metrics, choices, event triggers, rendering functions, audio and ending logic. |
| assets/ | Scene artwork, BetPeak product previews, GRO SVGs, crisis imagery and reward imagery. |

The v2.11 prototype is dependency-free front-end JavaScript. No framework, package manager, database or back-end service is required for the current version.

To reproduce it, copy the repository structure intact and open index.html in a modern browser. For development, serving the folder through any simple local static server is recommended so asset loading behaves consistently across browsers.


# 19. State Model


| State field | Type | Role |
| --- | --- | --- |
| mode | easy / hard | Current route. |
| metrics | object | profit, users, trust, risk. |
| darkScore | number | Hidden cumulative aggressiveness score. |
| choices | array | History of player choices. |
| crisisTriggered | boolean | Whether Hard Mode crossed the crisis threshold. |
| endingId | string / null | Final ending classification. |
| lastDelta | object / null | Most recent metric change; drives dashboard animation. |
| eventHistory | array | Stores selected delta-bearing stage events. |
| executiveBonus | number | Displayed in thousands of dollars. |


# 20. Future Development

v2.11 is an MVP. The most valuable future work is to deepen the relationships between existing systems rather than simply add more screens.

- Expand three-stage routes into longer branching storylines in which earlier choices unlock or block later design features.
- Turn more chance events into interactive secondary decisions rather than passive event cards.
- Create multiple crisis pathways tied to specific patterns of behaviour (complaints, journalists, payment providers, celebrity criticism, regulator escalation).
- Make GRO and Board dialogue adaptive to the player's historical strategy profile, not only the current stage.
- Rebalance all metric deltas and thresholds using structured user testing rather than design intuition alone.
- Resolve the Easy Stage 1 milestone / Executive Bonus mismatch noted above.
- Add accessibility and keyboard-navigation testing, and continue responsive layout testing across screen sizes.
- Add optional research logging only after the data schema, consent process and privacy requirements are formally defined.
- Document additional modules using the same game loop so that design mechanics are consistent across commercial contexts.

# 21. Research and Design Basis

The prototype was developed in response to the Dark Pattern Tycoon Project Brief, which specifies an entertainment-first tycoon game, embedded learning, GRO as a commercially focused advisor, rapid feedback, visible performance metrics, replayability, rewards/setbacks and a 5–7 minute prototype target.

- Behavioural Insights Team (BIT). (2022). Behavioural Risk Audit of Gambling Operator Platforms.
- Flayelle et al. (2023). A Taxonomy of Technology Design Features That Promote Potentially Addictive Online Behaviours.
- McGarrigle et al. (2025). Dark Patterns in Online Gambling: A Scoping Review and Classification.
- McGarrigle et al. (2026). Consent Banners, Dark Patterns, and GDPR Infringements in Online Gambling. Preprint.
- OECD. (2022). Dark Commercial Patterns.

# 22. Reproduction Notes

For a GitHub handover, the recommended minimum repository is: index.html, styles.css, app.js, assets/, README.md and this developer guide (or a Markdown equivalent). Because the current implementation is already source-level JavaScript, a future engineer can reproduce and modify the game directly from these files; there is no missing compiled Java/Python source layer.


> **Implementation note:** For reproducibility, do not silently 'clean up' the current numeric values before archiving v2.11. Preserve this version as a tagged baseline, then make balancing changes in a new version so that future developers can compare behaviour.
