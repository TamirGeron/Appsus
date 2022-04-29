export class NoteAdd extends React.Component {
    state = {
        value: '',
        input: '',
        modalIsOpen: false
    }

    handleChange = (value) => {
        this.setState({ value: value, input: this.switchInput(value), modalIsOpen: true })

    }

    switchInput = (value) => {
        switch (value) {
            case 'note-txt':
                return 'text'
            case 'note-todos':
                return 'text'
            case 'note-img':
                return 'file'
            case 'note-video':
                return 'file'
        }

    }

    onAdd = (ev, value) => {
        ev.stopPropagation()
        this.setState({ modalIsOpen: false})
        switch (value) {
            case 'note-txt':
                return this.props.onAddTxt(ev)
            case 'note-todos':
                return this.props.onAddTodos(ev)
            case 'note-img':
                return this.props.onAddImg(this.fileSelectHandler)
            case 'note-video':
                return this.props.onAddVideo(ev)

        }
    }

    fileSelectHandler = event => {
        const { input } = this.state
        if (input !== 'file') return
        console.log(event.target.files[0].name)
        const fileName = event.target.files[0].name
        return fileName
    }

    onCloseModal=()=>{
        console.log('helo');
        let{modalIsOpen}=this.state
        let closeModal = modalIsOpen? '': 'none';
        this.setState({ modalIsOpen: false})
    }


    render() {
        const { value, input, modalIsOpen } = this.state
        let closeModal = modalIsOpen? '':'none';
        let placeholder = value === 'note-txt' ? "Start a note" : "Enter comma separated list"

        return <section className="note-add">
            <form className="prime-add-txt" onSubmit={() => this.props.onAddTxt(event, value)}>
                <label className="add-input">
                    <input type="text" className="add-txt" id="add-note" placeholder="Any thoughts today?" name="note-add" />
                </label>
                <label className="add-input">
                    <input type="text" className="add-txt" id="add-note" placeholder="Text body" name="note-add" />
                </label>
                <button>Save</button>
            </form>
            <div className="add-imgs">
                <img onClick={() => this.handleChange('note-img')} className="add-img" src="../../assets/img/imges.svg" alt="" />
                <img onClick={() => this.handleChange('note-todos')} className="add-img" src="../../assets/img/todos.svg" alt="" />
                <img onClick={() => this.handleChange('note-txt')} className="add-img" src="../../assets/img/txt.svg" alt="" />
            </div>

            <div className={`add-modal ${closeModal}`}>
                <form onSubmit={() => this.onAdd(event, value)}>
                    <label className="title">
                        <input type="text" id="add-title" placeholder="title" name="note-title" />
                    </label>
                    <label className="note-add">
                        <input type={input} onChange={this.fileSelectHandler} placeholder={placeholder} name="note-add" />
                    </label>
                    <button>Save</button>
                <button onClick={()=>this.onCloseModal()}>x</button>
                </form>
                <div className="add-imgs-modal">
                    <img onClick={() => this.handleChange('note-img')} className="add-img" src="../../assets/img/imges.svg" alt="" />
                    <img onClick={() => this.handleChange('note-todos')} className="add-img" src="../../assets/img/todos.svg" alt="" />
                    <img onClick={() => this.handleChange('note-txt')} className="add-img" src="../../assets/img/txt.svg" alt="" />
                </div>
            </div>
        </section>
    }

}



// onImgInput = (ev) => {
//     loadImageFromInput(ev, renderImg)
// }



