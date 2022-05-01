import { noteService } from "../../services/note.service.js";

export class NoteTodos extends React.Component {
    state = {
        note: null
    }

    toggleClass = () => {
        console.log('hello there');

    }

    onRemoveTodo = (todoIdx, noteId) => {
        noteService.removeTodo(todoIdx, noteId)
            .then(note => this.setState({ note }))
    }

    render() {
        let { note } = this.state

        if (!note) note = this.props.note
        console.log('note', note);
        const { id } = note
        //   const todos = note.info.todos
        //   const title = note.info.title
        const { title, todos } = note.info
        const todoId = note.info.id
        return <section className="note-todos">
            <h1>{title}</h1>
            <ul>
                {todos.map((todo, idx) =>
                    <li className="todo" key={idx} >
                        <label className="todo-input">
                            <input className="check-todo" type="checkBox" onClick={() => this.toggleClass(idx)} />
                            <span className="todo-txt">{todo.txt}</span>
                            <button onClick={() => { return this.onRemoveTodo(idx, id) }}>x</button>
                        </label>
                    </li>)}
            </ul>
        </section>
    }
}