const { Link } = ReactRouterDOM

export function MailPreview({ mail, onSelect }) {
    const isReadClass = (mail.isRead) ? 'read' : 'unread'

    return <tr className={`mail-preview ${isReadClass}`}>
        <td className="check-td"><input type="checkbox" onClick={() => onSelect(mail.id)} /></td>
        <td className="main-td"><Link to={`/mail/${mail.id}`}>
            <div className="mail">{mail.mail}</div>
            <div className="title">{mail.title}</div>
            <div>{mail.body}</div>
        </Link >
        </td>
    </tr>
}