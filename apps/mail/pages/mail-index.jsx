import { emailService } from "../services/email.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"

export class MailIndex extends React.Component {
    state = {
        mails: []
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        emailService.query()
            .then(mails => this.setState({ mails }))
    }

    render() {
        const { mails } = this.state
        return <section className="mail-index">
            <MailNav />
            <MailList mails={mails} />
        </section>
    }
}