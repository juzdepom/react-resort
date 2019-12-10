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
        }
    }

    //getData

    componentDidMount(){
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true);
        // console.log(featuredRooms)
        this.setState({
            rooms, 
            sortedRooms: rooms,
            featuredRooms,
            loading: false
        })
        // console.log(rooms)
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

    render() {
        return (
            <RoomContext.Provider value={{
                ...this.state,
                getRoom: this.getRoom
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