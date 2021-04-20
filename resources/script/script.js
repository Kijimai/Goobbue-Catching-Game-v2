const difficultyContainer = document.querySelector('.difficulty-container')
const startContainer = document.getElementById('start-screen')
const easyBtn = document.getElementById('easy')
const normalBtn = document.getElementById('normal')
const hardBtn = document.getElementById('hard')
const gameContainer = document.getElementById('game-screen')
const pauseBtn = document.getElementById('pauseBtn')
const playBtn = document.getElementById('playBtn')
const messageContainer = document.getElementById('message-container')
const messageText = document.getElementById('message')
const goobbueContainer = document.getElementById('goobbue-container')
const bossContainer = document.getElementById('boss-container')
const goobbueBoss = document.getElementById('goob-boss')
const innerBossContainer = document.getElementById('boss-top-container')
const bossHPContainer = document.getElementById('boss-hp-container')
const goobHP = document.getElementById('hp')
const goobHPLine = document.getElementById('hp-line')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const startBtn = document.getElementById('startBtn')
const reloadBtn = document.getElementById('reload')

//Global Variables
let goobbueCount = document.querySelectorAll('.goobbue').length
let difficultyChosen = ''
let score = 98
let seconds = 0
let clearTime = 0
let spawnSpeed = 0
const easyMaxScore = 100
const normalMaxScore = 250
const hardMaxScore = 500
let maxScoreReached = false
let bossSpawned = false
let bossDefeated = false

//Sounds
function startGameSound() {
  const startSound = new Audio('/resources/sounds/start_game.ogg')
  startSound.volume = 0.5
  startSound.play()
}

function playTheme() {
  const themeEl = document.createElement('audio')
  themeEl.id = 'themePlay'
  themeEl.src = 'resources/sounds/Chocobo-kazoo.mp3'
  themeEl.type = 'audio/mpeg'
  themeEl.volume = 0.2
  themeEl.play()
  themeEl.loop = true
  gameContainer.appendChild(themeEl)
}

function stopTheme() {
  const themePlay = document.getElementById('themePlay')
  themePlay.pause()
}

function bossTheme() {
  // const bossTheme = new Audio('/resources/sounds/StormbloodKazoo.mp3')
  // bossTheme.volume = 0.2
  // bossTheme.play()
  // bossTheme.loop = true
  document.querySelector('#themePlay').remove() // removes the first theme song
  const bossThemeEl = document.createElement('audio')
  bossThemeEl.id = 'themePlay'
  bossThemeEl.src = 'resources/sounds/StormbloodKazoo.mp3'
  bossThemeEl.type = 'audio/mpeg'
  bossThemeEl.volume = 0.2
  bossThemeEl.play()
  bossThemeEl.loop = true
  gameContainer.appendChild(bossThemeEl)
}

function pauseAllMusic() {
  const allAudio = document.querySelectorAll('audio')
  allAudio.forEach(audio => audio.pause())
}

function playAllMusic() {
  const allAudio = document.querySelectorAll('audio')
  allAudio.forEach(audio => audio.play())
}

pauseBtn.addEventListener('click', pauseAllMusic)
playBtn.addEventListener('click', playAllMusic)

//keeps track of the current goobbue count on the page every second
setInterval(logCurrentGoobueCount, 1000)

// Reload the page
reloadBtn.addEventListener('click', reloadPage)

//add colors to difficulty buttons and also store the difficulty chosen for global access
difficultyContainer.addEventListener('click', (e) => {
  difficultyChosen = e.target.textContent
  const allDiffBtns = document.querySelectorAll('.difficulty')
  allDiffBtns.forEach(btn => btn.classList.remove('active'))
  if(difficultyChosen === 'Easy') {
    easyBtn.classList.toggle('active')
  } else if(difficultyChosen === 'Normal') {
    normalBtn.classList.toggle('active')
  } else if(difficultyChosen === 'Hard')
    hardBtn.classList.toggle('active')
}) 

