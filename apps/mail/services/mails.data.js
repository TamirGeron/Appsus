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
        title: 'First mail',
        body: 'I the first mail',
        isRead: false,
        sentAt: new Date(),
        ctgs: ['inbox']
    },
    {
        id: utilService.makeId(),
        mail: 'shlomo@gmail.com',
        title: 'First sent mail',
        body: 'I the first sent mail',
        isRead: true,
        sentAt: new Date(),
        ctgs: ['sent']
    },
    {
        id: utilService.makeId(),
        mail: 'Joni@gmail.com',
        title: 'another',
        body: 'I another mail',
        isRead: true,
        sentAt: new Date(),
        ctgs: ['inbox']
    }
]