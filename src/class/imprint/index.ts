import { DEFAULT_OPTION } from './config'
import { Option } from './type'
import { getElement } from '../../utils'
import CanvasDraw from '../canvasDraw'

const PROPORTION = 6

class Imprint extends CanvasDraw {
  private option: Option

  public getOption(): Option {
    return this.option
  }

  public setOption(option: Option): void {
    this.option = {
      ...DEFAULT_OPTION,
      ...option,
    }
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
      height: this.option.width * (26 / 375),
      fontSize: Math.ceil(this.option.width * (13 / 375)),
      spacing: this.option.width * (11 / 375), // 左右边距
      marginBottom: this.option.width * (11 / 75),
      marginRight: this.option.width * (6 / 25),
    }
  }

  public drawWaterMark(ctx, posx = 0, posy = 0) {
    ctx.beginPath()

    const { width, height, fontSize } = this.calculateTextClockProps()

    // 暂时注释背景色
    // ctx.fillStyle="rgba(255,255,255,0.03)"
    // ctx.fillRect(posx, posy, width, height)

    ctx.font = `${fontSize}px sans-serif`

    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'rgba(38,38,48,0.2)'
    ctx.fillText(
      this.option.text,
      posx + width / 2,
      posy + (height - fontSize) / 2
    )
  }

  public render(): void {
    const canvas = this.getCanvas()
    const ctx = this.getCtx()
    canvas.width = this.option.width
    canvas.height = this.option.height
    canvas.style.width = `${this.option.width / PROPORTION}px`
    canvas.style.height = `${this.option.height / PROPORTION}px`
    ctx.globalAlpha = 0.8
    ctx.font = `${this.option.width * (13 / 375)}px sans-serif`
    this.setTextWidth(ctx.measureText(this.option.text).width)

    const {
      width,
      height,
      marginBottom,
      marginRight,
    } = this.calculateTextClockProps()
    // 计算能排多少行多少列
    const angle = Math.abs(this.option.angle)
    const reserveX = this.option.width * Math.tan(angle)

    const row = Math.ceil(
      this.option.height + reserveX / (height + marginBottom)
    )
    const column = Math.ceil(this.option.width / (width + marginRight))

    ctx.rotate(this.option.angle)

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        const isEven = i % 2
        const posx = isEven
          ? width + (marginRight - width) / 2 + j * (width + marginRight)
          : j * (width + marginRight)
        const posy = i * (height + marginBottom)
        this.drawWaterMark(ctx, posx, posy)
      }
    }
  }
}

export default Imprint
