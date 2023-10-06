import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GameState {
  gameStarted: boolean;
  gamePaused: boolean;
  gameOver: boolean;
  gamePenaltyTime: number;
  timesPaused: number;
  gameTimer: number;
  selectedCards: {country: string, capital: string}[];
  penalty: number;
  country: string;
  capital: string;
  isMatched: boolean;
  isSelected: boolean;
  matchedPairs: string[];
  isSelectedPair: string[]; 
}

type GameActions = {
  setGameStarted: (gameStarted: boolean) => void;
  setGamePaused: (gamePaused: boolean) => void;
  setGameOver: (gameOver: boolean) => void;
  setGamePenaltyTime: (penaltyTime: number) => void;
  setGameTimer:(timer: number) =>void;
  setTimesPaused: (timesPaused: number) => void;
  setCountry: (country: string) => void;
  setCapital: (capital: string) => void;
  setIsMatched: (isMatched: boolean) => void;
  setIsSelected: (isSelected: boolean) => void;
  setMatchedPairs: (matchPaired: string[]) => void
};

const initialState: GameState = {
      gameStarted: false,
      gamePaused: false,
      timesPaused: 0,
      gameOver: false,
      gamePenaltyTime: 0,
      gameTimer: 0,
      penalty: 5,


      selectedCards: [],
      country: '',
      capital: '', 
      isMatched: false,
      isSelected: false,
      matchedPairs: [],
      isSelectedPair: [],
}

const useGameState = create<GameState & GameActions>()(

  persist(
    (set) => ({
      ...initialState,
    
      setGameStarted: (gameStarted) => set({ gameStarted}),
      setGamePaused: (gamePaused) => set({ gamePaused }),
      setGameTimer: (gameTimer) => set({gameTimer}),
      setGameOver: (gameOver) => set({ gameOver }),
      setGamePenaltyTime: (penaltyTime) => set({ gamePenaltyTime: penaltyTime }), 
      setTimesPaused: (timesPaused) => set({ timesPaused }),
    
      setCountry: (country) => set({ country }), 
      setCapital: (capital) => set({ capital }),
      setIsMatched: (isMatched) => set({ isMatched }), 
      setIsSelected: (isSelected) => set({ isSelected }),
      setMatchedPairs: (isSelectedPair) => set({ isSelectedPair }), 
    }),
    {
      name: 'global',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameState;
