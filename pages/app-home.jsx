const { Link } = ReactRouterDOM

export function AppHome() {
    return <section className="app-home">
        {/* <h1>Welcome to T&S App</h1> */}
        <div className="link">
            <div className="buttons">

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
                    <a href="https://tamirgeron.github.io/Book-App/">Books </a>
                </button>
            </div>


            <div className="gifs">
                <Link to="/mail">
                    <img src="https://media.giphy.com/media/eRIrROHUPJvgs/giphy.gif" alt="" />
                </Link>

                <Link to="/note">
                    <img src="https://media.giphy.com/media/l3JE59A6vcL4cqRYbZ/giphy.gif" alt="" />
                </Link>

                <a href="https://tamirgeron.github.io/Book-App/">
                    <img src="https://media.giphy.com/media/3o85xBwvWcj1Z11Gda/giphy.gif" alt="" />
                </a>
            </div>

        </div>

    </section>
}