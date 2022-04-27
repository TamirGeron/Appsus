

export function NoteAdd({onAdd}) {
    return <section className="note-add">
        <form onSubmit={() => onAdd(event)}>
            <label htmlFor="add-note"></label>
            <input type="text" id="add-note" placeholder="Title" name="title"/>
            <label htmlFor="add-note"></label>
            <input type="text" id="add-note" placeholder="Note" name="txt"/>
            <button>Save</button>
        </form>
    </section>

}