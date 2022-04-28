import { eventBusService } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email.service.js"

export class MailNav extends React.Component {
    state = {
        unreadMailCount: null
    }

    removeEvents;

    componentDidMount() {
        this.updateUnread()
        this.mounted = true
        this.removeEvents = eventBusService.on('nav', (lbl) => {
            emailService.unreadMailCount()
                .then(unreadMailCount => {
                    this.setState({ unreadMailCount })
                })
        })
    }

    componentWillUnmount() {
        this.removeEvents()
    }

    updateUnread = () => {
        emailService.unreadMailCount()
            .then(unreadMailCount => this.setState({ unreadMailCount }))

    }

    render() {
        const { unreadMailCount } = this.state
        return <section className="mail-nav">
            < div onClick={() => this.props.onNavClick('inbox')
            }> Inbox({unreadMailCount})</div >
            <div onClick={() => this.props.onNavClick('sent')}>Sent</div>
            <select onChange={() => this.props.onSortBy(event.target.value)}>
                <option value="sentAt">Date</option>
                <option value="title">Title</option>
            </select>
        </section >
    }
}