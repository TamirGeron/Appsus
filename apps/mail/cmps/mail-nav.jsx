import { emailService } from "../services/email.service.js"

export function MailNav() {



    return <section className="mail-nav">
        <div>Inbox</div>
        <div>Starred</div>
        <div>Sent</div>
        <div>Draft</div>
        <div>Categories</div>
    </section>
}
