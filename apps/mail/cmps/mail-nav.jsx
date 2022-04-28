import { eventBusService } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email.service.js"
eventBusService

export class MailNav extends React.Component {
    state = {
        unreadMailCount: 1
    }

    componentDidMount() {
        const unreadMailCount = emailService.unreadMailCount()
        this.setState({ unreadMailCount })
        this.removeEvent = eventBusService.on('nav', (lbl) => {
            this.updateUnread()
        })
    }

    updateUnread = () => {
        const unreadMailCount = emailService.unreadMailCount()
        this.setState({ unreadMailCount })
    }

    render() {
        const { unreadMailCount } = this.state
        return <section className="mail-nav">
            <div onClick={() => this.props.onNavClick('inbox')}>Inbox ({unreadMailCount})</div>
            <div onClick={() => this.props.onNavClick('sent')}>Sent</div>
            <select onChange={() => this.props.onSortBy(event.target.value)}>
                <option value="sentAt">Date</option>
                <option value="title">Title</option>
            </select>
        </section>
    }
}