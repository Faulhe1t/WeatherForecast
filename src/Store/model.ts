import { createEffect, createEvent, createStore, sample } from "effector";
import { api_Endpoint, api_key } from "../Models/data";
import axios from "axios";
import React from "react";

export interface WeatherDataProps {
  city: {
    name: string
  }
  list: {
    dt_txt: string
    main: {
      temp: number
    }
    weather: {
      main: string
    }[]
  }[]
}


export const $weatherData = createStore<WeatherDataProps | null>(null)
export const $cityInput = createStore<string>('')
export const $requestResult = createStore<boolean>(true)
export const $cartIndex = createStore<number>(0)
export const getGeolocationData = createEvent<WeatherDataProps>()
export const getCityInput = createEvent<string>()


export const getCityData = createEvent<WeatherDataProps>()
export const setWrong = createEvent()
export const setGood = createEvent()
export const setCardIndex = createEvent<any>()




sample({
  clock: getGeolocationData,
  fn: (receivedData: WeatherDataProps) => receivedData,
  target: $weatherData
})

sample({
  clock: getCityInput,
  fn: (input: string) => input,
  target: $cityInput
})

sample({
  clock: getCityData,
  fn: (receivedData: WeatherDataProps) => receivedData,
  target: $weatherData
})

sample({
  clock: setWrong,
  fn: () => false,
  target: $requestResult
})

sample({
  clock: setGood,
  fn: () => true,
  target: $requestResult
})

sample({
  clock: setCardIndex,
  fn: (index: number) => index,
  target: $cartIndex
})


const fetchWeatherData = async (city: string) => {
  try {
    const url = `${ api_Endpoint }forecast?q=${ city }&appid=${ api_key }&units=metric`
    const searchResponse = await axios.get(url)
    const currentWeatherData: WeatherDataProps = searchResponse.data
    return {currentWeatherData}
  } catch (error) {
    console.error('No data')
    throw error
  }
}
export const Search = createEffect(async (city:string) => {
  if (city.trim() === '') {
    return
  }

  try {
    const {currentWeatherData} = await fetchWeatherData(city);
    getCityData(currentWeatherData)
    setGood()
  } catch (error) {
    console.error('No results')
    setWrong()
  }
})



const fetchCurrentWeather = async (lat: number, lon: number) => {
  const url = `${ api_Endpoint }forecast?lat=${ lat }&lon=${ lon }&appid=${ api_key }&units=metric`
  const response = await axios.get(url)
  return response.data
}
export const SearchByGeolocation = createEffect(async () => {
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          getGeolocationData(currentWeather)
          console.log(currentWeather)
        }
      )
    })
  }, [])
})
