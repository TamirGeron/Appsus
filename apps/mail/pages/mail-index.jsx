import { emailService } from "../services/email.service.js"
import { MailList } from "../cmps/mail-list.jsx"

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
        console.log(mails);
        return <section className="mail-index">
            <MailList mails={mails} />
        </section>
    }
}