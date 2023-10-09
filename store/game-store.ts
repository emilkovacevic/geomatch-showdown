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
}

type GameActions = {
  setGameStarted: (gameStarted: boolean) => void;
  setGameOver: (gameOver: boolean) => void;
  setRedTimer: (redTimer: boolean) => void;

  setGamePenaltyTime: (gamePenaltyTime: number) => void;
  setGameTimer: (timer: number) => void;
  setTimesPaused: (timesPaused: number) => void;
  togglePauseGame: () => void;
};

const initialState: GameState = {
  gameStarted: false,
  paused: false,
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
      togglePauseGame: () => set((state) => ({ paused: !state.paused })),

    }),
    {
      name: "global",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameState;
