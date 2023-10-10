"use client";

// LeaderBoard.tsx
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import { Search } from "./Search";
import { Button } from "../ui/button";
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
  const [sortOrderTime, setSortOrderTime] = useState<"asc" | "desc" | undefined>(undefined);
  const [sortOrderScore, setSortOrderScore] = useState<"asc" | "desc" | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

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
            sortOrderScore,
          },
        });
        const fetchedPlayers: Player[] = req.data;
        setPlayers(fetchedPlayers);
  
        // Extract the total count from the response headers
        const totalCount = req.headers['x-total-count'];
        const totalPages = Math.ceil(totalCount / playersPerPage);
        setTotalPages(totalPages);
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
    setSortOrderTime(undefined);
  };
  
  const handleSortByTime = () => {
    setSortOrderTime(sortOrderTime === "asc" ? "desc" : "asc");
    setSortOrderScore(undefined);
  };

  return (
    <div className="flex flex-col justify-between h-full p-4 shadow-md bg-card">
      <header>
        <Title title="Top Players" />
        <div className="flex flex-col items-start justify-between gap-2 sm:items-center sm:flex-row">
          <Search handleSearch={handleSearch} />
          <div className="flex gap-2">
            <Button variant={"game_option"} onClick={handleSortByScore}>
              {sortOrderScore === "asc" ? "High Score" : "Low Score"}
            </Button>
            <Button variant={"game_option"} onClick={handleSortByTime}>
              {sortOrderTime === "asc" ? "Newest" : "Oldest"}
            </Button>
          </div>
        </div>
      </header>
      {loading ? (
        <p className="p-4 my-4 text-xl text-center">Loading...</p>
      ) : players.length ? (
        <DataTable players={players} />
      ) : (
        <p className="p-4 my-4 text-xl text-center border">
          No Player Data found
        </p>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default LeaderBoard;
