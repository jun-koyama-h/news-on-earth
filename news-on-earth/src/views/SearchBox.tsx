import React, { useState } from 'react';

function SearchBox(props) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (props.onSearchChange) {
      props.onSearchChange(e.target.value);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBox;