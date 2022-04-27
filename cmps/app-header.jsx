const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {

    return <header className="app-header">
        <h3 >Appsus</h3>
        <input type="search" placeholder='Search mail' />
        <nav>
            <NavLink to="/note">Note</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/" exact>Home</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)