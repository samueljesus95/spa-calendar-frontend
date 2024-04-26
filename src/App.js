import './App.css';
import { useState } from 'react';
import Calendar from './components/Calendar/Calendar';
import AssignmentList from './components/AssignmentList/AssignmentList';
import AssignmentForm from './components/AssignmentForm/AssignmentForm';

function App() {
  const [refresh, setRefresh] = useState(false);
  const handleAssignmentAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div className='App'>
      {/* <AssignmentList key={refresh} /> */}
      <AssignmentForm onAssignmentAdded={handleAssignmentAdded} />
      <Calendar key={refresh} />
    </div>
  );
}

export default App;
