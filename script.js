const years = document.querySelectorAll(".year");
const folders = document.querySelector(".folders");
const photo = document.querySelector(".photo");
const personName = document.querySelector(".person-info h2");
const personRole = document.querySelector(".role");
const textTitle = document.querySelector(".text-block h3");
const textDescription = document.querySelector(".text-block p");
const actions = document.querySelector(".actions");
let selectedYear = document.querySelector(".year.active")?.textContent.trim() || "2026";

const peopleByYear = {
  "2026": {
    "Пред": {
      name: "Козьмин Анатолий Владиславович",
      role: "Председатель Цифровых Технологий",
      cardText: "Председатели",
      photo: "Картинка председателя",
      title: "Информация о председателе",
      description:
        "Отвечает за организацию команды, распределение задач и развитие проектов направления.",
      actions: ["✅ Организовал работу команды", "📌 Следил за задачами", "⭐ Развивал направление"],
    },
    "ПЗ": {
      name: "Первый зам",
      role: "Первый заместитель",
      cardText: "Первый зам",
      photo: "Картинка ПЗ",
      title: "Материалы практических занятий",
      description:
        "Здесь можно хранить темы занятий, задания, ссылки на проекты и результаты работы за выбранный год.",
      actions: ["✅ Добавлены темы занятий", "📝 Подготовлены задания", "⭐ Собраны результаты"],
    },
    "Секретарь": {
      name: "Секретарь",
      role: "Секретариат",
      cardText: "Секретариат",
      photo: "Картинка секретаря",
      title: "Информация о секретаре",
      description:
        "Помогает вести списки, фиксировать договоренности и поддерживать порядок в документах направления.",
      actions: ["✅ Ведет списки", "📄 Оформляет документы", "⭐ Помогает команде"],
    },
  },
};

let people = peopleByYear[selectedYear] || peopleByYear["2026"];
let currentSection = Object.keys(people)[0] || "Пред";

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (symbol) => {
    const symbols = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return symbols[symbol];
  });
}

function renderFolders() {
  folders.innerHTML = Object.entries(people)
    .map(
      ([section, person]) => `
        <a href="#person" class="folder-card" data-section="${escapeHtml(section)}">
          <div class="folder-icon">📁</div>
          <h3>${escapeHtml(section)}</h3>
          <p>${escapeHtml(person.cardText)}</p>
        </a>
      `
    )
    .join("");

  document.querySelectorAll(".folder-card").forEach((card) => {
    card.addEventListener("click", () => {
      currentSection = card.dataset.section;
      renderProfile(currentSection);
  });
});
}

function renderProfile(section) {
  const person = people[section];

  if (!person) {
    return;
  }

  photo.textContent = person.photo;
    personName.textContent = person.name;
  personRole.textContent = `${person.role} ${selectedYear}`;
  textTitle.textContent = person.title;
  textDescription.textContent = person.description;
  actions.innerHTML = person.actions
    .map((action) => `<div class="action">${escapeHtml(action)}</div>`)
    .join("");
}

years.forEach((year) => {
  year.addEventListener("click", () => {
    years.forEach((button) => button.classList.remove("active"));
    year.classList.add("active");
    selectedYear = year.textContent.trim();
    people = peopleByYear[selectedYear] || peopleByYear["2026"];
    currentSection = people[currentSection] ? currentSection : Object.keys(people)[0] || "Пред";
    renderFolders();

    if (location.hash === "#person") {
      renderProfile(currentSection);
    }
  });
});

if (!location.hash) {
  location.hash = "home";
}

renderFolders();
renderProfile(currentSection);
