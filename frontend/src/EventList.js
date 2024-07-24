import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventsList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/events');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h2>Tracked Events</h2>
            {events.map((event, index) => (
                <div key={index}>
                    <p>Type: {event.type}</p>
                    <p>Data: {event.data}</p>
                    <p>Timestamp: {event.timestamp}</p>
                </div>
            ))}
        </div>
    );
};

export default EventsList;
