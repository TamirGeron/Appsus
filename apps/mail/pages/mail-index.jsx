import { emailService } from "../services/email.service.js"
import { ReadMailList } from "../cmps/read-mail-list.jsx"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailSend } from "../cmps/mail-send.jsx"
import { MessageAction } from "../cmps/message-action.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"
import { UnreadMailList } from "../cmps/unread-mail-list.jsx"

export class MailIndex extends React.Component {
    state = {
        mails: [],
        isSend: false,
        filterBy: {
            search: '',
            ctgs: ['inbox']
        },
        sortBy: 'sentAt'
    }

    removeEvent;

    componentDidMount() {
        this.loadMails()
        this.removeEvent = eventBusService.on('search', (search) => {
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, search } }), () => this.loadMails())
        })
    }

    loadMails = () => {
        const { filterBy, sortBy } = this.state
        emailService.query(filterBy, sortBy)
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

    onNavClick = (nav) => {
        let { ctgs } = this.state.filterBy
        emailService.getNavAtCtgs(ctgs, nav)
            .then(this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, ctgs } }), () => this.loadMails()))
    }

    onSortBy = (sortBy) => {
        this.setState({ sortBy }, () => this.loadMails())
    }

    render() {
        const { mails, isSend, filterBy } = this.state
        const readOrSent = (filterBy.ctgs[0] === 'inbox') ? 'Read' : 'Sent'
        return <section className="mail-index">
            <MessageAction onDelete={() => this.onDelete} />
            <div className="nav-inbox">
                <div>
                    <button className="send-btn" onClick={() => this.toggleSend()}>Send Email</button>
                    <MailNav onNavClick={this.onNavClick} onSortBy={this.onSortBy} />
                </div>
                <div>
                    {(filterBy.ctgs[0] !== 'sent') && <UnreadMailList mails={mails} onSelect={this.onSelect} />}
                    <h1>{readOrSent}</h1>
                    <ReadMailList mails={mails} onSelect={this.onSelect} />
                </div>
                {isSend && <MailSend toggleSend={this.toggleSend} onSend={this.onSend} />}
            </div>
        </section >
    }
}