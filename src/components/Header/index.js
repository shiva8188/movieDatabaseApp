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
      <nav className="header-container">
        <h1 className="heading">movieDB</h1>
        <div className="search-category-container">
          <div className="search-container">
            <input
              type="text"
              value={inputV}
              placeholder="Search"
              onChange={this.onChangeValue}
            />
            <button
              type="button"
              onClick={this.onSubmit}
              className="search-button"
            >
              Search
            </button>
          </div>
          <ul className="pages">
            <li>
              <Link to="/">
                <button
                  type="button"
                  className="page"
                  onClick={this.onChangeActiveId}
                  value="popular"
                >
                  Popular
                </button>
              </Link>
            </li>
            <li>
              <Link to="/top-rated">
                <button
                  type="button"
                  className="page"
                  onClick={this.onChangeActiveId}
                  value="topRated"
                >
                  Top Rated
                </button>
              </Link>
            </li>
            <li>
              <Link to="/upcoming">
                <button
                  type="button"
                  className="page"
                  onClick={this.onChangeActiveId}
                >
                  Upcoming
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