startBtn.addEventListener('click', () => {
  if(difficultyChosen === 'Easy') {
    difficultyChosen = 'Easy'
    startEasyGame()
    setTimeout(() => playTheme(), 2000)
  } else if (difficultyChosen === 'Normal') {
    difficultyChosen = 'Normal'
    startNormalGame()
    setTimeout(() => playTheme(), 2000)
  } else if (difficultyChosen === 'Hard') {
    difficultyChosen = 'Hard'
    startHardGame()
    setTimeout(() => playTheme(), 2000)
  } else {
    alert('Please choose a difficulty!')
    return
  }
  startGameSound()
  startContainer.classList.add('moveUp')
  setTimeout(function() {
    startContainer.remove()
  }, 3000)
})

//increases and keeps track of score -- outputs messages depending on difficulty and score
function increaseScore() {
  console.log(difficultyChosen)
  score++ 
  scoreCheck()
  scoreEl.innerHTML = `Goobbue Caught: ${score}`
}

function scoreCheck() {
  generateMessage()
  if(bossSpawned) {
    maxScoreReached = true
    return
  }
  if(difficultyChosen === 'Easy') {
    if(score === easyMaxScore) {
      removeAllSproutlings()
      setTimeout(removeAllSproutlings, 1000) //ensures removal of all remaining goobs
      stopTheme()
      spawnBoss()
      bossSpawned = true
      return
    }
  } else if(difficultyChosen === 'Normal') {
    if(score === normalMaxScore) {
      removeAllSproutlings()
      setTimeout(removeAllSproutlings, 1000)
      stopTheme()
      spawnBoss()
      bossSpawned = true
      return
    }
  } else if (difficultyChosen === 'Hard') {
    if(score === hardMaxScore) {
      removeAllSproutlings()
      setTimeout(removeAllSproutlings, 1000)
      stopTheme()
      spawnBoss()
      bossSpawned = true
      return
    }
  }
}

function startEasyGame() {
  //Reload game button appears 3 seconds after the game begins
  setTimeout( () => {
    reloadBtn.classList.toggle('active')
  }, 3000)
  setInterval(generateGoobbue, 1000)
  setInterval(scoreCheck, 300)
  setInterval(increaseTime, 1000)
  console.log('easy')
}

function startNormalGame() {
  //Reload game button appears 3 seconds after the game begins
  setTimeout( () => {
    reloadBtn.classList.toggle('active')
  }, 3000)
  setInterval(generateGoobbue, 500)
  setInterval(scoreCheck, 300)
  setTimeout(() => setInterval(targetAndRemove, 3000), 2000)
  setInterval(increaseTime, 1000)
  console.log('normal')
}

function startHardGame() {
  //Reload game button appears 3 seconds after the game begins
  setTimeout( () => {
    reloadBtn.classList.toggle('active')
  }, 3000)
  setInterval(generateGoobbue, 500)
  setInterval(generateGoobbue, 1750)
  setInterval(scoreCheck, 300)
  setTimeout(() => setInterval(targetAndRemove, 2000), 2000)
  setTimeout(() => setInterval(targetAndRemove, 2000), 2000)
  setInterval(increaseTime, 1000)
  console.log('hard')
}

function increaseTime(){
  if(bossDefeated) {
    clearTime = seconds
    return
  }
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m 
  s = s < 10 ? `0${s}` : s 
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}

//Function generates a goobbue div with a nested img and an event listener that removes it on click
function generateGoobbue() {
  if(maxScoreReached) {
    return
  }
  if(goobbueCount >= 25) {
    return
  }

  const goobbue = document.createElement('div')
  goobbue.classList.add('goobbue')
  
  const { x, y } = getRandomLocation()
  goobbue.style.top = `${y}px`
  goobbue.style.left = `${x}px`
  goobbue.innerHTML = `<img src="resources/images/goobrun.png" alt="goobbue running" draggable="false">`

  goobbue.addEventListener('click', catchGoobbue) 
  goobbueContainer.appendChild(goobbue)
}

