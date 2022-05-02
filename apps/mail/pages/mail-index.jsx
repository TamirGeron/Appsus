import { emailService } from "../services/email.service.js"
import { MailNav } from "../cmps/mail-nav.jsx"
import { MailSend } from "../cmps/mail-send.jsx"
import { eventBusService } from "../../../services/event-bus-service.js"
import { MailDetail } from "../cmps/mail-details.jsx"
import { MailList } from "../cmps/mail-list.jsx"

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class MailIndex extends React.Component {
    state = {
        inputValue: {
            isSend: false,
            mail: '',
            title: '',
            body: ''
        },
        filterBy: {
            search: '',
            ctgs: ['inbox']
        },
    }

    removeEvent;

    componentDidMount() {
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        let inputValue = {}
        for (var value of urlSrcPrm.keys()) {
            inputValue[value] = urlSrcPrm.get(value);
        }
        if (!Object.keys(inputValue)) inputValue = null
        this.setState({ inputValue })


        this.removeEvent = eventBusService.on('onSend', (ev) => {
            this.onSend(ev, false)
        })
    }

    toggleSend = () => {
        const { inputValue } = this.state
        const isSend = inputValue.isSend
        this.setState((prevState) => ({ inputValue: { ...prevState.inputValue, isSend: !isSend } }), () => {
            this.setUrl(this.state.inputValue)
        })
    }

    setUrl = (inputValue) => {
        const { isSend } = this.state.inputValue
        if (!isSend) this.props.history.push(`/mail`)
        else {
            const urlSrcPrm = new URLSearchParams(inputValue)
            const searchStr = urlSrcPrm.toString()
            this.props.history.push(`/mail?${searchStr}`)
        }
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

    onNavClick = (nav) => {
        const filterBy = {
            search: '',
            ctgs: [nav]
        }
        const urlSrcPrm = new URLSearchParams(filterBy)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/mail?${searchStr}`)
        eventBusService.emit('navCtg', nav)
    }

    onSortBy = (sortBy) => {
        eventBusService.emit('sort', sortBy)
    }

    render() {
        const { inputValue } = this.state
        const isSend = inputValue.isSend
        return <Router className="mail-index">
            <div className="nav-inbox">
                <div className="send-nav">
                    <button className="send-btn" onClick={() => this.toggleSend()}>+ Compose</button>
                    <MailNav onNavClick={this.onNavClick} onSortBy={this.onSortBy} />
                </div>
                <Switch>
                    <Route path="/mail/:mailId" component={MailDetail} />
                    <Route path="/mail" component={MailList} />
                </Switch>
                {isSend && <MailSend inputValue={inputValue} setUrl={this.setUrl} toggleSend={this.toggleSend} onSend={this.onSend} />}
            </div>
        </Router >
    }
}
