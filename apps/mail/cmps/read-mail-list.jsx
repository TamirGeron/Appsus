import { MailPreview } from "./mail-preview.jsx"
import { emailService } from "../services/email.service.js"

export function ReadMailList({ mails, onSelect }) {
    mails = emailService.filterMailsByIsRead(mails, true)

    return <table className="mail-list">
        <tbody>
            {mails.map((mail, index) => <MailPreview key={index} mail={mail} onSelect={onSelect} />)}
        </tbody>
    </table>
}