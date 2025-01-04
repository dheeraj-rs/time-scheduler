import { create } from 'zustand'

type ScrollStore = {
  scrollPositions: Record<string, number>
  setScrollPosition: (key: string, position: number) => void
  getScrollPosition: (key: string) => number
  clearScrollPosition: (key: string) => void
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  scrollPositions: {},
  setScrollPosition: (key, position) => 
    set(state => ({
      scrollPositions: {
        ...state.scrollPositions,
        [key]: position,
      }
    })),
  getScrollPosition: (key) => get().scrollPositions[key] || 0,
  clearScrollPosition: (key) =>
    set(state => {
      const { [key]: _, ...rest } = state.scrollPositions
      return { scrollPositions: rest }
    })
})) 