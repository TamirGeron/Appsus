

export function MessageAction({ onDelete }) {
    return <section className="message-action">
        <button onClick={onDelete()}>🗑</button>
    </section>
}
