
import React, {useState} from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import {GEO_API_URL, geoApiOptions} from '../util/api';

const Search = ({onSearchChange}) => {
  const [search,setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }
  const loadOptions = (inputValue) => {
    console.log(GEO_API_URL);
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
    .then(response => response.json())
    .then(response => {
      return{
        options: response.data.map((city)=>{
          return{
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }
        })
      }
    })
    .catch(err => console.error(err));
  }
  return (
    <AsyncPaginate 
      placeholder="Search for city"
      debounceTimeout={1000}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  )
}

export default Search;