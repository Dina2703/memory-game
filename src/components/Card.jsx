import "./Card.css";
function Card({ card }) {
  return (
    <div className="card">
      <div>
        <img className="front" alt="card front" src={card.src} />
        <img className="back" src="/img/cover.png" alt="card cover" />
      </div>
    </div>
  );
}

export default Card;
