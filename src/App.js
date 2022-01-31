import { useState, useEffect } from "react";
import Confetti from "react-confetti";

import "./App.css";
import Card from "./components/Card";

const cardImages = [
  { src: "./img/potion-2.png", matched: false },
  { src: "./img/helmet-2.png", matched: false },
  { src: "/img/ring-2.png", matched: false },
  { src: "/img/scroll-2.png", matched: false },
  { src: "/img/shield-2.png", matched: false },
  { src: "/img/sword-2.png", matched: false },
];

// const audioTune = new Audio("./audio/apllause.mp3");

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [confettiStage, setConfettiStage] = useState(false);


  //shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setConfettiStage(false);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare 2 selected cards
  //useEffect body code will fire initially  when the component first mounts the DOM, then  everytime when dependencies get changed, values of [choiceOne && choiceTwo]
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);



  // console.log(cards);
  useEffect(() => {
    const check = cards.filter((card) => card.matched === true);
    if (check.length === 12) {
      console.log("all matched");
      setConfettiStage(true);
    }
  }, [cards]);

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    setConfettiStage(false);
  };

  //start a new game automatically

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      {confettiStage && (
        <Confetti width={window.width} height={window.height} />
      )}
      <h1>Игра на запоминание</h1>
      <button onClick={shuffleCards}>Новая игра</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
