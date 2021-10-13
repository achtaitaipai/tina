import '@fortawesome/fontawesome-free/js/all.js'
import './style.scss'
import { map, randomNumber, randItem } from './utils'
import { floating } from './anims'
import { DraggableBox } from './draggableBox'
import { AudioPlayer } from './audioPlayer'
import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'

const player = new AudioPlayer(document.querySelector('.player'))

const lscroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  direction: 'horizontal',
  multiplier: 1,
  repeat: true,
})

customElements.define('draggable-box', DraggableBox, { extends: 'div' })

// let's rotate the elements when scrolling.
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

let scroll = { cache: 0, current: 0 }

lscroll.on('scroll', (obj) => {
  for (const key of Object.keys(obj.currentElements)) {
    const el = obj.currentElements[key].el
    const idx = elems.indexOf(el)
    if (obj.currentElements[key].el.classList.contains('floating')) {
      floating(obj.currentElements[key], rotationsArr[idx], translationArr[idx])
    } else if (obj.currentElements[key].el.classList.contains('tapis__card')) {
      scroll.current = obj.scroll.x
      const distance = scroll.current - scroll.cache
      scroll.cache = scroll.current
      const turb = document.querySelector('#noise feDisplacementMap')
      const Sc = map(distance, -50, 50, -100, 100)
      turb.setAttribute('scale', Sc)
    }
  }
})

lscroll.update()

// const tapisObserver = new IntersectionObserver(
//   (entries) => {
//     const entry = entries[0]
//     const turb = document.querySelectorAll('#noise feDisplacementMap')[0]
//     const tapis = document.querySelector('.tapis__imgContainer')
//     if (entry.intersectionRatio >= 0.5) {
//       gsap.to(turb, { attr: { scale: 0 }, duration: 2, ease: 'elastic' })
//       gsap.to(tapis, { y: 0, duration: 2, ease: 'bounce' })
//     } else if (!entry.isIntersecting) {
//       gsap.set(turb, { attr: { scale: 5000 } })
//       gsap.set(tapis, { y: -700 })
//     }
//   },
//   {
//     threshold: [0.5, 0],
//   }
// )
// tapisObserver.observe(document.querySelector('.tapis'))
