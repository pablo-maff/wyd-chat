import { useState } from 'react'

export function useLocalStorage() {
  const [value, setValue] = useState(undefined)

  function setItem(key, value) {
    localStorage.setItem(key, value)
    setValue(value)
  }

  function getItem(key) {
    const value = localStorage.getItem(key)
    const parsedValue = JSON.parse(value)

    setValue(parsedValue)
    return parsedValue
  }

  function removeItem(key) {
    localStorage.removeItem(key)
    setValue(null)
  }

  return { value, setItem, getItem, removeItem }
}