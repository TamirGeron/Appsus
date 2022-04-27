

export class NoteFilter extends React.Component {

    state = {
        filterBy: ''
    }

    handleChange = ({ target }) => {
        const value = target.value
        this.setState(({ filterBy: value }), () => {
            this.props.onSetFilter(this.state.filterBy)
        })
    }

    

    render() {
        const { filterBy } = this.state

        return <section className="note-filter">
            <select onChange={this.handleChange} value={filterBy}>
                <option value="">All</option>
                <option value="note-txt">Text</option>
                <option value="note-img">Image</option>
                <option value="note-video">video</option>
                <option value="note-todos">Todo list</option>
            </select>
        </section>
    }
}