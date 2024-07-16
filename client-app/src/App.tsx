import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    axios.get('https://localhost:7266/api/activities/fdb5ddfd-8836-453d-3889-08dca0cd6879').then(response => {
      console.log(response);

      setActivities(Array.isArray(response.data) ? response.data : [response.data]);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities'/>
        <List>
          {activities.map((activity: any) => (
            <List.Item key = {activity.id}>
              {activity.title}
            </List.Item>
          )
          )}
        </List>
    </div>
  );
}

export default App;
