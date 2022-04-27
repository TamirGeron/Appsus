import { emailService } from "../services/email.service.js"
import { MailList } from "../cmps/mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailSend } from "../cmps/mail-send.jsx"
import { MessageAction } from "../cmps/message-action.jsx"

export class MailIndex extends React.Component {
    state = {
        mails: [],
        isSend: false,
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
        const target = ev.target
        emailService.sendMail(target[0].value, target[1].value, target[2].value)
            .then(mails => this.setState({ mails }))
            .then(this.toggleSend)
    }

    onDelete = () => {
        emailService.deleteMails(this.state.selectIds)
            .then(mails => this.setState({ mails }))
    }

    onSelect = (mailId) => {
        let { selectIds } = this.state
        emailService.getSelectedIds(mailId, selectIds)
            .then(selectIds => this.setState({ selectIds }))
    }

    render() {
        const { mails, isSend } = this.state
        return <section className="mail-index">
            <MessageAction onDelete={() => this.onDelete} />
            <div>
                <button className="send-btn" onClick={() => this.toggleSend()}>Send Email</button>
                <MailNav />
            </div>
            <MailList mails={mails} onSelect={this.onSelect} />
            {isSend && <MailSend toggleSend={this.toggleSend} onSend={this.onSend} />}
        </section>
    }
}