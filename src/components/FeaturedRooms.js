import React, { PureComponent } from 'react';
import {RoomContext} from '../context';
import Loading from '../components/Loading';
import Room from './Room';
import Title from './Title';

class FeaturedRooms extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    static contextType = RoomContext

    render() {
        let { loading, featuredRooms : rooms } = this.context
        rooms = rooms.map(room => {
            return <Room key={room.id} room={room}/>
        })
        return (
            <section className="featured-rooms">
                <Title title="featured rooms"/>
                <div className="featured-rooms-center">{loading?<Loading/>:rooms}</div>
            </section>
        )
    }
}

export default FeaturedRooms