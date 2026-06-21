
import { createContext, useContext, type ReactNode } from "react";
import { isSameDay } from "date-fns";
import { useLocalStorage } from "../hooks/useLocalStorage";
export type Habit = { id: string, name: string, completions: Date[] }


type Context ={
   habits: Habit[]
   addHabit: (name:string)=> void
   deleteHabit: (id:string)=> void
   toggleHabit: (id:string , date:Date)=> void

}

type habitProviderProps={
    children:ReactNode
}

export const HabitContext = createContext<null | Context>(null)

export function HabitProvider({ children }: habitProviderProps){
     const [habits,setHabits]=useLocalStorage<Habit[]>("Habits",[]);

  function addHabit(name:string){
    setHabits([...habits, {id: crypto.randomUUID(),name,completions:[new Date()]}])
  }

  function deleteHabit(id:string){
    setHabits(curr => curr.filter(h=>h.id != id))
  }

  function toggleHabit(id:string,date:Date){
    setHabits(curr =>(
      curr.map(h =>{
        if (h.id !== id) return h

        const alreadyDone = h.completions.some(c=>isSameDay(c, date))
        const completions = alreadyDone
        ? h.completions.filter(c=> !isSameDay (c,date)): [...h.completions,date]

        return {...h,completions}
      })))
  }
    return <HabitContext value={{habits,addHabit,deleteHabit,toggleHabit}}>{
        children}
        </ HabitContext>
}

export function useHabits(){
    const habitContext = useContext(HabitContext)
    if (habitContext == null ) throw new Error ("Null context")
    
    return habitContext
}
