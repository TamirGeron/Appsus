import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { NoteTodos } from '../cmps/dynamic-cmps/note-todos.jsx'

export const noteService = {
    query,
    addNote,
    deleteNote,
}



const KEY = 'notesDB'


function query(filterBy) {
    let notes = _loadFromStorage()
    if (!notes || notes.length === 0) {
        notes = createNotes()
        _saveToStorage(notes)
    }

    if (filterBy) {
        console.log(filterBy);
        notes = notes.filter(note => {
            return note.type === filterBy
        })
    }

    console.log(notes);
    return Promise.resolve(notes)
}



function addNote(info) {
    let notes = _loadFromStorage()
    const note = {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info,
    }
    notes.push(note)
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


function createNotes() {
    return [
        {
            id: utilService.makeId(),
            type: "note-txt",
            isPinned: true,
            info: {
                title: 'Fullstack',
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            info: {
                url: "../../assets/img/img1.jpg",
                title: "Carpe diem"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "note-todos",
            info: {
                title: "Get my stuff together",
                todos: [
                    { txt: "Driving liscence", doneAt: null },
                    { txt: "Coding power", doneAt: 187111111 }
                ]
            }
        }
    ];
}

function _saveToStorage(books) {
    storageService.saveToStorage(KEY, books)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}