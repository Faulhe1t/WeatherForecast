import React from "react";
import { $weatherData } from "../Store/model";
import { useUnit } from "effector-react";
import { iconChanger } from "./iconChanger";

export const MainWeather = () => {

  const weatherData = useUnit($weatherData)

  return <div className='mainWeatherCard'>
    { weatherData && (
      <>
        <div className='mainWeatherCard__mainIcon'> { iconChanger(weatherData.list[0].weather[0].main) }  </div>
        <div
          className='mainWeatherCard__temperature'>{ weatherData.list[0].main.temp.toString().substring(0, 2) + '°C' }</div>
        <div className='mainWeatherCard__weather'>{ weatherData.list[0].weather[0].main }</div>
        <div className='mainWeatherCard__city'>{ weatherData.city.name }</div>
      </>
    ) }

  </div>
}