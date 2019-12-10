import React, { PureComponent } from 'react'

// LEARN: setting this up will prevent 'props drilling'

//ROOM CONTEXT
const RoomContext = React.createContext();

//ROOM PROVIDER
class RoomProvider extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <RoomContext.Provider value={"hello"}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

//ROOM CONSUMER
const RoomConsumer = RoomContext.Consumer;

export {RoomProvider, RoomConsumer, RoomContext}