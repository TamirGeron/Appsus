import { emailService } from "../services/email.service.js"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MessageAction } from "./message-action.jsx"

export class MailDetail extends React.Component {
    state = {
        mail: {}
    }


    componentDidMount() {
        this.loadMailDetails()
    }

    loadMailDetails = () => {
        emailService.getMailById(this.props.match.params.mailId)
            .then(mail => {
                this.setState({ mail })
                emailService.markAsRead(mail.id)
                eventBusService.emit('nav', 'unreadMailCount')
            }
            )
    }

    onSend(event) {
        eventBusService.emit('onSend', event)
        this.props.history.push(`/mail`)
    }

    onDelete = () => {
        emailService.deleteMails([this.state.mail.id])
        this.props.history.push(`/mail`)
    }

    toKeep = () => {
        const { mail } = this.state
        const inputValue = {
            title: mail.title,
            body: mail.body
        }
        const urlSrcPrm = new URLSearchParams(inputValue)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/note?${searchStr}`)
    }

    render() {
        const { mail } = this.state
        const mailTime = emailService.before(mail.sentAt)

        return <section className="mail-detail">
            <MessageAction toKeep={() => this.toKeep} onDelete={() => this.onDelete} />
            <h1>Title: {mail.title}</h1>
            <div className="mail-detail-title">
                <h1>From: {mail.mail}</h1>
                <label>{mailTime} ago</label>
            </div>
            <h1></h1>
            <p>{mail.body}</p>

            <form onSubmit={() => this.onSend(event)}>
                <label>To: <input disabled type="text" defaultValue={mail.mail} /></label>
                <br />
                <label>Title: <input disabled type="text" defaultValue={mail.title} /></label>
                <textarea rows="5" cols="10" />
                <input type="submit" value="Send" />
            </form>
        </section >
    }
}