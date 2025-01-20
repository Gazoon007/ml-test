import { useCloned } from '@vueuse/core'
import { ref } from 'vue'

export function useArrayManager(initialArray = []) {
  const array = ref(initialArray)

  const moveUp = (index) => {
    if (index > 0) {
      const newArr = [...array.value];
      [newArr[index], newArr[index - 1]] = [newArr[index - 1], newArr[index]]
      array.value = newArr
    }
  }

  const moveDown = (index) => {
    if (index < array.value.length - 1) {
      const newArr = [...array.value];
      [newArr[index], newArr[index + 1]] = [newArr[index + 1], newArr[index]]
      array.value = newArr
    }
  }

  const duplicate = (index) => {
    if (index >= 0 && index < array.value.length) {
      const newArr = [...array.value]
      const newItem = { ...newArr[index], id: Date.now().toString() }
      newArr.splice(index + 1, 0, useCloned(newItem).cloned.value)
      array.value = newArr
    }
  }

  const remove = (index) => {
    if (index >= 0 && index < array.value.length) {
      const newArr = [...array.value]
      newArr.splice(index, 1)
      array.value = newArr
    }
  }

  const insert = (newItem, index) => {
    const newArr = [...array.value]
    if (index >= 0 && index <= newArr.length) {
      newArr.splice(index, 0, { ...newItem })
      array.value = newArr
    }
  }

  const replace = (newItem, index) => {
    if (index >= 0 && index < array.value.length) {
      const newArr = [...array.value]
      newArr[index] = { ...newItem }
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
