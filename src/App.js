import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { CarList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  state = {
    monsters: [],
    searchString: '',
  }

  async componentDidMount() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({ monsters: response.data });
  }

  handleChange = (e) => {
    this.setState({ searchString: e.target.value})
  }

  render() {
    const { monsters, searchString } = this.state;

    const filteredMonsters = monsters.filter((monster) => {
      const search = searchString.toLowerCase().trim();
      const name = monster.name.toLowerCase();

      return name.includes(search);
    });

    return (
      <div className="App">
        <h1>Monsters Dashboard</h1>

        <SearchBox
          placeholder="Search monster"
          handleChange={this.handleChange}
        />

        <CarList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
