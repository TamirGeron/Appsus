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
    getStyle
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
            }
        },
        {
            id: utilService.makeId(),
            type: "note-img",
            isPinned: false,
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
            isPinned: false,
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

function getColors() {
    return ['#B4FF9F', '#F9FFA4', '#FFD59E', '#FFA1A1']
}

function getStyle() {
    return ['Ariel', 'Georgia', 'Times New Roman', 'Helvetica', 'Impact', 'Verdana']
}