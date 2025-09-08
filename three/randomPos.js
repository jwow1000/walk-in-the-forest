export function randomPos(min, max) {
  return Math.floor( (Math.random() * (max - min)) + min );
}