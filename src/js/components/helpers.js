export function branch(condition, whenTrue, whenFalse) {
  return condition ? whenTrue() : whenFalse();
}
