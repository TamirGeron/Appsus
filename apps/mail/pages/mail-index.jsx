import { emailService } from "../services/email.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailSend } from "../cmps/mail-send.jsx"

export class MailIndex extends React.Component {
    state = {
        mails: [],
        isSend: false
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails = () => {
        emailService.query()
            .then(mails => this.setState({ mails }))
    }

    toggleSend = () => {
        this.setState({ isSend: !this.state.isSend })
    }

    onSend = (ev) => {
        ev.preventDefault()
        console.log(ev);
        const target = ev.target
        emailService.sendMail(target[0].value, target[1].value, target[2].value)
            .then(mails => this.setState({ mails }))
            .then(this.toggleSend)
    }

    render() {
        const { mails, isSend } = this.state
        return <section className="mail-index">
            <button className="send-btn" onClick={() => this.toggleSend()}>Send Email</button>
            <MailNav />
            <MailList mails={mails} />
            {isSend && <MailSend toggleSend={this.toggleSend} onSend={this.onSend} />}
        </section>
    }
}