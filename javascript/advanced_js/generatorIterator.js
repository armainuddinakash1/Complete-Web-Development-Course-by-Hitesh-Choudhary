function* numberGenerator() {
  yield 1
  yield 2
  yield 3
  return 4

}

const gen = numberGenerator()
const genTwo = numberGenerator()
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(genTwo.next().value);
console.log(genTwo.next().value);
