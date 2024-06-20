import React from "react";
import { BsCloudFog2Fill, BsFillCloudFill, BsFillCloudRainFill, BsFillSunFill } from "react-icons/bs";
import { TiWeatherPartlySunny } from "react-icons/ti";

export const iconChanger = (weather: string) => {
  let iconElement: React.ReactNode
  let iconColor: string

  switch (weather) {
    case "Rain":
      iconElement = <BsFillCloudRainFill />
      iconColor = '#1f3d7a'
      break

    case "Clear":
      iconElement = <BsFillSunFill />
      iconColor = '#ffd633'
      break

    case "Clouds":
      iconElement = <BsFillCloudFill />
      iconColor = '#8585ad'
      break

    case "Mist":
      iconElement = <BsCloudFog2Fill />
      iconColor = '#d1d1e0'
      break

    default:
      iconElement = <TiWeatherPartlySunny />
      iconColor = 'white'
  }

  return (
    <span style={ {color: iconColor} }>{ iconElement }</span>
  )
}