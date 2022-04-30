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
    filterMailsByIsRead,
    getNavAtCtgs,
    before,
    markAsRead,
    readUnreadMails
}

const MAILKEY = 'mailDB'

function query(filterBy, sortBy) {
    let mails = storageService.loadFromStorage(MAILKEY)
    if (!mails || mails.length === 0) {
        mails = mailData.query()
        storageService.saveToStorage(MAILKEY, mails)
    }

    mails = mails.filter(mail => {
        return (
            mail.title.toLowerCase().includes(filterBy.search.toLowerCase()) &&
            mail.ctgs.some(ctg => ctg.includes(filterBy.ctgs))
        )
    })

    mails.sort((a, b) => {
        if (sortBy === 'title') {
            if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1
            else if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1
            return 0
        }
        if (a[sortBy] < b[sortBy]) return 1
        else if (a[sortBy] > b[sortBy]) return -1
        return 0

    })

    return Promise.resolve(mails)
}

function getMailById(mailId) {
    let mails = storageService.loadFromStorage(MAILKEY)
    const mail = mails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
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
    return Promise.resolve(unreadMails.length)
}


function sendMail(mail, title, body) {
    const newMail = {
        id: utilService.makeId(),
        mail,
        title,
        body,
        isRead: true,
        sentAt: +new Date(),
        ctgs: ['sent']
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
}

function readUnreadMails(selectIds) {
    let mails = storageService.loadFromStorage(MAILKEY)
    selectIds.map(id => {
        const mailIdx = mails.findIndex(mail => {
            return mail.id === id
        })
        mails[mailIdx].isRead = !mails[mailIdx].isRead
    })
    storageService.saveToStorage(MAILKEY, mails)
}

function filterMailsByIsRead(mails, isRead) {
    return mails.filter(mail => mail.isRead === isRead)
}

function getNavAtCtgs(ctgs, nav) {
    if (!ctgs.includes(nav)) ctgs[0] = nav
    return Promise.resolve(ctgs)
}

function before(sentAt) {
    const time = +new Date() - sentAt
    if (time < 1000 * 60) return 'Now'
    else if (time < 1000 * 60 * 60) return `${Math.round(time / (1000 * 60))} minutes`
    else if (time < 1000 * 60 * 60 * 24) return `${Math.round(time / (1000 * 60 * 60))} hours`

    const date = new Date(sentAt)
    return `${date.getDate()} /${date.getMonth() + 1}/${date.getYear()}`
}

function markAsRead(mailId) {
    let mails = storageService.loadFromStorage(MAILKEY)
    const mailIdx = mails.findIndex(mail => mailId === mail.id)
    mails[mailIdx].isRead = true
    storageService.saveToStorage(MAILKEY, mails)
}