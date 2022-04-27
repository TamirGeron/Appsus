import { emailService } from "../services/email.service.js"
import { MailPreview } from "./mail-preview.jsx"

export function UnreadMailList({ mails, onSelect }) {
    mails = emailService.filterMailsByIsRead(mails, false)
    return <table className="mail-list">
        <tbody>
            {mails.map((mail, index) => <MailPreview key={index} mail={mail} onSelect={onSelect} />)}
        </tbody>
    </table>
}