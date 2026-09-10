import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Home, Mail, Users, GitBranch, ArrowLeftRight, Search, Shield,
  BriefcaseBusiness, Dumbbell, WalletCards, Trophy, Settings,
  Bell, UserRound, Cloud, Play, ChevronRight, ChevronDown,
  CircleHelp, TrendingUp, TrendingDown, Activity, Target, Star,
  CalendarDays, SlidersHorizontal, Save, X, Zap, Clock3, Plus,
  Minus, Menu, Crosshair, HeartPulse, FileText, Award
} from "lucide-react";
import "./styles.css";

const nav = [
  ["Home", Home], ["Inbox", Mail], ["Squad", Users], ["Tactics", GitBranch],
  ["Transfers", ArrowLeftRight], ["Scouting", Search], ["Club", Shield],
  ["Staff", BriefcaseBusiness], ["Training", Dumbbell], ["Finances", WalletCards],
  ["Global Ranking", Trophy], ["Settings", Settings]
];

const players = [
  {id:1, name:"André Onana", pos:"GK", role:"Sweeper Keeper", age:28, ovr:86, pot:88, morale:"Very Good", form:8.2, status:"First Team", number:24, nat:"🇨🇲"},
  {id:2, name:"Altay Bayındır", pos:"GK", role:"Goalkeeper", age:26, ovr:80, pot:83, morale:"Good", form:7.2, status:"Rotation", number:1, nat:"🇹🇷"},
  {id:3, name:"Matthijs de Ligt", pos:"CB", role:"Central Defender", age:25, ovr:85, pot:89, morale:"Very Good", form:8.0, status:"First Team", number:4, nat:"🇳🇱"},
  {id:4, name:"Lisandro Martínez", pos:"CB", role:"Central Defender", age:26, ovr:83, pot:86, morale:"Very Good", form:7.8, status:"First Team", number:6, nat:"🇦🇷"},
  {id:5, name:"Luke Shaw", pos:"FB", role:"Full Back", age:29, ovr:79, pot:81, morale:"Good", form:7.0, status:"Rotation", number:23, nat:"🇬🇧"},
  {id:6, name:"Leny Yoro", pos:"CB", role:"Central Defender", age:18, ovr:78, pot:86, morale:"Good", form:7.4, status:"First Team", number:15, nat:"🇫🇷"},
  {id:7, name:"Bruno Fernandes", pos:"AM", role:"Advanced Playmaker", age:30, ovr:88, pot:91, morale:"Excellent", form:8.8, status:"First Team", number:8, nat:"🇵🇹"},
  {id:8, name:"Casemiro", pos:"DM", role:"Ball Winning Midfielder", age:32, ovr:82, pot:85, morale:"Good", form:7.6, status:"Rotation", number:18, nat:"🇧🇷"},
  {id:9, name:"Kobbie Mainoo", pos:"CM", role:"Central Midfielder", age:19, ovr:80, pot:87, morale:"Good", form:8.1, status:"First Team", number:37, nat:"🇬🇧"},
  {id:10, name:"Christian Eriksen", pos:"CM", role:"Deep Lying Playmaker", age:33, ovr:77, pot:79, morale:"Okay", form:7.0, status:"Rotation", number:14, nat:"🇩🇰"},
  {id:11, name:"Alejandro Garnacho", pos:"LW", role:"Winger", age:20, ovr:82, pot:88, morale:"Very Good", form:8.3, status:"First Team", number:17, nat:"🇦🇷"},
  {id:12, name:"Marcus Rashford", pos:"ST", role:"Advanced Forward", age:27, ovr:80, pot:85, morale:"Good", form:7.9, status:"Rotation", number:10, nat:"🇬🇧"},
  {id:13, name:"Amad Diallo", pos:"RW", role:"Winger", age:22, ovr:79, pot:84, morale:"Very Good", form:7.7, status:"Rotation", number:16, nat:"🇨🇮"},
  {id:14, name:"Rasmus Højlund", pos:"ST", role:"Poacher", age:21, ovr:82, pot:89, morale:"Very Good", form:8.4, status:"First Team", number:11, nat:"🇩🇰"},
  {id:15, name:"Joshua Zirkzee", pos:"ST", role:"Complete Forward", age:23, ovr:79, pot:85, morale:"Good", form:7.5, status:"Rotation", number:9, nat:"🇳🇱"}
];

