const { Link } = ReactRouterDOM

export function AppHome() {
    return <section className="app-home">
        <h1>Welcome to T&S App</h1>
        <Link to="/mail"><button>Mail App</button></Link>
        <Link to="/note"><button>Keep Notes App</button></Link>
    </section>
}