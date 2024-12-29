function findNumber(arr) {
  arr.sort((a, b) => a - b);

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] - arr[i - 1] > 1) {
      return arr[i - 1] + 1;
    }
  }

  return null;
}

console.log(findNumber([3, 0, 2, 4]));
console.log(findNumber([3106, 3102, 3104, 3105, 3107]));
console.log(findNumber([1, 3, 2, 5]));