const events = [
  ["Board", "Youth Development Progress", "2h ago"],
  ["Scout", "Scouting report: Lamine Yamal", "4h ago"],
  ["Agent", "Transfer interest in Bruno Fernandes", "6h ago"],
  ["Media", "Fans react to recent performance", "8h ago"]
];

function Badge({children, tone=""}) { return <span className={`badge ${tone}`}>{children}</span>; }
function StatBar({value, max=100}) { return <div className="statbar"><span style={{width:`${Math.min(100,value/max*100)}%`}}/></div>; }
function Panel({title, children, right}) { return <section className="panel"><div className="panel-head"><h3>{title}</h3>{right}</div>{children}</section>; }

function App() {
  const [page, setPage] = useState("Home");
  const [selected, setSelected] = useState(players[0]);
  const [mobileNav, setMobileNav] = useState(false);
  const [speed, setSpeed] = useState("Normal");
  const [highlights, setHighlights] = useState(false);
  const [saved, setSaved] = useState(true);

  const content = useMemo(() => ({
    Home: <HomePage onNavigate={setPage}/>,
    Squad: <SquadPage selected={selected} setSelected={setSelected}/>,
    Tactics: <TacticsPage/>,
    Transfers: <TransfersPage/>,
    Scouting: <ScoutingPage/>,
    Training: <TrainingPage/>,
    Finances: <FinancesPage/>,
    "Global Ranking": <RankingPage/>,
    Club: <ClubPage/>,
    Staff: <StaffPage/>,
    Inbox: <InboxPage/>,
    Settings: <SettingsPage/>
  }[page] || <HomePage onNavigate={setPage}/>), [page, selected]);

  return <div className="app">
    <aside className={`sidebar ${mobileNav ? "open":""}`}>
      <div className="brand"><div className="crest">MU</div><div><b>FMM26</b><small>Manager</small></div></div>
      <button className="mobile-close" onClick={()=>setMobileNav(false)}><X/></button>
      <nav>{nav.map(([label,Icon]) =>
        <button key={label} className={page===label?"active":""} onClick={()=>{setPage(label);setMobileNav(false)}}>
          <Icon size={19}/><span>{label}</span>{label==="Inbox" && <i>3</i>}
        </button>)}</nav>
      <div className="slogan">BIGGER<br/><span>STRONGER</span><br/>TOGETHER</div>
    </aside>

    <main className="main">
      <header className="topbar">
        <div className="mobile-menu"><button onClick={()=>setMobileNav(true)}><Menu/></button></div>
        <div className="club-title"><div className="crest mini">MU</div><div><h1>Manchester United</h1><span>{page}</span></div></div>
        <div className="top-actions">
          <Search/><button className="save" onClick={()=>setSaved(!saved)}><Cloud size={18}/> Cloud Save <b>{saved?"✓":"!"}</b></button>
          <Bell/><UserRound/>
          <div className="date"><CalendarDays size={16}/> Sat 14 Dec 2024<br/><Clock3 size={14}/> 15:30</div>
          <button className="continue"><Play size={16} fill="currentColor"/> Continue</button>
        </div>
      </header>
      <div className="page-wrap">{content}</div>
      <footer className="footer">
        <div><b>Man Utd</b><span>2nd</span><span>32 pts</span></div>
        <div className="motto">PLAY <b>•</b> DEVELOP <b>•</b> WIN</div>
        <div className="match-controls">
          <Play size={14} fill="currentColor"/><label>Match Speed</label>
          <select value={speed} onChange={e=>setSpeed(e.target.value)}><option>Very Slow</option><option>Slow</option><option>Normal</option><option>Fast</option><option>Very Fast</option></select>
          <label>Highlights Only</label><input type="checkbox" checked={highlights} onChange={e=>setHighlights(e.target.checked)}/>
          <Settings size={18}/>
        </div>
      </footer>
    </main>
  </div>
}

