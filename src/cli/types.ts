export type LayoutValue = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

export type Manifest = {
  output: string
  src: string
  width: number
  quality: number
  extension: string
}[]

export type GetOptimizeResultProps = {
  originalFilePath: string
  originalWidth: number
} & Omit<Manifest[number], 'src'>
export type GetOptimizeResult = (getOptimizeResultProps: GetOptimizeResultProps) => Promise<void>
