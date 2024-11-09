import { ChangeEvent, FC } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value)
  }

  return (
    <div className='search-bar'>
      <input type='text' placeholder='Search for products...' onChange={handleChange} className='search-input' />
    </div>
  )
}

export default SearchBar
