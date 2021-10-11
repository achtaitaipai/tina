import './style.scss'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TimelineMax } from 'gsap/gsap-core'

gsap.registerPlugin(ScrollTrigger)

const sections = gsap.utils.toArray('.panel')

gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.main',
    pin: true,
    scrub: 1,
    // snap: 1 / (sections.length - 1),
    // base vertical scrolling on how wide the container is so it feels more natural.
    end: '+=' + window.innerWidth * (sections.length - 1),
  },
})

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
