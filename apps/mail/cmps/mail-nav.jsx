import { emailService } from "../services/email.service.js"

export function MailNav() {
    
    const unreadMailCount=emailService.unreadMailCount()
    console.log(unreadMailCount);

    return <section className="mail-nav">
        <div>Inbox ({unreadMailCount})</div>
        <div>Starred</div>
        <div>Sent</div>
        <div>Draft</div>
        <div>Categories</div>
    </section>
}
