import { emailService } from "../services/email.service.js"

export function MailNav({ onNavClick }) {

    const unreadMailCount = emailService.unreadMailCount()
    return <section className="mail-nav">
        <div onClick={() => onNavClick('inbox')}>Inbox ({unreadMailCount})</div>
        <div onClick={() => onNavClick('sent')}>Sent</div>
    </section>
}