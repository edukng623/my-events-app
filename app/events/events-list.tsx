

import Image from 'next/image' 
import parse  from 'html-react-parser'
interface QueryState { 
  sortBy: string
  sortDescending: boolean
  page: number
  limit: number
}
async function getData(query: QueryState) {
  let res = await fetch('http://localhost:3000/api/events?sortBy=name&sortOrder=-1&page=1&limit=2')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return Promise.resolve( (<main><b>wg</b></main>));
  } 
  return res.text().then( t => {console.log("Parsing text: " + t); return t;}).then( parse );
}
// This gets called every time the page is called
export async function getServerSideProps({ params }) {

    let res = await fetch('http://localhost:3000/api/events?sortBy=name&sortOrder=-1&page=1&limit=2')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  let resText = await res.text().then( t => {console.log("Parsing text: " + t); return t;}).then( parse );

    // Pass data to the page via props
    return resText;
}
const EventsList = ({resText, timestamp}) => { 
  let query = {"sortBy": "name","sortDescending": false, page: 1, limit: 10};
  let data = getData(query);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div dangerouslySetInnerHTML={resText}></div>
    </main>
  );
}  

export default EventsList;