const calculateSum = (arr: number[]) => {
  return arr.reduce((acc: number, curr: number) => acc + curr, 0);
};

console.log(calculateSum([1, 2, 3, 4, 5, 6, 7, 8, 9]));
