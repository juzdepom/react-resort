import React, { PureComponent } from 'react'
import items from './data'

// LEARN: setting up the context API prevents 'props drilling'
// DOCUMENTATION: https://reactjs.org/docs/context.html#reactcreatecontext

//ROOM CONTEXT
const RoomContext = React.createContext();

//ROOM PROVIDER
class RoomProvider extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            rooms: [],
            sortedRooms: [],
            featuredRooms: [],
            loading: true,
            type: "all",
            capacity: 1,
            price: 0,
            minPrice: 0,
            maxPrice: 0,
            minSize: 0,
            maxSize: 0,
            breakfast: false,
            pets: false
        }
    }

    //getData

    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true);

        // LEARN: how to filter through the rooms and return price of the most expensive room
        let maxPrice = Math.max(...rooms.map(item => item.price));
        // LEARN: how to filter through the rooms and return size of the largest room
        let maxSize = Math.max(...rooms.map(item => item.size));

        this.setState({
            rooms, 
            sortedRooms: rooms,
            featuredRooms,
            loading: false,
            price: maxPrice,
            maxPrice,
            maxSize,
        })
    }

    formatData(items){
        // LEARN: refer to data.js to see how 'items' is structured
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
            let room = {...item.fields, images, id}
            return room
        })
        return tempItems;
    }

    getRoom = (slug) => {
        let tempRooms = [...this.state.rooms]
        // LEARN: find returns the first object it finds, filter returns an array
        const room = tempRooms.find((room) => room.slug === slug);
        return room
    }

    handleChange = event => {
        const target = event.target
        const value = event.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
            [name]:value
        }, this.filterRooms)
    }

    filterRooms = () => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state

        let sortedRooms = [...rooms]
        if(type!=='all'){
            sortedRooms = sortedRooms.filter(room => room.type === type)
        }
        this.setState({
            sortedRooms,
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom,
                handleChange: this.handleChange,
                }}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//ROOM CONSUMER
const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component){
    return function ConsumerWrapper(props){
        return <RoomConsumer>
            { value => <Component {...props} context={value} /> } 
        </RoomConsumer>
    }
}

export {RoomProvider, RoomConsumer, RoomContext}