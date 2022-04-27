import { MailPreview } from "./mail-preview.jsx"

export function MailList({mails}) {

    return <section className="mail-list">
        {mails.map((mail,index) => <MailPreview key={index} mail={mail} />)}
    </section>
}

