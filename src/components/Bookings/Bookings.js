import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:5000/bookings?email='+loggedInUser.email)
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You have: {bookings.length} booking</h3>
            {
                bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('MM/dd/yyyy'))} to: {(new Date(book.checkOut).toDateString('MM/dd/yyyy'))} </li>)
            }
        </div>
    );
};

export default Bookings;