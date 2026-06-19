declare module 'lenis' {
  interface LenisOptions {
    lerp?: number
    duration?: number
    smoothWheel?: boolean
    wheelMultiplier?: number
    touchMultiplier?: number
    infinite?: boolean
    orientation?: 'vertical' | 'horizontal'
    gestureOrientation?: 'vertical' | 'horizontal' | 'both'
    smoothTouch?: boolean
    wrapper?: HTMLElement | Window
    content?: HTMLElement
  }

  class Lenis {
    constructor(options?: LenisOptions)
    raf(time: number): void
    scrollTo(target: string | number | HTMLElement, options?: any): void
    on(event: string, callback: (...args: any[]) => void): void
    destroy(): void
  }

  export default Lenis
}