function HomePage({onNavigate}) {
  return <div className="dashboard-grid">
    <Panel title="Next Match" right={<Badge tone="green">LIVE SAVE</Badge>}>
      <div className="next-match"><div><small>PREMIER LEAGUE</small><b>Old Trafford</b><span>15:30</span></div><div className="vs"><strong>Man Utd</strong><em>VS</em><strong>Tottenham</strong></div><div className="recent"><small>RECENT FORM</small><div><Badge tone="green">W</Badge><Badge tone="green">W</Badge><Badge tone="gold">D</Badge><Badge tone="green">W</Badge><Badge tone="green">W</Badge></div><b>2nd +1</b><span>32 points</span></div></div>
    </Panel>
    <Panel title="Club Objectives"><ul className="check-list"><li>✓ Win the Premier League</li><li>✓ Reach the Champions League QF</li><li>○ Develop 3 Youth Players</li><li>○ Maintain Financial Stability</li></ul></Panel>
    <Panel title="Manager"><div className="manager-card"><div className="avatar">C</div><div><b>Cyprian</b><small>Level 1 Manager</small><StatBar value={120} max={500}/><small>120 / 500 XP</small></div></div><hr/><h4>Notifications <Badge tone="green">3 new</Badge></h4><p>🟢 Garnacho is back from injury</p><p>🟢 Scout report available: L. Yamal</p><p>🔵 Transfer bid received for Casemiro</p></div></Panel>
    <Panel title="Premier League" right={<button className="link" onClick={()=>onNavigate("Club")}>View Table ›</button>}><LeagueTable/></Panel>
    <Panel title="My Tactics" right={<Badge tone="green">4-4-2</Badge>}><Pitch compact/><div className="tactic-mini"><b>Square System</b><span>Counter • High Press • Balanced Width</span><button onClick={()=>onNavigate("Tactics")}>Edit Tactics →</button></div></Panel>
    <Panel title="Key Players" right={<button className="link" onClick={()=>onNavigate("Squad")}>View Squad ›</button>}><div className="key-list">{players.slice(6,11).map(p=><div key={p.id}><div className="avatar small">{p.name[0]}</div><span><b>{p.name}</b><small>{p.pos}</small></span><strong>{p.form}</strong></div>)}</div></Panel>
    <Panel title="Inbox"><div className="event-list">{events.map(e=><div key={e[1]}><span className="event-icon"><Mail size={15}/></span><span><b>{e[0]}</b><small>{e[1]}</small></span><time>{e[2]}</time></div>)}</div></Panel>
    <Panel title="Latest Comments"><div className="comment">@UTD_Fanatic <b>Love the way we are playing lately!</b><small>♥ 1.2k</small></div><div className="comment">@FootballTalk <b>That midfield is something else.</b><small>♥ 856</small></div><div className="comment">@PremierLeague <b>Could they challenge for the title?</b><small>♥ 742</small></div></Panel>
    <Panel title="Global Ranking"><RankingTable/></Panel>
    <Panel title="Upcoming Events"><div className="event-list"><div><Badge>14 Dec</Badge><span><b>Web Summit</b><small>9:00 PM</small></span><Badge tone="green">Paid</Badge></div><div><Badge>12 Dec</Badge><span><b>Hirodonts</b><small>8:00 PM</small></span><Badge tone="green">Paid</Badge></div><div><Badge>10 Dec</Badge><span><b>Bulsa</b><small>4:00 PM</small></span><Badge tone="green">Paid</Badge></div><div><Badge>08 Dec</Badge><span><b>DHL</b><small>10:00 AM</small></span></div></div></Panel>
  </div>
}

