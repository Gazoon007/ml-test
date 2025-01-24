import type { Ref } from 'vue'
import { useCloned } from '@vueuse/core'
import { ref } from 'vue'

export function useArrayManager<T extends Record<string, any>>(initialArray: T[]) {
  const array = ref<T[]>([...initialArray]) as Ref<T[]>

  const moveUp = (index: number): void => {
    if (index > 0) {
      const newArr = [...array.value];
      [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]]
      array.value = newArr
    }
  }

  const moveDown = (index: number): void => {
    if (index < array.value.length - 1) {
      const newArr = [...array.value];
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]]
      array.value = newArr
    }
  }

  const duplicate = (index: number): void => {
    if (index >= 0 && index < array.value.length) {
      const newArr = [...array.value]
      const itemToDuplicate = array.value[index]
      const newItem = { ...itemToDuplicate, id: Date.now().toString() } as T
      newArr.splice(index + 1, 0, useCloned(newItem).cloned.value)
      array.value = newArr
    }
  }

  const remove = (index: number): void => {
    if (index >= 0 && index < array.value.length) {
      const newArr = [...array.value]
      newArr.splice(index, 1)
      array.value = newArr
    }
  }

  const insert = (newItem: T, index: number): void => {
    const newArr = [...array.value]
    if (index >= 0 && index <= newArr.length) {
      newArr.splice(index, 0, { ...newItem } as T)
      array.value = newArr
    }
  }

  const replace = (newItem: T, index: number): void => {
    if (index >= 0 && index < array.value.length) {
      const newArr = [...array.value]
      newArr[index] = { ...newItem } as T
      array.value = newArr
    }
  }

  return {
    mutatedArray: array,
    moveUp,
    moveDown,
    duplicate,
    remove,
    insert,
    replace,
  }
}
