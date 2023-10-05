'use client'

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { status } = useSession();

  const isDarkTheme = theme === "dark";
  const themeText = status === 'authenticated' ? <span className="pr-2">Theme</span> : null;

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  return (
      <Button
      className={`${themeText ? 'w-full' : 'ml-4' }`}
      variant="reset" onClick={toggleTheme}>
        {themeText}
        {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
  );
};

export default ThemeToggle;
