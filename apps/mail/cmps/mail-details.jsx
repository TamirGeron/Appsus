import { emailService } from "../services/email.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"

export function MailDetail(props) {
    const mail = emailService.getMailById(props.match.params.mailId)
    emailService.markAsRead(mail.id)
    eventBusService.emit('nav', 'lbl')
    const mailTime = emailService.before(mail.sentAt)

    return <section className="mail-detail" >
        <h1>Title: {mail.title}</h1>
        <div className="mail-detail-title">
            <h1>From: {mail.mail}</h1>
            <label>{mailTime} ago</label>
        </div>
        <h1></h1>
        <p>{mail.body}</p>

        <form>
            <textarea rows="5" cols="10" />
            <input type="submit" value="Send" />
        </form>
    </section >
}