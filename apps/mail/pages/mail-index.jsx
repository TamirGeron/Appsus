import { emailService } from "../services/email.service.js"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailSend } from "../cmps/mail-send.jsx"
import { MessageAction } from "../cmps/message-action.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MailDetail } from "../cmps/mail-details.jsx"
import { MailList } from "../cmps/mail-list.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class MailIndex extends React.Component {
    state = {
        isSend: false,
        filterBy: {
            search: '',
            ctgs: ['inbox']
        },
    }

    removeEvent;

    componentDidMount() {
        this.removeEvent = eventBusService.on('onSend', (ev) => {
            this.onSend(ev, false)
        })
    }

    toggleSend = () => {
        this.setState({ isSend: !this.state.isSend })
    }

    onSend = (ev, isOpen = true) => {
        ev.preventDefault()
        const target = ev.target
        emailService.sendMail(target[0].value, target[1].value, target[2].value)
            .then(mails => {
                if (isOpen) this.toggleSend()
                eventBusService.emit('send', mails)
            })
    }

    // onDelete = () => {
    //     eventBusService.emit('delete', 'start')
    // }

    onNavClick = (nav) => {
        eventBusService.emit('nav', nav)
    }

    onSortBy = (sortBy) => {
        eventBusService.emit('sort', sortBy)
    }

    render() {
        const { isSend } = this.state
        return <Router className="mail-index">
            {/* <MessageAction onDelete={() => this.onDelete} /> */}
            <div className="nav-inbox">
                <div>
                    <button className="send-btn" onClick={() => this.toggleSend()}>+ Compose</button>
                    <MailNav onNavClick={this.onNavClick} onSortBy={this.onSortBy} />
                </div>
                <Switch>
                    <Route path="/mail/:mailId" component={MailDetail} />
                    <Route path="/mail" component={MailList} />
                </Switch>
                {isSend && <MailSend toggleSend={this.toggleSend} onSend={this.onSend} />}
            </div>
        </Router >
    }
}
