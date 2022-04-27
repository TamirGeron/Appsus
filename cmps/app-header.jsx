import { eventBusService } from "../services/event-bus-service.js"

const { NavLink, withRouter } = ReactRouterDOM

export class AppHeader extends React.Component {

    onChange = ({ target }) => {
        eventBusService.emit('search', target.value)
    }

    render() {
        return <header className="app-header">
            <h3 >Appsus</h3>

            <input onChange={this.onChange} type="search" placeholder='Search mail' />

            <nav>
                <NavLink to="/note">Note</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/" exact>Home</NavLink>
            </nav>
        </header>
    }
}

