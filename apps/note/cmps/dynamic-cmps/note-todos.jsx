export class NoteTodos extends React.Component {
    state = {

    }

    toggleClass = () => {
        console.log('hello there');
    }

    onRemoveTodo = () => {
        console.log('I was here');
    }

    render() {
        const { title, todos } = this.props.note.info
        return <section className="note-todos">
            <h1>{title}</h1>
            <ul>
                {todos.map((todo, idx) =>
                    <li className="todo" key={idx} >
                        <input type="checkBox" onClick={() => this.toggleClass(idx)} />
                        {todo.txt}
                        <button onClick={() => { return this.onRemoveTodo({ idx }) }}>x</button>
                    </li>)}
            </ul>
        </section>
    }
}