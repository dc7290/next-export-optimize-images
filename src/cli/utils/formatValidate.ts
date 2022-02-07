import { FormatEnum } from 'sharp'

const formats = ['jpeg', 'jpg', 'png', 'webp', 'avif'] as const
export type AllowedFormat = typeof formats[number]

const formatValidate = (format?: keyof FormatEnum): format is AllowedFormat =>
  formats.some((allowedFormat) => allowedFormat === format)

export default formatValidate
