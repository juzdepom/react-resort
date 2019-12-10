import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';

function Home() {
    return (
        <Hero>
            <Banner title="Luxurious Rooms" subtitle="Deluxe rooms starting at $299">
                <Link to='/rooms' className="btn-primary">Our Rooms</Link>
            </Banner>
        </Hero>
    )
}

export default Home
