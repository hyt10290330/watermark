import { DEFAULT_OPTION } from './config'
import { Option } from './type'
import { getElement } from './utils'
import Imprint from './class/imprint'
import Logo from './class/logo'
import './styl'

export default class Watermark {
  private option: Option
  private width: number
  private height: number
  private imprint: Imprint
  private logo: Logo
  private el: Element
  private containerClass = '__watermark_container__'
  private imprintClass = `__watermark_imprint__`
  private logoClass = `__watermark_log__`
  private _renderTid: any = null

  public setOption(option: Option): void {
    this.option = {
      ...DEFAULT_OPTION,
      ...option,
    }
  }

  public getOtion(): Option {
    return this.option
  }

  public setWidth(width: number): void {
    this.width = width
  }

  public getWidth(): number {
    return this.width
  }

  public setHeight(height: number): void {
    this.height = height
  }

  public getHeight(): number {
    return this.height
  }

  constructor(option: Option) {
    this.setOption(option)

    this.el = getElement(this.option.el)
    if (this.el === null) {
      throw new Error('el not found')
    }
    this.el.classList.add(this.containerClass)

    this.render()
    window.addEventListener('resize', () => void this.resize())
  }

  public render(): void {
    clearTimeout(this._renderTid)
    this._renderTid = setTimeout(() => {
      this.draw()
    }, 20)
  }

  public setSize(): void {
    const PROPORTION = 6
    this.setWidth(this.el.clientWidth * PROPORTION)
    this.setHeight(this.el.clientHeight * PROPORTION)
  }

  public draw(force: boolean = false): void {
    this.setSize()

    if (this.option.isShowImprint && (!this.imprint || force)) {
      let $imprint = this.el.querySelector(`.${this.imprintClass}`)
      if ($imprint === null) {
        $imprint = document.createElement('canvas')
        $imprint.className = this.imprintClass
        this.el.appendChild($imprint)
      }
      this.imprint = new Imprint({
        el: $imprint,
        text: this.option.imprintText,
        width: this.width,
        height: this.height,
        angle: this.option.imprintAngle,
      })
    }

    if (this.option.isShowLogo && (!this.logo || force)) {
      let $logo = this.el.querySelector(`.${this.logoClass}`)
      if ($logo === null) {
        $logo = document.createElement('canvas')
        $logo.className = this.logoClass
        this.el.appendChild($logo)
      }
      this.logo = new Logo({
        el: $logo,
        pattern: this.option.logoPattern,
        text: this.option.logoText,
        imgSrc: this.option.logoImgSrc,
        width: this.width,
        height: this.height,
      })
    }
  }

  public resize(): void {
    this.draw(true)
  }
}
