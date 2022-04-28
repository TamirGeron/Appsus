export class NoteAdd extends React.Component {
    state = {
        value: '',
        input: 'text',
    }

    handleChange = (value) => {
        this.setState({ value: value, input: this.switchInput(value) },console.log('state', this.state))

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


    render() {
        const { value } = this.state

        return <section className="note-add">
            <label>
                <input type="text" id="add-note" placeholder="Title" name="title" />
                <div className="add-imgs">
                <img onClick={() => this.handleChange('note-txt')} className="add-img" src="../../assets/img/imges.svg" alt="" />
                <img onClick={() => this.handleChange('note-todos')} className="add-img" src="../../assets/img/todos.svg" alt="" />
                <img onClick={() => this.handleChange('note-img')} className="add-img" src="../../assets/img/txt.svg" alt="" /> 
                </div>
            </label>
            {/* <select onChange={this.handleChange} >
                    <option value="note-txt">Text</option>
                    <option value="note-img">Image</option>
                    <option value="note-video">video</option>
                    <option value="note-todos">Todo list</option>
                </select> */}
            <form onSubmit={() => this.props.onAdd(event, value)}>
                {/* <label htmlFor="add-txt"></label>
                <label htmlFor="add-note"></label>
                <input type="text" id="add-note" placeholder="Note" name="txt" />
                <label htmlFor="add-img"></label>
                <input type="file" id="imge_input" accept="image/png, image/jpg" /> */}

                {/* <button>Save</button> */}
            </form>
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

