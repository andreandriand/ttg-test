function findExpression(source, target) {
  function helper(num, expressions) {
    if (num.length === 1) {
      return num[0] === target ? expressions[0] : null;
    }

    for (let i = 0; i < num.length; i++) {
      for (let j = 0; j < num.length; j++) {
        if (i !== j) {
          const restNum = num.filter((_, index) => index !== i && index !== j);
          const restExp = expressions.filter((_, index) => index !== i && index !== j);

          for (const op of ["+", "-", "*"]) {
            let newNum;
            if (op === "+") newNum = num[i] + num[j];
            if (op === "-") newNum = num[i] - num[j];
            if (op === "*") newNum = num[i] * num[j];

            const newExp = `(${expressions[i]} ${op} ${expressions[j]})`;
            const result = helper([...restNum, newNum], [...restExp, newExp]);
            if (result) return result;
          }
        }
      }
    }
    return null;
  }

  const expressions = source.map(String);
  return helper(source, expressions);
}

console.log(findExpression([1, 4, 5, 6], 16));
console.log(findExpression([1, 4, 5, 6], 18));
console.log(findExpression([1, 4, 5, 6], 50));