//function returns a randomized X and Y coordinate to style the goobbue image
function getRandomLocation() {

  const width = goobbueContainer.clientWidth
  const height = goobbueContainer.clientHeight

  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function catchGoobbue() {
  increaseScore()
  this.classList.add('caught') //window object goobbue
  setTimeout(() => this.remove(), 2000)
}

function generateMessage() {
  let message = ''
  if(difficultyChosen === 'Easy') {
    if(score === 15) {
      message = `Look out! There's more of them coming!`
      messageText.textContent = message
    }
  } else if (difficultyChosen === 'Normal') {
    if (score === 15) {
      message = `There's no slowing them down! Look out!`
      messageText.textContent = message
    }
  }
}

function reloadPage() {
  location.reload()
}

/*  NEEDS WORK  */ 
function targetAndRemove() {
  if(maxScoreReached) {
    return
  }
  const targettedGoobbue = document.querySelector('.goobbue:first-of-type')
  targettedGoobbue.classList.add('disappear')
  setTimeout(targettedGoobbue.remove(), 3000)
}

function removeAllSproutlings() {
  const allSproutling = document.querySelectorAll('.goobbue')
  allSproutling.forEach(sprout => {
    sprout.classList.add('disappear')
    setTimeout( () => sprout.remove(), 2000)
  })
}

// BOSS EVENTS AND BOSS FUNCTIONS
function spawnBoss() {
  bossContainer.classList.add('active')
  setTimeout(() => goobbueBoss.classList.add('active'), 2000)
  setTimeout(bossTheme, 2000)
}

let bossHP = 500

innerBossContainer.addEventListener('click', (e) => {
  //Stop listening to click events once the boss is defeated
  if(bossDefeated) {
    return
  }
  adjustBossHP(e)
  bossContainer.classList.add('clicked')
  console.log('boss damaged!')
  setTimeout(() => {
    bossContainer.classList.remove('clicked')
  }, 300)
})

function adjustBossHP(e) {
  //check if bossHP is at 0 and player wins game
  if(bossHP <= 0) {
    bossDefeated = true
    bossHP = 0
    pauseAllMusic()
    victoryMessage()
  }
  damageIndication(e)
  goobHP.textContent = `${bossHP}`
  goobHPLine.style.width = `${bossHP}px`
}

function damageIndication(e) {
  const hitIndicator = document.createElement('img')
  const randomizer = Math.floor(Math.random() * 100) + 1
  const critChance = 25

  const x = e.clientX
  const y = e.clientY
  if(randomizer <= critChance) {
    bossHP -= 5
    hitIndicator.src = `resources/images/5hpdmg.png`
    hitIndicator.classList.add('showDamage')
    hitIndicator.style.top = `${y}px`
    hitIndicator.style.left = `${x}px`
    hitIndicator.draggable = false
    document.body.appendChild(hitIndicator)
    setTimeout(()=> hitIndicator.classList.add('disappear'), 1000)
    setTimeout( () => hitIndicator.remove(), 2000)
  } else {
    bossHP--
    hitIndicator.src = `resources/images/1hpdmg.png`
    hitIndicator.classList.add('showDamage')
    hitIndicator.style.top = `${y}px`
    hitIndicator.style.left = `${x}px`
    hitIndicator.draggable = false
    document.body.appendChild(hitIndicator)
    setTimeout(() => hitIndicator.classList.add('disappear'), 1000)
    setTimeout( () => hitIndicator.remove(), 1500)
  }
}

//keeps track and logs the amount of goobbue elements on the html
function logCurrentGoobueCount() {
  if(maxScoreReached) {
    return
  }
  goobbueCount = document.querySelectorAll('.goobbue').length
  console.log(goobbueCount) 
}

//Runs this message when bossDefeated is true
function victoryMessage() {
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m 
  s = s < 10 ? `0${s}` : s 
  const clearMessage = `Your clear time is ${m}:${s}!`
  console.log(clearMessage)
}