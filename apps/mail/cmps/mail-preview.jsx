const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    const isReadClass = (mail.isRead) ? 'read' : 'unread'
    return <tr className={`mail-preview ${isReadClass}`}>
        <td className="check-td"><input type="checkbox" /></td>
        <td className="main-td"><Link to={`/mail/${mail.id}`}>
            <div>{mail.mail}</div>
            <div>{mail.title}</div>
            <div>{mail.body}</div>
        </Link >
        </td>
    </tr>
}