function LeagueTable(){return <table className="table"><thead><tr><th>#</th><th>Club</th><th>P</th><th>GD</th><th>Pts</th></tr></thead><tbody>{[["Liverpool",16,"+22",37],["Man Utd",16,"+18",32],["Man City",16,"+16",31],["Arsenal",16,"+14",30],["Aston Villa",16,"+8",28],["Tottenham",16,"+6",26]].map((r,i)=><tr className={i===1?"selected":""} key={r[0]}><td>{i+1}</td><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td><b>{r[3]}</b></td></tr>)}</tbody></table>}

function RankingTable(){return <table className="table"><thead><tr><th>#</th><th>Player</th><th>Pos</th><th>Rating</th><th>Trend</th></tr></thead><tbody>{[["Jude Bellingham","CM",94,"▲"],["Kylian Mbappé","ST",93,"▲"],["Erling Haaland","ST",92,"▲"],["Vinícius Jr.","LW",91,"▲"],["Rodri","DM",90,"▲"],["Salah","RW",89,"▼"],["De Bruyne","AM",88,"▼"],["B. Fernandes","AM",87,"▲"]].map((r,i)=><tr key={r[0]}><td>{i+1}</td><td className="rank-player">{r[0]}</td><td>{r[1]}</td><td><b>{r[2]}</b></td><td className={r[3]==="▲"?"up":"down"}>{r[3]}</td></tr>)}</tbody></table>}

function SquadPage({selected,setSelected}) {
  return <div className="two-col"><div className="wide"><Panel title="Squad" right={<div className="filters"><button className="active">All (28)</button><button>GK (3)</button><button>DF (8)</button><button>MF (10)</button><button>ST (7)</button><select><option>Position</option></select><select><option>Overall</option></select></div>}><div className="tabs"><b>Squad</b><span>Depth Chart</span><span>Nationalities</span><span>Contract Status</span><span>Player Search</span></div><table className="table roster"><thead><tr><th>#</th><th>Pos</th><th>Name</th><th>Nat</th><th>Age</th><th>Ovr</th><th>Pot</th><th>Morale</th><th>Form</th><th>Status</th></tr></thead><tbody>{players.map(p=><tr key={p.id} className={selected.id===p.id?"selected":""} onClick={()=>setSelected(p)}><td>{p.number}</td><td><Badge>{p.pos}</Badge></td><td className={p.id===3||p.id===7?"yellow-name":""}>{p.name}</td><td>{p.nat}</td><td>{p.age}</td><td><b>{p.ovr}</b></td><td>{p.pot}</td><td>● {p.morale}</td><td><span className="form-dots">▮▮▮</span> {p.form}</td><td><Badge tone={p.status==="First Team"?"green":""}>{p.status}</Badge></td></tr>)}</tbody></table></Panel></div><PlayerPanel player={selected}/></div>
}

function PlayerPanel({player}) {
 return <div className="side-stack"><Panel title="Player"><div className="player-hero"><div className="avatar portrait">{player.name[0]}</div><div><h2>{player.name}</h2><b>{player.role}</b><small>{player.nat} • {player.age} years old</small></div><strong className="ovr">{player.ovr}</strong></div><div className="player-tabs"><b>Overview</b><span>Attributes</span><span>Stats</span><span>Contract</span><span>Happiness</span></div><div className="player-info-grid"><div><small>Preferred Foot</small><b>Right</b></div><div><small>Height</small><b>190 cm</b></div><div><small>Weight</small><b>90 kg</b></div><div><small>Personality</small><b>Balanced</b></div></div></Panel>
 <Panel title="Player Traits"><div className="traits"><span>● Shot Stopper</span><span>● Composure</span><span>● Leadership</span><span>● Distribution</span><span className="purple">◉ Determination</span><span className="purple">◉ Professionalism</span><span className="purple">◉ Consistent</span><span className="purple">◉ Big Game Player</span></div></Panel>
 <Panel title="Player Performance"><Metric label="Playtime" value={8.5}/><Metric label="Form" value={player.form}/><Metric label="Promise" value={7.5}/><div className="morale">😄 {player.morale}</div></Panel>
 <Panel title="Contract"><div className="contract"><span>Expires <b>30 Jun 2028</b></span><span>Wage <b>£150,000 / week</b></span><button>Offer New Contract</button></div></Panel></div>
}

function Metric({label,value}){return <div className="metric"><span>{label}</span><StatBar value={value} max={10}/><b>{value}</b></div>}

function Pitch({compact=false}){let names=["Rashford","Højlund","Fernandes","Mainoo","Casemiro","Antony","Shaw","Martínez","Maguire","Dalot","Onana"];return <div className={`pitch ${compact?"compact":""}`}>{names.map((n,i)=><div key={n} className={`marker m${i}`}><b>{i===10?1:i<2?i+9:i+5}</b><small>{n}</small></div>)}</div>}

function TacticsPage(){
 const [mentality,setMentality]=useState("Balanced");
 const [press,setPress]=useState("Very High");
 return <div className="tactics-grid"><Panel title="Tactic Overview"><h2>Square System</h2><p>Solid defensively, quick transitions, clinical in attack.</p><div className="big-progress">Tactical Familiarity <b>88%</b><StatBar value={88}/></div><div className="instruction-list"><div>⚡ Attacking Style <b>Counter Attack</b></div><div>🛡 Defensive Style <b>High Press</b></div><div>↔ Width <b>Balanced</b></div><div>⏱ Tempo <b>Fast</b></div><div>➜ Passing Style <b>Direct</b></div></div></Panel>
 <Panel title="Formation" right={<Badge tone="green">Active</Badge>}><div className="tactic-top"><select><option>Square System</option><option>Custom</option></select><select><option>4-4-2</option><option>4-3-3</option><option>4-2-3-1</option></select></div><Pitch/></Panel>
 <Panel title="Player Roles"><div className="role-list">{players.slice(0,11).map(p=><div key={p.id}><Badge>{p.pos}</Badge><span>{p.role}</span><select defaultValue={p.name}><option>{p.name}</option></select></div>)}</div></Panel>
 <Panel title="Tactical Instructions"><div className="instruction-box"><h4>In Possession</h4><p>Shorter Passing</p><p>Play Out Of Defence</p><p>Focus Play Through Middle</p><p>Higher Tempo</p><p>Wide Attack</p><h4>In Transition</h4><p>Counter Press</p><p>Quick Transitions</p><p>Distribute Quickly</p><h4>Out Of Possession</h4><p>High Press</p><p>Higher Defensive Line</p><p>Higher Line Of Engagement</p><p>Use Offside Trap</p></div></Panel>
 <Panel title="Controls"><label>Team Mentality</label><select value={mentality} onChange={e=>setMentality(e.target.value)}>{["Very Defensive","Defensive","Balanced","Attacking","Very Attacking"].map(x=><option key={x}>{x}</option>)}</select><label>Pressing</label><select value={press} onChange={e=>setPress(e.target.value)}>{["Very Low","Low","Balanced","High","Very High"].map(x=><option key={x}>{x}</option>)}</select><p className="auto-note"><Zap size={16}/> Other tactical interactions are handled automatically by the match engine.</p></Panel>
 <Panel title="Set Pieces"><div className="setpieces"><span>Corners & Free Kicks <b>Bruno Fernandes</b></span><span>Free Kicks <b>Christian Eriksen</b></span><span>Penalties <b>Casemiro</b></span></div></Panel>
 </div>
}

function TransfersPage(){return <div className="dashboard-grid"><Panel title="Transfer Centre"><div className="tabs"><b>Transfer Centre</b><span>Shortlist</span><span>Search Players</span><span>Transfer History</span></div><table className="table"><thead><tr><th>Player</th><th>Club</th><th>Position</th><th>Fee</th><th>Status</th></tr></thead><tbody>{[["L. Yamal","Barcelona","AM (R)", "€120M","Target"],["V. Osimhen","Napoli","ST","€100M","Negotiation"],["J. Nives","Al Hilal","CM","€60M","Bid"],["N. Timber","Napoli","RB","€50M","Scouting"],["R. Cherki","Lyon","AM (C)","€45M","Watching"]].map(r=><tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><Badge tone="green">{r[4]}</Badge></td></tr>)}</tbody></table></Panel><Panel title="Bidding War Monitor"><div className="bid"><h2>Lamine Yamal</h2><p>Asking price <b>€120M</b></p><div className="bid-row"><span>Manchester United</span><strong>€126M</strong><Badge tone="green">Priority 78%</Badge></div><div className="bid-row"><span>PSG</span><strong>€124M</strong><Badge>Active</Badge></div><div className="bid-row"><span>Real Madrid</span><strong>€118M</strong><Badge>Active</Badge></div><button className="primary">Accept / Withdraw</button></div></Panel></div>}

function ScoutingPage(){return <div className="dashboard-grid"><Panel title="Scout Network"><div className="world-map">WORLD<br/><b>12 SCOUTS</b></div><div className="scout-cards">{["L. Yamal","V. Osimhen","M. Guéhi","J. Nives"].map((x,i)=><div key={x}><div className="avatar small">{x[0]}</div><span><b>{x}</b><small>{["AM (R)","ST","CB","CM"][i]}</small></span><strong>{8.9-i*.4}</strong></div>)}</div></Panel><Panel title="Assignments"><div className="assignment">{["Barcelona","Napoli","Crystal Palace","Al Hilal","Inter"].map((x,i)=><div key={x}><span>{x}</span><Badge>{i+2} days</Badge></div>)}</div></Panel><Panel title="Latest Reports"><div className="report"><b>Lamine Yamal</b><span>AM (R) • OVR 89</span><strong>8.9</strong><p>Exceptional dribbling and chance creation. Strong tactical fit.</p></div><div className="report"><b>V. Osimhen</b><span>ST • OVR 88</span><strong>8.6</strong><p>Clinical forward with strong physical profile.</p></div></Panel></div>}

function TrainingPage(){return <div className="dashboard-grid"><Panel title="Training Focus"><h2>Balanced</h2><StatBar value={85}/><div className="circle-score">85%</div><div className="training-list"><span>Tactical Awareness <b>8.5</b></span><span>Ball Control <b>8.0</b></span><span>Technical <b>8.0</b></span><span>Mentality <b>7.8</b></span></div></Panel><Panel title="Weekly Schedule"><div className="schedule">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i)=><div key={d}><b>{d}</b><span>{["Recovery","Tactical","Tactical","Physical","Tactical","Match","Rest"][i]}</span></div>)}</div></Panel><Panel title="Performance Impact"><div className="impact"><span>Training is improving team cohesion and fitness.</span><Badge tone="green">Positive</Badge></div></Panel></div>}

