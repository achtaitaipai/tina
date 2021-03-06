import './style.scss'
import { map, randomNumber, randItem } from './utils'
import { floating } from './anims'
import { DraggableBox } from './draggableBox'
import { AudioPlayer } from './audioPlayer'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'

// eslint-disable-next-line no-unused-vars
const player = new AudioPlayer(document.querySelector('.player'))

const lscroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  direction: 'horizontal',
  multiplier: 1,
  repeat: true,
})
customElements.define('draggable-box', DraggableBox, { extends: 'div' })

const elems = [...document.querySelectorAll('.floating')]
const rotationsArr = Array.from({ length: elems.length }, () =>
  randomNumber(-30, 30)
)
const translationArr = Array.from(
  { length: elems.length },
  () => randomNumber(25, 50) * randItem([-1, 1])
)

elems.forEach((el, i) => {
  el.style.setProperty(
    'transform',
    `translateY(${-translationArr[i]}%) rotate(${-rotationsArr[i]}deg)`
  )
})

const scroll = { cache: 0, current: 0 }
lscroll.on('scroll', (obj) => {
  for (const key of Object.keys(obj.currentElements)) {
    const el = obj.currentElements[key].el
    const idx = elems.indexOf(el)
    if (obj.currentElements[key].el.classList.contains('floating')) {
      floating(
        obj.currentElements[key],
        rotationsArr[idx],
        translationArr[idx],
        lscroll.direction
      )
    } else if (obj.currentElements[key].el.classList.contains('tapis__card')) {
      scroll.current = obj.scroll.x > 0 ? obj.scroll.x : obj.scroll.y
      const distance = scroll.current - scroll.cache
      scroll.cache = scroll.current
      const turb = document.querySelector('#noise feDisplacementMap')
      const Sc = map(distance, -50, 50, -100, 100)
      turb.setAttribute('scale', Sc)
    }
  }
})

lscroll.update()

const vignettes = Array.from(document.querySelectorAll('.accueil__link'))

vignettes.forEach((vign) => {
  vign.addEventListener('click', (e) => {
    console.log(e.currentTarget)
    const link = e.currentTarget.getAttribute('data-link')
    lscroll.scrollTo(link)
  })
})
