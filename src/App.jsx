import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function App() {
  const [turns, setTurns] = useState(0);
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleNumbers = () => {
    const cardImages = [
      { src: "/images 1.jpg", matched: false },
      { src: "/images 2.jpg", matched: false },
      { src: "/images 3.jpg", matched: false },
      { src: "/images 4.jpg", matched: false },
      { src: "/images 5.jpg", matched: false },
      { src: "/images 6.jpg", matched: false },
      { src: "/images 7.jpg", matched: false },
      { src: "/images 8.jpg", matched: false },
    ];
    const newArr = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setCards(newArr);
  };

  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo && choiceOne.id !== choiceTwo.id) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleNumbers()
  }, [])

  return (
    <div className="container">
      <h1>Memory Game</h1>
      <button id="new-game" onClick={shuffleNumbers}>
        New Game
      </button>
      <div className="img-container">
        {cards.map((number, index) => (
          <div key={index} className="image">
            <Card
              key={number.id}
              number={number}
              handleChoice={handleChoice}
              flipped={
                number === choiceOne || number === choiceTwo || number.matched
              }
              disabled={disabled}
            />
          </div>
        ))}
      </div>
      <p id="turns">turns: {turns}</p>
    </div>
  );
}
