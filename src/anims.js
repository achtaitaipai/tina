import { map } from './utils'

export function floating(scrollEl, rot, trans, direction) {
  const progress = scrollEl.progress
  const rotInit = parseInt(scrollEl.el.getAttribute('data-rot')) || 0
  const rotationVal = map(progress, 0, 1, -rot, rot)
  const translationVal = map(progress, 0, 1, -trans, trans)
  if (direction === 'horizontal') {
    scrollEl.el.style.setProperty(
      'transform',
      `translateY(${translationVal}%) rotate(${rotationVal + rotInit}deg)`
    )
  } else {
    scrollEl.el.style.setProperty(
      'transform',
      `translateX(${translationVal}%) rotate(${rotationVal + rotInit}deg)`
    )
  }
}
