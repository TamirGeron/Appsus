import { emailService } from "../services/email.service.js"

export function MailDetail(props) {
    const mail = emailService.getMailById(props.match.params.mailId)
    console.log(mail);
    return <section className="mail-detail" >
        <h1>{mail.mail}</h1>
        <h1>{mail.title}</h1>
        <p>{mail.body}</p>
    </section >
}