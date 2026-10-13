const API_URL = "https://hp-api.onrender.com/api/characters";
const main = document.querySelector("main");

const houseLogos = {
  Gryffindor: "./Gryffindor.png",
  Slytherin: "./Slytherin.png",
  Hufflepuff: "./Hufflepuff.png",
  Ravenclaw: "./Ravenclaw.png",
};

function formatValue(value) {
  if (!value) {
    return "Unknown";
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createInfo(label, value) {
  return `
    <div>
      <p class="attr">${label}</p>
      <p>${formatValue(value)}</p>
    </div>
  `;
}

function createDetails(character) {
  const name = character.name || "Unknown";
  const image = character.image || "./images/troll.jpg";
  const actor = character.actor || "Unknown actor";
  const houseLogo = houseLogos[character.house];

  return `
    <section>
      <h3>${name}</h3>
      <div class="perso">
        <figure class="perso__left">
          <img src="${image}" alt="${name}" />
          <figcaption>${actor}</figcaption>
        </figure>
        <div class="perso__right">
          <div>
            ${createInfo("Gender", character.gender)}
            ${createInfo("Eye", character.eyeColour)}
          </div>
          <div>
            ${createInfo("Hair", character.hairColour)}
            ${createInfo("Date of birth", character.dateOfBirth)}
          </div>
          <div>
            ${createInfo("Patronus", character.patronus)}
          </div>
        </div>
      </div>
    </section>
    ${
      houseLogo
        ? `<section class="house__perso">
            <img src="${houseLogo}" alt="${character.house}" />
          </section>`
        : ""
    }
  `;
}

async function loadDetails() {
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id) {
    main.innerHTML = "<p>Aucun personnage sélectionné.</p>";
    return;
  }

  try {
    main.innerHTML = "<p>Chargement...</p>";

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const characters = await response.json();
    const character = characters.find((item) => item.id === id);

    if (!character) {
      main.innerHTML = "<p>Personnage introuvable.</p>";
      return;
    }

    main.innerHTML = createDetails(character);
  } catch (error) {
    console.error(error);
    main.innerHTML = "<p>Impossible de charger le personnage.</p>";
  }
}

loadDetails();