import "./Card.css";
function Card({ card, handleChoice }) {
  const handleClick = () => {
handleChoice(card)
  }
  return (
    <div className="card">
      <div>
        <img className="front" alt="card front" src={card.src} />
        <img className="back" src="/img/cover.png" alt="card cover" onClick={handleClick}/>
      </div>
    </div>
  );
}

export default Card;
