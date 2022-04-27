import { NoteApp } from './apps/note/pages/note-app.jsx'
import { MailIndex } from './apps/mail/pages/mail-index.jsx'
import { AppHome } from './pages/app-home.jsx'
import { AppHeader } from './cmps/app-header.jsx'
import { MailDetail } from './apps/mail/cmps/mail-details.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function Main() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/note" component={NoteApp} />
                <Route path="/mail/:mailId" component={MailDetail} />
                <Route path="/mail" component={MailIndex} />
                <Route path="/" component={AppHome} />
            </Switch>
        </section>
        {/* <UserMsg /> */}
    </Router>
}