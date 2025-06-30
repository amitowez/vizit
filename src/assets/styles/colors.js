function kebabize(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

const colors = {
  activeLang: ["#007bff", "#c62828"],
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
