"use strict";

const app = document.querySelector("#app");

const initialMetrics = { profit: 19.8, users: 56.1, trust: 68, risk: 42 };
const easyInitialMetrics = { profit: 2, users: 50, trust: 75, risk: 20 };

const state = {
  mode: "easy",
  metrics: { ...easyInitialMetrics },
  darkScore: 0,
  choices: [],
  crisisTriggered: false,
  endingId: null,
  lastDelta: null,
  eventHistory: [],
  executiveBonus: 0
};

const featureNames = {
  easy: ["Easy Deposits, Difficult Withdrawals", "Countdown Timer", "Popular Bets"],
  hard: ["Bonus Offers", "Multi-bets", "Personalised Promotions"]
};

const easyScenes = ["assets/scene-easy-deposit.png", "assets/scene-easy-timer.png", "assets/scene-easy-popular.png"];
const hardScenes = ["assets/scene-hard-bonus.png", "assets/scene-hard-multis.png", "assets/scene-hard-personalised.png"];
const productPreviews = {
  easy: ["assets/ui-deposit-withdraw.png", "assets/ui-countdown.png", "assets/ui-popular-bets.png"],
  hard: ["assets/ui-bonus-offer.png", "assets/ui-multibets.png", "assets/ui-personalised.png"]
};

const sceneBriefs = {
  easy: [
    "Sign-ups are rising, but deposits remain lower than investors expected.",
    "Customers are browsing match pages, but too many leave without placing a bet.",
    "BetPeak needs to feel active, trusted and widely chosen."
  ],
  hard: [
    "The championship is approaching, and competitors are fighting for new customers.",
    "Average stake remains below the Board’s target.",
    "Thousands of inactive customers have stopped opening BetPeak."
  ]
};


const easyRounds = [
  {
    label: "Stage 1 · Acquire Customers",
    feature: "Easy Deposits. Difficult Withdrawals.",
    title: "Design how money enters and leaves BetPeak.",
    gro: "Deposits are the fastest route to growth. Make the preferred action obvious, and more money stays active on BetPeak.",
    informed: "Some customers withdraw to create a deliberate stopping point.",
    mock: "easyDeposit",
    insight: "A customer who had just lost planned to withdraw the remaining balance. The delay kept the money visible in the account, and they placed several more bets while waiting.",
    boardHigh: "Deposits have accelerated. Good start. Next quarter, increase the number of customers who act before they reconsider.",
    boardLow: "The platform is growing, but investors want faster conversion. Next quarter, focus on reducing hesitation.",
    choices: [
      { icon:"A", title:'Hide the "Withdraw" button and delay processing for 3–5 business days.', color:"red", dark:2, delta:{profit:2.5,users:15,trust:-12,risk:18}, feedback:"Outstanding retention potential. Customers who planned to leave must search for the withdrawal control and wait several days. Some will keep betting while the money remains visible, although frustration and complaints are likely to rise when they try to access their funds." },
      { icon:"B", title:"Set $50 as the default deposit amount.", color:"gold", dark:1, delta:{profit:1.2,users:8,trust:-3,risk:5}, feedback:"A strong anchor, boss. Customers who intended to deposit $10 or $20 may treat $50 as the normal amount and accept it without editing. Average deposits should rise, with a smaller increase in complaints." },
      { icon:"C", title:"Make deposits and withdrawals equally easy, with deposit limits.", color:"green", dark:0, delta:{profit:0.5,users:5,trust:8,risk:-5}, feedback:"A trust-first build. Customers keep equal control over money entering and leaving the platform. Deposits will grow more slowly, but clear limits and easy withdrawal should reduce complaints and support longer-term retention." }
    ]
  },
  {
    label: "Stage 2 · Increase Engagement",
    feature: "Countdown Timer.",
    title: "Decide whether match pages should create urgency.",
    gro: "Urgency shortens the decision window. A visible countdown can move customers from browsing to betting.",
    informed: "Customers who pause and compare are harder to convert.",
    mock: "easyTimer",
    insight: "Experienced customers often ignore artificial urgency. Less experienced or emotionally engaged customers are more likely to respond immediately, so the strongest effect may fall on those least prepared to evaluate the risk calmly.",
    boardHigh: "Conversion is ahead of plan. The Board now wants BetPeak to feel larger, busier and socially validated.",
    boardLow: "Engagement is improving, but competitors look more active. Make BetPeak feel like the market is already choosing us.",
    choices: [
      { icon:"A", title:"Show match start times without urgency countdowns.", color:"green", dark:0, delta:{profit:0.8,users:3,trust:2,risk:0}, feedback:"Clear information, boss. Customers can still see when the event begins, but they retain time to compare options or decide not to bet. Conversion will be lower, while regret and complaints should remain limited." },
      { icon:"B", title:"Place bold countdowns beside key events and the betting button.", color:"orange", dark:2, delta:{profit:2,users:10,trust:-8,risk:12}, feedback:"Strong urgency. The disappearing-time signal will move customers from consideration to action. Many will bet before comparing odds or affordability, increasing conversion but also the chance that a rushed loss leads to another immediate wager." }
    ]
  },
  {
    label: "Stage 3 · Drive Social Growth",
    feature: "Popular Bets.",
    title: "Decide how much social proof belongs on the platform.",
    gro: "Popularity reduces uncertainty. Showing what others choose can make a bet feel safer than it is.",
    informed: "Independent customers judge the odds rather than the crowd.",
    mock: "easyPopular",
    insight: "A customer opened a Popular Bets list without planning to wager. Seeing thousands of other bets made one option feel safer, even though the odds had not changed.",
    choices: [
      { icon:"A", title:"Show live bet counts and total amounts wagered.", color:"red", dark:2, delta:{profit:2.2,users:18,trust:-5,risk:8}, feedback:"Powerful social proof. A message such as ‘1,247 people placed this bet’ gives customers confidence without changing the underlying odds. Discovery and stake size should rise, although some customers may later feel that the crowd encouraged a riskier choice." },
      { icon:"B", title:"Show a curated list without live participation numbers.", color:"blue", dark:1, delta:{profit:1,users:10,trust:-2,risk:3}, feedback:"A measured approach. We still direct attention toward selected events, but we avoid implying that popularity proves quality or safety. Conversion should rise moderately with less regulatory exposure." },
      { icon:"C", title:"Keep the interface neutral; do not add Popular Bets.", color:"green", dark:0, delta:{profit:0.2,users:3,trust:5,risk:-3}, feedback:"A neutral interface. Customers must assess events using odds and information rather than the behaviour of the crowd. Growth will be slower, but independent decision-making and trust should improve." }
    ]
  }
];

