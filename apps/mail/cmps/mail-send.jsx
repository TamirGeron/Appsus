export class MailSend extends React.Component {
    state = {
        inputValue: {
            isSend: true,
            mail: '',
            title: '',
            body: ''
        }
    }

    handleInputChange = ({ target }, field) => {
        const value = target.value
        this.setState((prevState) => ({ inputValue: { ...prevState.inputValue, [field]: value } }), () => {
            this.props.setUrl(this.state.inputValue)
        })
    }

    render() {
        const {inputValue} = this.props

        return <div className="mail-send">
            < div className="modal-content" >
                <span className="close-button" onClick={this.props.toggleSend}>X</span>
                <form onSubmit={() => this.props.onSend(event)}>
                    <label > To: <br />
                        <input defaultValue={inputValue.mail} onChange={(event) => this.handleInputChange(event, 'mail')} placeholder="Mail" type="email" />
                    </label> <br />
                    <label > Title: <br />
                        <input defaultValue={inputValue.title} onChange={(event) => this.handleInputChange(event, 'title')} placeholder="Enter Title" type="text" />
                    </label><br />
                    <label > Message: <br />
                        <textarea defaultValue={inputValue.body} onChange={(event) => this.handleInputChange(event, 'body')} rows="30" />
                    </label>
                    <input type="submit" value="Send" />
                </form>
            </div >
        </div >
    }
}