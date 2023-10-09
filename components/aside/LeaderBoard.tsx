'use client'

// LeaderBoard.tsx
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import DataTable from "./DataTable";
import Pagination from "./Pagination"; 
import {Search} from "./Search";
import {Button} from "../ui/button";
import axiosInstance from "@/axios/instance";

export interface Player {
  id: string; 
  name: string;
  score: number;
  updatedAt: string;
}

const LeaderBoard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrderTime, setSortOrderTime] = useState<"asc" | "desc">("asc");
  const [sortOrderScore, setSortOrderScore] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayers = async () => {
      setLoading(true);
      try {
        const req = await axiosInstance.post("/api/leaderboard", {
          
            data: {
              page: currentPage,
            perPage: playersPerPage,
            searchTerm,
            sortOrderTime,
            sortOrderScore
            }
          },
        );
        console.log(req)
        const fetchedPlayers: Player[] = req.data;
        setPlayers(fetchedPlayers);
      } catch (error) {
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    getPlayers();
  }, [currentPage, playersPerPage, searchTerm, sortOrderTime, sortOrderScore]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const handleSortByScore = () => {
    setSortOrderScore(sortOrderScore === "asc" ? "desc" : "asc");
  };

  const handleSortByTime = () => {
    setSortOrderTime(sortOrderTime === "asc" ? "desc" : "asc");
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 shadow-md bg-card">
      <header className="">
        <Title title="Top Players" />
        <div className="flex items-center justify-between">
          <Search handleSearch={handleSearch} />
          <div className="flex gap-2">
            <Button variant={"game_option"} onClick={handleSortByScore}>
              {sortOrderScore === "asc" ? "High Score" : "Low Score"}
            </Button>
            <Button variant={"game_option"} onClick={handleSortByTime}>
              {sortOrderTime === "asc" ? "Fastest" : "Slowest"}
            </Button>
          </div>
        </div>
      </header>
      {loading ? (
        <p className="p-4 my-4 text-xl text-center">Loading...</p>
      ) : players.length ? (
        <DataTable players={players}  />
      ) : (
        <p className="p-4 my-4 text-xl text-center border">
          No Player Data found
        </p>
      )}
      <Pagination
      playersPerPage={playersPerPage}
      totalPlayers={players.length}
      currentPage={currentPage}
      paginate={setCurrentPage} 
    />
    </div>
  );
};

export default LeaderBoard;