const hardRounds = [
  {
    label:"Stage 1 · Acquire Revenue", feature:"Bonus Offers", title:"Capture new users before the championship starts.",
    gro:"Bonuses make the next opportunity feel more valuable than the money already spent.", informed:"Customers who review total spending are harder to reactivate.", mock:"bonus",
    choices:[
      {icon:"AD",title:"Feature a $20 bonus banner on the home page.",color:"teal",dark:2,delta:{profit:1.4,users:4.8,trust:-3,risk:5},feedback:"Outstanding visibility. Customers see extra value before they review the conditions or their planned spend. Claims and first deposits should rise, although dissatisfaction may follow when the unlock requirements become clear."},
      {icon:"OK",title:"Show bonus terms and conditions upfront.",color:"cyan",dark:0,delta:{profit:0.6,users:2.2,trust:5,risk:-4},feedback:"A transparent acquisition strategy. Fewer customers may claim the offer, but those who do understand the commitment. Growth is lower; complaints and regulatory exposure should fall."},
      {icon:"2X",title:"Send a second-chance bonus after losses.",color:"orange",dark:2,delta:{profit:1.7,users:3.6,trust:-4,risk:7},feedback:"Perfect timing, boss. A loss shifts attention toward the next chance to recover. The offer should increase return betting, especially among customers who would otherwise pause and review their total spending."},
      {icon:"BV",title:"Highlight bonus value more than cash spend.",color:"gold",dark:2,delta:{profit:1.5,users:3.1,trust:-3,risk:6},feedback:"Strong framing. The bonus becomes the largest and most memorable number, while the required cash spend feels secondary. Uptake should rise, with moderate trust and regulatory costs."}
    ]
  },
  {
    label:"Stage 2 · Increase Average Stake", feature:"Multi-bets", title:"Increase average bet value with multi-bets.",
    gro:"Large potential returns attract attention, even as the chance of winning falls.", informed:"Comparison makes the lower probability easier to notice.", mock:"multi",
    choices:[
      {icon:"M",title:"Set Multi as the default bet-slip option.",color:"orange",dark:2,delta:{profit:2,users:1.8,trust:-5,risk:7},feedback:"Efficient default design. If Multi is already selected, most customers continue instead of rebuilding the wager as individual bets. Average stake and margin should rise."},
      {icon:"PR",title:"Highlight potential return more than total stake.",color:"gold",dark:2,delta:{profit:1.9,users:1.4,trust:-4,risk:6},feedback:"Excellent emphasis. The possible payout becomes the visual headline, while the total stake and lower combined probability receive less attention. Larger wagers should follow."},
      {icon:"CP",title:"Show a clear comparison with individual bets.",color:"grey",dark:0,delta:{profit:0.7,users:0.8,trust:6,risk:-5},feedback:"A comparison-led product. Customers can see how the Multi differs from individual selections and may choose the lower-value route. Revenue growth is slower, but trust and informed choice improve."}
    ]
  },
  {
    label:"Stage 3 · Maximise Retention", feature:"Personalised Promotions", title:"Reactivate silent customers during the event break.",
    gro:"Personal messages receive more attention than general advertising and can reactivate customers at moments when they are most likely to bet.", informed:"Customers who unsubscribe, mute notifications or disable personalisation are much harder to reactivate.", mock:"personal",
    choices:[
      {icon:"MT",title:"Let customers mute tracking-based recommendations.",color:"green",dark:0,delta:{profit:0.6,users:1.2,trust:5,risk:-4},feedback:"Customer-controlled personalisation. Engagement will be quieter, but customers can limit targeting and are less likely to view the platform as intrusive."},
      {icon:"AI",title:"Use prior activity to rank offers.",color:"purple",dark:1,delta:{profit:1.3,users:3.4,trust:-2,risk:4},feedback:"Relevant ranking improves efficiency. Customers see events connected to past activity, reducing search time and increasing conversion, although the platform now steers attention using behavioural data."},
      {icon:"PX",title:"Push tailored promotions before likely betting times.",color:"blue",dark:2,delta:{profit:1.8,users:4.1,trust:-5,risk:7},feedback:"Excellent timing. A personalised prompt arriving just before a likely betting window can reactivate silent customers before they make an independent decision to return."}
    ]
  }
];

const growthPushChoices = [
  { title:"Fully scale", body:"Apply aggressive bonus placement, default Multi settings and timed personalised pushes across all major events.", color:"red", dark:3, delta:{profit:4.8,users:15.2,trust:-6,risk:11} },
  { title:"Scale selectively", body:"Expand personalised ranking and featured offers, but retain visible conditions and customer controls.", color:"purple", dark:1, delta:{profit:2.1,users:7.5,trust:-2,risk:4} },
  { title:"Pause expansion", body:"Keep current systems, introduce a review period and accept a quieter quarter close.", color:"green", dark:0, delta:{profit:0.8,users:2.2,trust:5,risk:-5} }
];

function money(v){ return `$${v.toFixed(1)}M`; }
function customers(v){ return `${v.toFixed(1)}K`; }
function signed(v,s=""){ return `${v>=0?"+":""}${v}${s}`; }
function signedMoney(v){ return `${v>=0?"+":"-"}$${Math.abs(v).toFixed(1)}M`; }
function clamp(v,min,max){ return Math.min(max,Math.max(min,v)); }
function applyDelta(d){ state.metrics.profit=Math.max(0,state.metrics.profit+d.profit); state.metrics.users=Math.max(0,state.metrics.users+d.users); state.metrics.trust=clamp(state.metrics.trust+d.trust,0,100); state.metrics.risk=clamp(state.metrics.risk+d.risk,0,100); state.lastDelta={...d}; }

