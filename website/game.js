import { client } from './sanity.js'

const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')

const query = `*[_type == "gamePage" && game->slug.current == $slug][0]{
  description,
  features,
  tech,
  learned,
  future,
  "title": game->title,
  "imageUrl": game->image.asset->url,
  "gameplay": gameplayImages[].asset->url
}`

client.fetch(query, { slug }).then(game => {

  if (!game) {
    document.body.innerHTML = "<h1>Game not found</h1>"
    return
  }

  document.getElementById('title').textContent = game.title
  document.getElementById('description').textContent = game.description

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
  document.getElementById('learned').textContent = game.learned || ''
  document.getElementById('future').textContent = game.future || ''
})