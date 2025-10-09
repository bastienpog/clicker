export function formatNumberShort(value: number): string {
  if (value < 1000) return String(value);
  const units = ["K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
  let v = value;
  let unitIndex = -1;
  while (v >= 1000 && unitIndex < units.length - 1) {
    v = v / 1000;
    unitIndex++;
  }
  return `${v.toFixed(v >= 100 ? 0 : v >= 10 ? 1 : 2)}${units[unitIndex]}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
