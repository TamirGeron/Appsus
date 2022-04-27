export class NoteTxt extends React.Component{




    render(){
        console.log(this.props);
        const {txt} = this.props.note.info
    return <section className="note-txt">
        <p>{txt}</p>
    </section>
    }
}