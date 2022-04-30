import { noteService } from "../services/note.service.js"

export function ColorInput({ handleStyleChange, toggleColor }) {
    const colors = noteService.getColors()
    return <section className="input-container">
        <div className="items-container">
            {colors.map(color => <div className="item" key={color}
                style={{ backgroundColor: color }}
                onClick={() => handleStyleChange('backgroundColor', color)}>
            </div>)}
        </div>
            <button className="close-btn" onClick={() => toggleColor()}>x</button>
    </section>
}