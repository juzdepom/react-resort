import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import {RoomContext} from '../context'
import defaultBcg from '../images/room-1.jpeg'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import StyledHero from '../components/StyledHero'


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
        // LEARN: if room is undefined; e.g. rooms/blablabla will return this error div
        if(!room){
            return <div className="error">
                <h3>no such room could be found</h3>
                <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
            </div>
        }
        const {name, description, capacity, size, price, extras, breakfast, pets, images } = room
        return (
            <>
            <StyledHero img={images[0] || this.state.defaultBcg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
                </Banner>
            </StyledHero>
            </>
        )
    }
}

export default SingleRoom