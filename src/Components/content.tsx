import { useUnit } from "effector-react";
import { BadInputAlert } from "./badInputField";
import { MainWeather } from "./todayMainWeather";
import { $requestResult } from "../Store/model";
import SimpleSlider from "./weatherField";

export const MainContent = () => {
  const reqRes = useUnit($requestResult)

  if (reqRes) {
    return (
      <div className="App">
        <MainWeather></MainWeather>
        <SimpleSlider></SimpleSlider>
      </div>
    );
  } else {
    return (
      <div className="App">
        <BadInputAlert></BadInputAlert>
      </div>
    );
  }
}