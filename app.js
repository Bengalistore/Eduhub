let data;
let currentFilter = "all";

fetch('data.json')
.then(res => res.json())
.then(json => {
  data = json;
  loadBatches();
});

function loadBatches() {
  let container = document.getElementById("batchContainer");
  container.innerHTML = "";

  let batches = data.batches.filter(b => {
    if(currentFilter === "all") return true;
    if(currentFilter === "neet") return b.type === "neet";
    return b.class === currentFilter;
  });

  batches.forEach(batch => {
    container.innerHTML += `
      <div class="card" onclick="openBatch('${batch.id}')">
        <img src="${batch.image}">
        <h4>${batch.title}</h4>
      </div>
    `;
  });
}

function filterBatch(type) {
  currentFilter = type;

  document.querySelectorAll('.menu button').forEach(btn=>{
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  loadBatches();
}

function openBatch(id) {
  let batch = data.batches.find(b => b.id === id);

  let details = document.getElementById("batchDetails");
  details.classList.remove("hidden");

  details.innerHTML = `
    <h2>${batch.title}</h2>
    <img src="${batch.image}" style="width:100%">
    <p>Date: ${batch.date}</p>
    <p>Time: ${batch.time}</p>
    <p>${batch.overview}</p>

    <h3>Subjects</h3>
    <div class="grid">
      ${batch.subjects.map(sub => `
        <div class="card">
          <img src="${sub.image}">
          <h4>${sub.title}</h4>
        </div>
      `).join('')}
    </div>
  `;
}
