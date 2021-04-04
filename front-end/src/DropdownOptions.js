const platforms = [
  { value: '', label: 'Select a Platform' },
  { value: 'Netflix', label: 'Netflix' },
  { value: 'Amazon Prime', label: 'Amazon Prime' },
  { value: 'Hulu', label: 'Hulu' },
  { value: 'HBO', label: 'HBO' },
  { value: 'Disney Plus', label: 'Disney Plus' },
  { value: 'Crunchyroll', label: 'Crunchyroll' },
  { value: 'Other', label: 'Other' }
]

const statuses = [
  { value: '', label: 'Select a Status' },
  { value: 'Watched', label: 'Watched' },
  { value: 'In Progress', label: 'In Progress' }
]

module.exports = {
  platforms: platforms,
  statuses: statuses
}
