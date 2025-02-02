export const getRandomSegment = <T>(arr: T[], n: number): T[] => {
  const result: T[] = [];
  const indices: Set<number> = new Set();

  while (indices.size < n && indices.size < arr.length) {
    indices.add(Math.floor(Math.random() * arr.length));
  }

  indices.forEach((i) => result.push(arr[i]));
  return result;
};
