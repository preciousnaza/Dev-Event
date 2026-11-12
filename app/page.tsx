import Eventcards from "@/components/Eventcards"
import Explorebtn from "@/components/Explorebtn"
import { events } from "@/lib/db/constants"


export default function Home() {
  return(
    <section>
      <h1 className="text-center">The Hub for every Dev <br /> Event you can't miss</h1>
      <p className="text-center mt-5">Hackathons, Meetup, and Conference , All in One Place</p>
      <Explorebtn />

      <div className="mt-20 space-y-7">
        <h3>Features Event</h3>
        <ul className="events">
          {events.map((event) => (
            <li className="list-none" key={event.title}>
               <Eventcards {...event}/>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
