import React, { useEffect, useState } from 'react';
import MyEventsHelper from "./MyEventsHelper"

const MyEvents = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async() => {
        fetch(process.env.REACT_APP_URL + '/events', {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                setEvents(data.events)
            })
    }

    return (
        <div>
            <MyEventsHelper props = { events }/>
        </div>
    )
}

export default MyEvents