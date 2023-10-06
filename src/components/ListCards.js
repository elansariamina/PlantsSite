import React, {useState} from 'react'
import PlantCard from './PlantCard'
import { plantList } from './ListPlants';

function ListCards({
    handleAddPlant
}) {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };
  return (
    <div>
        <div className='categoryChoice'>
            <select id="mySelect" name="mySelect" onChange={handleSelectChange}>
                <option  value="all">Choose a category</option>
                <option value="classique">classique</option>
                <option value="extérieur">extérieur</option>
                <option value="plante grasse">plante grasse</option>
            </select>
        </div>
        <div className='list-plants'>
        
        {plantList.map((plant) => (
            <PlantCard
                key={plant.id}
             plant={plant} 
             categorie={selectedValue} 
             handleAddPlant={handleAddPlant}
             />
        ))}
        </div>
    </div>
  )
}

export default ListCards