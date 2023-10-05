"use client";

import { useState } from "react";
import Title from "../ui/Title";
import { DataTable } from "./DataTable";
import { Pagination } from "./Pagination";
import { Search } from "./Search";
import { Button } from "../ui/button";
import { PLAYERS } from "@/data/players";

interface Player {
  id: number;
  name: string;
  time: number;
  date: string;
}

interface PlacementNumbers {
  [playerId: number]: number;
}

const LeaderBoard = () => {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>(PLAYERS);
  const [currentPage, setCurrentPage] = useState(1)
  const [playersPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")


  // Perform search filtering
  const filteredPlayers = sortedPlayers.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

    // Calculate placement numbers for each player
    const calculatePlacementNumbers = (sortedPlayers: Player[]): PlacementNumbers => {
      const placementNumbers: PlacementNumbers = {};
      let currentPlacement = 1;
  
      sortedPlayers.forEach((player, index) => {
        if (index === 0) {
          placementNumbers[player.id] = currentPlacement;
        } else {
          if (player.time !== sortedPlayers[index - 1].time) {
            currentPlacement++;
          }
          placementNumbers[player.id] = currentPlacement;
        }
      });
  
      return placementNumbers;
    };
  
  const placementNumbers = calculatePlacementNumbers(sortedPlayers);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to the first page when searching
  };

// Reusable sorting function
const sortPlayers = (key: keyof Player, order: "asc" | "desc") => {
  const sortedCopy = [...sortedPlayers];
  sortedCopy.sort((a, b) => {
    const aValue = a[key] as number; // Type assertion for number
    const bValue = b[key] as number; // Type assertion for number
    if (order === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  setSortedPlayers(sortedCopy);
  setSortOrder(order === "asc" ? "desc" : "asc");
};


  const handleSortBySpeed = () => {
    sortPlayers("time", sortOrder);
  };

  const handleSortByDate = () => {
    sortPlayers("date", sortOrder);
  };

  return (
    <div className="p-4 shadow-md md:w-[650px] bg-card sm:mx-2 h-full flex flex-col justify-between">
      <header className="">
      <Title title="Top Players" />
      <div className="flex items-center justify-between">
      <Search handleSearch={handleSearch} />
      <div className="flex gap-2">
      <Button variant={"game_option"} onClick={handleSortBySpeed}>
        {sortOrder === "asc" ? "Fastest" : "Slowest"}
      </Button>
      <Button variant={"game_option"} onClick={handleSortByDate}>
        {sortOrder === "asc" ? "Newset" : "Oldest"}
      </Button>
      </div>
      </div>
      </header>
      <DataTable players={currentPlayers} placementNumbers={placementNumbers}/>
      <Pagination
        playersPerPage={playersPerPage}
        totalPlayers={filteredPlayers.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default LeaderBoard;
