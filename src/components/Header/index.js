import {Link} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Header extends Component {
  state = {inputV: ''}

  onChangeValue = e => {
    const {onChangeInputValue} = this.props
    onChangeInputValue(e.target.value)
  }

  onClickSearch = () => {
    const {onClickedIsSearch} = this.props
    onClickedIsSearch()
  }

  render() {
    const {inputValue} = this.props

    return (
      <nav className="header-container">
        <h1 className="heading">movieDB</h1>
        <div className="search-category-container">
          <div className="search-container">
            <input
              type="text"
              value={inputValue}
              placeholder="Search"
              onChange={this.onChangeValue}
            />
            <button
              type="button"
              className="search-button"
              onClick={this.onClickSearch}
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
