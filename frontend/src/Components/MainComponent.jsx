import {Routes, Route, Router} from 'react-router-dom';
import Home from '../Pages/Home';
import Blouses from '../Pages/Blouses';
import Design from '../Pages/Design';
import Laces from '../Pages/Laces';

const MainComponent = () => {
  return (
    <Routes>
      {/* Define your routes here */}
      <Route path="/" element={<Home />} />
      <Route path="/designs" element={<Design />} />
      <Route path="/blouses" element={<Blouses />} />
      <Route path="/laces" element={<Laces />} />
      {/* <Route path="/customise" element={<Customise />} /> */}
      {/* <Route path="/profile" element={<Profile />} /> */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default MainComponent;
        