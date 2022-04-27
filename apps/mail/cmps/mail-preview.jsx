const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return <Link to={`/mail/${mail.id}`}>
        <div className="book-preview">
            <input type="checkbox" />
            <label>{mail.mail}</label>
            <label>{mail.title}</label>
            <label>{mail.body}</label>
        </div>
    </Link>
}