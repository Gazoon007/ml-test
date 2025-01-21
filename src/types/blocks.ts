// Base interfaces
export interface BaseBlock<TStyle> {
  id: string
  type: string
  styleProperty: TStyle
}

interface PaddingStyle {
  topPadding: number
  bottomPadding: number
}

// Style interfaces
export interface ImageBlockStyle extends PaddingStyle {
  galleryLayout: 'default' | 'spaceless'
  backgroundColor: string
}

export interface TextBlockStyle extends PaddingStyle {
  backgroundColor: string
}

// Block interfaces
export interface ImageBlock extends BaseBlock<ImageBlockStyle> {
  links: (string | null)[]
}

export interface TextBlock extends BaseBlock<TextBlockStyle> {
  content: string
}
