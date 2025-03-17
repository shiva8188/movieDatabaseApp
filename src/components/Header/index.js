import {Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onChangeValue = e => {
    const {onChangeInputValue} = props
    onChangeInputValue(e.target.value)
  }

  const onClickSearch = () => {
    const {onClickedIsSearch} = props
    onClickedIsSearch()
  }

  const {inputValue} = props

  return (
    <nav className="header-container">
      <h1 className="heading">movieDB</h1>
      <div className="search-category-container">
        <div className="search-container">
          <input
            type="text"
            value={inputValue}
            placeholder="Search"
            onChange={onChangeValue}
          />
          <button
            type="button"
            className="search-button"
            onClick={onClickSearch}
          >
            Search
          </button>
        </div>
        <ul className="pages">
          <li>
            <Link to="/">
              <button type="button" className="page" value="popular">
                Popular
              </button>
            </Link>
          </li>
          <li>
            <Link to="/top-rated">
              <button type="button" className="page" value="topRated">
                Top Rated
              </button>
            </Link>
          </li>
          <li>
            <Link to="/upcoming">
              <button type="button" className="page">
                Upcoming
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
