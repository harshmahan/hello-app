import React from 'react';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Login from './Login';

function App() {

  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="bg-[#dadbd3] h-[100vh] grid place-content-center">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body flex bg-[#ededed] h-[90vh] w-[90vw] shadow-[-1px_4px_20px_-6px_rgba(0,0,0,0.7)] mt-[-50px]">
          <Router>
            <Sidebar/>
            <Routes>
              <Route exact path="/rooms/:roomId" element={<><Chat/></>}/>
              {/* <Route exact path="/" element={<Chat/>}/> */}
            </Routes>
          </Router>
        </div>

      )}
    </div>
  );
}

export default App;
