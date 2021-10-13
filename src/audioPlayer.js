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
    this.audios = Array.from(this.element.querySelectorAll('audio'))

    this.idx = 0
    this.currentAudio = this.audios[this.idx]
    this.title.textContent = this.currentAudio.getAttribute('data-title')

    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.next = this.next.bind(this)
    this.prev = this.prev.bind(this)
    this.timeUpdate = this.timeUpdate.bind(this)
    this.playBtn.addEventListener('click', this.play)
    this.nextBtn.addEventListener('click', this.next)
    this.prevBtn.addEventListener('click', this.prev)
  }

  next() {
    this.pause()
    this.currentAudio.currentTime = 0
    this.idx = (this.idx + 1) % this.audios.length
    this.currentAudio = this.audios[this.idx]
    this.title.textContent = this.currentAudio.getAttribute('data-title')
    console.log(this.currentAudio)
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
}
