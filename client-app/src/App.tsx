import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

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
  const [activity, setActivity] = useState<Activity | null>(null);

  useEffect(() => {
    axios.get('https://localhost:7266/api/activities/fdb5ddfd-8836-453d-3889-08dca0cd6879').then(response => {
      console.log(response);
      setActivity(response.data);
    })
  }, [])

  return (
    <div>
      {activity && (
        <div>
          <Header as='h2' icon='users' content='Reactivities'/>
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
