import React, { PureComponent } from 'react'
import {RoomContext} from '../context';

class FeaturedRooms extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    static contextType = RoomContext

    render() {
        const { featuredRooms : rooms } = this.context
        console.log('featured rooms component')
        console.log(rooms)
        return (
            <div>Hello from featured rooms </div>
        )
    }
}

export default FeaturedRooms