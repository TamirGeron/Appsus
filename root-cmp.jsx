import { NoteIndex } from './apps/keep/pages/note-index.jsx'
import { MailIndex } from './apps/mail/pages/mail-index.jsx'

const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function Main() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/note" component={NoteIndex} />
                <Route path="/mail" component={MailIndex} />
                <Route path="/" component={Home} />
            </Switch>
        </section>
        <UserMsg />
    </Router>
}