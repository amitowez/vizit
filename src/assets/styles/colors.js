function kebabize(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const colors = {
  activeLang: ["#ffff00", "#007bff"],
  textHeader: ["#ffff00", "#007bff"],
  textParagraph: ["#ffff00", "#007bff"],
  textSpan: ["#ffff00", "#007bff"],
  themeIcon: ["#ffff00", "#007bff"],
};

const dark = {};
const light = {};

for (const [key, values] of Object.entries(colors)) {
  const name = kebabize(key);
  if (typeof values === "string") {
    dark[name] = light[name] = values;
    continue;
  }
  const [darkValue, lightValue] = values;
  if (darkValue) dark[name] = darkValue;
  if (lightValue) light[name] = lightValue;
}

function getColors(theme) {
  return theme === "dark" ? dark : light;
}

export default getColors;
