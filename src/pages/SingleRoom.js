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
        // LEARN: mainImg = images[0]; ...defaultImages = the rest of the array from index 1 to last.
        // LEARN: ... is the 'rest operator' in React
        const [mainImg,...defaultImages] = images
        return (
            <>
            <StyledHero img={mainImg || this.state.defaultBcg}>
                <Banner title={`${name} room`}>
                    <Link to="/rooms" className="btn-primary">Back To Rooms</Link>
                </Banner>
            </StyledHero>
            <section className="single-room">
                <div className="single-room-images">
                    {defaultImages.map((item,index) => {
                        return <img key={index} src={item} alt={name}/>
                    })}
                </div>
                <div className="single-room-info">
                    <article className="desc">
                        <h3>details</h3>
                        <p>{description}</p>
                    </article>
                    <article className="info">
                        <h3>info</h3>
                        <h6>price: ${price}</h6>
                        <h6>size: {size} SQFT</h6>
                        <h6>max capacity : { capacity > 1 ? `${capacity} people` : `${capacity} person`}</h6>
                        <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                        <h6>{breakfast && "free breakfast included"}</h6>
                    </article>
                </div>
            </section>
            <section className="room-extras">
                <h6>extras</h6>
                <ul className="extras">
                    { extras.map((item, index) => {
                        return <li key={index}> - {item}</li>
                    })}
                </ul>
            </section>
            </>
        )
    }
}

export default SingleRoom