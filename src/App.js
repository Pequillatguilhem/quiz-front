import logo from './logo.svg';
import './App.css';
import {Question} from "./question/Question";
import {Quizz} from "./quizz/Quizz";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EditQuizz} from "./quizz/edit/EditQuizz";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path=""
                     element={<Quizz/>}/>
              <Route path="edit"
                     element={<EditQuizz/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
