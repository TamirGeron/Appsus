import { MailPreview } from "./mail-preview.jsx"

export function MailList({ mails }) {

    return <table className="mail-list">
        <tbody>
            {mails.map((mail, index) => <MailPreview key={index} mail={mail} />)}
        </tbody>
    </table>
}

