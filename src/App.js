import "./App.css";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddEmployeeComponent from "./components/AddEmployeeComponent";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route exact path="/" component={ListEmployeeComponent} />
            <Route path="/employees" component={ListEmployeeComponent} />
            <Route path="/add-employee/:id" component={AddEmployeeComponent} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
