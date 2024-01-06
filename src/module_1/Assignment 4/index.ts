enum COLORS {
  RED = "RED",
  GREEN = "GREEN",
  BLUE = "BLUE",
}

const colorFilter = (color: COLORS) => {
  return color;
};

console.log(colorFilter(COLORS.RED));
