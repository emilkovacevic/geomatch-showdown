'use client'

import { Button } from "./ui/button";

export interface CardProps {
  country: string;
  capital: string;
  isMatched: boolean;
  isSelected: boolean;
  onClick: () => void;
}

  const Card = ({ country, capital, isMatched, isSelected, onClick }: CardProps) => {
  let cardClass = "h-20";

  if (isMatched) {
    cardClass += " bg-green-500";
  } else if (isSelected) {
    cardClass += " bg-yelllow-500";
  }

  const handleClick = () => {

  }

  return (
    <Button 
    onClick={handleClick}
    variant={"game_option"} className={`${cardClass}`}>
      {isMatched || isSelected ? capital : country}
    </Button>
  );
};

export default Card;