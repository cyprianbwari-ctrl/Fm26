import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const players = [
  { id: 1, name: "Marcus Reed", position: "ST", age: 24, rating: 84, form: 8.2, morale: "Excellent", role: "Advanced Forward", club: "FMM United", status: "Fit" },
  { id: 2, name: "Daniel Silva", position: "AM", age: 22, rating: 82, form: 7.8, morale: "Good", role: "Advanced Playmaker", club: "FMM United", status: "Fit" },
  { id: 3, name: "Ethan Cole", position: "CM", age: 27, rating: 80, form: 7.5, morale: "Good", role: "Box-to-Box", club: "FMM United", status: "Fit" },
  { id: 4, name: "Leo Martin", position: "LW", age: 21, rating: 79, form: 7.4, morale: "Excellent", role: "Inside Forward", club: "FMM United", status: "Fit" },
  { id: 5, name: "James Carter", position: "CB", age: 29, rating: 81, form: 7.1, morale: "Good", role: "Central Defender", club: "FMM United", status: "Fit" },
  { id: 6, name: "Noah Williams", position: "GK", age: 26, rating: 83, form: 7.9, morale: "Excellent", role: "Goalkeeper", club: "FMM United", status: "Fit" },
];

const leagueTable = [
  ["FMM United", 12, 29],
  ["Manchester City", 12, 27],
  ["Liverpool", 12, 25],
  ["Arsenal", 12, 23],
  ["Chelsea", 12, 21],
  ["Newcastle", 12, 19],
];

const navItems = [
  "Home", "Inbox", "Squad", "Tactics", "Transfers", "Scouting",
  "Training", "Club", "Staff", "Finances", "Global Ranking", "Settings",
];

function Panel({ title, children, right }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <h2>{title}</h2>
        {right}
      </div>
      <div className="panel-body">{children}</div>
    </section>
  );
}

