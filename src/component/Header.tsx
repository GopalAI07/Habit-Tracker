import { isToday ,format} from "date-fns"
import Button from "./Button"
import { useHabits } from "./HabitProvider"

type HeaderProps={
  visibleDates:Date[]
  onPrev: ()=>void
  onNext: ()=>void
}

export default function Header({visibleDates , onPrev,onNext}:HeaderProps) {
  const {habits} = useHabits()
  const  doneToday = habits.filter(h=>h.completions.some(c=> isToday(c)),).length
  const daterange=`${format(visibleDates[0],"MMM d")}  -  ${format(visibleDates.at(-1)!,"MMM d")}`

  return (
    <header className="flex items-center justify-between w-full p-5">
      <div className="flex flex-col gap-1">
        <h1 className="text-3x1 font-bold">
          Habit Tracker
        </h1>
        <span className="text-zinc-400 text-sm">{doneToday}/{habits.length} done today</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400 text-sm">{daterange}</span>

        <div className="flex items-center gap-3">
           <Button onClick={onPrev}>Prev</Button>
           <Button onClick={onNext} disabled={visibleDates.some(d=> isToday(d))}>Next</Button>
        </div>
      </div>
    </header>
  )
}