import { map } from './utils'

export function floating(scrollEl, rot, trans) {
  const progress = scrollEl.progress
  const rotInit = parseInt(scrollEl.el.getAttribute('data-rot')) || 0
  const rotationVal = map(progress, 0, 1, -rot, rot)
  const translationVal = map(progress, 0, 1, -trans, trans)
  scrollEl.el.style.setProperty(
    'transform',
    `translateY(${translationVal}%) rotate(${rotationVal + rotInit}deg)`
  )
}
