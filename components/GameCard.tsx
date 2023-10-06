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
  let cardClass = "card";

  if (isMatched) {
    cardClass += " matched";
  } else if (isSelected) {
    cardClass += " selected";
  }

  return (
    <Button variant={"game_option"} className="h-20">
      {isMatched || isSelected ? capital : country}
    </Button>
  );
};

export default Card;