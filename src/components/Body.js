import React, { useState, useEffect } from 'react'
import '../style/listPlantsStyle.css'
import ListCards from './ListCards'
import SideBar from './SideBar'
import Footer from './Footer';

function Body() {
    const [plantSelected, setPlantSelected] = useState([]);
    const [displaySideBar, setDisplaySidebar] = useState(true);


function handleAddPlant(name, price) {
    const existingName = plantSelected.find((item) => item.name === name);
  
    if (existingName) {
      existingName.count += 1;
      setPlantSelected([...plantSelected]);
    } else {
      setPlantSelected([...plantSelected, { name, price, count: 1 }]);
    }
    localStorage.setItem('plantSelected', JSON.stringify(plantSelected));
  };
  const calculateTotalPrice = (plantSelected)=> {
    const totalPrice = plantSelected.reduce((total, plant) => {
        if(plant.count !== 1){
            return total + ((parseInt(plant.price)) * parseInt(plant.count));
        }else return total + plant.price;
    }, 0); 
    return totalPrice;
  }
  const viderPanier = () =>{
    setPlantSelected([]);
    localStorage.clear();
  }
  useEffect(() => {
    const storedPlantSelected = localStorage.getItem('plantSelected');
    if (storedPlantSelected) {
      setPlantSelected(JSON.parse(storedPlantSelected));
    }
  }, []);
  return (
    <>
    <div className='body'>
        {displaySideBar ? <SideBar 
            plantSelected={plantSelected}
            viderPanier={viderPanier}
            calculateTotalPrice={calculateTotalPrice}
            setDisplaySidebar={setDisplaySidebar}
        /> : <span className='button-show' onClick={()=>setDisplaySidebar(true)}>Show panier</span>}
        <ListCards 
            handleAddPlant={handleAddPlant}
        />
        
    </div>
    <Footer />
    </>
  )
}

export default Body