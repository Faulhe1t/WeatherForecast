import { useUnit } from "effector-react";
import { $weatherData } from "../Store/model";
import React, { FunctionComponent } from "react";
import { iconChanger } from "./iconChanger";

interface indexProps {
  value: number
}

export const WeatherCard: FunctionComponent<indexProps> = ({value}) => {

  const weatherData = useUnit($weatherData)

  function getDayOfWeek(date: string) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
  }

  return <div className='dayWeatherCard'>
    { weatherData && (
      <>
        <div className='dayWeatherCard__date'>
          { getDayOfWeek(weatherData.list[8 * value].dt_txt.substring(0, 10)) }
        </div>
        <div className='dayWeatherCard__icon'>
          { iconChanger(weatherData.list[8 * value].weather[0].main) }
        </div>
        <div className='dayWeatherCard__temperature'>
          { weatherData.list[8 * value].main.temp.toString().substring(0, 2) + '°C' }
        </div>
        <div className='dayWeatherCard__weather'>
          { weatherData.list[8 * value].weather[0].main }
        </div>

      </>
    ) }
  </div>
}