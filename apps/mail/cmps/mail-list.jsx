import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails, onSelect }) {

    return <table className="mail-list">
        <tbody>
            {mails.map((mail, index) => <MailPreview key={index} mail={mail} onSelect={onSelect} />)}
        </tbody>
    </table>
}

