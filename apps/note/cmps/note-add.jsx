export class NoteAdd extends React.Component {
    state = {
        value: '',
        input: '',
    }

    handleChange = (value) => {
        this.setState({ value: value, input: this.switchInput(value) })

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

    onAdd = (ev ,value ) => {
        ev.stopPropagation()
        switch (value) {
            case 'note-txt':
                return this.props.onAddTxt(ev)
            case 'note-todos':
                return this.props.onAddTodos(ev)
            case 'note-img':
                return this.props.onAddImg(ev)
            case 'note-video':
                return this.props.onAddVideo(ev)

        }
    }


    render() {
        const { value, input } = this.state
        let placeholder = value === 'note-txt' ? "Start a note" : "Enter comma separated list"

        return <section className="note-add">
             <form onSubmit={() => this.props.onAddTxt(event, value)}>
            <label className="add-input">
                <input type="text" id="add-note" placeholder="Any thoughts today?" name="note-add" />
            </label>
            <label className="add-input">
                <input type="text" id="add-note" placeholder="Text body" name="note-add" />
            </label>
                    <button>Save</button>
            </form>
            <div className="add-imgs">
                <img onClick={() => this.handleChange('note-img')} className="add-img" src="../../assets/img/imges.svg" alt="" />
                <img onClick={() => this.handleChange('note-todos')} className="add-img" src="../../assets/img/todos.svg" alt="" />
                <img onClick={() => this.handleChange('note-txt')} className="add-img" src="../../assets/img/txt.svg" alt="" />
            </div>

            <div className="add-modal">
                <form onSubmit={() => this.onAdd(event, value)}>
            <label className="title"></label>
                <input type="text" id="add-title" placeholder="title" name="note-title" />
                    {/* <label className="note-add"></label> */}
                        <input type={input} id="add-note" placeholder={placeholder} name="note-add" />
                    
                    <button>Save</button>
                </form>
            </div>
        </section>
    }

}



// function onImgInput(ev) {
    //     loadImageFromInput(ev, renderImg)
// }

// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader()

//     reader.onload = (event) => {
    //         console.log('onload');
//         var img = new Image()
//         // Render on canvas
//         img.src = event.target.result
//         img.onload = onImageReady.bind(null, img)
//     }
//     console.log('after');
//     reader.readAsDataURL(ev.target.files[0])
// }

