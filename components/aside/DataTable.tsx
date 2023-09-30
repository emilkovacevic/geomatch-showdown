import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  function formatDate(isoDateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const date = new Date(isoDateString);
    return date.toLocaleDateString("en-US", options);
  }

  function formatTime(seconds: number) {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = (seconds % 60).toFixed(3);

    let formattedTime = "";

    if (days > 0) {
      formattedTime += `${days} day${days > 1 ? "s" : ""} `;
    }

    if (hours > 0) {
      formattedTime += `${hours} hour${hours > 1 ? "s" : ""} `;
    }

    if (minutes > 0 || (hours === 0 && days === 0)) {
      formattedTime += `${minutes} min${minutes > 1 ? "s" : ""} `;
    }

    formattedTime += `${remainingSeconds} second${
      parseFloat(remainingSeconds) > 1 ? "s" : ""
    }`;

    return formattedTime.trim();
  }

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
