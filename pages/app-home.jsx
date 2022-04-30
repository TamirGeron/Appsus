const { Link } = ReactRouterDOM

export function AppHome() {
    return <section className="app-home">
        {/* <h1>Welcome to T&S App</h1> */}
        <div className="link">
            <button>
                <Link to="/mail">
                    Mail App
                </Link>
            </button>
            <button>
                <Link to="/note">
                    Keep Notes App
                </Link>
            </button>
            <button>
                <a href="https://tamirgeron.github.io/book-shop/">Books </a>
            </button>


            <Link to="/mail">
                <img src="https://media.giphy.com/media/eRIrROHUPJvgs/giphy.gif" alt="" />
            </Link>

            <Link to="/note">
                <img src="https://media.giphy.com/media/l3JE59A6vcL4cqRYbZ/giphy.gif" alt="" />
            </Link>

            <a href="https://tamirgeron.github.io/book-shop/">
                <img src="https://media.giphy.com/media/3o85xBwvWcj1Z11Gda/giphy.gif" alt="" />
            </a>

        </div>

    </section>
}