import { emailService } from "../services/email.service.js"
import { CtgPreview } from "./ctg-preview.jsx"

export function MailCtgs({ toggleNav }) {
    const ctgs = emailService.getCtgs()
    return ctgs.map((ctg, idx) => <div className="ctg" onClick={() => toggleNav(ctg)}>
        {ctg}
    </div >)
}