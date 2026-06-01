const classPrefixes = [
  'game-layout-',
  'game-preset-',
  'game-overview-',
  'game-content-',
  'game-sections-',
  'gameplay-layout-',
  'game-images-',
  'game-spacing-',
]

const defaultSectionOrder = ['overview', 'gameplay', 'features', 'tech', 'learned', 'future']

const defaultTheme = {
  backgroundColor: '#3E4E85',
  contentColor: '#eef1ff',
  cardColor: '#B3C2FF',
  textColor: '#0a0a3c',
  accentColor: '#04044a',
  buttonColor: '#00c853',
  buttonTextColor: '#ffffff',
}

export function applyGamePageCustomization({ theme, heroLayout, pageLayout, sectionLabels } = {}, options = {}) {
  if (options.reset) {
    resetGamePageCustomization()
  }

  applyTheme(theme)
  applyHeroLayout(heroLayout)
  applyPageLayout(pageLayout)
  applySectionLabels(sectionLabels)
}

export function resetGamePageCustomization() {
  classPrefixes.forEach(prefix => {
    document.body.classList.forEach(className => {
      if (className.startsWith(prefix)) {
        document.body.classList.remove(className)
      }
    })
  })

  Object.entries(getThemeVars()).forEach(([field, variable]) => {
    document.documentElement.style.setProperty(variable, defaultTheme[field])
  })

  restoreDefaultSectionOrder()
  Object.values(getSectionIds()).forEach(sectionId => {
    const section = document.getElementById(sectionId)
    if (section) section.hidden = false
  })
}

function applyTheme(theme = {}) {
  theme = theme || {}

  Object.entries(getThemeVars()).forEach(([field, variable]) => {
    if (theme[field]) {
      document.documentElement.style.setProperty(variable, theme[field])
    }
  })
}

function getThemeVars() {
  return {
    backgroundColor: '--game-bg',
    contentColor: '--game-content-bg',
    cardColor: '--game-card-bg',
    textColor: '--game-text',
    accentColor: '--game-accent',
    buttonColor: '--game-button-bg',
    buttonTextColor: '--game-button-text',
  }
}

function applyHeroLayout(layout = 'centered') {
  addOptionClass('game-layout', layout, ['centered', 'split', 'banner'], 'centered')
}

function applyPageLayout(layout = {}) {
  layout = layout || {}

  addOptionClass('game-preset', layout.preset, ['classic', 'arcade', 'showcase', 'compact'], 'classic')
  addOptionClass('game-overview', layout.overviewLayout, ['card', 'split', 'callout'], 'card')
  addOptionClass('game-content', layout.contentLayout, ['stacked', 'two-column', 'alternating'], 'stacked')
  addOptionClass('game-sections', layout.sectionStyle, ['filled', 'outlined', 'minimal'], 'filled')
  addOptionClass('gameplay-layout', layout.gameplayLayout, ['grid', 'featured', 'strip'], 'grid')
  addOptionClass('game-images', layout.imageShape, ['rounded', 'square', 'shadow'], 'rounded')
  addOptionClass('game-spacing', layout.sectionSpacing, ['comfortable', 'compact', 'airy'], 'comfortable')
  applySectionOrder(layout.sectionOrder)
  applyHiddenSections(layout.hiddenSections)
}

function addOptionClass(prefix, value, allowedValues, fallback) {
  const selectedValue = allowedValues.includes(value) ? value : fallback
  document.body.classList.add(`${prefix}-${selectedValue}`)
}

function applySectionOrder(sectionOrder = []) {
  if (!Array.isArray(sectionOrder) || !sectionOrder.length) return

  const content = document.querySelector('.content')
  const backBtn = document.querySelector('.back-btn')
  const sectionIds = getSectionIds()
  const selectedOrder = sectionOrder.filter((sectionName, index) => (
    sectionIds[sectionName] && sectionOrder.indexOf(sectionName) === index
  ))
  const finalOrder = [
    ...selectedOrder,
    ...defaultSectionOrder.filter(sectionName => !selectedOrder.includes(sectionName)),
  ]

  finalOrder.forEach(sectionName => {
    const section = document.getElementById(sectionIds[sectionName])
    if (section && content && backBtn) {
      content.insertBefore(section, backBtn)
    }
  })
}

function restoreDefaultSectionOrder() {
  const content = document.querySelector('.content')
  const backBtn = document.querySelector('.back-btn')
  const sectionIds = getSectionIds()

  defaultSectionOrder.forEach(sectionName => {
    const section = document.getElementById(sectionIds[sectionName])
    if (section && content && backBtn) {
      content.insertBefore(section, backBtn)
    }
  })
}

function applyHiddenSections(hiddenSections = []) {
  if (!Array.isArray(hiddenSections) || !hiddenSections.length) return

  const sectionIds = getSectionIds()

  hiddenSections.forEach(sectionName => {
    const section = document.getElementById(sectionIds[sectionName])
    if (section) {
      section.hidden = true
    }
  })
}

function getSectionIds() {
  return {
    overview: 'overviewSection',
    gameplay: 'gameplaySection',
    features: 'featuresSection',
    tech: 'techSection',
    learned: 'learnedSection',
    future: 'futureSection',
  }
}

function applySectionLabels(labels = {}) {
  labels = labels || {}

  const labelTargets = {
    overview: 'overviewLabel',
    gameplay: 'gameplayLabel',
    features: 'featuresLabel',
    tech: 'techLabel',
    learned: 'learnedLabel',
    future: 'futureLabel',
  }

  Object.entries(labelTargets).forEach(([field, elementId]) => {
    if (labels[field]) {
      document.getElementById(elementId).textContent = labels[field]
    }
  })
}
