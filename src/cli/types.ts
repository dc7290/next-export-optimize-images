import { FormatEnum, OutputInfo, Sharp } from 'sharp'

export type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

export type Manifest = {
  src: string
  sizes?: string
  quality?: number
  layout?: LayoutValue
  placeholder?: 'blur' | 'empty'
  unoptimized?: boolean
}[]

export type GetOptimizeResultProps = {
  image: Sharp
  name: string
  format?: keyof FormatEnum
  width: number
  quality: number
}
export type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<OutputInfo>
