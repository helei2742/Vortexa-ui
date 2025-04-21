import {defineStore} from 'pinia'
import {type Ref, ref} from "vue";

export const useWindowSizeStore = defineStore('windowSize', () => {
  const width: Ref<number> = ref(0)
  const height: Ref<number> = ref(0)
  const windowSizeChangedHandler: Ref<Array<(w: number, h: number) => void>> = ref([])

  const updateWindowSize = (w: number, h: number) => {
    width.value = w
    height.value = h

    if (windowSizeChangedHandler.value) {
      windowSizeChangedHandler.value.forEach(handler => handler(w, h))
    }
  }

  const addWindowSizeChangeHandler = (handler: (w: number, h: number) => void) => {
    windowSizeChangedHandler.value.push(handler)
  }

  return {
    width,
    height,
    updateWindowSize,
    addWindowSizeChangeHandler
  }
})
