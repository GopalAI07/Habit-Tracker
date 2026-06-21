import Header from "./component/Header";
import HabitForm from "./component/HabitForm";
import HabitList  from "./component/HabitList";
import { HabitProvider } from "./component/HabitProvider";
import { useEffect, useState } from "react";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOffSet,setWeekOfSet]=useState(0)
  const week = addWeeks(new Date(), weekOffSet)

   const visibleDates = eachDayOfInterval({
          start: startOfWeek(week, { weekStartsOn: 1 }),
          end: endOfWeek(week, { weekStartsOn: 1 })
      })

  useEffect(()=>{
    function handler(){
      console.log(weekOffSet)
    }
    document.addEventListener("click",handler)
    return ()=>{
      document.removeEventListener("click",handler)
    }
  }),[weekOffSet]
  return (
    
    <div className="max-w-2x1 mx-auto flex flex-col gap-4 p-8">
      <HabitProvider>
      <Header visibleDates={visibleDates} onNext={()=> setWeekOfSet(o=>o+1)} onPrev={()=> setWeekOfSet(o=>o-1)}/>
       <HabitForm />
       <HabitList visibleDates={visibleDates}/>
      </HabitProvider>
    </div>
  );
}

