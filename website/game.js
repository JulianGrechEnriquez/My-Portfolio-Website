import { client } from './sanity.js'
import { applyGamePageCustomization } from './game-page-layout.js'

const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')
const gameId = params.get('gameId')

const query = `*[
  _type == "gamePage" &&
  (
    ($slug != null && game->slug.current == $slug) ||
    ($gameId != null && game->_id == $gameId)
  )
][0]{
  description,
  features,
  tech,
  learned,
  future,
  theme,
  heroLayout,
  playButtonText,
  sectionLabels,
  pageLayout,
  "title": game->title,
  "gameLink": game->Gamelink,
  "gitLink": game->Gitlink,
  "imageUrl": game->image.asset->url,
  "gameplay": gameplayImages[].asset->url
}`

client.fetch(query, { slug, gameId }).then(game => {

  if (!game) {
    document.body.innerHTML = "<h1>Game not found</h1>"
    return
  }

  applyGamePageCustomization({
    theme: game.theme,
    heroLayout: game.heroLayout,
    pageLayout: game.pageLayout,
    sectionLabels: game.sectionLabels,
  })

  document.getElementById('title').textContent = game.title
  document.getElementById('pageTitle').textContent = game.title
  document.getElementById('description').textContent = game.description

  const playBtn = document.getElementById('playBtn')
  if (game.gameLink) {
    playBtn.href = game.gameLink
    playBtn.target = '_blank'
    playBtn.rel = 'noopener noreferrer'
    playBtn.textContent = game.playButtonText || 'Play'
  } else {
    playBtn.remove()
  }

  // Git repository link
  const gitBtn = document.getElementById('gitBtn')
  if (game.gitLink) {
    gitBtn.href = game.gitLink
    gitBtn.target = '_blank'
    gitBtn.rel = 'noopener noreferrer'
    gitBtn.style.display = 'inline-block'
  } else {
    gitBtn.style.display = 'none'
  }

  // main image
  document.getElementById('image').src = game.imageUrl

  // gameplay images
  const gameplayContainer = document.getElementById('gameplay')
  gameplayContainer.innerHTML = ''

  game.gameplay?.forEach(img => {
    const image = document.createElement('img')
    image.src = img
    image.classList.add('gameplay-img')
    gameplayContainer.appendChild(image)
  })

  // features
  const featuresList = document.getElementById('features')
  featuresList.innerHTML = ''

  game.features?.forEach(f => {
    const li = document.createElement('li')
    li.textContent = f
    featuresList.appendChild(li)
  })

  // tech stack
  const techList = document.getElementById('tech')
  techList.innerHTML = ''

  game.tech?.forEach(t => {
    const li = document.createElement('li')
    li.textContent = t
    techList.appendChild(li)
  })

  // learned + future
  // learned
const learnedList = document.getElementById('learned')
learnedList.innerHTML = ''

game.learned?.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  learnedList.appendChild(li)
})
  document.getElementById('future').textContent = game.future || ''

  // Git repository section
  const repoSection = document.getElementById('repositorySection')
  if (game.gitLink) {
    document.getElementById('repositoryLink').href = game.gitLink
    repoSection.style.display = 'block'
  }
})
