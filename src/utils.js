export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c
export const clamp = (num, min, max) =>
  num <= min ? min : num >= max ? max : num
export const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
