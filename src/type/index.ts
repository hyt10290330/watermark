export enum LogoPattern {
  Text = 'text',
  Image = 'image',
}

export interface Option {
  el: string | Element
  imprintText: string
  imprintAngle: number
  logoPattern: LogoPattern
  logoText: string
  logoImgSrc: string
  isShowLogo: Boolean
  isShowImprint: Boolean
}
