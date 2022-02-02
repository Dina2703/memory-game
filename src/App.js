import { useState, useEffect } from "react";
import useSound from "use-sound";
import Confetti from "react-confetti";
import { FaSpinner } from "react-icons/fa";
import "./App.css";
import Card from "./components/Card";
import mainMusic from "./audio/main.mp3";
import { MdOutlineMusicOff, MdOutlineMusicNote } from "react-icons/md";



  const photo = 2;

const cardImages = [
  { src: `./img/potion-${photo}.png`, matched: false },
  { src: `./img/helmet-${photo}.png`, matched: false },
  { src: `/img/ring-${photo}.png`, matched: false },
  { src: `/img/scroll-${photo}.png`, matched: false },
  { src: `/img/shield-${photo}.png`, matched: false },
  { src: `/img/sword-${photo}.png`, matched: false },
];


// const audioTune = new Audio("./audio/apllause.mp3");
const MyButton = () => {
  const [play, { stop }] = useSound(mainMusic);

  return (
    <div
      style={{
        display: "inline-block",
        background: "#b94e72",
        marginLeft: "26px",
      }}
    >
      <span onClick={() => play()}>
        <MdOutlineMusicNote style={{ padding: "2px", paddingTop: '5px' }} />
      </span>
      <span onClick={() => stop()} style={{ border: "none" }}>
        <MdOutlineMusicOff style={{ padding: "2px" }} />
      </span>
    </div>
  );
};
function Loading() {
  return (
    <div>
      <FaSpinner color="red" size={70} />
    </div>
  );
}

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [confettiStage, setConfettiStage] = useState(false);
  const [loading, setLoading] = useState(true);

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
        setTimeout(() => resetTurn(), 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  // console.log(cards);
  useEffect(() => {
    const check = cards.filter((card) => card.matched === true);
    if (check.length === 12) {
      console.log("all matched");
      setConfettiStage(true);
      setTimeout(() => setConfettiStage(false), 8000);
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
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="App">
      {confettiStage && (
        <Confetti width={window.width} height={window.height} />
      )}
      <h1>Игра на запоминание</h1>
      <button onClick={shuffleCards}>Новая игра</button>
      <MyButton />
      {loading === false ? (
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
      ) : (
        <Loading />
      )}
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
