

export function MessageAction({ onDelete, toKeep, onRead }) {
    return <section className="message-action">
        <button onClick={onDelete()}>🗑</button>
        {onRead && <button onClick={onRead()}>✉</button>}
        {toKeep && <button onClick={toKeep()}>Keep</button>}
    </section>
}