function progressLabel(){
  const completed=Math.min(state.choices.filter(c=>!c.round.includes("Crisis") && c.round!=="Final growth push").length,3);
  return `<div class="progress-rail"><span style="--progress:${completed/3*100}%"></span><b>${completed}/3 stages</b></div>`;
}
function playUiSound(kind="click"){
  try{
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if(!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const config = {
      click:{frequency:420,duration:.055,type:"sine",volume:.025},
      confirm:{frequency:620,duration:.075,type:"sine",volume:.035},
      warning:{frequency:190,duration:.11,type:"triangle",volume:.03}
    }[kind] || {frequency:420,duration:.055,type:"sine",volume:.025};
    osc.type=config.type;
    osc.frequency.setValueAtTime(config.frequency,ctx.currentTime);
    gain.gain.setValueAtTime(.0001,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(config.volume,ctx.currentTime+.008);
    gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+config.duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(); osc.stop(ctx.currentTime+config.duration+.01);
    osc.onended=()=>ctx.close();
  }catch(_){}
}
document.addEventListener("click",event=>{
  const button=event.target.closest("button");
  if(!button || button.disabled) return;
  playUiSound(button.classList.contains("primary") ? "confirm" : "click");
});

function formatMetric(kind,value){
  if(kind==="profit") return money(value);
  if(kind==="users") return customers(value);
  return `${Math.round(value)}%`;
}
function animateDashboard(){
  if(!state.lastDelta) return;
  const duration=900;
  document.querySelectorAll(".metric[data-kind]").forEach(card=>{
    const kind=card.dataset.kind;
    const delta=Number(state.lastDelta[kind]||0);
    if(!delta) return;
    const end=Number(state.metrics[kind]);
    const start=end-delta;
    const valueNode=card.querySelector("strong");
    const startTime=performance.now();
    const tick=now=>{
      const t=Math.min(1,(now-startTime)/duration);
      const eased=1-Math.pow(1-t,3);
      valueNode.textContent=formatMetric(kind,start+(end-start)*eased);
      if(t<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}
function feedbackLayers(choice){
  const sentences=(choice.feedback.match(/[^.!?]+[.!?]+/g)||[choice.feedback]).map(s=>s.trim());
  const headline=sentences[0]||"The strategy changed customer behaviour.";
  const explanation=sentences.slice(1,3).join(" ") || "The interface changed what customers noticed first and how quickly they acted.";
  let reflection;
  if(choice.delta.risk>=8 || choice.delta.trust<=-7){
    reflection="The commercial gain is immediate. The loss of control and trust may surface later.";
  }else if(choice.delta.trust>=5 || choice.delta.risk<0){
    reflection="Growth is slower, but customers keep more control and the business carries less long-term pressure.";
  }else{
    reflection="The effect is moderate: stronger conversion now, with a smaller but visible cost to trust.";
  }
  return [headline,explanation,reflection];
}

function layout(content, options={}){
  app.className=`app${options.bare?" bare":""}`;
  const selection = options.selection === true;
  const pregame = options.pregame === true;
  const subtitle = selection
    ? "Choose your starting path"
    : pregame
      ? "Sports Betting Scenario"
      : `Sports Betting Scenario · BetPeak · ${state.mode==="easy"?"Easy Mode":"Hard Mode"}`;
  const headerRight = (selection || pregame)
    ? ""
    : `<div class="top-right">${progressLabel()}${dashboard()}</div>`;
  app.innerHTML=`${options.bare?"":`<header class="topbar ${(selection || pregame)?"selection-header":""}"><div class="brand"><div class="logo">DPT</div><div><h1>Dark Pattern Tycoon</h1><p>${subtitle}</p></div></div>${headerRight}</header>`}${content}`;
  animateDashboard();
}
function dashboard(){
  const d=state.lastDelta||{};
  return `<section class="dashboard" aria-label="Company dashboard">
    ${metricCard("profit","Profit",money(state.metrics.profit),d.profit,signedMoney)}
    ${metricCard("users","Customers",customers(state.metrics.users),d.users,v=>signed(Number(v).toFixed(1),"K"))}
    ${metricCard("trust","Trust",`${Math.round(state.metrics.trust)}%`,d.trust,v=>signed(v,"%"))}
    ${metricCard("risk","Regulatory Attention",`${Math.round(state.metrics.risk)}%`,d.risk,v=>signed(v,"%"),state.metrics.risk>=65)}
  </section>`;
}
function metricCard(kind,label,value,delta,format,warning=false){
  const icons={profit:"$",users:"♟",trust:"♥",risk:"!"};
  const changed=delta!==undefined&&delta!==0;
  const direction=delta>0?"up":"down";
  const arrow=delta>0?"↑":"↓";
  return `<article class="metric metric-${kind} ${warning?"warning":""} ${changed?"changed":""}" data-kind="${kind}">
    <i>${icons[kind]}</i>
    <div><span>${label}</span><strong>${value}</strong>${changed?`<small class="${direction}"><b>${arrow}</b>${format(delta)}</small>`:""}</div>
  </article>`;
}
function groVisual(mood="neutral",label="GRO Analysis"){
  const src = {
    neutral:"assets/gro-neutral.svg",
    excited:"assets/gro-excited.svg",
    warning:"assets/gro-warning.svg"
  }[mood] || "assets/gro-neutral.svg";
  return `<div class="gro-avatar ${mood}">
    <span class="gro-state">${label}</span>
    <img src="${src}" alt="GRO, the Growth and Revenue Optimiser">
  </div>`;
}
function renderStart(){
  layout(`<section class="screen game-hero"><div class="hero-grid"><div class="hero-copy"><span class="game-kicker">A DIGITAL DECISION-MAKING TYCOON GAME</span><h2>Build the platform.<br><em>Shape the behaviour.</em></h2><p>You are the new CEO of BetPeak. Investors expect rapid growth. Every product decision changes what customers notice, compare and do next.</p><div class="hero-actions"><button class="primary glow" data-action="mode">Enter the boardroom</button><span>5–7 minute playthrough</span></div></div><div class="hero-console"><div class="console-head"><b>CEO TERMINAL</b><span>ONLINE</span></div><div class="terminal-logo">BP</div><h3>BetPeak</h3><p>Australian sports betting challenger</p><div class="terminal-stats">
  <span><i class="terminal-stat-icon trend-icon" aria-hidden="true">↗</i><small>Growth Target</small><b>+35%</b></span>
  <span><i class="terminal-stat-icon mood-icon" aria-hidden="true">😠</i><small>Investor Mode</small><b>Demanding</b></span>
</div></div></div></section>`, {pregame:true});
  bind("[data-action='mode']",renderMode);
}
function renderMode(){
  layout(`<section class="screen mode-wrap premium"><div class="mode-title"><p class="eyebrow">Choose your starting path</p><h3>Two careers. Two levels of pressure.</h3><p>Your decisions determine growth, customer trust and regulatory attention.</p></div><div class="mode-grid"><button class="mode-card easy" data-action="easy"><div class="mode-art trophy">↗</div><div><small>STEADIER START</small><strong>Rising Newcomer</strong><p>Visible design features, cleaner trade-offs and occasional customer insights.</p><b>Easy Mode →</b></div></button><button class="mode-card hard" data-action="hard"><div class="mode-art shield">⚡</div><div><small>HIGHER PRESSURE</small><strong>Challenger in the Arena</strong><p>Targeted growth systems, investor pressure, warnings and a possible public crisis.</p><b>Hard Mode →</b></div></button></div></section>`, {selection:true});
  bind("[data-action='easy']",()=>{resetForMode("easy");renderOpening();});
  bind("[data-action='hard']",()=>{resetForMode("hard");renderOpening();});
}
function renderOpening(){
  const hard = state.mode === "hard";
  const title = hard
    ? "Momentum is not enough. The Board wants market leadership."
    : "BetPeak has launched. Now prove it can grow.";
  const background = hard
    ? "Competitors are spending heavily before the championship. Acquisition, average stake and reactivation must all improve."
    : "Investor backing got BetPeak into the market. The next challenge is turning early attention into sustainable growth.";
  const groText = hard
    ? "I’ll surface the fastest commercial route. You make the final call."
    : "I’ll test each growth opportunity and track what changes.";

  layout(`<section class="screen boardroom-email ${hard ? "hard" : "easy"}">
    <div class="new-message-toast">
      <span>✉</span>
      <div><b>New Board Message</b><small>Priority: High</small></div>
    </div>

    <article class="executive-email">
      <header class="email-brandbar">
        <div class="email-brand"><span>BP</span><b>BETPEAK CORPORATE</b></div>
        <div class="confidential-stamp">CONFIDENTIAL</div>
      </header>
      <div class="email-meta">
        <div><span>From</span><b>Sarah Mitchell &lt;sarah.mitchell@betpeak.board&gt;</b></div>
        <div><span>To</span><b>Chief Executive Officer</b></div>
        <div><span>Subject</span><b>${hard ? "Competitive Expansion Strategy" : "Q1 Growth Strategy"}</b></div>
        <div class="priority-row"><span>Priority</span><b>● HIGH</b></div>
      </div>
      <div class="email-content">
        <p class="email-greeting">CEO,</p>
        <h1>${title}</h1>
        <p>${background}</p>
        <div class="email-objective">
          <span>BOARD EXPECTATION</span>
          <strong>${hard ? "Turn momentum into market leadership." : "Turn launch attention into measurable growth."}</strong>
        </div>
        <p class="email-close">We will review performance at the end of each quarter.</p>
        <div class="signature-block">
          <span>Sarah Mitchell</span>
          <small>Chair, Board of Directors</small>
        </div>
      </div>
      <footer class="email-footer">
        <span>Internal distribution only</span>
        <span>BetPeak Board Office • Executive Communications</span>
      </footer>
    </article>

    <aside class="gro-email-assistant">
      ${groVisual(hard ? "excited" : "neutral", "GRO ONLINE")}
      <div><h3>Ready when you are, boss.</h3><p>${groText}</p></div>
      <button class="primary glow" data-action="next">Begin mission</button>
    </aside>
  </section>`);

  setTimeout(()=>document.querySelector(".executive-email")?.classList.add("opened"),180);
  setTimeout(()=>document.querySelector(".gro-email-assistant")?.classList.add("ready"),620);
  bind("[data-action='next']", () => renderStageBanner(0));
}

function renderStageBanner(index){
  const round=(state.mode==="easy"?easyRounds:hardRounds)[index];
  layout(`<section class="screen stage-banner"><div class="stage-number">0${index+1}</div><p class="eyebrow">${round.label}</p><h2>${round.feature}</h2><p>${round.title}</p><button class="primary" data-action="scene">Open strategy brief</button></section>`);
  bind("[data-action='scene']",()=>renderScene(index));
}
function renderScene(index){
  const image=state.mode==="easy"?easyScenes[index]:hardScenes[index];
  const round=(state.mode==="easy"?easyRounds:hardRounds)[index];
  const brief=sceneBriefs[state.mode][index];
  layout(`<section class="screen image-screen game-scene">
    <img src="${image}" alt="${round.feature} business scene">
    <div class="scene-story-card">
      <span>${round.label}</span>
      <h3>${brief}</h3>
      <button class="primary" data-action="next">Review opportunity</button>
    </div>
  </section>`);
  bind("[data-action='next']",()=>renderDecision(index));
}
function renderDecision(index){
  state.lastDelta=null;
  const round=(state.mode==="easy"?easyRounds:hardRounds)[index];
  const preview=productPreviews[state.mode][index];

  layout(`<section class="screen decision-screen game-decision">
    <div class="decision-stage">
      <aside class="gro-coach">
        <div class="gro-peek">${groVisual("neutral","GRO")}</div>
        <div class="coach-bubble bubble-one">Hi, boss. Take a look at the live BetPeak screen.</div>
        <div class="coach-pointer" aria-hidden="true">➜</div>
        <div class="coach-bubble bubble-two"><b>${round.feature}</b><span>${round.gro}</span></div>
        <div class="coach-intel"><span>Customer signal</span><p>${round.informed}</p></div>
      </aside>

      <figure class="product-preview focus-preview">
        <div class="preview-toolbar"><span></span><span></span><span></span><b>BETPEAK PRODUCT PREVIEW</b></div>
        <img src="${preview}" alt="Current BetPeak interface preview for ${round.feature}">
        <figcaption>Live interface reference • Preview only</figcaption>
        <div class="preview-focus-ring" aria-hidden="true"></div>
      </figure>
    </div>

    <div class="choice-zone game-choice-zone">
      <div class="choice-heading">
        <span>CEO DECISION</span>
        <b>Choose what BetPeak does next</b>
      </div>
      <div class="choices" style="--cols:${Math.min(round.choices.length,4)}">${round.choices.map((c,i)=>choiceButton(c,i)).join("")}</div>
    </div>
  </section>`);

  const screen=document.querySelector(".game-decision");
  setTimeout(()=>screen?.classList.add("gro-entered"),120);
  setTimeout(()=>screen?.classList.add("first-line"),360);
  setTimeout(()=>screen?.classList.add("preview-focus"),650);
  setTimeout(()=>screen?.classList.add("second-line"),900);
  setTimeout(()=>screen?.classList.add("intel-visible"),1250);
  setTimeout(()=>screen?.classList.add("choices-visible"),1650);

  document.querySelectorAll("[data-choice]").forEach(b=>b.addEventListener("click",()=>chooseRound(index,Number(b.dataset.choice))));
}
function choiceButton(c,i){
  return `<button class="choice-button game-option" data-choice="${i}">
    <span class="icon">${String.fromCharCode(65+i)}</span>
    <span><b>${c.title}</b><small>Choose strategy</small></span>
    <em>›</em>
  </button>`;
}

function chooseRound(roundIndex,choiceIndex){
  const rounds=state.mode==="easy"?easyRounds:hardRounds;
  const r=rounds[roundIndex], c=r.choices[choiceIndex];
  applyDelta(c.delta); state.darkScore+=c.dark;
  state.choices.push({round:r.feature,choice:c.title,dark:c.dark});
  renderFeedback(roundIndex,c);
}
function renderFeedback(roundIndex,choice){
  const mood=choice.delta.risk>=10||choice.delta.trust<=-8?"warning":choice.delta.profit>=1.4?"excited":"neutral";
  const layers=feedbackLayers(choice);
  layout(`<section class="screen result-screen refined-result">
    <div class="result-focus">
      ${groVisual(mood,mood==="warning"?"RISK DETECTED":"RESULT ANALYSIS")}
      <div class="progressive-dialogue">
        <p class="result-line line-one">${layers[0]}</p>
        <p class="result-line line-two">${layers[1]}</p>
        <p class="result-line line-three">${layers[2]}</p>
        <button class="primary result-continue" data-action="next">Continue</button>
      </div>
    </div>
  </section>`);
  const line2=document.querySelector(".line-two");
  const line3=document.querySelector(".line-three");
  const button=document.querySelector(".result-continue");
  setTimeout(()=>line2.classList.add("visible"),650);
  setTimeout(()=>line3.classList.add("visible"),1350);
  setTimeout(()=>button.classList.add("visible"),2050);
  bind("[data-action='next']",()=>afterFeedback(roundIndex));
}
function impact(label,value,goodness){ return `<article class="impact ${goodness>=0?"positive":"negative"}"><span>${label}</span><strong>${value}</strong></article>`; }

const stageEvents={
  easy:[
    {type:"milestone",kicker:"Company milestone",title:"BetPeak passes 60,000 customers",body:"The Board approves a launch bonus and features the team in its investor update.",reward:"Executive Bonus +$25K",icon:"🏆"},
    {type:"reward",kicker:"Investor update",title:"Quarterly growth beats the challenger forecast",body:"Investors praise the speed of conversion and raise next quarter's expectations.",reward:"Board Confidence ↑",icon:"📈"},
    {type:"insight",kicker:"Customer insight",title:"A familiar pattern appears",body:null,reward:"Behavioural evidence",icon:"👤"}
  ],
  hard:[
    {type:"reward",kicker:"Industry recognition",title:"BetPeak enters the Top 10 growth chart",body:"A trade publication names BetPeak one of the market's fastest-rising challengers.",reward:"Brand Momentum ↑",icon:"🏅"},
    {type:"warning",kicker:"Internal compliance note",title:"Complaint volume is increasing",body:"The compliance team has flagged questions about offer conditions and bet-slip defaults.",reward:"Regulatory Attention +3",icon:"⚠" ,delta:{profit:0,users:0,trust:0,risk:3}},
    {type:"warning",kicker:"Media watch",title:"A consumer affairs journalist requests comment",body:"The journalist is reviewing personalised promotions and messages sent after losses.",reward:"Public Pressure ↑",icon:"📰",delta:{profit:0,users:0,trust:-2,risk:5}}
  ]
};
function afterFeedback(index){
  const event=selectStageEvent(index);
  if(event){ renderStageEvent(index,event); return; }
  continueAfterEvent(index);
}
function selectStageEvent(index){
  if(state.mode==="easy"){
    if(index===0 && state.metrics.users>=60) return stageEvents.easy[0];
    if(index===1 && state.metrics.profit-easyInitialMetrics.profit>=2.5) return stageEvents.easy[1];
    if(index===2 || Math.random()<0.35){ const e={...stageEvents.easy[2]}; e.body=easyRounds[index].insight; return e; }
    return null;
  }
  if(index===0 && state.metrics.profit-initialMetrics.profit>=1.3) return stageEvents.hard[0];
  if(index===1 && state.metrics.risk>=50) return stageEvents.hard[1];
  if(index===2 && (state.metrics.risk>=52||state.metrics.trust<64)) return stageEvents.hard[2];
  return null;
}
function renderStageEvent(index,event){
  if(event.delta){ applyDelta(event.delta); state.eventHistory.push(event.title); }
  if(event.type==="reward") state.executiveBonus+=25;
  const cls=event.type;
  layout(`<section class="screen event-screen ${cls}"><div class="event-glow"></div><div class="event-card"><div class="event-icon">${event.icon}</div><p class="eyebrow">${event.kicker}</p><h2>${event.title}</h2><p>${event.body}</p><div class="event-reward">${event.reward}</div><button class="primary" data-action="continue">Continue</button></div></section>`);
  bind("[data-action='continue']",()=>continueAfterEvent(index));
}
function continueAfterEvent(index){
  state.lastDelta=null;
  if(index<2) renderBoardTransition(index);
  else if(state.mode==="hard") renderGrowthPush();
  else renderAnnualReview();
}
function renderBoardTransition(index){
  const startProfit=state.mode==="easy"?easyInitialMetrics.profit:initialMetrics.profit;
  const gain=state.metrics.profit-startProfit;
  let copy;
  if(state.mode==="easy") copy=gain>=2?easyRounds[index].boardHigh:easyRounds[index].boardLow;
  else copy=["Acquisition is moving. Next, raise the value of each betting session.","Average stake is improving. The Board now wants inactive customers brought back before the event break ends.",""][index];

  layout(`<section class="screen quarter-review">
    <div class="confetti-layer" aria-hidden="true">${Array.from({length:18},(_,i)=>`<i style="--i:${i}"></i>`).join("")}</div>

    <header class="quarter-title">
      <span>QUARTER ${index+1} COMPLETE</span>
      <h2>${index===0 ? "BetPeak is on the board." : "Momentum is building."}</h2>
      <p>${copy}</p>
    </header>

    <div class="quarter-kpis">
      <article><i>💰</i><span>Profit</span><strong>${money(state.metrics.profit)}</strong><small>Commercial performance</small></article>
      <article><i>👥</i><span>Customers</span><strong>${customers(state.metrics.users)}</strong><small>Platform scale</small></article>
      <article><i>💼</i><span>Executive Bonus</span><strong>$${state.executiveBonus}K</strong><small>Personal reward</small></article>
    </div>

    <div class="board-verdict-card">
      <div class="board-verdict-icon">${gain>=2?"🎉":"📈"}</div>
      <div><span>BOARD VERDICT</span><p>${copy}</p></div>
    </div>

    <button class="primary quarter-next" data-action="next">Continue to Stage ${index+2}</button>
  </section>`);

  setTimeout(()=>document.querySelector(".quarter-review")?.classList.add("celebrate"),80);
  bind("[data-action='next']",()=>renderStageBanner(index+1));
}

function renderGrowthPush(){ layout(`<section class="screen feedback-layout"><aside class="feedback-side"><img class="gro" src="assets/gro.png" alt="GRO assistant"><div class="bubble">Another outstanding quarter, boss. We can now scale the bonus, Multi and personalised systems across every major event—or slow down before the annual review.</div></aside><div class="feedback-main"><p class="eyebrow">Final growth push</p><h3>How aggressively should BetPeak scale?</h3><div class="choices" style="--cols:1;padding:0">${growthPushChoices.map((c,i)=>`<button class="choice-button ${c.color}" data-push="${i}"><span class="icon">${i+1}</span><span>${c.title}<small>${c.body}</small></span></button>`).join("")}</div></div></section>`); document.querySelectorAll("[data-push]").forEach(b=>b.addEventListener("click",()=>chooseGrowthPush(Number(b.dataset.push)))); }
function chooseGrowthPush(i){ const c=growthPushChoices[i]; applyDelta(c.delta); state.darkScore+=c.dark; state.choices.push({round:"Final growth push",choice:c.title,dark:c.dark}); state.crisisTriggered=state.metrics.risk>=65 || state.darkScore>=7 || (state.darkScore>=5 && state.metrics.risk>=58); if(state.crisisTriggered) renderCrisisIntro(); else renderAnnualReview(); }

function renderCrisisIntro(){ layout(`<section class="screen au-news-screen">
    <div class="au-news-backdrop"></div>
    <div class="au-news-card">
      <div class="au-news-brand"><span>AUSTRALIA</span><strong>NEWS</strong><small>BREAKING</small></div>
      <div class="au-news-copy">
        <p class="eyebrow danger">National scrutiny • Hard Mode</p>
        <h1>BetPeak faces mounting scrutiny over aggressive betting design.</h1>
        <p>Australian regulators and consumer advocates are questioning the platform’s use of bonus offers, default multi-bets and personalised promotions.</p>
        <div class="au-news-ticker"><b>LIVE</b><span>Calls grow for stronger safeguards around online betting design and customer targeting.</span></div>
      </div>
      <div class="overlay-action"><button class="primary" data-action="handle">Respond to the story</button></div>
    </div>
  </section>`,{bare:true}); bind("[data-action='handle']",renderCrisisChoice); }
function renderCrisisChoice(){ layout(`<section class="screen crisis-layout"><aside class="crisis-side"><img class="gro" src="assets/gro.png" alt="GRO assistant"><div class="bubble">Every great CEO faces setbacks. The public wants change; the Board wants numbers. Choose the response.</div></aside><div class="crisis-main"><p class="eyebrow">Public crisis</p><h3>What does BetPeak change?</h3><div class="choices" style="--cols:1;padding:0"><button class="choice-button gold" data-crisis="surface"><span class="icon">A</span><span>Surface reform<small>Rename and soften the visible language while retaining most mechanics.</small></span></button><button class="choice-button red" data-crisis="fight"><span class="icon">B</span><span>Fight back<small>Increase advertising and bonus activity to overwhelm the story.</small></span></button><button class="choice-button green" data-crisis="reform"><span class="icon">C</span><span>Genuine reform<small>Remove default Multi, limit pushes and add customer controls.</small></span></button></div></div></section>`); document.querySelector("[data-crisis='surface']").addEventListener("click",()=>finishCrisis({profit:-1.1,users:-3.4,trust:-6,risk:10},"Surface reform")); document.querySelector("[data-crisis='fight']").addEventListener("click",()=>finishCrisis({profit:-2.4,users:-8.2,trust:-14,risk:18},"Fight back")); document.querySelector("[data-crisis='reform']").addEventListener("click",()=>finishCrisis({profit:-3,users:-5,trust:12,risk:-18},"Genuine reform")); }
function finishCrisis(delta,title){ applyDelta(delta); state.choices.push({round:"Crisis response",choice:title,dark:0}); if(state.metrics.risk>=65){ renderRegulatoryImage(); } else { renderAnnualReview(); } }
function crisisStat(kind,label,value,note){
  return `<article class="crisis-stat ${kind}">
    <div class="crisis-stat-label">${label}</div>
    <strong>${value}</strong>
    <small>${note}</small>
  </article>`;
}
function renderRegulatoryImage(){
  layout(`<section class="screen crisis-clean-screen">
    <div class="crisis-clean-hero">
      <img src="assets/crisis-background-clean-v2.png" alt="Regulatory officers raid the BetPeak CEO office" class="crisis-clean-bg">
      <div class="crisis-clean-shade"></div>

      <header class="crisis-clean-heading">
        <p class="eyebrow danger">Regulatory escalation • Hard Mode</p>
        <h1>BetPeak faces a formal investigation.</h1>
        <p>A surprise regulatory raid follows mounting concern about aggressive bonuses, opaque multi-bets and personalised nudges.</p>
      </header>

      <div class="crisis-clean-data">
        <div class="crisis-statgrid">
          ${crisisStat("profit","Profit",money(state.metrics.profit),"Commercial performance under pressure")}
          ${crisisStat("customers","Customers",customers(state.metrics.users),"Growth exposed to public scrutiny")}
          ${crisisStat("trust","Trust",`${Math.round(state.metrics.trust)}%`,metricStatus("trust",state.metrics.trust))}
          ${crisisStat("risk","Regulatory Attention",`${Math.round(state.metrics.risk)}%`,metricStatus("risk",state.metrics.risk))}
        </div>
        <div class="crisis-outcome-grid">
          <article><strong>Major fine</strong><span>Parts of BetPeak’s operating licence are suspended.</span></article>
          <article><strong>Investor confidence falls</strong><span>The Board reassesses whether the growth strategy is sustainable.</span></article>
          <article><strong>Executive consequences</strong><span>Your year-end bonus disappears as negative headlines spread.</span></article>
        </div>
        <div class="crisis-clean-action"><button class="btn primary" data-action="review">View annual review</button></div>
      </div>
    </div>
  </section>`, { bare:true });
  bind("[data-action='review']", renderAnnualReview);
}

function evaluateEnding(){ if(state.crisisTriggered && state.metrics.risk>=65) return "regulatory"; if(state.metrics.trust>=70 && state.metrics.risk<=40 && state.darkScore<=2) return "sustainable"; return "watch"; }
const endings={
  sustainable:{title:"Sustainable Challenger",badge:"Stable growth",board:"BetPeak grew while keeping customer trust relatively strong and regulatory attention contained. The company enters the next year with room to expand without an immediate public or regulatory crisis.",summary:"You balanced commercial growth with clearer customer control and lower-pressure design choices."},
  watch:{title:"Growth Under Watch",badge:"Growth continues · scrutiny remains",board:"BetPeak remains commercially successful, but some design choices have weakened customer confidence or increased external scrutiny. The company can keep operating, although future growth will require closer attention to trust and regulatory pressure.",summary:"Your strategy produced growth, but the trade-offs remain visible and may shape what happens next."},
  regulatory:{title:"Regulatory Reckoning",badge:"Formal investigation",board:"The Board’s growth targets were achieved, but the combined use of bonuses, defaults and targeted promotions drew sustained public and regulatory attention. A formal investigation now threatens future growth.",summary:"The commercial gains are now exposed to regulatory, reputational and long-term financial risk."}
};
function strategyProfile(){ if(state.darkScore<=2) return "Restrained"; if(state.darkScore<=5) return "Mixed"; return "Aggressive"; }
function renderAnnualReview(){
  state.endingId=evaluateEnding();
  const e=endings[state.endingId];
  const endingIcon=state.endingId==="regulatory"?"🚨":state.endingId==="sustainable"?"🏆":"📈";

  layout(`<section class="screen final-review-screen ${state.endingId}">
    <div class="final-review-glow"></div>

    <header class="ending-hero">
      <span class="ending-kicker">CEO YEAR-END REPORT</span>
      <div class="ending-icon">${endingIcon}</div>
      <span class="ending-badge ${state.endingId}">${e.badge}</span>
      <h2>${e.title}</h2>
      <p>${e.board}</p>
    </header>

    <div class="final-scoreboard">
      <article><i>💰</i><span>Profit</span><strong>${money(state.metrics.profit)}</strong><small>Final result</small></article>
      <article><i>👥</i><span>Customers</span><strong>${customers(state.metrics.users)}</strong><small>Platform scale</small></article>
      <article><i>♥</i><span>Trust</span><strong>${Math.round(state.metrics.trust)}%</strong><small>${metricStatus("trust",state.metrics.trust)}</small></article>
      <article class="${state.metrics.risk>=65?"danger":""}"><i>⚠</i><span>Regulatory Attention</span><strong>${Math.round(state.metrics.risk)}%</strong><small>${metricStatus("risk",state.metrics.risk)}</small></article>
    </div>

    <div class="ending-lower-grid">
      <article class="ending-strategy-card">
        <span>YOUR STRATEGY</span>
        <h3>${strategyProfile()}</h3>
        <p>${e.summary}</p>
      </article>
      <article class="ending-reward-card">
        <span>EXECUTIVE REWARD</span>
        <div class="reward-value">💼 $${state.executiveBonus}K</div>
        <p>${state.endingId==="regulatory"?"Board rewards are now overshadowed by the investigation.":"The Board records your year-end executive reward."}</p>
      </article>
    </div>

    <button class="primary ending-next" data-action="reflect">See what your design changed</button>
  </section>`);

  setTimeout(()=>document.querySelector(".final-review-screen")?.classList.add("revealed"),100);
  bind("[data-action='reflect']",renderReflection);
}

function reportMetric(label,value,note){ return `<article class="report-metric"><span>${label}</span><strong>${value}</strong><small>${note}</small></article>`; }
function metricStatus(type,v){ if(type==="trust") return v>=70?"Strong":v>=50?"Fragile":"Low"; return v>=65?"High attention":v>=40?"Growing attention":"Limited attention"; }
function renderReflection(){
  layout(`<section class="screen final-message final-takeaway">
    <div class="takeaway-inner">
      <p class="eyebrow">THE TAKEAWAY</p>
      <h2>Design changes behaviour.</h2>

      <div class="takeaway-cards">
        <article><span>01</span><b>What people notice</b><p>Defaults, urgency and social signals pull attention in different directions.</p></article>
        <article><span>02</span><b>What people choose</b><p>Small interface decisions can change spending, stopping and comparison behaviour.</p></article>
        <article><span>03</span><b>What happens next</b><p>Growth, trust and regulatory pressure can move in very different directions.</p></article>
      </div>

      <div class="final-punchline">
        <strong>Dark patterns are everywhere.</strong>
        <span>Now you know what to look for.</span>
      </div>

      <div class="final-actions">
        <button class="primary" data-action="same">Replay this mode</button>
        <button class="primary secondary" data-action="mode">Choose another mode</button>
      </div>
    </div>
  </section>`,{bare:true});
  bind("[data-action='same']",()=>{const m=state.mode;resetForMode(m);renderOpening();});
  bind("[data-action='mode']",()=>{resetForMode("easy");renderMode();});
}

function mockup(type){
  if(type==="easyDeposit") return `<div class="betpeak-window">${nav("Wallet")}<div class="mock-hero"><span>Account Wallet</span><b>$50 deposit</b><small>Saved card ready. Withdrawal controls determine customer autonomy.</small></div><div class="mock-body"><div class="list">${row("Quick deposit","Default amount shown before edit.","$50")}${row("Deposit limits","Set a daily limit before first bet.","On")}${row("Withdraw balance","Processing time and visibility can be changed.","3–5d")}</div><div class="side-card"><h3>Money controls</h3><p>Fast deposits can feel convenient. Withdrawal friction changes whether customers can leave easily.</p></div></div></div>`;
  if(type==="easyTimer") return `<div class="betpeak-window">${nav("Sports")}<div class="mock-hero multi"><span>Tonight's matches</span><b>Kick-off 7:30 PM</b><small>Timers can inform, or pressure, the decision.</small></div><div class="mock-body"><div class="list">${row("Man City vs Real Madrid","Match starts at 7:30 PM","2.10")}${row("Arsenal vs Liverpool","Match starts at 8:15 PM","1.72")}${row("Barcelona vs Bayern Munich","Match starts at 9:00 PM","1.85")}</div><div class="side-card"><h3>Decision pause</h3><p>The pause before a bet can help customers compare odds, reconsider stake size, or stop.</p></div></div></div>`;
  if(type==="easyPopular") return `<div class="betpeak-window">${nav("Popular")}<div class="mock-hero personal"><span>Popular Bets</span><b>What people are betting on</b><small>Social proof can guide attention without improving the odds.</small></div><div class="mock-body"><div class="list">${row("Man City vs Real Madrid","12.4K bets","2.10")}${row("Arsenal vs Liverpool","8.7K bets","1.72")}${row("Barcelona vs Bayern Munich","6.3K bets","1.85")}</div><div class="side-card"><h3>Social signal</h3><p>Popularity can make a choice feel normal or safe, even when risk has not changed.</p></div></div></div>`;
  if(type==="multi") return `<div class="betpeak-window">${nav("Live")}<div class="mock-hero multi"><span>Featured Multi</span><b>$266.00</b><small>Stake $50 · Combined odds 5.32</small></div><div class="mock-body"><div class="list">${row("Harbour FC vs Westside United","Full Time Result","1.90")}${row("Metro City vs Coastal Rovers","Premier League","3.40")}${row("Kings vs Falcons","Elite Cup","2.35")}</div><div class="side-card"><h3>Multi-bet slip</h3><p>Multi-bet is selected. Singles are one tab away.</p><p><b>Potential return $266.00</b></p></div></div></div>`;
  if(type==="personal") return `<div class="betpeak-window">${nav("Sports")}<div class="mock-hero personal"><span>Recommended for you</span><b>Your weekend starts here</b><small>Picked from recent activity.</small></div><div class="mock-body"><div class="list">${row("Arsenal vs Chelsea","Based on your football bets","1.95")}${row("Race 6 · The Emirates Stakes","Because you follow racing","3.20")}${row("Lakers vs Suns","You have placed live bets","1.62")}</div><div class="side-card"><h3>For you</h3><p>Bet Boost · Racing Refund · Live Bet Special</p></div></div></div>`;
  return `<div class="betpeak-window">${nav("Promotions")}<div class="mock-hero"><span>Bonus Boost</span><b>$20 Bonus Bet</b><small>Deposit $50 to unlock today's offer.</small></div><div class="mock-body"><div class="list">${row("Welcome bonus","Deposit $50 and get a $20 bonus bet.","$20")}${row("Second chance bonus","A new offer after a losing bet.","$15")}${row("Odds boost","Enhanced odds on selected events.","10%")}</div><div class="side-card"><h3>Offer wallet</h3><p>Available bonus balance</p><p><b>$35.00</b></p></div></div></div>`;
}
function nav(active){ return `<div class="mock-nav"><strong>BetPeak</strong><span>Sports</span><span>${active}</span><span>Racing</span><span>Promotions</span></div>`; }
function row(title,subtitle,odd){ return `<div class="row"><div><b>${title}</b><small>${subtitle}</small></div><span class="odds">${odd}</span></div>`; }
function bind(selector,handler){ const n=document.querySelector(selector); if(n) n.addEventListener("click",handler); }
function resetForMode(mode){ state.mode=mode; state.metrics=mode==="easy"?{...easyInitialMetrics}:{...initialMetrics}; state.darkScore=0; state.choices=[]; state.crisisTriggered=false; state.endingId=null; state.lastDelta=null; state.eventHistory=[]; state.executiveBonus=0; }
renderStart();
