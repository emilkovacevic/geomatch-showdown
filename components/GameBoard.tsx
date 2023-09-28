import { WORLD_DATA } from "@/data/world"
import Card from "./Card"


const GameBoard = () => {  
  const countriesList = WORLD_DATA.slice(0,10)

  return (
    <section
    className="flex flex-wrap gap-4 p-2 shadow-md justify-stretch bg-card"
    >
        {countriesList.map((country) => (
          <Card key={country.country} country={country.country} capital={country.capital} />
        ))}
    </section>
  )
}

export default GameBoard