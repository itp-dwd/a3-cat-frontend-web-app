async function getEffects() {
  const URL = "http://strainapi.evanbusse.com/DHsuTyH/searchdata/effects";
  const response = await fetch(URL);
  const effects = await response.json();
  const effectsCategories = {};
  effects.forEach(effect => {
    if (!effectsCategories[effect.type]) {
      effectsCategories[effect.type] = [];
    }
    effectsCategories[effect.type].push(effect.effect);
  });
  return effectsCategories;
}

async function getRandomGenre() {
  const URL = "https://binaryjazz.us/wp-json/genrenator/v1/genre/";
  const response = await fetch(URL);
  const genre = await response.json();
  return genre;
}

window.onload = async () => {
  generateText();
  bindButton();
};

function bindButton() {
  const button = document.getElementById("new-genre");
  button.onclick = generateText;
}

async function generateText() {
  const effects = await getEffects();
  const genre = await getRandomGenre();
  const mood = Math.floor(Math.random()*2) < 1 ? "positive" : "negative";
  const feeling = effects[mood][Math.floor(Math.random() * effects[mood].length)].toLowerCase();
  let sentence;
  if (feeling === "dry eyes" || feeling === "dry mouth") {
    sentence = `When I listen to ${genre}, it gives me ${feeling}.`;
  } else {
    sentence = `When I listen to ${genre}, it makes me feel ${feeling}.`;
  }
  const paragraph = document.getElementById("genre-container");
  paragraph.innerText = sentence;
}