function Badge({ children, tone = "default" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("Home");
  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [speed, setSpeed] = useState(1);
  const [highlights, setHighlights] = useState(true);
  const [saved, setSaved] = useState(false);

  const navigate = (target) => setPage(target);

  const saveGame = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F26</div>
          <div>
            <div className="brand-title">FMM26</div>
            <div className="brand-subtitle">Football Manager</div>
          </div>
        </div>

        <div className="slogan">
          <span>BIGGER</span>
          <span>STRONGER</span>
          <span>TOGETHER</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-item ${page === item ? "active" : ""}`}
              onClick={() => navigate(item)}
            >
              <span className="nav-dot" />
              {item}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="club-mini">
            <div className="club-badge">FM</div>
            <div>
              <strong>FMM United</strong>
              <span>Premier League</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div>
            <div className="eyebrow">2026 / 27 SEASON</div>
            <h1>{page}</h1>
          </div>

          <div className="topbar-actions">
            <div className="date-box">
              <span>Saturday</span>
              <strong>12 September 2026</strong>
            </div>
            <button className="secondary-button" onClick={saveGame}>☁ Save</button>
            <button className="primary-button" onClick={() => navigate("Inbox")}>Continue →</button>
          </div>
        </header>

        {saved && <div className="save-message">✓ Game saved successfully</div>}

        <div className="content">
          {page === "Home" && (
            <HomePage
              navigate={navigate}
              players={players}
              leagueTable={leagueTable}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          )}

          {page === "Inbox" && <InboxPage navigate={navigate} />}
          {page === "Squad" && (
            <SquadPage
              players={players}
              selectedPlayer={selectedPlayer}
              setSelectedPlayer={setSelectedPlayer}
            />
          )}
          {page === "Tactics" && <TacticsPage />}
          {page === "Transfers" && <TransfersPage />}
          {page === "Scouting" && <ScoutingPage />}
          {page === "Training" && <TrainingPage />}
          {page === "Club" && <ClubPage />}
          {page === "Staff" && <StaffPage />}
          {page === "Finances" && <FinancesPage />}
          {page === "Global Ranking" && (
            <RankingPage
              players={players}
              setSelectedPlayer={setSelectedPlayer}
              navigate={navigate}
            />
          )}
          {page === "Settings" && <SettingsPage />}
        </div>

        <footer className="match-footer">
          <div>
            <span className="live-dot" />
            Match engine ready
          </div>

          <div className="match-controls">
            <button
              className={highlights ? "control active" : "control"}
              onClick={() => setHighlights(!highlights)}
            >
              {highlights ? "Highlights" : "Full Match"}
            </button>
            {[1, 2, 3].map((value) => (
              <button
                key={value}
                className={speed === value ? "control active" : "control"}
                onClick={() => setSpeed(value)}
              >
                {value}×
              </button>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}

function HomePage({ navigate, players, leagueTable, selectedPlayer, setSelectedPlayer }) {
  return (
    <div className="page-grid">
      <div className="hero-card">
        <div>
          <Badge tone="green">NEXT MATCH</Badge>
          <h2>FMM United vs Liverpool</h2>
          <p className="muted">Premier League · Old Trafford · 15:00</p>

          <div className="match-preview">
            <div className="team">
              <div className="large-badge">FM</div>
              <strong>FMM United</strong>
            </div>
            <div className="vs">VS</div>
            <div className="team">
              <div className="large-badge opponent">LIV</div>
              <strong>Liverpool</strong>
            </div>
          </div>

          <button className="primary-button" onClick={() => navigate("Tactics")}>
            Prepare Match →
          </button>
        </div>

        <div className="hero-stats">
          <Stat label="League Position" value="1st" />
          <Stat label="Points" value="29" />
          <Stat label="Goal Difference" value="+17" />
          <Stat label="Form" value="WWDWW" />
        </div>
      </div>

      <div className="two-column">
        <Panel
          title="Club Objectives"
          right={<button className="link" onClick={() => navigate("Club")}>View Club →</button>}
        >
          <div className="objective">
            <div><strong>Win the Premier League</strong><span>Primary objective</span></div>
            <div className="progress"><div style={{ width: "72%" }} /></div>
            <b>72%</b>
          </div>
          <div className="objective">
            <div><strong>Reach Champions League</strong><span>Board expectation</span></div>
            <div className="progress"><div style={{ width: "88%" }} /></div>
            <b>88%</b>
          </div>
        </Panel>

        <Panel title="Manager">
          <div className="manager-card">
            <div className="manager-avatar">CM</div>
            <div>
              <strong>Club Manager</strong>
              <span>Manager Level 18</span>
              <Badge tone="green">Excellent</Badge>
            </div>
          </div>
          <div className="manager-stats">
            <Stat label="Matches" value="164" />
            <Stat label="Wins" value="103" />
            <Stat label="Win %" value="62.8%" />
          </div>
        </Panel>
      </div>

      <div className="two-column">
        <Panel
          title="Premier League"
          right={<button className="link" onClick={() => navigate("Global Ranking")}>Full Table →</button>}
        >
          <table className="data-table">
            <thead>
              <tr><th>#</th><th>Club</th><th>GP</th><th>PTS</th></tr>
            </thead>
            <tbody>
              {leagueTable.map((row, index) => (
                <tr key={row[0]} className={index === 0 ? "highlight-row" : ""}>
                  <td>{index + 1}</td><td>{row[0]}</td><td>{row[1]}</td><td><strong>{row[2]}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="My Tactics" right={<button className="link" onClick={() => navigate("Tactics")}>Edit →</button>}>
          <div className="tactic-preview">
            <div className="pitch-mini">
              <div className="player p1">ST</div><div className="player p2">ST</div>
              <div className="player p3">AM</div><div className="player p4">CM</div>
              <div className="player p5">CM</div><div className="player p6">LW</div>
              <div className="player p7">RB</div><div className="player p8">CB</div>
              <div className="player p9">CB</div><div className="player p10">LB</div>
              <div className="player p11">GK</div>
            </div>
            <div>
              <Badge tone="purple">SQUARE SYSTEM</Badge>
              <h3>4-4-2</h3>
              <p className="muted">Closest 3 players press. Others maintain shape.</p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Key Players" right={<button className="link" onClick={() => navigate("Squad")}>View Squad →</button>}>
        <div className="player-grid">
          {players.slice(0, 4).map((player) => (
            <button
              className={`player-card ${selectedPlayer.id === player.id ? "selected" : ""}`}
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="player-face">
                {player.name.split(" ").map((word) => word[0]).join("")}
              </div>
              <div className="player-info">
                <strong>{player.name}</strong>
                <span>{player.position}</span>
              </div>
              <div className="player-rating">{player.rating}</div>
            </button>
          ))}
        </div>
      </Panel>

      <div className="two-column">
        <Panel title="Inbox">
          <div className="message">
            <span className="message-dot" />
            <div><strong>Assistant Manager</strong><p>Training report is ready to review.</p></div>
            <span className="time">09:42</span>
          </div>
          <div className="message">
            <span className="message-dot" />
            <div><strong>Scout Network</strong><p>New striker identified in Spain.</p></div>
            <span className="time">Yesterday</span>
          </div>
          <button className="link" onClick={() => navigate("Inbox")}>Open Inbox →</button>
        </Panel>

        <Panel title="Latest Comments">
          <div className="comment-card">
            <div className="comment-avatar">JR</div>
            <div><strong>James Robertson</strong><span>@footballtalk</span><p>FMM United look unstoppable this season.</p></div>
          </div>
          <div className="comment-card">
            <div className="comment-avatar">SK</div>
            <div><strong>Sarah King</strong><span>@premwatch</span><p>The Square System is becoming their identity.</p></div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function InboxPage({ navigate }) {
  const messages = [
    ["STAFF", "Assistant Manager — Training Report", "Three players have improved their current training targets.", "purple"],
    ["SCOUT", "New Scouting Report", "A promising young midfielder has been discovered.", "green"],
    ["BOARD", "Board Meeting", "The board is pleased with current league performance.", "default"],
    ["PLAYER", "Player Happiness", "Marcus Reed is happy with his current playing time.", "default"],
  ];

  return (
    <div className="page-grid">
      <Panel title="Inbox">
        <div className="inbox-list">
          {messages.map(([tag, title, text, tone], index) => (
            <div className={`inbox-item ${index === 0 ? "unread" : ""}`} key={title}>
              <Badge tone={tone}>{tag}</Badge>
              <div><strong>{title}</strong><p>{text}</p></div>
              <button className="link">Open</button>
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Delegation">
        <div className="delegation">
          <div><strong>Assistant Manager</strong><p className="muted">Automatically handles routine tasks when delegation is enabled.</p></div>
          <Badge tone="green">ACTIVE</Badge>
        </div>
        <div className="delegation">
          <div><strong>Returning Player Dates</strong><p className="muted">Assistant manager monitors players returning from injury.</p></div>
          <Badge tone="green">AUTO</Badge>
        </div>
        <button className="secondary-button" onClick={() => navigate("Staff")}>Manage Staff</button>
      </Panel>
    </div>
  );
}

function SquadPage({ players, selectedPlayer, setSelectedPlayer }) {
  return (
    <div className="squad-layout">
      <div>
        <Panel title="First Team Squad" right={<Badge tone="green">23 PLAYERS</Badge>}>
          <div className="squad-filters">
            <button className="filter active">All</button><button className="filter">GK</button>
            <button className="filter">DEF</button><button className="filter">MID</button>
            <button className="filter">ATT</button>
          </div>
          <div className="roster">
            {players.map((player) => (
              <button
                key={player.id}
                className={`roster-row ${selectedPlayer.id === player.id ? "selected" : ""}`}
                onClick={() => setSelectedPlayer(player)}
              >
                <div className="small-face">{player.name.split(" ").map((word) => word[0]).join("")}</div>
                <div className="roster-name"><strong>{player.name}</strong><span>{player.role}</span></div>
                <span className="position">{player.position}</span>
                <span className="form">{player.form}</span>
                <span className="rating">{player.rating}</span>
                <Badge tone="green">{player.status}</Badge>
              </button>
            ))}
          </div>
        </Panel>
      </div>
      <PlayerDetails player={selectedPlayer} />
    </div>
  );
}

function PlayerDetails({ player }) {
  return (
    <div className="player-details">
      <Panel title="Player Hub">
        <div className="profile-header">
          <div className="profile-face">{player.name.split(" ").map((word) => word[0]).join("")}</div>
          <div><h2>{player.name}</h2><p>{player.role}</p><Badge tone="green">{player.morale}</Badge></div>
          <div className="profile-rating">{player.rating}</div>
        </div>
        <div className="stat-grid">
          <Stat label="Age" value={player.age} />
          <Stat label="Position" value={player.position} />
          <Stat label="Form" value={player.form} />
          <Stat label="Morale" value="High" />
        </div>
      </Panel>

      <Panel title="Attributes">
        <div className="attribute-list">
          <Attribute name="Pace" value={88} /><Attribute name="Shooting" value={85} />
          <Attribute name="Passing" value={81} /><Attribute name="Dribbling" value={84} />
          <Attribute name="Physical" value={79} /><Attribute name="Defending" value={42} />
        </div>
      </Panel>

      <Panel title="Personality & Traits">
        <div className="traits">
          <Badge tone="purple">Professional</Badge><Badge tone="green">Consistent</Badge>
          <Badge>Determined</Badge><Badge>Big Match Player</Badge>
        </div>
      </Panel>

      <Panel title="Positional History">
        <div className="position-history">
          <div><span className="natural-position">ST</span><strong>Natural</strong></div>
          <div><span>AM</span><strong>Accomplished</strong></div>
          <div><span>RW</span><strong>Competent</strong></div>
        </div>
      </Panel>
    </div>
  );
}

function Attribute({ name, value }) {
  return (
    <div className="attribute">
      <div><span>{name}</span><strong>{value}</strong></div>
      <div className="attribute-bar"><div style={{ width: `${value}%` }} /></div>
    </div>
  );
}

function TacticsPage() {
  return (
    <div className="page-grid">
      <Panel title="Square System" right={<Badge tone="purple">4-4-2</Badge>}>
        <div className="tactics-layout">
          <div className="large-pitch">
            <div className="pitch-line halfway" />
            {[
              ["tp1", "ST"], ["tp2", "ST"], ["tp3", "LW"], ["tp4", "CM"], ["tp5", "CM"],
              ["tp6", "RW"], ["tp7", "LB"], ["tp8", "CB"], ["tp9", "CB"], ["tp10", "RB"], ["tp11", "GK"],
            ].map(([className, label]) => <div className={`pitch-player ${className}`} key={className}>{label}</div>)}
          </div>

          <div className="tactical-settings">
            <h3>Team Mentality</h3>
            <div className="choice-row">
              <button className="choice">Defensive</button><button className="choice active">Balanced</button><button className="choice">Attacking</button>
            </div>
            <h3>Pressing</h3>
            <div className="setting-card"><strong>Press Immediately</strong><p>Closest 3 players press. Others maintain shape.</p></div>
            <h3>Transition</h3>
            <div className="setting-card"><strong>Fast Counter</strong><p>Immediately attack space after winning possession.</p></div>
            <h3>Final Third</h3>
            <div className="setting-card"><strong>Through Balls</strong><p>Prioritize through balls behind the defensive line.</p></div>
          </div>
        </div>
      </Panel>

      <div className="three-column">
        <Panel title="Set Pieces"><SettingLine label="Corners" value="Near Post" /><SettingLine label="Free Kicks" value="Best Taker" /><SettingLine label="Penalties" value="Marcus Reed" /></Panel>
        <Panel title="Player Roles"><SettingLine label="ST" value="Advanced Forward" /><SettingLine label="CM" value="Box-to-Box" /><SettingLine label="CB" value="Central Defender" /></Panel>
        <Panel title="Automation"><SettingLine label="Match Decisions" value="Automatic" /><SettingLine label="Pressing" value="Situational" /><SettingLine label="Runs" value="Automatic" /></Panel>
      </div>
    </div>
  );
}

function SettingLine({ label, value }) {
  return <div className="setting-line"><span>{label}</span><strong>{value}</strong></div>;
}

function TransfersPage() {
  const targets = [
    ["Lucas Ferreira", "AM / CM · 23 years", "€42M", "82% FIT"],
    ["Oliver Hayes", "CB · 25 years", "€35M", "76% FIT"],
  ];

  return (
    <div className="page-grid">
      <Panel title="Transfer Centre">
        {targets.map(([name, info, price, fit]) => (
          <div className="transfer-card" key={name}>
            <div className="transfer-player"><div className="profile-face small">PL</div><div><strong>{name}</strong><span>{info}</span></div></div>
            <div><span className="muted">Asking Price</span><strong className="money">{price}</strong></div>
            <Badge tone="green">{fit}</Badge>
            <button className="primary-button">Make Offer</button>
          </div>
        ))}
      </Panel>

      <Panel title="Bidding War Monitor">
        <div className="bidding">
          <div className="bidding-header"><strong>Lucas Ferreira</strong><Badge tone="purple">ACTIVE</Badge></div>
          <div className="bid-row"><span>FMM United</span><strong>€42M</strong><Badge tone="green">Priority</Badge></div>
          <div className="bid-row"><span>Manchester City</span><strong>€40M</strong><Badge>Competing</Badge></div>
          <div className="bid-row"><span>Arsenal</span><strong>€37M</strong><Badge>Competing</Badge></div>
          <p className="muted">Clubs may continue bidding until they reach their budget limit or withdraw.</p>
          <div className="button-row"><button className="primary-button">Increase Offer</button><button className="secondary-button">Withdraw</button></div>
        </div>
      </Panel>
    </div>
  );
}

function ScoutingPage() {
  return (
    <div className="page-grid">
      <div className="three-column">
        <Panel title="Scouting Network"><Stat label="Scouts" value="8" /><Stat label="Countries" value="24" /><Stat label="Reports" value="146" /></Panel>
        <Panel title="Current Focus"><SettingLine label="Position" value="ST" /><SettingLine label="Age" value="18–25" /><SettingLine label="Potential" value="Elite" /></Panel>
        <Panel title="Scout Efficiency"><Stat label="Accuracy" value="91%" /><Stat label="Reports" value="34" /><Badge tone="green">Excellent</Badge></Panel>
      </div>
      <Panel title="Latest Scout Reports">
        <div className="scout-row"><div className="small-face">JP</div><div><strong>Javier Perez</strong><span>ST · Spain · Age 20</span></div><Badge tone="green">91% Potential</Badge><strong>€18M</strong></div>
        <div className="scout-row"><div className="small-face">AK</div><div><strong>Adam Khan</strong><span>CM · England · Age 19</span></div><Badge tone="purple">88% Potential</Badge><strong>€12M</strong></div>
      </Panel>
    </div>
  );
}

function TrainingPage() {
  const days = [["Mon", "Recovery"], ["Tue", "Possession"], ["Wed", "Attacking"], ["Thu", "Pressing"], ["Fri", "Set Pieces"], ["Sat", "Match"], ["Sun", "Rest"]];

  return (
    <div className="page-grid">
      <Panel title="Weekly Training">
        <div className="training-grid">
          {days.map(([day, session]) => (
            <div className="training-day" key={day}>
              <span>{day}</span><strong>{session}</strong>
              <Badge tone={session === "Match" ? "purple" : "green"}>{session === "Match" ? "MATCH" : "TEAM"}</Badge>
            </div>
          ))}
        </div>
      </Panel>

      <div className="two-column">
        <Panel title="Player Development"><Attribute name="Technical" value={82} /><Attribute name="Mental" value={76} /><Attribute name="Physical" value={79} /></Panel>
        <Panel title="Assistant Manager"><p className="muted">The assistant manager will automatically adjust individual workloads when required.</p><Badge tone="green">AUTOMATIC</Badge></Panel>
      </div>
    </div>
  );
}

function ClubPage() {
  return (
    <div className="page-grid">
      <div className="hero-card compact">
        <div><Badge tone="purple">FMM UNITED</Badge><h2>A club moving forward</h2><p className="muted">Building a stronger squad, stronger identity and stronger future.</p></div>
        <div className="club-badge giant">FM</div>
      </div>

      <div className="three-column">
        <Panel title="Reputation"><Stat label="World Reputation" value="4.5 ★" /><Stat label="League Reputation" value="5.0 ★" /></Panel>
        <Panel title="Facilities"><Stat label="Training" value="18/20" /><Stat label="Youth" value="17/20" /></Panel>
        <Panel title="Trophies"><Stat label="League Titles" value="14" /><Stat label="European Cups" value="3" /></Panel>
      </div>

      <Panel title="Board Objectives">
        <div className="objective-row"><strong>Win the Premier League</strong><Badge tone="green">ON TRACK</Badge></div>
        <div className="objective-row"><strong>Develop young players</strong><Badge tone="green">ON TRACK</Badge></div>
        <div className="objective-row"><strong>Reach Champions League Quarter Final</strong><Badge>IN PROGRESS</Badge></div>
      </Panel>
    </div>
  );
}

function StaffPage() {
  return (
    <div className="page-grid">
      <div className="three-column">
        <StaffCard initials="AM" name="Assistant Manager" role="First Team" rating="18" />
        <StaffCard initials="SC" name="Head Scout" role="Scouting" rating="19" />
        <StaffCard initials="TC" name="Head Coach" role="Training" rating="18" />
      </div>

      <Panel title="Delegated Responsibilities">
        <SettingLine label="Training adjustments" value="Automatic" />
        <SettingLine label="Injury monitoring" value="Automatic" />
        <SettingLine label="Returning players" value="Automatic" />
        <SettingLine label="Routine inbox" value="Automatic" />
      </Panel>
    </div>
  );
}

function StaffCard({ initials, name, role, rating }) {
  return (
    <Panel title={role}>
      <div className="staff-card"><div className="profile-face small">{initials}</div><div><strong>{name}</strong><span>Staff rating {rating}/20</span></div></div>
    </Panel>
  );
}

function FinancesPage() {
  return (
    <div className="page-grid">
      <div className="three-column">
        <Panel title="Balance"><div className="financial-number">€184.6M</div><span className="muted">Available balance</span></Panel>
        <Panel title="Transfer Budget"><div className="financial-number">€76.2M</div><span className="muted">Available to spend</span></Panel>
        <Panel title="Wage Budget"><div className="financial-number">€2.4M</div><span className="muted">Weekly remaining</span></Panel>
      </div>

      <Panel title="Financial Overview">
        <div className="finance-row"><span>Matchday income</span><strong>+€1.8M</strong></div>
        <div className="finance-row"><span>Commercial income</span><strong>+€3.2M</strong></div>
        <div className="finance-row"><span>Wages</span><strong>-€1.7M</strong></div>
        <div className="finance-row"><span>Transfers</span><strong>-€12.0M</strong></div>
        <div className="finance-row total"><span>Net movement</span><strong>+€1.3M</strong></div>
      </Panel>
    </div>
  );
}

function RankingPage({ players, setSelectedPlayer, navigate }) {
  return (
    <div className="page-grid">
      <Panel title="Global Player Ranking">
        <p className="muted">Top 100 players are highlighted. Select a player to open their profile.</p>
        <div className="ranking-list">
          {players.map((player, index) => (
            <button
              className="ranking-row"
              key={player.id}
              onClick={() => { setSelectedPlayer(player); navigate("Squad"); }}
            >
              <span className="rank-number">{index + 1}</span>
              <div className="ranking-face">{player.name.split(" ").map((word) => word[0]).join("")}</div>
              <div className="ranking-player"><strong>{player.name}</strong><span>{player.position}</span></div>
              <span className="ranking-movement up">▲ +{index + 2}</span>
              <strong className="ranking-rating">{player.rating}</strong>
            </button>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function SettingsPage() {
  const [autoSave, setAutoSave] = useState(true);
  const [autoContinue, setAutoContinue] = useState(false);
  const [sound, setSound] = useState(true);

  return (
    <div className="page-grid">
      <Panel title="Game Settings">
        <Toggle label="Automatic Save" description="Save the game automatically during progression." enabled={autoSave} setEnabled={setAutoSave} />
        <Toggle label="Automatic Continue" description="Allow the game to progress when appropriate." enabled={autoContinue} setEnabled={setAutoContinue} />
        <Toggle label="Match Sounds" description="Enable match engine audio effects." enabled={sound} setEnabled={setSound} />
      </Panel>

      <Panel title="Match Engine">
        <SettingLine label="Simulation" value="2D" />
        <SettingLine label="3D Animations" value="Disabled" />
        <SettingLine label="Highlights" value="Available" />
        <SettingLine label="Speed Controls" value="1× / 2× / 3×" />
      </Panel>

      <Panel title="Game Identity">
        <div className="identity-preview"><div className="brand-mark">F26</div><div><strong>FMM26</strong><span>BIGGER · STRONGER · TOGETHER</span></div></div>
      </Panel>
    </div>
  );
}

function Toggle({ label, description, enabled, setEnabled }) {
  return (
    <div className="toggle-row">
      <div><strong>{label}</strong><p>{description}</p></div>
      <button className={`toggle ${enabled ? "on" : ""}`} onClick={() => setEnabled(!enabled)}><span /></button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
