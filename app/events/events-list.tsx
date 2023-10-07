"use server"
import Link from "next/link";

 
 
async function getEvents(sortBy: string, sortOrder: number, page: number, limit: number) {
  const res = await fetch(`http://localhost:3000/api/events?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`, { next: { revalidate: 2 } })
//   let jRes = await res.json();
//   console.log(jRes);
  return await res.json();
} 
 
export default async function EventsList({sortBy = "name", sortOder = -1, page  = 1, limit =  10}) {  
    console.log(sortBy)
    
  // Initiate both requests in parallel
  const eventsData = getEvents(sortBy, sortOder, page, limit) 
 
  // Wait for the promises to resolve
  const [eventsResponse] = await Promise.all([eventsData ])
 
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Events {eventsResponse.events.length} / {eventsResponse.total}</h1> 
          
          <Link
            href={{
                pathname: "events",
                query: {
                    page: 1,
                    sortOrder: sortOder,
                    limit: limit,
                    sortBy: sortBy
                }
            }} 
        >
        Next Page
        </Link>
          
          </div>
          {eventsResponse.events.map((event,index)=>{
                return <div key={index} >
                        <h4>{event.name}</h4>  
                        <b>{event.status}</b>
                        <h5 > {event.description}</h5>
                        <h6 > {event.dueDate}</h6>
                    </div>
                // <li key={index}><b>{event.name}</b> - {event.status} : {event.dueDate} </li>
            })}
        </main> 
    
  )
} 