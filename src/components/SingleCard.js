import React from "react";
import "./SingleCard.css";

export default function SingleCard({
	card,
	handleChoice,
	flipped,
	disabled,
	count,
}) {
	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};
	console.log(count);
	return (
		<div className='card'>
			<div className={flipped ? "flipped" : ""}>
				<img className='front' src={card.src} alt='card front' />
				<div className='back'>
					<p className='card-number'>{count + 1}</p>
					<img src='/img/cardback.svg' onClick={handleClick} alt='card back' />
				</div>
			</div>
		</div>
	);
}
