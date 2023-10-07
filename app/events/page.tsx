
import Image from 'next/image'

import EventsList from './events-list';   
 
 
export default async function Home({sortBy = "name", sortOder = -1, page  = 1, limit =  10}) {  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        
          <div style={{display: 'inline-block'}}>
            <h2>Sort By</h2>
            <input type="text" value={sortBy}  ></input>
            
          </div>
      <EventsList  sortBy={sortBy} sortOder={sortOder} page={page} limit={limit} ></EventsList>
      
    </main>
  )
}
