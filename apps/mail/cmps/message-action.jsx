import { emailService } from "../services/email.service.js"

export class MessageAction extends React.Component {
    state = {
        isChangeCtg: false
    }

    onCtgClick = () => {
        const isChangeCtg = this.state.isChangeCtg
        this.setState({ isChangeCtg: !isChangeCtg })
    }

    render() {
        const ctgs = emailService.getCtgs()
        const { onDelete, toKeep, onRead, onCtg } = this.props

        return <section className="message-action">
            <button onClick={onDelete()}>🗑</button>
            {onRead && <button onClick={onRead()}>✉</button>}
            {toKeep && <button onClick={toKeep()}>Keep</button>}
            <div className="ctgs">
                <button onClick={() => this.onCtgClick()}>CTG</button>
                {this.state.isChangeCtg && <section className="input-container">
                    <select onChange={(ev) => onCtg(ev.target.value)} className="items-container">
                        <option className="item" key="choose" value=''>Choose Category</option>
                        {ctgs.map((ctg, idx) => <option className="item" key={idx}
                            value={ctg}>
                            {ctg}
                        </option>)}
                        <option className="item" key="add" value='+'>Add</option>
                    </select>
                </section>}
            </div>


        </section>
    }
}
