const { Link } = ReactRouterDOM

export function AppHome() {
    return <section className="app-home">
        {/* <h1>Welcome to T&S App</h1> */}
        <div className="link">
            <div className="buttons">
                <Link to="/mail">
                    <img src="./assets/img/mail.jpg" />
                </Link>

                <Link to="/note">
                    <img src="./assets/img/note.jpg" />
                </Link>

                <a href="https://tamirgeron.github.io/Book-App/">
                    <img src="./assets/img/book.jpg" />
                </a>
            </div>


            {/* <div className="gifs">
                <Link to="/mail">
                    <img src="https://media.giphy.com/media/eRIrROHUPJvgs/giphy.gif" alt="" />
                </Link>

                <Link to="/note">
                    <img src="https://media.giphy.com/media/l3JE59A6vcL4cqRYbZ/giphy.gif" alt="" />
                </Link>

                <a href="https://tamirgeron.github.io/Book-App/">
                    <img src="https://media.giphy.com/media/3o85xBwvWcj1Z11Gda/giphy.gif" alt="" />
                </a>
            </div> */}

        </div>

    </section>
}