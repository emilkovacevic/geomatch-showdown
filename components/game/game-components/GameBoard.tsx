import { WORLD_DATA } from "@/data/world";
import Card from "../../ui/Card";
import Title from "@/components/ui/Title";

const GameBoard = () => {
  const countriesList = WORLD_DATA.slice(0, 16);

  return (
    <div className="flex flex-col items-end justify-center gap-4 mx-auto">
      <section className="p-2 shadow bg-accent text-accent-foreground">
        <Title title={"Time: 30s"} />
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
    </div>
  );
};

export default GameBoard;
