import React, { useState } from 'react';
import { createEvent } from '../utils/api/events';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');

  const handleCreateEvent = async () => {
    try {
      await createEvent({ name: eventName, createdBy: "bcd730b7-9582-4c87-bb3e-e9b431206ff7" , attendees: ["bcd730b7-9582-4c87-bb3e-e9b431206ff7, 57243377-cda1-446f-8dad-4151eeb9ff75"],dueDate: new Date() });
      // Handle success or navigation
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <button onClick={handleCreateEvent}>Create</button>
    </div>
  );
};

export default CreateEvent;
