import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatTime } from "@/lib/format-time";
import { Player } from "./LeaderBoard";

interface DataTableProps {
  players: Player[];
}

const DataTable: React.FC<DataTableProps> = ({
  players,
}) => {

  const sortedPlayers = [...players].sort((a, b) => {
    if (a.score !== b.score) {
      // Sort by score in descending order (higher score first)
      return b.score - a.score;
    } else {
      // If scores are equal, sort by updatedAt in descending order (newer updatedAt first)
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
  });

  let currentRank = 1;
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Place</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {sortedPlayers.map((player) => {
          const place = currentRank;
          currentRank++;

          return (
            <TableRow key={player.id}>
              <TableCell>{place}</TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{formatTime(player.score ? player.score : 0)}</TableCell>
              <TableCell>{formatDate(player.updatedAt)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DataTable;
