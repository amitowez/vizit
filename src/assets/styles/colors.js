function kebabize(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

// Палитры: [dark «Ночной зал», light «Пергамент», eros «Будуар»]
const colors = {
  background: ["#16100a", "#ece0c4", "#1f0a14"],
  surface: ["#231810", "#f6edd8", "#2f1020"],
  primary: ["#c9a227", "#7d5a1e", "#d76d93"],
  secondary: ["#7a1f2b", "#7c1f2a", "#caa24a"],
  onBackground: ["#ecdfc0", "#362713", "#f4dfe3"],
  onSurface: ["#ecdfc0", "#362713", "#f4dfe3"],

  activeLang: ["#e3b341", "#8f2432", "#e87ba0"],
  textHeader: ["#e3b341", "#6d1b26", "#e87ba0"],
  textParagraph: ["#ecdfc0", "#362713", "#f4dfe3"],
  textSpan: ["#e3b341", "#8f2432", "#e87ba0"],
  themeIcon: ["#e3b341", "#7d5a1e", "#e87ba0"],
  textBlockBackground: ["#1d130a", "#f6edd8", "#2a0e1c"],
  textBlockBackgroundAccent: ["#ecdfc0", "#2b1d0e", "#f4dfe3"],

  gold: ["#c9a227", "#8a6a25", "#caa24a"],
  rubric: ["#c05b52", "#8f2432", "#e0557d"],
  frame: ["#806023", "#a8863f", "#a04b66"],
  shade: ["#0d0803", "#2a1c0c", "#2b0716"],
};

const dark = {};
const light = {};
const eros = {};

for (const [key, values] of Object.entries(colors)) {
  const name = kebabize(key);
  if (typeof values === "string") {
    dark[name] = light[name] = eros[name] = values;
    continue;
  }
  const [darkValue, lightValue, erosValue] = values;
  if (darkValue) dark[name] = darkValue;
  if (lightValue) light[name] = lightValue;
  eros[name] = erosValue || darkValue;
}

const themes = { dark, light, eros };

function getColors(theme) {
  return themes[theme] || light;
}

export default getColors;
