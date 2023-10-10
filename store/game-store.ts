import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GameState {
  gameStarted: boolean;
  gameOver: boolean;
  gameTimer: number;
  redTimer: boolean,
  timesPaused: number;
  gamePenaltyTime: number;
  paused: boolean;
  remainingCountries: number
}

type GameActions = {
  setGameStarted: (gameStarted: boolean) => void;
  setGameOver: (gameOver: boolean) => void;
  setRedTimer: (redTimer: boolean) => void;
  setRemainingCountries: (remainingCountries: number) => void;

  setGamePenaltyTime: (gamePenaltyTime: number) => void;
  setGameTimer: (timer: number) => void;
  setTimesPaused: (timesPaused: number) => void;
  togglePauseGame: () => void;
};

const initialState: GameState = {
  gameStarted: false,
  paused: false,
  remainingCountries: 0,
  redTimer:false,
  timesPaused: 0,
  gameOver: false,
  gameTimer: 0,
  gamePenaltyTime: 5,
};

const useGameState = create<GameState & GameActions>()(
  persist(
    (set) => ({
      ...initialState,

      setGameStarted: (gameStarted) => set({ gameStarted }),
      setGameTimer: (gameTimer) => set({ gameTimer}),
      setGameOver: (gameOver) => set({ gameOver }),
      setGamePenaltyTime: (penaltyTime) =>set({ gamePenaltyTime: +penaltyTime}),
      setTimesPaused: (timesPaused) => set({ timesPaused }),
      setRedTimer: (redTimer) => set({ redTimer }),
      togglePauseGame: () => set((pause) => ({ paused: !pause.paused })),
      setRemainingCountries: (remainingCountries) => set({ remainingCountries }),
    }),
    {
      name: "global",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameState;
