import { MailList } from "../cmps/mail-list.jsx"

export class MailIndex extends React.Component {

    render() {
        return <section className="mail-index">
            <MailList />
        </section>
    }
}