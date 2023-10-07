import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEvents } from '../utils/api/events';
import { useRouter } from 'next/router';
const status = ["ALL", "DRAFT", "COMPLETED"];

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [statusFilter, setStatusFilter] = useState('ALL'); 
  const router = useRouter();
  useEffect(() => {
    if(!router.isReady) return;
    console.log("ROUTER" + JSON.stringify(router.query))
    const { sortBy = "name", sortOrder = -1, limit = 10} = router.query;

    async function fetchEventData() {
      try {
        // Access and extract query parameters
   
        const data = await fetchEvents(sortBy, sortOrder, page, limit,  statusFilter);
        
        // Replace events on page 1, append on subsequent pages
      setEvents((prevEvents) => (page === 1 ? data.events : [...prevEvents, ...data.events]));
      } catch (error) {
        // Handle error
      }
    }

    fetchEventData();
  }, [router.isReady, page, statusFilter]);

  const loadMore = async  () => { 
    console.log("load more")
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  const handleStatusChange = (selectedStatus) => {
    
    if(!status.find( s => s == selectedStatus))
        selectedStatus = status[0];    
    console.log("setting status: " + selectedStatus);
    setStatusFilter(selectedStatus);
    setPage(1); // Reset the page number when the status filter changes
  };
  return ( 
    <div>
      <h1>Events - {total}</h1>

      <div>
        {/* Filter by status */}
        <label>Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value={status[0]}>All</option>
          <option value={status[1]}>Draft</option>
          <option value={status[2]}>Completed</option>
          {/* Add more status options as needed */}
        </select>
      </div>

      <ul>
        {events.map((event, idx) => (
        //   <li key={idx}>{event.name} - <b>{event.status}</b> : {event.dueDate} </li>
          <li key={idx}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <ul>
              {event.attendees.map((attendee, index) => (
                <li key={index}>
                    <p>UUID Name - {attendee}</p>
                  <img src="https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg" className="avatar" alt={`Attendee ${index + 1}`} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button onClick={loadMore}>Load More</button>
      <Link href="/events/create">
      Create Event
      </Link>
    </div>
  );
};

export default EventList;
