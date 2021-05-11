const platforms = [
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
  { value: 'Completed', label: 'Completed' },
  { value: 'In Progress', label: 'In Progress' }
]

// textToValue transforms a text value to a value/label format to pre-populate
// the Select component that calls the function. It currently supports both
// platform dropdowns and status dropdowns
const textToValue = (text, type) => {
  let array = []
  switch (type) {
    case 'platform':
      array = platforms
      break
    case 'status':
      array = statuses
      break
    default:
      break
  }
  const match = array.filter((p) => p.value === text)
  if (match.length === 0) {
    return {
      value: '',
      label: `Select a ${type.charAt(0).toUpperCase() + type.slice(1)}`
    }
  } else {
    return match[0]
  }
}

module.exports = {
  platforms: platforms,
  statuses: statuses,
  textToValue: textToValue
}
