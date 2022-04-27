import { NoteApp } from './apps/note/pages/note-app.jsx'
import { MailIndex } from './apps/mail/pages/mail-index.jsx'
import { AppHome } from './pages/app-home.jsx'
import { AppHeader } from './cmps/app-header.jsx'


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export function Main() {
    return <Router>
        <AppHeader />
        <section className="app">
            <Switch>
                <Route path="/note" component={NoteApp} />
                <Route path="/mail" component={MailIndex} />
                <Route path="/" component={AppHome} />
            </Switch>
        </section>
        {/* <UserMsg /> */}
    </Router>
}