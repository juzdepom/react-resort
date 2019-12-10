import React, { PureComponent } from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'

class SingleRoom extends PureComponent {
    constructor(props) {
        super(props)
        // LEARN: if you console.log(this.props) you will see that props already has some default values that are being passed. This will include the slug
        //console.log(this.props)
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        }
    }
    static contextType = RoomContext;

    render() {
        const {getRoom} = this.context;
        const room = getRoom(this.state.slug);
        //if room is undefined
        if(!room){
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
            </div>
        }
        return (
            <div>Hello from single room page</div>
        )
    }
}

export default SingleRoom