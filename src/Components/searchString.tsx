import { useUnit } from "effector-react";
import { CiSearch } from "react-icons/ci";
import {
  $cityInput,
  getCityInput,
  Search, SearchByGeolocation,
} from "../Store/model";
import React, { useEffect } from "react";

export const SearchingField = () => {

  const [city, cityInput] = useUnit([$cityInput, getCityInput])

  SearchByGeolocation()

  const handleSearch = async () => {
    await Search(city)
  }

  const handleKeyDown = ({keyCode}: KeyboardEvent) => {
    console.log(keyCode)
    if (keyCode === 13) {
      handleSearch()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown)
    return () => document.body.removeEventListener('keydown', handleKeyDown)
  })

  return <div className='searchArea'>
    <input className='searchArea__inputField' type='text' placeholder='Enter a city'
           value={ city }
           onChange={ (e) => cityInput(e.target.value) }
    />
    <button className='searchArea__searchButton' onClick={ handleSearch }>
      <CiSearch className='searchArea__searchButton__searchIcon'></CiSearch></button>
  </div>

}