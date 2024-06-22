

import React from 'react'

export default function PopupDelete({deletecustomer,refmodal}) {
  return (
   



<div
className="modal fade"
id="exampleModal"
tabIndex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div className="modal-dialog">
    <div className="modal-content rounded-corners">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
                {" "}
                {"Êtes-vous sûr de vouloir supprimer cet agent ?"}
            </h5>

        </div>
        <div className="modal-body color-text-modal">{"Cette action est irréversible."}</div>
        <div className="modal-footer">
            <button
                type="button"
                ref={refmodal}
                className="btn btn-secondary p-2"
                data-dismiss="modal"
            >
                {"Annuler"}
            </button>
            <button
                type="button"
                className="btn btn-success-roundesk p-2"
                onClick={() => deletecustomer()}
            >
                {"Supprimer"}
            </button>
        </div>
    </div>
</div>
</div>
  )
}