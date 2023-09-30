import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clearValue = () => setValue('')

  const className = 'p-2 rounded border bg-white border-gray-400 w-full valid:border-green-500 invalid:border-red-500'

  const { ...inputs } = { type, value, onChange, className }

  return {
    inputs,
    clearValue
  }
}