const a = undefined;
const b = undefined;

if (a && b) {
  console.log('true');
} else {
  console.log('false');
}
console.log(Boolean(undefined));
console.log(undefined || 1);
console.log(typeof undefined);