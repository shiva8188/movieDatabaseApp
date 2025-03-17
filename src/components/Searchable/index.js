import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Searchable extends Component {
  state = {movies: [], pageNumber: 1}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {pageNumber} = this.state
    const API_KEY = 'f6a522bcadcce7e0d970837819f15cd9'
    const {inputValue} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=${pageNumber}`,
    )
    const data = await response.json()
    const updated = data.results.map(each => ({
      id: each.id,
      posterPath: each.poster_path,
      title: each.title,
      voteAverage: each.vote_average,
    }))
    this.setState({movies: updated})
  }

  onClickView = () => {
    const {onChangeInpForSearchRoute} = this.props
    onChangeInpForSearchRoute()
  }

  onClickIncrease = () => {
    this.setState(prev => ({pageNumber: prev.pageNumber + 1}), this.getData)
  }

  onClickDecrease = () => {
    const {pageNumber} = this.state
    if (pageNumber > 1) {
      this.setState(prev => ({pageNumber: prev.pageNumber - 1}), this.getData)
    }
  }

  render() {
    const {movies, pageNumber} = this.state

    return (
      <div className="movies-container">
        <ul className="details">
          {movies.map(each => (
            <li className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500${each.posterPath}`}
                alt="Not found"
                width="50%"
                className="image"
              />
              <h1 className="title">{each.title}</h1>
              <p className="rating">‪‪❤︎‬ {each.voteAverage}/10 Rating</p>
              <Link to={`/movie/${each.id}`}>
                <button
                  type="button"
                  className="viewButton"
                  onClick={this.onClickView}
                >
                  View Details
                </button>
              </Link>
            </li>
          ))}
        </ul>
        <div className="page-button-container">
          <button
            type="button"
            className="page-button"
            onClick={this.onClickDecrease}
          >
            Prev
          </button>
          <p className="pageNumber">{pageNumber}</p>
          <button
            type="button"
            className="page-button"
            onClick={this.onClickIncrease}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}
export default Searchable
