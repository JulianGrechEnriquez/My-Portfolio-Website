import { applyGamePageCustomization } from './game-page-layout.js'

const controls = {
  heroLayout: document.getElementById('heroLayoutControl'),
  preset: document.getElementById('presetControl'),
  overviewLayout: document.getElementById('overviewLayoutControl'),
  contentLayout: document.getElementById('contentLayoutControl'),
  sectionStyle: document.getElementById('sectionStyleControl'),
  gameplayLayout: document.getElementById('gameplayLayoutControl'),
  imageShape: document.getElementById('imageShapeControl'),
  sectionSpacing: document.getElementById('sectionSpacingControl'),
  backgroundColor: document.getElementById('backgroundColorControl'),
  contentColor: document.getElementById('contentColorControl'),
  cardColor: document.getElementById('cardColorControl'),
  textColor: document.getElementById('textColorControl'),
  accentColor: document.getElementById('accentColorControl'),
  buttonColor: document.getElementById('buttonColorControl'),
  buttonTextColor: document.getElementById('buttonTextColorControl'),
}

const presetCodeOutput = document.getElementById('presetCodeOutput')
const applyPresetBtn = document.getElementById('applyPresetBtn')
const copyPresetBtn = document.getElementById('copyPresetBtn')
const copyPresetStatus = document.getElementById('copyPresetStatus')
let pastedPresetExtras = {}

const defaults = Object.fromEntries(
  Object.entries(controls).map(([name, control]) => [name, control.value])
)

Object.values(controls).forEach(control => {
  control.addEventListener('input', updatePreview)
  control.addEventListener('change', updatePreview)
})

document.getElementById('resetLabBtn').addEventListener('click', () => {
  Object.entries(defaults).forEach(([name, value]) => {
    controls[name].value = value
  })
  pastedPresetExtras = {}
  updatePreview()
})

applyPresetBtn.addEventListener('click', () => {
  const preset = parsePresetCode(presetCodeOutput.value)

  if (!preset) {
    copyPresetStatus.textContent = 'That code is not valid JSON yet.'
    return
  }

  syncControlsFromPreset(preset)
  pastedPresetExtras = getPresetExtras(preset)
  updatePreview()
  copyPresetStatus.textContent = 'Applied. You can change it with the controls now.'
})

copyPresetBtn.addEventListener('click', async () => {
  presetCodeOutput.select()
  await navigator.clipboard.writeText(presetCodeOutput.value)
  copyPresetStatus.textContent = 'Copied. Paste it into Style Preset Code in Sanity.'
})

updatePreview()

function updatePreview() {
  const preset = getPresetCode()

  applyGamePageCustomization(preset, { reset: true })
  document.getElementById('playBtn').textContent = preset.playButtonText || 'Play Test'
  presetCodeOutput.value = JSON.stringify(preset, null, 2)
  copyPresetStatus.textContent = ''
}

function getPresetCode() {
  return {
    ...pastedPresetExtras,
    theme: {
      ...pastedPresetExtras.theme,
      backgroundColor: controls.backgroundColor.value,
      contentColor: controls.contentColor.value,
      cardColor: controls.cardColor.value,
      textColor: controls.textColor.value,
      accentColor: controls.accentColor.value,
      buttonColor: controls.buttonColor.value,
      buttonTextColor: controls.buttonTextColor.value,
    },
    heroLayout: controls.heroLayout.value,
    playButtonText: pastedPresetExtras.playButtonText || 'Play Test',
    pageLayout: {
      ...pastedPresetExtras.pageLayout,
      preset: controls.preset.value,
      overviewLayout: controls.overviewLayout.value,
      contentLayout: controls.contentLayout.value,
      sectionStyle: controls.sectionStyle.value,
      gameplayLayout: controls.gameplayLayout.value,
      imageShape: controls.imageShape.value,
      sectionSpacing: controls.sectionSpacing.value,
    },
  }
}

function parsePresetCode(code) {
  const trimmedCode = code.trim()
  const jsonStart = trimmedCode.indexOf('{')
  const jsonEnd = trimmedCode.lastIndexOf('}')
  const jsonCode = jsonStart >= 0 && jsonEnd > jsonStart
    ? trimmedCode.slice(jsonStart, jsonEnd + 1)
    : trimmedCode

  try {
    const preset = JSON.parse(jsonCode)
    return preset && typeof preset === 'object' ? preset : null
  } catch (error) {
    return null
  }
}

function syncControlsFromPreset(preset) {
  setControlValue('heroLayout', preset.heroLayout)

  if (preset.theme) {
    setControlValue('backgroundColor', preset.theme.backgroundColor)
    setControlValue('contentColor', preset.theme.contentColor)
    setControlValue('cardColor', preset.theme.cardColor)
    setControlValue('textColor', preset.theme.textColor)
    setControlValue('accentColor', preset.theme.accentColor)
    setControlValue('buttonColor', preset.theme.buttonColor)
    setControlValue('buttonTextColor', preset.theme.buttonTextColor)
  }

  if (preset.pageLayout) {
    setControlValue('preset', preset.pageLayout.preset)
    setControlValue('overviewLayout', preset.pageLayout.overviewLayout)
    setControlValue('contentLayout', preset.pageLayout.contentLayout)
    setControlValue('sectionStyle', preset.pageLayout.sectionStyle)
    setControlValue('gameplayLayout', preset.pageLayout.gameplayLayout)
    setControlValue('imageShape', preset.pageLayout.imageShape)
    setControlValue('sectionSpacing', preset.pageLayout.sectionSpacing)
  }
}

function setControlValue(controlName, value) {
  if (!controls[controlName] || typeof value !== 'string') return

  const hasOption = controls[controlName].tagName !== 'SELECT'
    || Array.from(controls[controlName].options).some(option => option.value === value)

  if (hasOption) {
    controls[controlName].value = value
  }
}

function getPresetExtras(preset) {
  const extras = {}

  if (preset.sectionLabels) {
    extras.sectionLabels = preset.sectionLabels
  }

  if (typeof preset.playButtonText === 'string') {
    extras.playButtonText = preset.playButtonText
  }

  if (preset.pageLayout) {
    const pageLayoutExtras = {}

    if (Array.isArray(preset.pageLayout.sectionOrder)) {
      pageLayoutExtras.sectionOrder = preset.pageLayout.sectionOrder
    }

    if (Array.isArray(preset.pageLayout.hiddenSections)) {
      pageLayoutExtras.hiddenSections = preset.pageLayout.hiddenSections
    }

    if (Object.keys(pageLayoutExtras).length) {
      extras.pageLayout = pageLayoutExtras
    }
  }

  return extras
}
