import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Button, Header, Input, List } from 'semantic-ui-react';
import { error } from 'console';

// pravimo novi interface koji je preslikan onom sa backend-a, kako bi znali 
// kog ce to zapravo biti tipa promenjiva activity
interface Activity {
  id: string;
  title: string;
  date: string; 
  description: string;
  category: string;
  city: string;
  venue: string;
}

function App() {

  // sa useState postavljamo promenjive stanja i funkcije koje ce da hvataju tu promenu
  // kada se neka od njih promeni, to je znak da cela komponenta (App) treba da se rerenderuje
  // ali React to optimizuje pa update-uje samo deo koji se zapravo promenio
  
  const [activity, setActivity] = useState<Activity | null>(null);
  // pravimo promenjivu activity koja moze biti tipa Activity ili null, i inicijalno je postavljamo na null
  // "pravimo" i "kao neku funkciju" koja nam sluzi za setovanje gore pomenute promenjive
  // 
  // sta tacno radi useState = ?, ali ocigledno kada pomocu toga uvedemo promenjive
  // to nam stvara preduslove da se posle pri menjanu stanja (vrednosti) te promenjive
  // rerenderuje samo taj deo gde se ona zapravo koristi => ne mora cela f-ja npr. ne mora
  // ceo app.tsx da se rerenderuje ako promenimo vrednost activity promenjive
  // ##### Ne znam koji bi bio bolji opis za useState, pa sam ostavio oba (jedan iznad useState i jedan ispod) :)

  const [inputValue, setInputValue] = useState<string>('');

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    
    const url = 'https://localhost:7266/api/activities/' + inputValue;

    axios.get(url)
      .then(response => {
        console.log(response);
        setActivity(response.data);
        setError(null);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error);
          setError(`Error: ${error.response.status}. ${error.message}`);
          // !!!!!!!!! Gore NISU OBICNI NAVODNICI!!! (treba ono pored broja 1 na tastaturi) Nece raditi sa obicnim navodnicima!
        } else if (error.request) {
          // The request was made but no response was recieved
          setError('Error: No response received')
        } else {
          // Something happened in setting up the request that triggered an Error
          setError('Error: ${error.message}');
        }
        setActivity(null); // Reset activity state
      });
  }

  // sledece je ostavljeno jer sam komentarisao pre dodavanja input field-a i button-a

  // u useEffect je zapravo ono sto ce da se promeni kada se komponenta rerenderuje

  // useEffect(() => {
  //   axios.get('https://localhost:7266/api/activities/fdb5ddfd-8836-453d-3889-08dca0cd6879').then(response => {
  //     console.log(response);
  //     setActivity(response.data);
  //   })
  // }, [])

  // sa axios.get gadjamo backend i u njemu odredjeni endpoint. Axios nam vraca "promise" (sta god to bilo, ali
  // to nam omogucava da mozemo da vezujemo komande jednu za drugom => .then)
  // dalje, dobijamo neki response, koji prvo logujemo u konzolu, a zatim u activity promenjivu
  // postavljamo vrednost koja se nalazi u response.data
  // na kraju, moramo da stavimo prazan niz => od cega nam zavisi da li ce se ovo sve pozvati? ni od cega
  // ali hocemo da se pozove jednom na pocetku i to se radi tako sto se prosledi prazan niz kao argument od useEffect


  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
      <Input
        placeholder='Enter Activity Id'
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button primary onClick={handleSubmit}>Submit</Button>
      {error && <p>{error}</p>}
      {activity && ( // prikazuje se samo ako activity nije null, jer samo tada mozemo da koristimo activity.id, title itd.
        <div>
          <Header as='h3' content='Desired activity'/>
            <List>
              <List.Item key = {activity.id}>
                {activity.title}
              </List.Item>
            </List>
        </div>
      )}
    </div>
  );
}

export default App;
