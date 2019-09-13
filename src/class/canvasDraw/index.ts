export default abstract class CanvasDraw {
  private textWidth: number
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D

  public getTextWidth(): number {
    return this.textWidth
  }

  public setTextWidth(textWidth: number): void {
    this.textWidth = textWidth
  }

  public getCanvas(): HTMLCanvasElement {
    return this.canvas
  }

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  public getCtx(): CanvasRenderingContext2D {
    return this.ctx
  }

  public setCtx(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx
  }

  public abstract render()
}
