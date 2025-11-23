import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// 짝 타입 정의
export interface Pair {
  id: string
  person1: string
  person2: string
}

// 스토어 상태 타입 정의
interface GachaStore {
  // N명 뽑기 모드
  names: string[]
  history: string[]
  allowDuplicate: boolean
  
  // 팀 나누기 모드
  teamSize: number
  pairs: Pair[]
  lastTeamResult: {
    teamA: string[]
    teamB: string[]
  } | null
  
  // N명 뽑기 액션
  addName: (name: string) => void
  removeName: (index: number) => void
  clearNames: () => void
  addToHistory: (name: string) => void
  clearHistory: () => void
  toggleDuplicate: () => void
  
  // 팀 나누기 액션
  setTeamSize: (size: number) => void
  addPair: (pair: Pair) => void
  removePair: (id: string) => void
  updatePair: (id: string, person1: string, person2: string) => void
  clearPairs: () => void
  setTeamResult: (teamA: string[], teamB: string[]) => void
}

export const useGachaStore = create<GachaStore>()(
  persist(
    (set) => ({
      // 초기 상태
      names: [],
      history: [],
      allowDuplicate: false,
      teamSize: 5,
      pairs: [],
      lastTeamResult: null,
      
      // N명 뽑기 액션
      addName: (name) =>
        set((state) => ({
          names: [...state.names, name],
        })),
      
      removeName: (index) =>
        set((state) => ({
          names: state.names.filter((_, i) => i !== index),
        })),
      
      clearNames: () =>
        set({
          names: [],
        }),
      
      addToHistory: (name) =>
        set((state) => ({
          history: [name, ...state.history].slice(0, 10), // 최근 10개만
        })),
      
      clearHistory: () =>
        set({
          history: [],
        }),
      
      toggleDuplicate: () =>
        set((state) => ({
          allowDuplicate: !state.allowDuplicate,
        })),
      
      // 팀 나누기 액션
      setTeamSize: (size) =>
        set({
          teamSize: size,
        }),
      
      addPair: (pair) =>
        set((state) => ({
          pairs: [...state.pairs, pair],
        })),
      
      removePair: (id) =>
        set((state) => ({
          pairs: state.pairs.filter((pair) => pair.id !== id),
        })),
      
      updatePair: (id, person1, person2) =>
        set((state) => ({
          pairs: state.pairs.map((pair) =>
            pair.id === id ? { ...pair, person1, person2 } : pair
          ),
        })),
      
      clearPairs: () =>
        set({
          pairs: [],
        }),
      
      setTeamResult: (teamA, teamB) =>
        set({
          lastTeamResult: { teamA, teamB },
        }),
    }),
    {
      name: 'gacha-picker-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)