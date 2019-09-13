import { DEFAULT_OPTION } from './config'
import { Option } from './type'
import { getElement } from '../../utils'
import CanvasDraw from '../canvasDraw'

const PROPORTION = 6

const getPixelRatio = function(context) {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1
  return (window.devicePixelRatio || 1) / backingStore
}

class Logo extends CanvasDraw {
  private option: Option

  public setOption(option: Option): void {
    this.option = {
      ...DEFAULT_OPTION,
      ...option,
    }
  }

  public getOption(): Option {
    return this.option
  }

  constructor(option: Option) {
    super()

    const el = getElement(option.el) as HTMLCanvasElement
    this.setCanvas(el)
    this.setOption(option)
    this.setCtx(el.getContext('2d'))

    this.render()
  }

  public clearRect(): void {
    this.getCtx().clearRect(0, 0, this.option.width, this.option.height)
  }

  public calculateTextClockProps(): any {
    return {
      width: this.getTextWidth() + this.option.width * (22 / 375),
      height: this.option.width * (33 / 375),
      fontSize: Math.ceil(this.option.width * (13 / 375)),
    }
  }

  public render() {
    const canvas = this.getCanvas()
    const ctx = this.getCtx()
    canvas.width = this.option.width
    canvas.height = this.option.height

    canvas.style.width = `${this.option.width / PROPORTION}px`
    canvas.style.height = `${this.option.height / PROPORTION}px`

    ctx.font = `${this.option.width * (13 / 375)}px sans-serif`
    this.setTextWidth(ctx.measureText(this.option.text).width)
    console.log('看看这里发生了什么')
    if (this.option.pattern === 'text') {
      this.fillRect(ctx)
      this.fillText(ctx)
    } else {
      const img = new Image()
      if (!this.option.imgSrc) {
        new Error(
          'When Logo is set to image, props image address imgSrc should be passed in'
        )
      }
      img.src = this.option.imgSrc

      const _this: any = this

      img.onload = function() {
        // const { width } = _this.calculateTextClockProps()
        // this.height / this.width = height / width
        const ratio = getPixelRatio(ctx)
        console.log('ratio', ratio)

        // TODO 水印高度为画布高度1/10
        const { height, width } = _this.getOption()
        const actualWidth = (height / 10 / img.height) * img.width
        const actualHeight = height / 10

        ctx.drawImage(img, width - actualWidth, 0, actualWidth, actualHeight)
      }
      img.onerror = function() {
        new Error('Picture Address Error')
      }
    }
  }

  public fillText(ctx) {
    ctx.beginPath()
    const { width, height, fontSize } = this.calculateTextClockProps()
    ctx.font = `${fontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'rgb(255,255,255)'
    // 根据文字宽度重置canvas宽度达到文字自适应 padding-left 和padding-right 为  1 / 3 高度
    ctx.fillText(
      this.option.text,
      this.option.width - width / 2,
      (height - fontSize) / 2
    )
  }

  public fillRect(ctx) {
    ctx.beginPath()
    const { width, height, fontSize } = this.calculateTextClockProps()
    ctx.fillStyle = 'rgba(200,200,202,0.3)'
    ctx.fillRect(this.option.width - width, 0, width, height)
  }
}

export default Logo
