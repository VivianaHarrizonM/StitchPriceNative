export const Colors = {
  // Verdes (marca)
  green: {
    dark: "#3d8a18",
    main: "#71b43b",
    light: "#9ed45f",
    pale: "#d4f0b8",
    wash: "#f0fae6",
  },
  // Ambers / Dorados (acento)
  amber: {
    dark: "#8a5a0a",
    main: "#b17c1a",
    light: "#d9ae5d",
    pale: "#fce8b2",
    wash: "#fdf8ed",
  },
  // Neutrales
  neutral: {
    900: "#1a1a18",
    700: "#3d3d38",
    500: "#636059",
    300: "#b0ada5",
    100: "#f0ede8",
    50: "#faf9f7",
    white: "#ffffff",
  },
  // Resultado highlight
  highlight: "#946e27",
};

export const Currencies: Record<string, { symbol: string; name: string }> = {
  MXN: { symbol: "$", name: "pesos mexicanos" },
  USD: { symbol: "$", name: "dólares" },
  COP: { symbol: "$", name: "pesos colombianos" },
  ARS: { symbol: "$", name: "pesos argentinos" },
  EUR: { symbol: "€", name: "euros" },
  PEN: { symbol: "S/", name: "soles peruanos" },
  CLP: { symbol: "$", name: "pesos chilenos" },
  BRL: { symbol: "R$", name: "reales" },
};
