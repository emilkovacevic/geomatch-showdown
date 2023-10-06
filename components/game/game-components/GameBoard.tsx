import { WORLD_DATA } from "@/data/world";
import Card, { CardProps } from "@/components/GameCard";
import useGameState from "@/store/game-store";

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const GameBoard = () => {
  // seectedCards
  const { selectedCards, isMatched, isSelectedPair, setIsMatched, gameTimer, setGameOver, setGameTimer, penalty, setGamePenaltyTime, country, capital } = useGameState()

  return (
    <section className="grid grid-cols-4 gap-2 lg:gap-4">
      {WORLD_DATA.map((card) => (
        <Card
          key={card.capital}
          country={card.country}
          capital={card.capital}
          isMatched={isSelectedPair.includes(card.capital)}
          isSelected={selectedCards.some(
            (selectedCard) => selectedCard.country === card.country && selectedCard.capital === card.capital
          )}
          onClick={()=>{}}
          // onClick={() => handleCardClick(card.country, card.capital)}
        />
      ))}
    </section>
  );
};

export default GameBoard;
