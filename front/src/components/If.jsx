export function If ({ condition, render }) {
  return condition ? render(): null;
}
