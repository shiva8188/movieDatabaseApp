import {Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Header extends Component {
  state = {inputV: ''}

  onChangeValue = e => {
    this.setState({inputV: e.target.value}, this.onSubmit)
  }

  onSubmit = () => {
    const {inputV} = this.state
    const {onChangeInputValue} = this.props
    onChangeInputValue(inputV)
  }

  render() {
    const {inputV} = this.state

    return (
      <nav className="header">
        <h1 className="heading">movieDB</h1>
        <div className="search-container">
          <input
            type="text"
            value={inputV}
            placeholder="Search"
            onChange={this.onChangeValue}
          />
          <button onClick={this.onSubmit}>Search</button>
        </div>
        <ul className="pages">
          <li>
            <Link to="/">
              <button className="page">Popular</button>
            </Link>
          </li>
          <li>
            <Link to="/top-rated">
              <button className="page">Top Rated</button>
            </Link>
          </li>
          <li>
            <Link to="/upcoming">
              <button className="page">Upcoming</button>
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Header
