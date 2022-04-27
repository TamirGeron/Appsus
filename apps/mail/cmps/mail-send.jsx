
export class MailSend extends React.Component {

    render() {
        return <div className="mail-send">
            <div className="modal-content">
                <span className="close-button" onClick={this.props.toggleSend}>X</span>
                <form>
                    <label > To: <br />
                        <input placeholder="Mail" type="email" />
                    </label> <br />
                    <label > Title: <br />
                        <input placeholder="Enter Title" type="text" />
                    </label><br />
                    <label > Message: <br />
                        <textarea rows="10" cols="50" max />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div >
    }
}