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
import Link from "next/link";
import { Search } from "lucide-react";

interface DataTableProps {
  players: Player[];
}

const DataTable: React.FC<DataTableProps> = ({
  players
}) => {

  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Profile</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {players.map((player, index) => {
    
          return (
            <TableRow
            key={player.id}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{formatTime(player.score ? player.score : 0)}</TableCell>
              <TableCell>{formatDate(player.updatedAt)}</TableCell>
              <TableCell
              className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
              
              ><Link href={`/${player.id}`}><Search /></Link></TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DataTable;
