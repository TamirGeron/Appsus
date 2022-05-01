

export function MessageAction({ onDelete, toKeep, onRead, onCtg }) {
    return <section className="message-action">
        <button onClick={onDelete()}>🗑</button>
        <button onClicl={onCtg()}>CTG</button>
        {onRead && <button onClick={onRead()}>✉</button>}
        {toKeep && <button onClick={toKeep()}>Keep</button>}
    </section>
}
