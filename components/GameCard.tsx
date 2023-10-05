'use client'

import { Button } from "./ui/button";

interface CardProps {
    country: string;
    capital: string;
  }

  const Card: React.FC<CardProps> = ({ country, capital }) => {
  return (
    <Button variant={"game_option"} className="h-20">
      <div>
        <div>{country}</div>
        <div>{capital}</div>
      </div>
    </Button>
  );
};

export default Card;