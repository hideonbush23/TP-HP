const API_URL = "https://hp-api.onrender.com/api/characters";
const charactersContainer = document.querySelector(".characters");

function createCharacterCard(character) {
  const name = character.name || "Unknown";
  const image = character.image || "./images/troll.jpg";
  const house = character.house ? character.house.toLowerCase() : "";

  return `
    <div class="${house}">
      <a href="./details.html?id=${character.id}">
        <img src="${image}" alt="${name}" />
      </a>
      <p>${name}</p>
    </div>
  `;
}

async function loadCharacters() {
  try {
    charactersContainer.innerHTML = "<p>Chargement...</p>";

    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    const characters = await response.json();
    const firstTwenty = characters.slice(0, 20);

    charactersContainer.innerHTML = firstTwenty
      .map(createCharacterCard)
      .join("");
  } catch (error) {
    console.error(error);
    charactersContainer.innerHTML =
      "<p>Impossible de charger les personnages.</p>";
  }
}

loadCharacters();