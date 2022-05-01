import { ReadMailList } from "./read-mail-list.jsx";
import { UnreadMailList } from "./unread-mail-list.jsx";
import { emailService } from "../services/email.service.js";
import { eventBusService } from "../../../services/event-bus-service.js";
import { MessageAction } from "./message-action.jsx";

export class MailList extends React.Component {
    state = {
        mails: [],
        filterBy: {
            search: '',
            ctgs: ['inbox']
        },
        sortBy: 'sentAt',
        selectIds: []
    }

    removeEvent;

    componentDidMount() {
        this.loadMails()
        this.removeEvent = eventBusService.on('search', (search) => {
            this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, search } }), () => this.loadMails()
            )
        })

        this.removeEvent = eventBusService.on('nav', (nav) => {
            this.onNavClick(nav)
        })
        this.removeEvent = eventBusService.on('sort', (sortBy) => {
            this.onSortBy(sortBy)
        })
        this.removeEvent = eventBusService.on('send', (lbl) => {
            this.loadMails()
        })
    }

    componentWillUnmount() {
        this.removeEvent()
    }

    loadMails = () => {
        const { filterBy, sortBy } = this.state
        emailService.query(filterBy, sortBy)
            .then(mails => this.setState({ mails }))
    }

    onSelect = (mailId) => {
        let { selectIds } = this.state
        emailService.getSelectedIds(mailId, selectIds)
            .then(selectIds => {
                this.setState({ selectIds })
                eventBusService.emit('selectIds', selectIds)
            })
    }

    onDelete = () => {
        emailService.deleteMails(this.state.selectIds)
        this.loadMails()
    }

    onCtg = (ctg) => {
        if (!ctg) return
        if (ctg === '+') {
            ctg = prompt('Category Name?')
            emailService.addCtg(ctg)
        }
        emailService.ctgsMails(this.state.selectIds, ctg)
        this.loadMails()
    }

    onRead = () => {
        emailService.readUnreadMails(this.state.selectIds)
        this.loadMails()
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
        const { mails, filterBy } = this.state
        const readOrSent = (filterBy.ctgs[0] === 'inbox') ? 'Read' : 'Sent'

        return <section className="mail-list">
            <MessageAction onCtg={this.onCtg} onRead={() => this.onRead} onDelete={() => this.onDelete} />
            <div className="list">
                {(filterBy.ctgs[0] !== 'sent') && <UnreadMailList mails={mails} onSelect={this.onSelect} />}
                <h1>{readOrSent}</h1>
                <ReadMailList mails={mails} onSelect={this.onSelect} />
            </div>
        </section>
    }
}