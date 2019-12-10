import React from 'react'
import {useContext} from 'react';
import {RoomContext} from '../context'
import Title from '../components/Title'

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

function RoomsFilter({ rooms }) {
    const context = useContext(RoomContext);
    const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets } = context;
    //get unique types of rooms
    let types = getUnique(rooms, 'type');
    //add 'all' option to dropdown selection for types with the help of the 'spread operator'
    types = ['all', ...types];
    //map to JSX
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    return (
        <section className="filter-container">
            <Title title="search rooms"></Title>
            <form className="filter-form">
                {/* SELECT TYPE */}
                <div className="form-group">
                    <label htmlFor="type">Room Type</label>
                    <select 
                        name="type" 
                        id="type"
                        className="form-control"
                        onChange={handleChange} 
                        value={type}>
                        {types}
                    </select>
                </div>
                {/* END SELECT TYPE */}

            </form>
        </section>
    )
}

export default RoomsFilter
