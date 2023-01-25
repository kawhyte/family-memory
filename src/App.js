import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
	{ src: "/img/king_1.svg", matched: false },
	{ src: "/img/king_2.svg", matched: false },
	{ src: "/img/king_3.svg", matched: false },
	{ src: "/img/king_4.svg", matched: false },
	{ src: "/img/queen_1.svg", matched: false },
	{ src: "/img/queen_2.svg", matched: false },
	{ src: "/img/queen_3.svg", matched: false },
	{ src: "/img/queen_4.svg", matched: false },
	{ src: "/img/joker_1.svg", matched: false },
	{ src: "/img/joker_2.svg", matched: false },
	{ src: "/img/joker_3.svg", matched: false },
	{ src: "/img/joker_4.svg", matched: false },
	{ src: "/img/ten_heart.svg", matched: false },
	{ src: "/img/ten_diamond.svg", matched: false },
	{ src: "/img/eight_club.svg", matched: false },
	{ src: "/img/eight_spade.svg", matched: false },
	
];

function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);

	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);
 
	// shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));

     setChoiceOne(null)
     setChoiceTwo(null) 
		setCards(shuffledCards);
		setTurns(0);
	};



	// handle choice
	const handleChoice = (card) => {
		console.log("handleChoice", card);

		choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
	};

	// compare cards
	useEffect(() => {
    
		if (choiceOne && choiceTwo) {
      setDisabled(true)
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
				setTimeout(() => resetTurn(), 2000);
			}
		}
	}, [choiceOne, choiceTwo]);

	//console.log("Cards State", cards);

	// rest choices and increase turn
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
	};

  // start game automatically
  useEffect(() => {
  shuffleCards()

  }, [])
  
  



	return (
		<div className='App'>
  
			<div className='card-grid'>
				{cards.map((card, count) => (
					<SingleCard
						key={card.id}
						card={card}
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            count ={count}
					/>
				))}
			</div>
  
      <div className="header"> 
			<h1>Matching Game</h1>
      <p>Turns: {turns}</p>
			<button onClick={shuffleCards}>New Game</button>
      </div>
		</div>
	);
}

export default App;
