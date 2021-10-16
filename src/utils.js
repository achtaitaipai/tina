export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c
export const clamp = (num, min, max) =>
  num <= min ? min : num >= max ? max : num
export const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)]

export function getCurrentRotation(el) {
  const st = window.getComputedStyle(el, null)
  const tm =
    st.getPropertyValue('-webkit-transform') ||
    st.getPropertyValue('-moz-transform') ||
    st.getPropertyValue('-ms-transform') ||
    st.getPropertyValue('-o-transform') ||
    st.getPropertyValue('transform') ||
    'none'
  if (tm !== 'none') {
    const values = tm.split('(')[1].split(')')[0].split(',')
    const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))
    return angle < 0 ? angle + 360 : angle
  }
  return 0
}
