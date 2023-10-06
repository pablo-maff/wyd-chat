import { useState } from 'react';

export function useSearch(data, searchKey, placeholderValue) {
  // * add a state variable for the filter
  const [searchValue, setSearchValue] = useState('');


  if (!data || !searchKey) {
    return {
      filteredData: null,
      searchInput: null
    }
  }

  const filteredData = data.filter(item => {
    return item[searchKey].toLowerCase().includes(searchValue.toLowerCase());
  });

  const searchInput = (
    <input
      type="text"
      placeholder={`Search by ${placeholderValue || searchKey}...`}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className='bg-gray-200 px-2 h-8 rounded-md w-full'
    />
  )

  return {
    filteredData,
    searchInput
  }
}