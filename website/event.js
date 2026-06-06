import { client } from './sanity.js'

// Simple debug query - fetch first eventPage with all details
const debugQuery = `*[_type == "eventPage"][0]{...}`

const params = new URLSearchParams(window.location.search)
const slug = params.get('slug')
const eventId = params.get('eventId')

console.log('Page params:', { slug, eventId })

// Query for fetching by slug
const eventPageBySlugQuery = `*[
  _type == "eventPage" &&
  slug.current == $slug
][0]{
  _id,
  title,
  description,
  eventDate,
  "images": images[].asset->url,
  MembersofTeam,
  learned,
  future,
  slug
}`

// Query for fetching by ID
const eventPageByIdQuery = `*[
  _type == "eventPage" &&
  _id == $eventId
][0]{
  _id,
  title,
  description,
  eventDate,
  "images": images[].asset->url,
  MembersofTeam,
  learned,
  future,
  slug
}`

// Fallback: fetch eventsCard by slug
const eventCardBySlugQuery = `*[
  _type == "eventsCard" &&
  slug.current == $slug
][0]{
  _id,
  title,
  description,
  imageUrl: image.asset->url,
  slug
}`

// Fallback: fetch eventsCard by ID
const eventCardByIdQuery = `*[
  _type == "eventsCard" &&
  _id == $eventId
][0]{
  _id,
  title,
  description,
  imageUrl: image.asset->url,
  slug
}`

async function loadEvent() {
  try {
    // First, debug - fetch any eventPage to see structure
    const debugEvent = await client.fetch(debugQuery)
    console.log('DEBUG - First eventPage structure:', debugEvent)

    let event = null

    // Try to fetch eventPage first, then fallback to eventsCard
    if (slug) {
      console.log('Fetching eventPage by slug:', slug)
      event = await client.fetch(eventPageBySlugQuery, { slug })
      console.log('EventPage result:', event)
      
      if (!event) {
        console.log('No eventPage found, trying eventsCard...')
        event = await client.fetch(eventCardBySlugQuery, { slug })
        console.log('EventCard result:', event)
      }
    } else if (eventId) {
      event = await client.fetch(eventPageByIdQuery, { eventId })
      if (!event) {
        event = await client.fetch(eventCardByIdQuery, { eventId })
      }
    }

    if (!event) {
      throw new Error('Event not found')
    }

    displayEvent(event)
  } catch (err) {
    showError(err)
  }
}

function displayEvent(event) {
  console.log('Event loaded:', event)
  
  const loadingState = document.getElementById('loadingState')
  loadingState.style.display = 'none'

  document.getElementById('title').textContent = event.title
  document.getElementById('pageTitle').textContent = event.title

  // Format and display event date (if available)
  if (event.eventDate) {
    const dateObj = new Date(event.eventDate)
    const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    document.getElementById('eventDate').textContent = formattedDate
  }

  // Description
  if (event.description) {
    document.getElementById('description').textContent = event.description
    document.getElementById('overviewSection').style.display = 'block'
  }

  // Main image
  if (event.imageUrl) {
    document.getElementById('image').src = event.imageUrl
    document.getElementById('eventHero').style.display = 'block'
  }

  // Event images gallery
  if (event.images && event.images.length > 0) {
    const imagesContainer = document.getElementById('images')
    imagesContainer.innerHTML = ''

    event.images.forEach(imageUrl => {
      const image = document.createElement('img')
      image.src = imageUrl
      image.classList.add('gameplay-img')
      imagesContainer.appendChild(image)
    })

    document.getElementById('imagesSection').style.display = 'block'
  }

  // Use first image as hero if no imageUrl
  if (!event.imageUrl && event.images && event.images.length > 0) {
    document.getElementById('image').src = event.images[0]
    document.getElementById('eventHero').style.display = 'block'
  }

  // Team members
  if (event.MembersofTeam && event.MembersofTeam.length > 0) {
    const teamList = document.getElementById('team')
    teamList.innerHTML = ''

    event.MembersofTeam.forEach(member => {
      const li = document.createElement('li')
      li.textContent = member
      teamList.appendChild(li)
    })

    document.getElementById('teamSection').style.display = 'block'
  }

  // Learned
  if (event.learned && event.learned.length > 0) {
    const learnedList = document.getElementById('learned')
    learnedList.innerHTML = ''

    event.learned.forEach(item => {
      const li = document.createElement('li')
      li.textContent = item
      learnedList.appendChild(li)
    })

    document.getElementById('learnedSection').style.display = 'block'
  }

  // Future
  if (event.future) {
    const futureSection = document.getElementById('future')
    futureSection.textContent = event.future
    document.getElementById('futureSection').style.display = 'block'
  }
}

function showError(err) {
  console.error('Error fetching event:', err)
  const loadingState = document.getElementById('loadingState')
  loadingState.innerHTML = `
    <h1>Event not found</h1>
    <p>The event you're looking for doesn't exist.</p>
    <p style="font-size: 12px; color: #666; margin-top: 10px;">URL params: slug=${slug}, eventId=${eventId}</p>
    <a href="Index.html" style="color: #B3C2FF; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 20px;">← Back to Portfolio</a>
  `
}

loadEvent()
