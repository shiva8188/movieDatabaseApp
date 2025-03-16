import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import Header from './components/Header'
import Popular from './components/Popular'
import Upcoming from './components/Upcoming'
import TopRated from './components/TopRated'
import Viewdetails from './components/Viewdetails'
import Searchable from './components/Searchable'

import './App.css'

class App extends Component {
  state = {inputValue: ''}

  onChangeInputValue = value => {
    this.setState({inputValue: value})
  }

  render() {
    const {inputValue} = this.state
    return (
      <div>
        <Header onChangeInputValue={this.onChangeInputValue} />
        {inputValue ? (
          <Searchable inputValue={inputValue} />
        ) : (
          <Switch>
            <Route exact path="/" component={Popular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/Upcoming" component={Upcoming} />
            <Route exact path="/movie/:id" component={Viewdetails} />
          </Switch>
        )}
      </div>
    )
  }
}

export default App
