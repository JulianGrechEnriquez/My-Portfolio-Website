import {Box, Button, Card, Stack, Text} from '@sanity/ui'
import {useState} from 'react'
import {TextInputProps, useDocumentOperation, useFormValue} from 'sanity'

type StylePreset = {
  theme?: Record<string, string>
  heroLayout?: string
  playButtonText?: string
  pageLayout?: Record<string, string | string[]>
  sectionLabels?: Record<string, string>
}

const themeFields = [
  'backgroundColor',
  'contentColor',
  'cardColor',
  'textColor',
  'accentColor',
  'buttonColor',
  'buttonTextColor',
]

const pageLayoutFields = [
  'preset',
  'overviewLayout',
  'contentLayout',
  'sectionStyle',
  'gameplayLayout',
  'imageShape',
  'sectionSpacing',
  'sectionOrder',
  'hiddenSections',
]

const sectionLabelFields = ['overview', 'gameplay', 'features', 'tech', 'learned', 'future']

export function StylePresetCodeInput(props: TextInputProps) {
  const [message, setMessage] = useState('')
  const documentId = useFormValue(['_id']) as string | undefined
  const documentType = useFormValue(['_type']) as string | undefined
  const publishedDocumentId = (documentId || '').replace(/^drafts\./, '')
  const {patch} = useDocumentOperation(publishedDocumentId, documentType || '')

  const applyPreset = () => {
    if (!props.value) {
      setMessage('Paste a preset code first.')
      return
    }

    let preset: StylePreset

    try {
      preset = JSON.parse(props.value) as StylePreset
    } catch (error) {
      setMessage('This is not valid JSON. Check commas and brackets.')
      return
    }

    const patchSet = buildPatchSet(preset)

    if (!Object.keys(patchSet).length) {
      setMessage('No matching style fields were found in this preset code.')
      return
    }

    if (patch.disabled) {
      setMessage('Save or wait for the document to finish loading, then try again.')
      return
    }

    patch.execute([{set: patchSet}])
    setMessage('Applied. The style fields below have been filled in.')
  }

  return (
    <Stack space={3}>
      {props.renderDefault(props)}
      <Button mode="ghost" tone="primary" text="Apply preset code to fields" onClick={applyPreset} />
      {message && (
        <Card padding={3} radius={2} tone={message.startsWith('Applied') ? 'positive' : 'caution'}>
          <Box>
            <Text size={1}>{message}</Text>
          </Box>
        </Card>
      )}
    </Stack>
  )
}

function buildPatchSet(preset: StylePreset) {
  const patchSet: Record<string, unknown> = {}
  const theme = pickStringFields(preset.theme, themeFields)
  const pageLayout = pickLayoutFields(preset.pageLayout)
  const sectionLabels = pickStringFields(preset.sectionLabels, sectionLabelFields)

  if (Object.keys(theme).length) patchSet.theme = theme
  if (Object.keys(pageLayout).length) patchSet.pageLayout = pageLayout
  if (Object.keys(sectionLabels).length) patchSet.sectionLabels = sectionLabels
  if (typeof preset.heroLayout === 'string') patchSet.heroLayout = preset.heroLayout
  if (typeof preset.playButtonText === 'string') patchSet.playButtonText = preset.playButtonText

  return patchSet
}

function pickStringFields(source: unknown, allowedFields: string[]) {
  const output: Record<string, string> = {}

  if (!source || typeof source !== 'object') return output

  allowedFields.forEach(field => {
    const value = (source as Record<string, unknown>)[field]
    if (typeof value === 'string') output[field] = value
  })

  return output
}

function pickLayoutFields(source: unknown) {
  const output: Record<string, string | string[]> = {}

  if (!source || typeof source !== 'object') return output

  pageLayoutFields.forEach(field => {
    const value = (source as Record<string, unknown>)[field]
    if (typeof value === 'string') {
      output[field] = value
    }
    if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
      output[field] = value
    }
  })

  return output
}
