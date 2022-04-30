import { noteService } from "../services/note.service.js"

export function StyleInput({ handleStyleChange, toggleStyle }) {
    const fonts = noteService.getStyle()
    return <section className="input-container">
        <select onChange={(e) => handleStyleChange('fontFamily', e.target.value)} className="items-container">
            {fonts.map(font => <option className="item" key={font}
                style={{ fontFfamily: font }} value={font}>
                {font}
            </option>)}
        </select>
        <button className="close-btn" onClick={() => toggleStyle()}>x</button>
    </section>
}