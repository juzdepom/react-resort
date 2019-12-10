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

    //GUESTS
    let people = getUnique(rooms, 'capacity');
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
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

                {/* GUESTS */}
                <div className="form-group">
                    <label htmlFor="capacity">Guests</label>
                    <select 
                        name="capacity" 
                        id="capacity"
                        className="form-control"
                        onChange={handleChange} 
                        value={capacity}>
                        {people}
                    </select>
                </div>
                {/* END GUESTS */}

                {/* ROOM PRICE */}
                <div className="form-group">
                    <label htmlFor="price">Room Price ${price}</label>
                    <input 
                        type="range" 
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        className="form-control"
                        onChange={handleChange}
                        />
                </div>
                {/* END ROOM PRICE */}

                {/* SIZE */}
                <div className="form-group">
                    <label htmlFor="size">room size</label>
                    <div className="size-inputs">
                        <input 
                            type="number" 
                            name="minSize" 
                            id="size" 
                            value={minSize} 
                            onChange={handleChange} 
                            className="size-input"/>
                        <input 
                            type="number" 
                            name="maxSize" 
                            id="size" 
                            value={maxSize} 
                            onChange={handleChange} 
                            className="size-input"/>
                    </div>
                </div>
                {/* END SIZE */}

                {/* EXTRAS */}
                <div className="form-group">
                  <div className="single-extra">
                      <input 
                        type="checkbox" 
                        name="breakfast" 
                        id="breakfast" 
                        checked={breakfast}
                        onChange={handleChange}
                        />
                      <label htmlFor="breakfast">breakfast</label>
                  </div>
                  <div className="single-extra">
                      <input 
                        type="checkbox" 
                        name="pets" 
                        id="pets" 
                        checked={pets}
                        onChange={handleChange}
                        />
                      <label htmlFor="pets">pets</label>
                  </div>
                </div>
                {/* END EXTRAS */}

            </form>
        </section>
    )
}

export default RoomsFilter
