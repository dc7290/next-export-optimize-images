import type { Sharp } from 'sharp'

export type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

export type Manifest = {
  output: string
  src: string
  width: number
  quality: number
  extension: string
}[]

export type GetOptimizeResultProps = {
  image: Sharp
  originalWidth: number
} & Omit<Manifest[number], 'src'>
export type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<void>
