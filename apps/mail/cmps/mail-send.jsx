export function MailSend({ toggleSend, onSend }) {

    return <div className="mail-send">
        <div className="modal-content">
            <span className="close-button" onClick={toggleSend}>X</span>
            <form onSubmit={() => onSend(event)}>
                <label > To: <br />
                    <input placeholder="Mail" type="email" />
                </label> <br />
                <label > Title: <br />
                    <input placeholder="Enter Title" type="text" />
                </label><br />
                <label > Message: <br />
                    <textarea rows="10" cols="50" />
                </label>
                <input type="submit" value="Send" />
            </form>
        </div>
    </div >
}