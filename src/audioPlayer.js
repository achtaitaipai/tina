export class AudioPlayer {
  constructor(el) {
    this.element = el
    this.playBtn = this.element.querySelector('.playBtn')
    this.playIcon = this.element.querySelector('.play')
    this.pauseIcon = this.element.querySelector('.pause')
    this.nextBtn = this.element.querySelector('.nextBtn')
    this.prevBtn = this.element.querySelector('.prevBtn')
    this.title = this.element.querySelector('.titre')
    this.duree = this.element.querySelector('.duree')
    this.progressBar = this.element.querySelector('.progressBar')
    this.progressBarContainer = this.element.querySelector(
      '.progressBarContainer'
    )
    this.audios = Array.from(this.element.querySelectorAll('audio'))
    this.handlePlayer = this.element.querySelector('.player__handle')

    this.idx = 0
    this.currentAudio = this.audios[this.idx]
    this.title.textContent = this.currentAudio.getAttribute('data-title')

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.showPlayer = this.showPlayer.bind(this)
    this.hidePlayer = this.hidePlayer.bind(this)
    this.timeUpdate = this.timeUpdate.bind(this)
    this.setTime = this.setTime.bind(this)
    this.playBtn.addEventListener('click', this.play)
    this.nextBtn.addEventListener('click', this.next)
    this.prevBtn.addEventListener('click', this.prev)
    this.handlePlayer.addEventListener('click', this.showPlayer)
  }

  next() {
    this.pause()
    this.currentAudio.currentTime = 0
    this.idx = (this.idx + 1) % this.audios.length
    this.currentAudio = this.audios[this.idx]
    this.title.textContent = this.currentAudio.getAttribute('data-title')
    this.play()
  }

  prev() {
    this.pause()
    this.currentAudio.currentTime = 0
    this.idx = this.idx > 0 ? this.idx - 1 : this.audios.length - 1
    this.currentAudio = this.audios[this.idx]
    this.title.textContent = this.currentAudio.getAttribute('data-title')
    this.play()
  }

  pause() {
    this.currentAudio.pause()
    this.playBtn.querySelector('.fa-play').style.display = 'inline'
    this.playBtn.querySelector('.fa-pause').style.display = 'none'
    this.playBtn.removeEventListener('click', this.pause)
    this.playBtn.addEventListener('click', this.play)
    this.currentAudio.removeEventListener('timeupdate', this.timeUpdate)
    this.currentAudio.removeEventListener('ended', this.next)
  }

  play() {
    this.currentAudio.play()
    this.playBtn.querySelector('.fa-play').style.display = 'none'
    this.playBtn.querySelector('.fa-pause').style.display = 'inline'
    this.playBtn.removeEventListener('click', this.play)
    this.playBtn.addEventListener('click', this.pause)
    this.currentAudio.addEventListener('timeupdate', this.timeUpdate)
    this.currentAudio.addEventListener('ended', this.next)
    this.progressBarContainer.addEventListener('click', this.setTime)
  }

  timeUpdate() {
    const t = this.calculateTime(this.currentAudio.currentTime)
    const tt = this.calculateTime(this.currentAudio.duration)
    const progress =
      (this.currentAudio.currentTime / this.currentAudio.duration) * 100
    this.duree.textContent = `${t} / ${tt}`
    this.progressBar.style.width = progress + '%'
  }

  calculateTime(secs) {
    const minutes = Math.floor(secs / 60)
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutes}:${returnedSeconds}`
  }

  setTime(e) {
    const x = e.clientX - this.progressBarContainer.getBoundingClientRect().x
    const w = this.progressBarContainer.getBoundingClientRect().width
    this.currentAudio.currentTime = (x / w) * this.currentAudio.duration
    console.log(x)
  }

  showPlayer(e) {
    e.preventDefault()
    this.element.classList.add('visible')
    this.handlePlayer.removeEventListener('click', this.showPlayer)
    document.addEventListener('click', this.hidePlayer)
    this.resetTimer()
  }

  hidePlayer(e) {
    let targetElement = e.target // clicked element

    do {
      if (targetElement === this.element) {
        this.resetTimer()
        return
      }
      // Go up the DOM
      targetElement = targetElement.parentNode
    } while (targetElement)

    this.element.classList.remove('visible')
    this.handlePlayer.addEventListener('click', this.showPlayer)
    document.removeEventListener('click', this.hidePlayer)
  }

  resetTimer() {
    if (this.t) clearTimeout(this.t)
    this.t = window.setTimeout(() => {
      this.element.classList.remove('visible')
      this.handlePlayer.addEventListener('click', this.showPlayer)
      document.removeEventListener('click', this.hidePlayer)
    }, 6000)
  }
}
