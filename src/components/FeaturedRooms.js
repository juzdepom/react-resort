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
        const value = this.context;
        console.log(value);
        return (
            <div>Hello from featured rooms {value}</div>
        )
    }
}

export default FeaturedRooms