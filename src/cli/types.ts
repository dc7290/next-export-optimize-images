import { OutputInfo, Sharp } from 'sharp'

export type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

export type Manifest = {
  src: string
  width?: number
  sizes?: string
  quality?: number
  layout?: LayoutValue
  placeholder?: 'blur' | 'empty'
  unoptimized?: boolean
}[]

export type GetOptimizeResultProps = {
  image: Sharp
  name: string
  format?: string
  originalWidth?: number
  width: number
  quality: number
}
export type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<OutputInfo>
