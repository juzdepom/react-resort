import React, { PureComponent } from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from './Title'

class Services extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            services: [
                {
                    icon:<FaCocktail/>,
                    title:"Free Cocktails",
                    info: "Lorem ipsum dolor sit amet sonsectetur adispcign elit. Magin, corposis",
                },
                {
                    icon:<FaHiking/>,
                    title:"Endless Hiking",
                    info: "Lorem ipsum dolor sit amet sonsectetur adispcign elit. Magin, corposis",
                },
                {
                    icon:<FaShuttleVan/>,
                    title:"Free Shuttle",
                    info: "Lorem ipsum dolor sit amet sonsectetur adispcign elit. Magin, corposis",
                },
                {
                    icon:<FaBeer/>,
                    title:"Strongest Beer",
                    info: "Lorem ipsum dolor sit amet sonsectetur adispcign elit. Magin, corposis",
                },
            ]
        }
    }

    render() {
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}

export default Services