export function CtgPreview({ ctg, toggleNav }) {

    return <div className="ctg" onClick={() => toggleNav(ctg)}>
        {ctg}
    </div >
}