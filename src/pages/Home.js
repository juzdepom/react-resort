import React from 'react'
import {Link} from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import Services from '../components/Services';

function Home() {
    return (
        <>
        <Hero>
            <Banner title="Luxurious Rooms" subtitle="Deluxe rooms starting at $299">
                <Link to='/rooms' className="btn-primary">Our Rooms</Link>
            </Banner>
        </Hero>
        <Services/>
        </>
    )
}

export default Home
