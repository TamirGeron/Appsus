import { utilService } from "../../../services/util.service.js"

export const mailData = {
    query
}

function query() {
    return mails
}

const mails = [
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'Hello',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox', 'Work']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'Bye',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent', 'Work']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'I love You',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox','Vacation']
    },
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'why you not call',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox','Work']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'The roof is on fire',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent', 'Vacation']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'Sprint 3',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'Yalla',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'Tov noo',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'yes',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'Why not',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'Go to the map',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'player number 1',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'more data base',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'here the data base',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'so many data base',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'it still not over',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'so many',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'HEGANO CVAR',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'tamir@gmail.com',
        title: 'Ko',
        body: 'I the first mail',
        isRead: false,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'HBS',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'EIMPERIA',
        body: 'I another mail',
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['inbox']
    },
]