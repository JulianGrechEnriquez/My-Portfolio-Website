import { client } from './sanity.js';

const query = `*[_type == "eventsCard"]{
  _id,
  title,
  slug,
  description,
  "imageUrl": image.asset->url
}`

client.fetch(query).then(events => {
  const eventCardsContainer = document.querySelector('.eventsCards')
  
  if (!eventCardsContainer) {
    console.warn('Event cards container not found')
    return
  }

  console.log('Events loaded:', events)

  if (!events || events.length === 0) {
    eventCardsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No events yet</p>'
    return
  }

  events.forEach(event => {
    const card = document.createElement('article')
    card.classList.add('card', 'eventCard')

    card.innerHTML = `
      <img class="card-img" src="${event.imageUrl || 'images/placeholder.png'}" alt="${event.title}" />
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <div class="footercard">
        <div class="event-date"></div>
      </div>
    `

    const eventPageUrl = event.slug?.current
      ? `event.html?slug=${encodeURIComponent(event.slug.current)}`
      : event._id
        ? `event.html?eventId=${encodeURIComponent(event._id)}`
        : null

    console.log('Event card:', { title: event.title, slug: event.slug?.current, id: event._id, url: eventPageUrl })

    if (eventPageUrl) {
      card.onclick = () => {
        window.location.href = eventPageUrl
      }
      card.style.cursor = 'pointer'
    }

    eventCardsContainer.appendChild(card)
  })
}).catch(err => {
  console.error('Error fetching events:', err)
  const eventCardsContainer = document.querySelector('.eventsCards')
  if (eventCardsContainer) {
    eventCardsContainer.innerHTML = '<p style="color: red; padding: 20px;">Error loading events</p>'
  }
})
