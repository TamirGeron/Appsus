

export function MessageAction({ onDelete, toKeep }) {
    return <section className="message-action">
        <button onClick={onDelete()}>🗑</button>
        {toKeep && <button onClick={toKeep()}>Keep</button>}
    </section>
}
