import React, {useState, useEffect} from 'react'
import PlantCard from './PlantCard'
import axios from 'axios';

function ListCards({
    handleAddPlant
}) {
    const [selectedValue, setSelectedValue] = useState('');
    const [plantsData, setPlantsData] = useState([]);


    const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedValue(selectedOption);
  };

  useEffect(() => {
    axios.get('http://localhost:4000/api/plants')
      .then(response => {
        setPlantsData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  
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
        
        {plantsData.map((plant) => (
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