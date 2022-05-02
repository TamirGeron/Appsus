import { eventBusService } from "../../../services/event-bus-service.js"
import { emailService } from "../services/email.service.js"
import { MailCtgs } from "./mail-ctgs.jsx";

export class MailNav extends React.Component {
    state = {
        unreadMailCount: null,
        menu: '☰'
    }

    removeEvents;

    componentDidMount() {
        this.updateUnread()
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
                <div className="inbox" onClick={() => this.toggleNav('inbox')}>
                    <div >Inbox   </div >
                    <div>({unreadMailCount})</div>
                </div>
                <div onClick={() => this.toggleNav('sent')}>Sent</div>
                <div className="ctgs">Categories</div>
                <MailCtgs toggleNav={this.toggleNav} />
            </div>
            <button className="btn-toggle-nav" onClick={() => this.toggleNav('')}>{menu}</button>

        </section >
    }
}