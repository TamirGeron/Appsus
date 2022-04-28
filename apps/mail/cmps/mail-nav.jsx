import { emailService } from "../services/email.service.js"

export function MailNav({ onNavClick, onSortBy }) {

    const unreadMailCount = emailService.unreadMailCount()
    return <section className="mail-nav">
        <div onClick={() => onNavClick('inbox')}>Inbox ({unreadMailCount})</div>
        <div onClick={() => onNavClick('sent')}>Sent</div>
        <select onChange={() => onSortBy(event.target.value)}>
            <option value="sentAt">Date</option>
            <option value="title">Title</option>
        </select>
    </section>
}