import "./Card.css";
function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    !disabled && handleChoice(card);
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" alt="card front" src={card.src} />

        <img
          className="back"
          src="/img/smiley.png"
          alt="card cover"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Card;
