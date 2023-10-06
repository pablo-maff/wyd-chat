import { useState } from 'react';

export function useSearch(data, searchKey, placeholderValue) {
  // * add a state variable for the filter
  const [searchValue, setSearchValue] = useState('');

  const filteredData = data.filter(item => {
    return item[searchKey].toLowerCase().includes(searchValue.toLowerCase());
  });

  const searchInput = (
    <input
      type="text"
      placeholder={`Search by ${placeholderValue || searchKey}...`}
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      className='bg-gray-200 m-2 px-3 h-7 rounded-md w-full'
    />
  )

  return {
    filteredData,
    searchInput
  }
}