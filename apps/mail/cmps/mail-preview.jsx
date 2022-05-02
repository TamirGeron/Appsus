import { emailService } from "../services/email.service.js";

const { Link } = ReactRouterDOM

export function MailPreview({ mail, onSelect }) {
    const ctgs = emailService.getCtgs()
    const isReadClass = (mail.isRead) ? 'read' : 'unread'
    const time = emailService.before(mail.sentAt)
    return <tr className={`mail-preview ${isReadClass}`}>
        <td className="check-td"><input type="checkbox" onClick={() => onSelect(mail.id)} />
            {mail.ctgs.map(ctg => {
                if (ctg === '' || ctg === 'sent' || ctg === 'inbox') return
                return <label style={{ color: emailService.getColor(ctgs, ctg) }}>❤</label>
            }
            )}
        </td>
        <td className="main-td">
            <Link to={`/mail/${mail.id}`}>
                <div className="mail">{mail.mail}</div>
                <div className="title-body">
                    <div className="title">{mail.title} </div>
                    <div className="body"><label> -{mail.body}</label></div>
                </div>
                <div className="time">{time}</div>
            </Link >
        </td>
    </tr>
}