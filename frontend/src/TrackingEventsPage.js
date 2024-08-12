import React, { useEffect, useState } from 'react';
import Heatmap from './Heatmap';
//under construction
const TrackingEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');




    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('http://localhost:9090/api/tracking/event-types/search?type=' + encodeURIComponent(searchQuery), {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching tracking events:', error);
            }
        };

        fetchEvents();
    }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (







    <div>
        <ul>
            <li>click</li>
            <li>mouse_move</li>
            <li>button_click</li>
            <li>key_down</li>
            <li>typing</li>

        </ul>

            <h1>Tracking Events</h1>
            <input
                type="text"
                placeholder="Search event type..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {events.map((event) => (
                        <li key={event.id}>
                            <strong>Type:</strong> {event.eventType} <br />
                        </li>
                    ))}
                </ul>
            )}
            <Heatmap events={events.filter(event => event.mouseCoordinates)} />





        </div>
    );
};

export default TrackingEventsPage;
