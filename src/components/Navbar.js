import React, { PureComponent } from 'react'
import logo from '../images/logo.svg'
import {FaAlignRight} from 'react-icons/fa'
import {Link} from 'react-router-dom'

class Navbar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    handleToggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {
        return (
            // LEARN: the CSS classes are located in the App.css file
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">
                            <img src={logo} alt="Beach Resort" />
                        </Link>
                        <button 
                            type="button" 
                            className="nav-btn" 
                            onClick={this.handleToggle}>
                            <FaAlignRight className="nav-icon" />
                        </button>
                    </div>
                    {/* LEARN: super cool conditional way of setting classes based on state */}
                    <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/rooms">Rooms</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar