import React from 'react'
import '../style/PlantCardStyle.css'
import CareScale from './CareScale'

function PlantCard({
    plant,
    categorie,
    handleAddPlant
}) {
    return (
        (!categorie || categorie === "all" || categorie === plant.category) && (
            <div className='plant-card'>
              <span className='plant-price'>{plant.price}$</span>
              <img src={plant.cover} alt='.' className='plant-image' />
              <div className='plant-name'>{plant.name}</div>
              <CareScale item={plant.water} type="water" />
              <CareScale item={plant.light} type="light" />
              <button value="Ajouter" className='plant-button' onClick={() => handleAddPlant(plant.name, plant.price)}>Ajouter</button>
            </div>
    )
    )
}
export default PlantCard