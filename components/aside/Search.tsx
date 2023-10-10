import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";

interface SearchProps {
  handleSearch: (searchValue: string) => void;
}

export const Search: React.FC<SearchProps> = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
    setSearchValue("")
    if (searchRef.current) {
      searchRef.current.focus(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center flex-1 my-2 mr-2 space-x-4 ">
      <Input
        type="text"
        ref={searchRef}
        placeholder="Search by name..."
        value={searchValue}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-md shadow max-w-64 focus:outline-none focus:ring focus:border-blue-300"
      />
      <Button 
      type="submit" variant={"game_option"} className="px-4 py-2">
        Search
      </Button>
    </form>
  );
};
