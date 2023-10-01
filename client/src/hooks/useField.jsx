import { useEffect, useRef, useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null);

  const initialStyling = 'p-2 rounded border border-gray-400 bg-white w-full'

  useEffect(() => {
    // * Set the initial className when the component mounts
    if (inputRef.current) {
      inputRef.current.className = initialStyling
    }
  }, [])

  function onChange(event) {
    setValue(event.target.value)
  }

  function onBlur() {
    // * Check the validity of the input using the validity property
    const isValid = inputRef.current.validity.valid

    // * Set the border color based on validity
    const borderColorClass = isValid ? 'border-green-500' : 'border-red-500'

    // * Update the input's className to change the border color
    inputRef.current.className = `${initialStyling} ${borderColorClass}`
  }

  function clearValue() {
    setValue('')
    // * Reset the border color and input value when clearing the input
    inputRef.current.className = initialStyling
    inputRef.current.value = ''
  }

  const { ...inputs } = {
    type,
    value,
    onChange,
    onBlur,
    ref: inputRef,
  };

  return {
    inputs,
    clearValue,
  }
}