import React, { PureComponent } from 'react'
import items from './data'
import Client from './Contentful';

Client.getEntries({
    //content_type can be found in the your Contentful account in your Content Model
    //the content model used in this project is called reactResort
    //if we click into the project, we will be able to see the "CONTENT TYPE ID"
    //"Use this ID to retrieve everything related to this content type via the API."
    content_type: "reactResort",
}).then(response => console.log(response.items));

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

    //getting data from Contentful
    getData = async () => {
        try {
            let response = await Client.getEntries({
                //content_type can be found in the your Contentful account in your Content Model
                //the content model used in this project is called reactResort
                //if we click into the project, we will be able to see the "CONTENT TYPE ID"
                //"Use this ID to retrieve everything related to this content type via the API."
                content_type: 'reactResort'
            })
            let rooms = this.formatData(response.items)
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
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount(){
        // POPULATE WITH DATA FROM CONTENTFUL
        // this.getData();

        // POPULATE WITH HARD CODED DATA FROM data.js
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
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
            [name]:value
        }, this.filterRooms)
    }

    filterRooms = () => {
        let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state
        // get all the rooms
        let sortedRooms = [...rooms]
        
        //filter by type
        if(type!=='all'){
            sortedRooms = sortedRooms.filter(room => room.type === type)
        }
        // filter by capacity
        capacity = parseInt(capacity)
        if(capacity!==1){
            sortedRooms = sortedRooms.filter(room => room.capacity >= capacity)
        }
        //filter by price
        sortedRooms = sortedRooms.filter(room => room.price <= price )

        //filter by size
        sortedRooms = sortedRooms.filter(room => room.size >= minSize && room.size <= maxSize )

        //filter by breakfast
        if(breakfast){
            sortedRooms = sortedRooms.filter(room => room.breakfast === true )
        }

        //filter by pets
        if(pets){
            sortedRooms = sortedRooms.filter(room => room.pets === true)

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