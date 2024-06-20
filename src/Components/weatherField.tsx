import { WeatherCard } from "./weatherDayCard";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useUnit } from "effector-react";
import { $cartIndex, setCardIndex } from "../Store/model";

export default function SimpleSlider() {

  const [cardIndex, setCard] = useUnit([$cartIndex, setCardIndex])

  let myMap = new Map<number, JSX.Element>

  for (let i = 0; i < 4; i++) {
    myMap.set(i, <WeatherCard value={ i }></WeatherCard>)
  }


  function showPrevCard() {
    let index = cardIndex
    if (index === 0) {index = myMap.size - 1} else {index -= 1}
    setCard(index)
  }

  function showNextCard() {
    let index = cardIndex
    if (index === myMap.size - 1) {index = 0} else {index += 1}
    setCard(index)
  }

  function secondCardIndex() {
    if (cardIndex === 3)
      return 0
    else
      return cardIndex+1

  }

  return (
    <div className='slider'>
      <button className='slider__cardSliderButton' onClick={ showPrevCard }><MdKeyboardArrowLeft /></button>
      { myMap.get(cardIndex) }
      { myMap.get(secondCardIndex()) }
      <button className='slider__cardSliderButton' onClick={ showNextCard }><MdKeyboardArrowRight /></button>
    </div>
  );
}