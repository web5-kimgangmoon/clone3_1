export const unitconvertor = (v: number) => {
  if (v < 0) return "0";
  if (v > 999) return `${Math.floor(v / 1000) / 10}k`;
  if (v > 999999) return `${Math.floor(v / 1000000) / 10}m`;
  return v;
};
