import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { NoteTodos } from '../cmps/dynamic-cmps/note-todos.jsx'

export const noteService = {
    query,
    addNote,
    deleteNote,
    getById,
    duplicateNote,
    togglePin,
    getColors,
    getStyle,
    removeTodo,
    saveEdit,
}



const KEY = 'notesDB'


function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes || notes.length === 0) {
        notes = createNotes()
        _saveToStorage(notes)
    }


    if (filterBy) {
        notes = notes.filter(note => {
            return (
                (note.type === filterBy.type || !filterBy.type) &&
                note.info.title.toLowerCase().includes(filterBy.search.toLowerCase())
            )
        })
    }

    return Promise.resolve(notes)
}



function addNote(info, type) {
    let notes = _loadFromStorage()
    const note = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        info,
    }
    notes.unshift(note)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function deleteNote(noteId) {
    let notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    notes.splice(noteIdx, 1)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function removeTodo(todoIdx, noteId) {
    let notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    const todos = note.info.todos
    todos.splice(todoIdx, 1)
    _saveToStorage(notes)
    return Promise.resolve(note)
}

function saveEdit(txt, noteId) {
    console.log(noteId);
    let notes = _loadFromStorage()
    const note = notes.find(note => note.id === noteId)
    console.log(note);
    note.info.txt = txt
    _saveToStorage(notes)
    return Promise.resolve(note)
}


function getById(noteId) {
    const notes = _loadFromStorage()
    const note = notes.find(note => noteId === note.id)
    return Promise.resolve(note)
}

function duplicateNote(noteId) {
    let notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    let note = { ...(notes.find(note => note.id === noteId)) }
    note.id = utilService.makeId()
    notes.splice(noteIdx, 0, note)
    _saveToStorage(notes)
    return Promise.resolve(notes)
}

function togglePin(noteId) {
    let notes = _loadFromStorage()
    const noteIdx = notes.findIndex(note => note.id === noteId)
    const note = notes.find(note => note.id === noteId)
    note.isPinned = !note.isPinned
    if (!note.isPinned) {
        notes.splice(noteIdx, 1)
        notes.push(note)
    } else {
        notes.splice(noteIdx, 1)
        notes.unshift(note)
    }
    _saveToStorage(notes)
    return Promise.resolve(notes)

}


function createNotes() {
    return [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: 'Fullstack',
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#b4ff9f"
            },
        },

        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                url: "assets/img/img1.jpg",
                title: "Carpe diem"
            },
            style: {
                backgroundColor: "rgb(255 213 158)"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todos",
            isPinned: false,
            info: {
                title: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null, id: utilService.makeId() },
                    { txt: "Coding power", doneAt: 187111111, id: utilService.makeId() },
                    { txt: "Wash the dishes", doneAt: 187111111, id: utilService.makeId() },
                    { txt: "Laundry", doneAt: 187111111, id: utilService.makeId() },
                ],
                id: utilService.makeId()
            },
            style: {
                backgroundColor: "rgb(249 255 164)",
            },
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                url: "assets/img/spider.jpg",
                title: "??????????"
            },
            style: {
                backgroundColor: "rgb(255 213 158)"
            }
        },

        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: false,
            info: {
                title: 'Lord of the rings',
                txt: `The way is shut. 
    It was made by those
     who are Dead, 
 and the Dead keep it,
  until the time comes.
  The way is shut  
  ??? J.R.R. Tolkien`
            },
            style: {
                backgroundColor: "#b4ff9f"
            }

        },

        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
            info: {
                url: "assets/img/wasp.jpg",
                title: "?????????? ?????????? ??????"
            },
            style: {
                backgroundColor: "rgb(255 213 158)"
            }
        },
    ];
}

function _saveToStorage(books) {
    storageService.saveToStorage(KEY, books)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function getColors() {
    return ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']
}

function getStyle() {
    return ['Ariel', 'Georgia', 'Times New Roman', 'Helvetica', 'Impact', 'Verdana']
}