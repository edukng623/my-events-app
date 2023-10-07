 
 
 
async function createEvent(name: string) {
  const res = await fetch(`http://localhost:3000/api/events?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`, { next: { revalidate: 2 } })
//   let jRes = await res.json();
//   console.log(jRes);
  return await res.json();
}
  
export default async function CreateEvent({name = "name" }) {  
    console.log("Creating: " + name);
    
  // Initiate both requests in parallel
  const eventData = createEvent(name) 
 
  // Wait for the promises to resolve
  const [eventResponse] = await Promise.all([eventData ])
 
  return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1>Created {eventResponse.name } </h1>  
          
          </div>
           
        </main> 
    
  )
} 