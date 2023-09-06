import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SearchBoxUserUpdate = ({ onSearchChange }) => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const loadOptions = async (inputValue) => {
    setLoading(true);
    console.log(inputValue);
    try {
      const response = await fetch(`http://localhost:3002/api/search-user-update?user_update_by=${inputValue}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions('');
  }, []);

  return (
    <Autocomplete
      id="search-box"
      options={options}
      getOptionLabel={(option) => option.name} // Assuming 'name' is the property to be displayed in the dropdown
      onInputChange={(event, newInputValue) => {
        setSearchText(newInputValue);
        loadOptions(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search by User Update By"
          variant="outlined"
          onChange={(event) => {
            const { value } = event.target;
            setSearchText(value);
            onSearchChange(value);
          }}
          value={searchText}
          size="small" // Set the size prop to "small"
        />
      )}
      loading={loading}
    />
  );
};

export default SearchBoxUserUpdate;
