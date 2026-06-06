// Simple slider controls for the events track
const eventsTrack = document.getElementById('eventsTrack');

function eventsNext() {
  if (!eventsTrack) return;
  const width = eventsTrack.clientWidth;
  eventsTrack.scrollBy({ left: Math.floor(width * 0.8), behavior: 'smooth' });
}

function eventsPrev() {
  if (!eventsTrack) return;
  const width = eventsTrack.clientWidth;
  eventsTrack.scrollBy({ left: -Math.floor(width * 0.8), behavior: 'smooth' });
}

window.eventsNext = eventsNext;
window.eventsPrev = eventsPrev;
