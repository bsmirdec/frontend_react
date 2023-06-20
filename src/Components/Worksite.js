import React from "react";


const Worksite = (props) => {
    const {worksite} = props
    if (!worksite || worksite.length === 0) return <p>Aucun chantier sélectionné</p>
    return (
        <div>
            <h3>{worksite.city} - {worksite.name}</h3>
        </div>
    )
}

export default Worksite