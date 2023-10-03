"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useSession } from "next-auth/react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const session = useSession()

  return (
    <section>
      {theme === "dark" ? (
        <Button
        className="inline-flex gap-2"
        variant={"reset"} onClick={() => setTheme("light")}>
          {session.status === 'authenticated' ? 'Theme ' : null}
          <Sun size={18} />
        </Button>
      ) : (
        <Button
        className="inline-flex gap-2"
        variant={"reset"} onClick={() => setTheme("dark")}>
           {session.status === 'authenticated'  ? 'Theme ' : null}
          <Moon size={18} />
        </Button>
      )}
    </section>
  );
};

export default ThemeToggle;
