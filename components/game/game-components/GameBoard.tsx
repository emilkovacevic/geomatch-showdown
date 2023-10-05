import { WORLD_DATA } from "@/data/world";

import Title from "@/components/ui/Title";
import Card from "@/components/GameCard";

const GameBoard = () => {
  const countriesList = WORLD_DATA.slice(0, 16);

  return (
    <>
      <section className="w-full p-4 my-4 text-left shadow bg-accent">
        <Title title={"Time: 0s"} />
      </section>
      <section className="grid grid-cols-4 gap-2 lg:gap-4">
        {countriesList.map((country) => (
          <Card
            key={country.country}
            country={country.country}
            capital={country.capital}
          />
        ))}
      </section>
    </>
  );
};

export default GameBoard;