function FinancesPage(){return <div className="dashboard-grid"><Panel title="Financial Overview"><div className="finance-big"><span><b>£320M</b> Total Balance</span><span><b>£45M</b> Monthly Profit</span><span><b>£612M</b> Transfer Budget</span></div><div className="bars"><i style={{height:"55%"}}/><i style={{height:"75%"}}/><i style={{height:"42%"}}/><i style={{height:"88%"}}/><i style={{height:"68%"}}/></div></Panel><Panel title="Key Financials"><div className="money-list"><span>R. Højlund <b>£12.4M</b></span><span>Rashford <b>£18.7M</b></span><span>D. Baba <b>£14.2M</b></span><span>Carlos Lago <b>£20.0M</b></span></div></Panel><Panel title="Board Confidence"><div className="big-progress">Financial Fair Play <b>Compliant</b><StatBar value={86}/></div></Panel></div>}

function RankingPage(){return <div className="two-col"><Panel title="Global Ranking"><RankingTable/><RankingTable/></Panel><Panel title="Selected Player"><div className="player-hero"><div className="avatar portrait">M</div><div><h2>Kylian Mbappé</h2><b>ST • Paris Saint-Germain</b><small>Global Rank #2</small></div><strong className="ovr">93</strong></div><h3>Global Stats</h3><div className="stats-grid"><b>Goals<br/><span>558</span></b><b>Assists<br/><span>187</span></b><b>Avg Rating<br/><span>8.6</span></b></div><button className="primary">View Player →</button></Panel></div>}

function ClubPage(){return <div className="dashboard-grid"><Panel title="Club Overview"><div className="club-banner"><div className="crest large">MU</div><div><h2>Manchester United</h2><p>Premier League • Old Trafford</p><p>Capacity 75,321</p></div></div></Panel><Panel title="Trophy Cabinet"><div className="trophies"><b>🏆 20<br/><small>Premier League</small></b><b>🏆 3<br/><small>Champions League</small></b><b>🏆 12<br/><small>FA Cup</small></b><b>🏆 6<br/><small>League Cup</small></b></div></Panel><Panel title="Club Vision"><ul className="check-list"><li>✓ Win the Premier League</li><li>✓ Reach the Champions League QF</li><li>○ Develop Youth Players</li><li>○ Build a Sustainable Future</li></ul></Panel></div>}

function StaffPage(){return <div className="dashboard-grid"><Panel title="Coaching Staff"><div className="staff-grid">{["Erik ten Hag","Steve McClaren","Benny McCarthy","Andreas Georgson"].map((x,i)=><div className="staff-card" key={x}><div className="avatar">{x[0]}</div><b>{x}</b><small>{["Head Coach","Assistant Manager","Striker Coach","Set Piece Coach"][i]}</small><strong>{8.1+i*.2}</strong></div>)}</div></Panel><Panel title="Staff Morale"><div className="circle-score">8.5</div><p>Excellent. Staff cohesion is improving.</p></Panel></div>}

function InboxPage(){return <div className="two-col"><Panel title="Inbox"><div className="inbox-full">{events.concat([["Board","Season objectives review","Yesterday"],["Medical","Training availability update","Yesterday"]]).map(e=><div key={e[1]}><span className="event-icon"><Mail/></span><div><b>{e[0]}</b><h3>{e[1]}</h3></div><time>{e[2]}</time><ChevronRight/></div>)}</div></Panel><Panel title="Assistant Manager"><div className="assistant"><div className="avatar large">A</div><h2>Delegation Centre</h2><p>Set return dates, training tasks and routine decisions for automatic assistant-manager handling.</p><button className="primary">Open Delegation</button></div></Panel></div>}

function SettingsPage(){return <div className="two-col"><Panel title="Game Settings"><div className="settings-list"><label>Match event cards <input type="checkbox" defaultChecked/></label><label>Text commentary <input type="checkbox" defaultChecked/></label><label>2D match simulation <input type="checkbox" defaultChecked/></label><label>Automatic tactical decisions <input type="checkbox" defaultChecked/></label><label>Cloud saves <input type="checkbox" defaultChecked/></label></div></Panel><Panel title="Interface"><div className="theme-preview"><div/><div/><div/><b>Navy • Purple • Lime Green</b></div><p>No 3D animations. Static player renders are used for event cards and profiles.</p></Panel></div>}

createRoot(document.getElementById("root")).render(<App/>);