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

  onClickedIsSearch = () => {
    const {inputValue} = this.state
    if (inputValue) {
      this.setState({isSearch: true, inputValue: ''})
    }
  }

  onChangeInpForSearchRoute = () => {
    this.setState({isSearch: false})
  }

  render() {
    const {inputValue, isSearch} = this.state
    return (
      <div>
        <Header
          inputValue={inputValue}
          onChangeInputValue={this.onChangeInputValue}
          onClickedIsSearch={this.onClickedIsSearch}
        />
        {isSearch ? (
          <Searchable
            inputValue={inputValue}
            onChangeInpForSearchRoute={this.onChangeInpForSearchRoute}
          />
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
