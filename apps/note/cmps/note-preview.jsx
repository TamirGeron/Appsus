import { DynamicCmp } from "./dynamic-cmps/dynamic-cmp.jsx"
import { ColorInput } from "./color-input.jsx"
import { StyleInput } from "./style-input.jsx"

const { Link } = ReactRouterDOM



export class NotePreview extends React.Component {
    state = {
        isChangeBg: false,
        isChangeStyle: false,
        backgroundColor: 'white',
        fontFamily: 'Ariel'
    }

    onChangeColor = () => {
        this.toggleColor()
    }
    onChangeStyle = () => {
        this.toggleStyle()
    }

    handleStyleChange = (field, value) => {
        this.setState({ [field]: value })
    }

    toggleColor = () => {
        const isChangeBg = this.state.isChangeBg
        this.setState({ isChangeBg: !isChangeBg })
    }

    toggleStyle = () => {
        const isChangeStyle = this.state.isChangeStyle
        this.setState({ isChangeStyle: !isChangeStyle })
    }

    render() {
        const { toMail, note, onDelete, onTogglePin, onDuplicateNote } = this.props
        let togglePin = (note.isPinned) ? 'pined' : 'unpined';
        const { backgroundColor, isChangeBg, isChangeStyle, fontFamily } = this.state

        return <div style={{ backgroundColor, fontFamily }} className="note-preview" >
            <button className="close-btn" onClick={() => onDelete(note.id)}>x</button>
            <DynamicCmp  type={note.type} note={note} />
            <div className="settings">
                <button className="settings-btn pin-btn " onClick={() => onTogglePin(note.id)}><img className={`settings-img ${togglePin}`} src="assets/img/tack.svg" alt="" /></button>
                <button className="settings-btn"><img onClick={() => onDuplicateNote(note.id)} className="settings-img" src="assets/img/clone.svg" alt="" /></button>
                <button className="settings-btn"><img onClick={() => this.onChangeColor()} className="settings-img" src="assets/img/palette-solid.svg" alt="" /></button>
                <button className="settings-btn"><img onClick={() => this.onChangeStyle()} className="settings-img" src="assets/img/font-solid.svg" alt="" /></button>
                <button className="settings-btn" onClick={() => toMail(note.info)} ><img  className="settings-img" src="assets/img/envelope.svg" alt="" /></button>
            </div>
            {isChangeBg && <ColorInput toggleColor={this.toggleColor} handleStyleChange={this.handleStyleChange} />}
            {isChangeStyle && <StyleInput toggleStyle={this.toggleStyle} handleStyleChange={this.handleStyleChange} />}
        </div>
    }
}



