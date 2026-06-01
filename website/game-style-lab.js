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
const copyPresetBtn = document.getElementById('copyPresetBtn')
const copyPresetStatus = document.getElementById('copyPresetStatus')

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
  updatePreview()
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
  presetCodeOutput.value = JSON.stringify(preset, null, 2)
  copyPresetStatus.textContent = ''
}

function getPresetCode() {
  return {
    theme: {
      backgroundColor: controls.backgroundColor.value,
      contentColor: controls.contentColor.value,
      cardColor: controls.cardColor.value,
      textColor: controls.textColor.value,
      accentColor: controls.accentColor.value,
      buttonColor: controls.buttonColor.value,
      buttonTextColor: controls.buttonTextColor.value,
    },
    heroLayout: controls.heroLayout.value,
    playButtonText: 'Play Test',
    pageLayout: {
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
