import React, { useEffect, useState } from "react";
import { shuffle } from "lodash"; // Import the shuffle function
import WORLD_DATA from "@/data/file.json";

interface Country {
  id: number;
  name: string;
}

const GameBoard = () => {
  const countries: Country[] = WORLD_DATA.map((entry) => ({
    id: entry.id,
    name: entry.country,
  }));

  const capitals: Country[] = WORLD_DATA.map((entry) => ({
    id: entry.id,
    name: entry.capital,
  }));

  const [usedCardIds, setUsedCardIds] = useState<number[]>([]); // Track used card IDs
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [selectedCapitals, setSelectedCapitals] = useState<Country[]>([]);

  const initialCards: Country[] = shuffle([...selectedCountries, ...selectedCapitals]);

  const [cards, setCards] = useState<Country[]>(initialCards);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [wrongPairs, setWrongPairs] = useState<number[]>([]);
  const [disableSelection, setDisableSelection] = useState(false);

  useEffect(() => {
    // Shuffle the cards when the component mounts
    setCards(shuffle(cards));
  }, []);

  useEffect(() => {
    // Check if there are 6 or fewer cards left
    if (cards.length <=0  && usedCardIds.length < countries.length) {
      const unusedCountries = countries.filter(
        (country) => !usedCardIds.includes(country.id)
      );
      const unusedCapitals = capitals.filter(
        (capital) => !usedCardIds.includes(capital.id)
      );

      // Select new cards
      const newCountryCards: Country[] = unusedCountries.slice(0, 16);
      const newCapitalCards: Country[] = unusedCapitals.slice(0, 16);

      setSelectedCountries(newCountryCards);
      setSelectedCapitals(newCapitalCards);

      // Update used card IDs
      const newUsedCardIds: number[] = [
        ...usedCardIds,
        ...newCountryCards.map((country) => country.id),
        ...newCapitalCards.map((capital) => capital.id),
      ];

      setUsedCardIds(newUsedCardIds);

      // Refill the cards with new and unused cards
      const newCards: Country[] = shuffle([...newCountryCards, ...newCapitalCards]);
      setCards(newCards);
    }
  }, [cards, usedCardIds, countries, capitals]);

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

        // Remove the matched pair from the cards list after 1 second
        setTimeout(() => {
          const updatedCards = cards.filter(
            (_, i) => i !== firstIndex && i !== secondIndex
          );
          setCards(updatedCards);
        }, 1000);
      } else {
        // If not matched, turn them red and reset the selection after 4 seconds
        setWrongPairs([firstIndex, secondIndex]);
        setDisableSelection(true);
        setTimeout(() => {
          setWrongPairs([]);
          setSelectedCards([]);
          setDisableSelection(false);
        }, 4000);
      }
    }
  };

  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-6 lg:gap-4 grow">
      {cards.map((card, index) => (
        <button
          className="p-2 font-bold shadow bg-card"
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
        </button>
      ))}
    </section>
  );
};

export default GameBoard;
