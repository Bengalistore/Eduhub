let data;

fetch('data.json')
.then(res => res.json())
.then(json => {
  data = json;
  loadBatches();
});

function loadBatches() {
  let container = document.getElementById("batchContainer");
  container.innerHTML = "";

  data.batches.forEach(batch => {
    container.innerHTML += `
      <div class="card" onclick="openSubjects('${batch.id}')">
        <img src="${batch.image}">
        <h4>${batch.title}</h4>
      </div>
    `;
  });
}

function openSubjects(id) {
  hideAll();
  let batch = data.batches.find(b => b.id === id);
  let container = document.getElementById("subjectContainer");

  container.classList.remove("hidden");

  batch.subjects.forEach(sub => {
    container.innerHTML += `
      <div class="card" onclick="openChapters('${id}','${sub.id}')">
        <img src="${sub.image}">
        <h4>${sub.title}</h4>
      </div>
    `;
  });
}

function openChapters(batchId, subjectId) {
  hideAll();
  let batch = data.batches.find(b => b.id === batchId);
  let subject = batch.subjects.find(s => s.id === subjectId);

  let container = document.getElementById("chapterContainer");
  container.classList.remove("hidden");

  subject.chapters.forEach(ch => {
    container.innerHTML += `
      <div class="card" onclick="openClasses('${batchId}','${subjectId}','${ch.id}')">
        <h4>${ch.title}</h4>
      </div>
    `;
  });
}

function openClasses(batchId, subjectId, chapterId) {
  hideAll();

  let batch = data.batches.find(b => b.id === batchId);
  let subject = batch.subjects.find(s => s.id === subjectId);
  let chapter = subject.chapters.find(c => c.id === chapterId);

  let container = document.getElementById("classContainer");
  container.classList.remove("hidden");

  chapter.classes.forEach(cls => {
    container.innerHTML += `
      <div class="card" onclick="playVideo('${cls.video}')">
        <h4>${cls.title}</h4>
        <p>${cls.topic}</p>
        <p>${cls.duration}</p>
        <a href="${cls.pdf}" target="_blank">Notes</a>
      </div>
    `;
  });
}

function playVideo(link) {
  let player = document.getElementById("player");
  player.classList.remove("hidden");

  player.innerHTML = `
    <iframe src="${link}" allowfullscreen></iframe>
  `;
}

function hideAll() {
  document.querySelectorAll('.grid').forEach(el => {
    el.innerHTML = "";
    el.classList.add("hidden");
  });
}
