export default function calculateSimilarity(a: string, b: string): number {
  const setA = new Set(a.toLowerCase());
  const setB = new Set(b.toLowerCase());
  const matches = [...setA].filter(char => setB.has(char)).length;
  const totalLength = a.length + b.length;
  return (2 * matches) / totalLength;
}