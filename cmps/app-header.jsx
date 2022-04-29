import { eventBusService } from "../services/event-bus-service.js"

const { NavLink, withRouter } = ReactRouterDOM

export class AppHeader extends React.Component {
    state = {
        menu: '☰'
    }

    onChange = ({ target }) => {
        eventBusService.emit('search', target.value)
    }

    toggleMenu = () => {
        let { menu } = this.state
        menu = (menu === 'X') ? '☰' : 'X'
        this.setState({ menu })
    }

    render() {
        const { menu } = this.state
        const menuOpenClass = (menu === 'X') ? 'menu-open' : ''
        return <header className="app-header">
            <h3 >Appsus</h3>

            <div className="search-nav">
                <input onChange={this.onChange} type="search" placeholder='Search' />

                <nav className={menuOpenClass}>
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/note">Note</NavLink>
                    <NavLink to="/mail">Mail</NavLink>
                </nav>
                <button className="btn-toggle-menu" onClick={this.toggleMenu}>{menu}</button>
            </div>

        </header>
    }
}

