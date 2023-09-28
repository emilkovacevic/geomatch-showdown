"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <section>
      {theme === "dark" ? (
        <Button onClick={() => setTheme("light")}>
          <Sun />
        </Button>
      ) : (
        <Button onClick={() => setTheme("dark")}>
          <Moon />
        </Button>
      )}
    </section>
  );
};

export default ThemeToggle;
