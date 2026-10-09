import "./card.css";

export default function Card({ number, handleChoice, flipped, disabled }) {
  function handleClick() {
    if (!disabled) handleChoice(number);
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={number.src} className="front" />
        <img src="none.png" className="back" onClick={handleClick} />
      </div>
    </div>
  );
}
