import './style.scss'
import { map, clamp, randomNumber, randItem } from './utils'
import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'

const lscroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  direction: 'horizontal',
  multiplier: 1,
  repeat: true,
})

// let's rotate the elements when scrolling.
const elems = [...document.querySelectorAll('.photoConcert, .iframe-clip')]
const rotationsArr = Array.from({ length: elems.length }, () =>
  randomNumber(-60, 60)
)
const translationArr = Array.from(
  { length: elems.length },
  () => randomNumber(50, 100) * randItem([-1, 1])
)
elems.forEach((el, i) => {
  el.style.setProperty(
    'transform',
    `translateY(${-translationArr[i]}%) rotate(${-rotationsArr[i]}deg)`
  )
})
lscroll.on('scroll', (obj) => {
  const seuil = 0.4
  for (const key of Object.keys(obj.currentElements)) {
    const el = obj.currentElements[key].el
    const idx = elems.indexOf(el)
    if (
      obj.currentElements[key].el.classList.contains('photoConcert') ||
      obj.currentElements[key].el.classList.contains('iframe-clip')
    ) {
      const progress = obj.currentElements[key].progress
      const rotationVal = map(
        progress,
        0,
        1,
        -rotationsArr[idx],
        rotationsArr[idx]
      )
      const translationVal = map(
        progress,
        0,
        1,
        -translationArr[idx],
        translationArr[idx]
      )
      el.style.setProperty(
        'transform',
        `translateY(${translationVal}%) rotate(${rotationVal}deg)`
      )
    }
  }
})
lscroll.update()

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5)
        entry.target.classList.add('onScreen')
      else if (entry.intersectionRatio <= 0)
        entry.target.classList.remove('onScreen')
    })
  },
  {
    threshold: [0.5, 0],
  }
)

const toAnim = Array.from(document.querySelectorAll('.js-anim'))
toAnim.forEach((el) => {
  animObserver.observe(el)
})

const tapisObserver = new IntersectionObserver(
  (entries) => {
    const entry = entries[0]
    const turb = document.querySelectorAll('#noise feDisplacementMap')[0]
    const tapis = document.querySelector('.tapis__imgContainer')
    if (entry.intersectionRatio >= 0.5) {
      gsap.to(turb, { attr: { scale: 0 }, duration: 2, ease: 'elastic' })
      gsap.to(tapis, { y: 0, duration: 2, ease: 'bounce' })
    } else if (!entry.isIntersecting) {
      gsap.set(turb, { attr: { scale: 5000 } })
      gsap.set(tapis, { y: -700 })
    }
  },
  {
    threshold: [0.5, 0],
  }
)
tapisObserver.observe(document.querySelector('.tapis'))
