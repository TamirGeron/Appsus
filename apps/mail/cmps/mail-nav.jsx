import { eventBusService } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email.service.js"

export class MailNav extends React.Component {
    state = {
        unreadMailCount: null,
        menu: '☰'
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

    toggleNav = (action) => {
        let { menu } = this.state
        menu = (menu === 'X') ? '☰' : 'X'
        this.setState({ menu })
        if (action) this.props.onNavClick(action)
    }

    render() {
        const { unreadMailCount, menu } = this.state
        const navOpenClass = (menu === 'X') ? 'nav-open' : ''

        return <section className="mail-nav">
            <div className={`mail-nav-no-btn ${navOpenClass}`}>
                {/* < div onClick={() => this.props.onNavClick('inbox') */}
                < div onClick={() => this.toggleNav('inbox')
                }> Inbox({unreadMailCount})</div >
                <div onClick={() => this.toggleNav('sent')}>Sent</div>
                {/* <div onClick={() => this.props.onNavClick('sent')}>Sent</div> */}
                <select onChange={() => this.props.onSortBy(event.target.value)}>
                    <option value="sentAt">Date</option>
                    <option value="title">Title</option>
                </select>
            </div>
            <button className="btn-toggle-nav" onClick={() => this.toggleNav('')}>{menu}</button>

        </section >
    }
}