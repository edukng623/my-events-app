 "use client";

import Image from 'next/image'
import {  useState } from 'react' 
import EventsList from './events-list';
interface QueryState { 
  sortBy: string
  sortDescending: boolean
  page: number
  limit: number
} 
const EventsListData= () => {
  let [query, setQuery] = useState<QueryState>( {"sortBy": "name","sortDescending": false, page: 1, limit: 10});
  // let data = getData(query);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <EventsList  ></EventsList>
    </main>
  )
} 


export default EventsListData;