const { Link, NavLink, withRouter } = ReactRouterDOM

function _AppHeader(props) {

    return <header className="app-header">
        <h3 >Appsus</h3>

        <nav>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}

export const AppHeader = withRouter(_AppHeader)