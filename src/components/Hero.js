import React from 'react'

// LEARN: {children, hero} quick way to enumerate props
function Hero({children, hero}) {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}

// LEARN: default props defines what props appear by default in case user forgets to input props
Hero.defaultProps = {
    // LEARN: .defaultHero is located in App.css 
    hero: 'defaultHero'
}

export default Hero
