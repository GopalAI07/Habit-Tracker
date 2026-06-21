import {  useState } from "react"
import Button from "./Button"
import{ useHabits }from "./HabitProvider"
  

export default function HabitForm(){
 const [name,setName]=useState("")
 const habitContext = useHabits()

 function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (name.trim()==="") 
       return 
    setName("")
    habitContext?.addHabit(name)
 }


 return (
     <form className="flex gap-5"  onSubmit={handleSubmit}>
        <input 
        value={name}
        onChange={e => setName(e.target.value)}
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline:none focus-visible:ring-2 focus-visible:ring-violet-500  "  
        placeholder="New Habit....."/>

        <Button
        disabled={name.trim()===""}
         className="rounded-lg px-4 py-2 font-medium " >
            Add Habit
        </Button>
    </form>
 )
}