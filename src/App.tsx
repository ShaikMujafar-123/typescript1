import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Registration from "./pages/auth/Registration";
import Login from "./pages/auth/Login";
import BookHistory from "./pages/bookHistory/BookHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/book_historyroom/:id" element={<BookHistory/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;