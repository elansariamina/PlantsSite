import React from 'react';
import '../style/CommandFormStyle.css';

function CommandForm({
    plantSelected,
    calculateTotalPrice
}) {
    const total = calculateTotalPrice(plantSelected);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const clientData = {
            name: event.target.elements.name.value,
            tel: event.target.elements.tel.value,
            email: event.target.elements.email.value,
            address: event.target.elements.address.value,
        };

        try {
            const clientResponse = await fetch('http://localhost:4000/api/clients/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientData),
            });

            if (!clientResponse.ok) {
                console.error('Failed to create client');
                return;
            }

            const client = await clientResponse.json();

            try {
                const plantsResponse = await fetch('http://localhost:4000/api/plants/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!plantsResponse.ok) {
                    console.error('Failed to fetch plants');
                    return;
                }

                const plants = await plantsResponse.json();
                const plantData = plantSelected.map((selectedPlant) => {
                    const plant = plants.find((p) => p.name === selectedPlant.name);
                    if (!plant) {
                        console.error(`Plant not found for ${selectedPlant.name}`);
                        return null;
                    }

                    return {
                        plant,
                        quantity: selectedPlant.count
                    };
                }).filter(Boolean);

                const commandData = {
                    numero: Math.random(),
                    client: client,
                    plants: plantData,
                };

                console.log(commandData);

                const commandResponse = await fetch('http://localhost:4000/api/commands', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(commandData),
                });

                if (commandResponse.ok) {
                    console.log('Client and command created successfully');
                } else {
                    console.error('Failed to create command');
                }
            } catch (error) {
                console.error('Error fetching plants:', error);
            }
        } catch (error) {
            console.error('Error creating client:', error);
        }
    };

    return (
        <div className="command-form">
            <h3 className="command-title">Command Form</h3>
            <form className="" action="/" method="get" onSubmit={handleSubmit}>
                <label htmlFor="name" className="">Name:</label>
                <input type="text" name="name" id="name" autoComplete="given-name" className="" />
                <label htmlFor='tel' className=''>phone:</label>
                <input type="tel" name="tel" id="tel" pattern="[0-9]{1,4}-?[0-9]{1,4}-?[0-9]{1,6}" placeholder="(xxx) xxx-xxxx" required />
                <label htmlFor="email" className="">Email:</label>
                <input type="email" name="email" id="email" autoComplete="username email" className="" />
                <label htmlFor="address" className="">Address:</label>
                <textarea name="address" id="address"></textarea>
                <div>{plantSelected.map((plant) =>
                    <>
                        <p>{plant.name} --- {plant.price} --- {plant.count}</p>

                    </>
                )}
                    <p>----- total: {total}</p>
                </div>
                <button type="submit">Enregistrer</button>
            </form>
        </div>
    );
}

export default CommandForm;
