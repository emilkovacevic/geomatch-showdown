import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format-iso-date";
import { formatTime } from "@/lib/format-time";

interface DataTableProps {
  players: {
    id: number;
    name: string;
    time: number;
    date: string;
  }[];
  placementNumbers: {
    [playerId: number]: number;
  };
}

export const DataTable: React.FC<DataTableProps> = ({
  players,
  placementNumbers,
}) => {


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
        {players.map((player) => (
          <TableRow key={player.id}>
            <TableCell>{placementNumbers[player.id]}</TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell>{formatTime(player.time)}</TableCell>
            <TableCell>{formatDate(player.date)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
