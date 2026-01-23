const apiBase = "/api";

/* -----------------------------
   Stations by State
----------------------------- */
async function getStationsByState() {
  const state = document.getElementById("stateInput").value;
  const res = await fetch(`${apiBase}/stations?state=${state}`);
  const data = await res.json();
  renderStations(data, "stationsResult");
}

function renderStations(data, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = "";

  if (!data.success || data.data.length === 0) {
    container.innerHTML = "<p>No stations found.</p>";
    return;
  }

  data.data.forEach(s => {
    const paramId = `params-${s.station_code}`;

    const div = document.createElement("div");
    div.className = "result-card";
    div.innerHTML = `
      <strong>${s.location}</strong><br/>
      State: ${s.state}<br/>
      Code: ${s.station_code}<br/><br/>

      <button onclick="getParameters('${s.station_code}','${paramId}')">
        View Parameters
      </button>

      <div id="${paramId}"></div>
    `;
    container.appendChild(div);
  });
}

/* -----------------------------
   Station Parameters
----------------------------- */
async function getParameters(code, targetId) {
  const res = await fetch(`${apiBase}/stations/${code}/parameters`);
  const data = await res.json();
  const box = document.getElementById(targetId);

  if (!data.success) {
    box.innerHTML = "<p>No parameter data</p>";
    return;
  }

  const p = data.data;
  box.innerHTML = `
    <div class="params">
      💧 DO: ${p.dissolved_oxygen}<br/>
      ⚗️ pH: ${p.ph}<br/>
      🧪 BOD: ${p.bod}<br/>
      🧬 Nitrate: ${p.nitrate}<br/>
      🦠 Fecal Coliform: ${p.fecal_coliform}
    </div>
  `;
}

/* -----------------------------
   WQI by Station Code
----------------------------- */
async function getWQIByCode() {
  const code = document.getElementById("stationCodeInput").value;
  const res = await fetch(`${apiBase}/wqi/detail?station_code=${code}`);
  const data = await res.json();

  const container = document.getElementById("wqiResult");
  container.innerHTML = "";

  if (!data.success) {
    container.innerHTML = "<p>Data not found.</p>";
    return;
  }

  container.innerHTML = `
    <div class="result-card">
      <div class="wqi ${data.status.toLowerCase().replace(" ", "-")}">
        WQI: ${data.wqi_result}
      </div>
      Status: <strong>${data.status}</strong>
    </div>
  `;
}

/* -----------------------------
   Dashboard
----------------------------- */
async function getDashboard() {
  const state = document.getElementById("dashboardStateInput").value;
  const url = state
    ? `${apiBase}/stations/wqi?state=${state}`
    : `${apiBase}/stations/wqi`;

  const res = await fetch(url);
  const data = await res.json();
  renderDashboard(data);
}

function renderDashboard(data) {
  const container = document.getElementById("dashboardResult");
  container.innerHTML = "";

  if (!data.success) {
    container.innerHTML = "<p>No data.</p>";
    return;
  }

  data.data.forEach(s => {
    const cls = s.category.toLowerCase().replace(" ", "-");
    const div = document.createElement("div");
    div.className = "result-card";
    div.innerHTML = `
      <strong>${s.location}</strong><br/>
      State: ${s.state}<br/>
      <div class="wqi ${cls}">
        WQI: ${s.wqi} (${s.category})
      </div>
    `;
    container.appendChild(div);
  });
}
