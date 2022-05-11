import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField, Button } from '@mui/material';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

// interface check {
//   isDisable: boolean;
// }


// function App() {

//   const api_key = '6vwBrMDAFYALMHDN4YTrSrthwieCD82dN8TfuvsA';
//   const [isDisable, setDisable] = React.useState(true);
//   const [newValue, setnewValue] = React.useState('');

//   const handleChange = (e: any) => {
//     e.preventDefault();
//     fetch(`https://api.nasa.gov/neo/rest/v1/neo/${newValue}?
//     api_key=${api_key}`)
//       .then((data) => data.json())
//       .then((res) => console.log(res, 'res'))
//       .catch((err) => alert(err))
//   }
//   return (
//     <div style={{ margin: '50px auto', width: '50%' }}>
//       <form onSubmit={handleChange}>
//         <TextField placeholder='' value={newValue} onChange={(e) => setnewValue(e.target.value)} />
//         <div>
//           <Button type='submit' disabled={newValue?.length > 0 ? false : true} variant="contained">submit</Button>
//           <Button >Random Asteroid</Button>
//         </div>
//       </form>

//     </div >
//   );
// }
// export default App;





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeComponent />} />
        <Route path='/details' element={<DetailsComponent />} />
      </Routes>
    </BrowserRouter>

  )
}
export default App;
const HomeComponent = () => {
  const api_key = 'tRE38aGT2nds7cSGkARzhhS8U6hr8cKtz0IcrUTb';
  // const [isDisabled, setDisabled] = React.useState(true);
  const [newValue, setNewValue] = React.useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/${newValue}?api_key=${api_key}`)
      .then((data) => data.json())
      .then((res) => {
        localStorage.setItem("idValue", JSON.stringify(res));
        return window.open('/details')
      })
      .catch((err) => console.log(err))
  }
  const handleRandomID = () => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`)
      .then((data) => data.json())
      .then((res) => {
        let newData = res?.near_earth_objects[Math.floor(Math.random() * 19)];
        localStorage.setItem("idValue", JSON.stringify(newData));
        return window.open('/details')
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="App">
      <div style={{ width: '50%', margin: '50px auto' }}>
        <form onSubmit={handleSubmit}>
          <TextField placeholder="Enter Asteroid ID" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
          <div>
            <Button variant="contained" disabled={newValue?.length > 0 ? false : true} type='submit'>submit</Button>
            <Button onClick={() => handleRandomID()}>random Asteroid</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const DetailsComponent = () => {
  const [values, setValues] = React.useState<any>()
  React.useEffect(() => {
    const data = localStorage.getItem('idValue');
    if (data) {
      setValues(JSON.parse(data));
    }
  }, [])
  return (
    <div className="App">
      <p>{values?.name}</p>
      <p>{values?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      <p>{values?.nasa_jpl_url}</p>
    </div>
  );
}
const DetailsComponentTwo = () => {
  const [values, setValues] = React.useState<any>()
  React.useEffect(() => {
    const newData = localStorage.getItem('idValue');
    if (newData) {
      setValues(JSON.parse(newData));
    }
  }, [])
  return (
    <div className="App">
      <p>{values?.name}</p>
      <p>{values?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
      <p>{values?.nasa_jpl_url}</p>
    </div>
  );
}




