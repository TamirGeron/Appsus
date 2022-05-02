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

        this.removeEvent = eventBusService.on('navCtg', (nav) => {
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
            .then(this.setUrl(filterBy))
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
        this.setUrl(this.state.filterBy)
        emailService.getNavAtCtgs(ctgs, nav)
            .then(this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, ctgs } }), () => this.loadMails()))
    }

    setUrl = (inputValue) => {
        const urlSrcPrm = new URLSearchParams(inputValue)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/mail?${searchStr}`)
    }

    onSortBy = (sortBy) => {
        this.setState({ sortBy }, () => this.loadMails())
    }

    render() {
        const { mails, filterBy, selectIds, sortBy } = this.state
        const readOrSent = (filterBy.ctgs[0] === 'inbox') ? 'Read' : 'Sent'
        let sentAtClass
        let titleClass
        if (sortBy === 'sentAt') {
            sentAtClass = 'selected'
            titleClass = 'unselected'
        } else {
            sentAtClass = 'unselected'
            titleClass = 'selected'
        }
        return <section className="mail-list">
            {(selectIds.length > 0) && <MessageAction onCtg={this.onCtg} onRead={() => this.onRead} onDelete={() => this.onDelete} />}
            {(selectIds.length === 0) && < div className="sort-by">
                <label>Sort By: <span className={sentAtClass} onClick={() => this.onSortBy('sentAt')}>Date /</span> <span className={titleClass} onClick={() => this.onSortBy('title')}>Title</span></label>
            </div>}
            <div className="list">
                {(filterBy.ctgs[0] !== 'sent') && <UnreadMailList mails={mails} onSelect={this.onSelect} />}
                <h1>{readOrSent} </h1>
                <ReadMailList mails={mails} onSelect={this.onSelect} />
            </div>
        </section >
    }
}