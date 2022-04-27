import { storageService } from "../../../services/storage.service.js"
import { mailData } from "./mails.data.js"
import { utilService } from "../../../services/util.service.js"

export const emailService = {
    query,
    getMailById,
    unreadMailCount,
    sendMail,
    getSelectedIds,
    deleteMails,
}

const MAILKEY = 'mailDB'

function query(filterBy) {
    let mails = storageService.loadFromStorage(MAILKEY)
    if (!mails || mails.length === 0) {
        mails = mailData.query()
        storageService.saveToStorage(MAILKEY, mails)
    }
    if (filterBy) {
        mails = mails.filter(mail => {
            return mail.title.toLowerCase().includes(filterBy.toLowerCase())
        })
    }
    return Promise.resolve(mails)
}

function getMailById(mailId) {
    let mails = storageService.loadFromStorage(MAILKEY)
    return mails.find(mail => mailId === mail.id)
}

function unreadMailCount() {
    let mails = storageService.loadFromStorage(MAILKEY)
    if (!mails || mails.length === 0) {
        mails = mailData.query()
        storageService.saveToStorage(MAILKEY, mails)
    }
    const unreadMails = mails.filter(mail => {
        return mail.isRead === false
    })
    return unreadMails.length
}


function sendMail(mail, title, body) {
    const newMail = {
        id: utilService.makeId(),
        mail,
        title,
        body,
        isRead: true,
        sentAt: new Date(),
        ctg: ['sent']
    }
    let mails = storageService.loadFromStorage(MAILKEY)
    mails.push(newMail)
    storageService.saveToStorage(MAILKEY, mails)
    return Promise.resolve(mails)
}

function getSelectedIds(mailId, selectIds) {
    if (!selectIds) return Promise.resolve([mailId])
    let find = selectIds.indexOf(mailId)
    if (find > -1) selectIds.splice(find, 1)
    else selectIds.push(mailId)
    return Promise.resolve(selectIds)
}

function deleteMails(selectIds) {
    let mails = storageService.loadFromStorage(MAILKEY)
    selectIds.map(id => {
        const mailIdx = mails.findIndex(mail => {
            return mail.id === id
        })
        mails.splice(mailIdx, 1)
    })
    storageService.saveToStorage(MAILKEY, mails)
    return Promise.resolve(mails)
}