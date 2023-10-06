import React from 'react'

function SideBar({
    plantSelected,
    viderPanier,
    calculateTotalPrice,
    setDisplaySidebar
}) {
    const total = calculateTotalPrice(plantSelected);
  return (
    <div className='sideBar'>
        <span className='fermer-sidebar' onClick={()=>setDisplaySidebar(false)}>Fermer</span>
        <p>Panier</p>
        <ul>
            {plantSelected.map((plant, index) => (
                <li key={index}>
                {plant.count} {plant.name} {plant.price}$
                </li>
            ))}
        </ul>
        <p>Total: {total} $</p>
        <button className='panier-button' onClick={()=> viderPanier()}>Vider panier</button>
    </div>
  )
}

export default SideBar