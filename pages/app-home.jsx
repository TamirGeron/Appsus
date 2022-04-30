const { Link } = ReactRouterDOM

export function AppHome() {
    return <section className="app-home">
        {/* <h1>Welcome to T&S App</h1> */}
        <div className="link">
            <Link to="/mail">
                <img src="https://media.giphy.com/media/eRIrROHUPJvgs/giphy.gif" alt="" />
            </Link>
            <Link to="/note">
                <img src="https://media.giphy.com/media/l3JE59A6vcL4cqRYbZ/giphy.gif" alt="" />
            </Link>

            {/* <Link to="/mail"><button>Mail App</button></Link>
        <Link to="/note"><button>Keep Notes App</button></Link> */}
        </div>

    </section>
}