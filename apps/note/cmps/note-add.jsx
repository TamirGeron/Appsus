export class NoteAdd extends React.Component {
    state = {
        value: '',
        input: '',
        modalIsOpen: false,
        inputValue: {
            title: '',
            body: ''
        }
    }


    // componentDidMount() {
    //     console.log(this.props.inputValue);
    //     this.setState({ inputValue: this.props.inputValue })
    // }

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

    onAdd = (ev) => {
        console.log(ev);
        ev.stopPropagation()
        ev.preventDefault()
        const { value } = this.state
        this.setState({ modalIsOpen: false })
        switch (value) {
            case 'note-txt':
                return this.props.onAddTxt(ev)
            case 'note-todos':
                return this.props.onAddTodos(ev)
            case 'note-img':
                return this.props.onAddImg(this.state.img)
            case 'note-video':
                return this.props.onAddVideo(ev)

        }
    }

    fileSelectHandler = (ev, inputValue) => {
        if (this.state.input !== 'file') {
            this.handleInputChange(ev, 'body', inputValue)
            return
        }
        let reader = new FileReader()
        let img = new Image()
        reader.onload = (event) => {
            img.src = event.target.result
        }
        reader.readAsDataURL(ev.target.files[0])
        this.setState({ img })
    }

    onCloseModal = () => {
        console.log('helo');
        let { modalIsOpen } = this.state
        let closeModal = modalIsOpen ? '' : 'none';
        this.setState({ modalIsOpen: false })
    }

    handleInputChange = ({ target }, field, inputValue) => {
        this.setState({ inputValue })
        const value = target.value
        this.setState((prevState) => ({ inputValue: { ...prevState.inputValue, [field]: value } }), () => {
            this.props.setUrl(this.state.inputValue)

        })
    }



    render() {
        const { value, input, modalIsOpen } = this.state
        const inputValue = this.props.inputValue
        let closeModal = modalIsOpen ? '' : 'none';
        let placeholder = value === 'note-txt' ? "Start a note" : "Enter comma separated list"

        return <section className="note-add">
            <form className="prime-add-txt" onSubmit={() => this.props.onAddTxt(event, value)}>
                <label className="add-input">
                    <input defaultValue={inputValue.title} onChange={(event) => this.handleInputChange(event, 'title', inputValue)} type="text" className="add-txt" id="add-note" placeholder="Any thoughts today?" name="note-add" />
                </label>
                <label className="add-input">
                    <input defaultValue={inputValue.body} onChange={(event) => this.handleInputChange(event, 'body', inputValue)} type="text" className="add-txt" id="add-note" placeholder="Text body" name="note-add" />
                </label>
                <button>Save</button>
            </form>
            <div className="add-imgs">
                <img onClick={() => this.handleChange('note-img')} className="add-img" src="../../assets/img/imges.svg" alt="" />
                <img onClick={() => this.handleChange('note-todos')} className="add-img" src="../../assets/img/todos.svg" alt="" />
                <img onClick={() => this.handleChange('note-txt')} className="add-img" src="../../assets/img/txt.svg" alt="" />
            </div>

            <div className={`add-modal ${closeModal}`}>
                <form onSubmit={() => this.onAdd(event)}>
                    <label className="title">
                        <input defaultValue={inputValue.title} onChange={(event) => this.handleInputChange(event, 'title')} type="text" id="add-title" placeholder="title" name="note-title" />
                    </label>
                    <label className="note-add">
                        <input defaultValue={inputValue.body} type={input} onChange={(event) => this.fileSelectHandler(event, inputValue)} placeholder={placeholder} name="note-add" />
                    </label>
                    <button>Save</button>
                    <button onClick={() => this.onCloseModal()}>x</button>
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



