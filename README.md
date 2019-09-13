## watermark

A canvas-based watermark component, including watermark names and company logos, etc.

> **Note:** Examples are as follows:

```html
<div class="watermark-container" id="watermarkContainer"></div>
```

```js
const wm = new watermark({
  el: '#watermarkContainer',
  imprintText: '黄永泰',
  imprintAngle: -Math.PI / 12,
  logoPattern: 'image',
  logoImgSrc:
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568368824188&di=a5bc896a1ccd00c6049c8e4b0392ca36&imgtype=0&src=http%3A%2F%2Fi.gbc.tw%2Fgb_img%2F0%2F002%2F194%2F2194310m.jpg',
  logoText: 'dddd',
  isShowLogo: true,
})
```

## Installation

`npm install @hythandsome/canvaswatermark`

## API Documentation

```
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


```

| field         | Explain                                                                                    | Type           | Default value    | Optional value                       |
| ------------- | ------------------------------------------------------------------------------------------ | -------------- | ---------------- | ------------------------------------ |
| el            | Container element                                                                          | string/Element | ''               | none                                 |
| imprintText   | Watermark text                                                                             | string         | ''               | none                                 |
| imprintAngle  | Tilt angle of watermarking distance in horizontal direction                                | number         | -Math.PI / 12    | none                                 |
| logoPattern   | Rendering logo adoption mode                                                               | LogoPattern    | LogoPattern.Text | LogoPattern.Text / LogoPattern.Image |
| logoText      | When logoPatternshi is a text mode, logo will render according to the content of the text. | string         | ''               | none                                 |
| logoImgSrc    | When logoPatternshi is a image mode, logo will render according to Picture URL             | string         | ''               | none                                 |
| isShowLogo    | Whether to display logo                                                                    | Boolean        | true             | none                                 |
| isShowImprint | Whether to display imprint                                                                 | Boolean        | true             | none                                 |
