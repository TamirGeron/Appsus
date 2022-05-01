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
        const arr = window.location.href.split('#')
        console.log(arr);
        console.log(arr[arr.length - 1]);
        return <header className="app-header">
            <h3 >Appsus</h3>

            <div className="search-nav">
                {arr[arr.length - 1] !== '/' && <input onChange={this.onChange} type="search" placeholder='Search' />}

                <nav className={menuOpenClass}>
                    <NavLink onClick={this.toggleMenu} to="/" exact>Home</NavLink>
                    <NavLink onClick={this.toggleMenu} to="/note">Note</NavLink>
                    <NavLink onClick={this.toggleMenu} to="/mail">Mail</NavLink>
                </nav>
                <button className="btn-toggle-menu" onClick={this.toggleMenu}>{menu}</button>
            </div>

        </header>
    }
}

