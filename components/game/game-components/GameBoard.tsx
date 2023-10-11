import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import WORLD_DATA from "@/data/file.json"; 
import useGameState from "@/store/game-store";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import axiosInstance from "@/axios/instance";
import { Button } from "@/components/ui/button";

interface Country {
  id: number;
  name: string;
}

interface GameBoardProps {
  elapsedTime: number;
}

const GameBoard = ({ elapsedTime }: GameBoardProps) => {
  const session = useSession();
  const { setGameTimer, setGameOver, setGamePenaltyTime, setRedTimer, setRemainingCountries } = useGameState();
  const { toast } = useToast();

  const countries: Country[] = WORLD_DATA.map((entry) => ({
    id: entry.id,
    name: entry.country,
  }));

  const capitals: Country[] = WORLD_DATA.map((entry) => ({
    id: entry.id,
    name: entry.capital,
  }));

  const [usedCardIds, setUsedCardIds] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedCapitals, setSelectedCapitals] = useState<Country[]>([]);

  const initialCards: Country[] = shuffle([
    ...selectedCountries,
    ...selectedCapitals,
  ]);
  const [cards, setCards] = useState<Country[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [wrongPairs, setWrongPairs] = useState<number[]>([]);
  const [disableSelection, setDisableSelection] = useState(false);

  useEffect(() => {
    if (cards.length <= 0 && usedCardIds.length < countries.length * 2) {
      const unusedCountries = countries.filter(
        (country) => !usedCardIds.includes(country.id)
      );
      const unusedCapitals = capitals.filter(
        (capital) => !usedCardIds.includes(capital.id)
      );

      // Select new cards
      const newCountryCards: Country[] = unusedCountries.slice(0, 9);
      const newCapitalCards: Country[] = unusedCapitals.slice(0, 9);

      setSelectedCountries(newCountryCards);
      setSelectedCapitals(newCapitalCards);

      // Update used card IDs
      const newUsedCardIds: number[] = [
        ...usedCardIds,
        ...newCountryCards.map((country) => country.id),
        ...newCapitalCards.map((capital) => capital.id),
      ];

      setUsedCardIds(newUsedCardIds);
      const newCards: Country[] = shuffle([
        ...newCountryCards,
        ...newCapitalCards,
      ]);
      setCards(newCards);
    }

  }, [cards, usedCardIds, countries, capitals]);

  useEffect(() => {
    setRemainingCountries(WORLD_DATA.length - usedCardIds.length);
    if (matchedPairs.length === countries.length) {
      setGameOver(true);
      setGameTimer(elapsedTime);
      if (session.status === 'authenticated') {
        if(!session.data.user.email){
          toast({
            title: 'Something went wrong',
            description: `You are logged in but have incomplete data.`,
          });
        }
        const postScore = async () => {
          try {
            await axiosInstance.patch('/api/update-score', {
              email: session.data.user.email,
              score: elapsedTime,
            });
            toast({
              title: 'New score added',
              description: `Score uploaded successfully.`,
            });
          } catch (error) {
            toast({
              title: 'Failed to upload score',
              description: `Failed to upload the score to your account.`,
            });
          }
        };

        postScore();
      }
    }
  }, [matchedPairs, setGameTimer, elapsedTime, setGameOver, session.status, countries.length, toast, session?.data?.user.email, setRemainingCountries, usedCardIds.length]);
  

  const handleCardClick = (index: number) => {
    if (disableSelection) return;

    // Check if the card is already selected, matched, or wrong
    if (
      selectedCards.includes(index) ||
      matchedPairs.includes(cards[index].id) ||
      wrongPairs.includes(index)
    ) {
      return;
    }

    // Add the selected card to the list
    const updatedSelectedCards = [...selectedCards, index];
    setSelectedCards(updatedSelectedCards);

    // Check if two cards are selected
    if (updatedSelectedCards.length === 2) {
      const [firstIndex, secondIndex] = updatedSelectedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Check if the selected cards match based on their ids
      if (firstCard.id === secondCard.id) {
        // If matched, mark them green immediately
        setMatchedPairs([...matchedPairs, firstCard.id]);
        setSelectedCards([]);

        // Remove the matched pair from the cards list after 0.2 second
        setTimeout(() => {
          const updatedCards = cards.filter(
            (_, i) => i !== firstIndex && i !== secondIndex
          );
          setCards(updatedCards);
        }, 200);
      } else {
        // If not matched, turn them red and reset the selection after 5 seconds
        setWrongPairs([firstIndex, secondIndex]);
        setDisableSelection(true);
        setGamePenaltyTime(5)
        setRedTimer(true)
        setTimeout(() => {
          setWrongPairs([]);
          setSelectedCards([]);
          setDisableSelection(false);
          setRedTimer(false)
        }, 5000);
      }
    }
  };

  

  return (
    <section 
    >
      <div
      className="grid items-center h-full grid-cols-2 gap-4 p-4 mt-2 shadow-md bg-card md:grid-cols-6 lg:gap-4"
      >
      {cards.map((card, index) => (
        <Button
          className="px-2 py-8 font-bold shadow bg-secondary text-accent-foreground hover:bg-accent hover:text-accent-foreground "
          key={index}
          onClick={() => handleCardClick(index)}
          style={{
            backgroundColor: matchedPairs.includes(card.id)
              ? "green"
              : selectedCards.includes(index)
              ? wrongPairs.includes(index)
                ? "red"
                : "yellow"
              : "",
            pointerEvents: disableSelection ? "none" : "auto",
            color: selectedCards.includes(index)
              ? matchedPairs.includes(card.id)
                ? "gray"
                : wrongPairs.includes(index)
                ? "black"
                : "green"
              : "",
          }}
        >
          {card.name}
        </Button>
      ))}
      </div>
    </section>
  );
};

export default GameBoard;
