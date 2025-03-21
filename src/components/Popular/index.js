import {Component} from 'react'
import {Link} from 'react-router-dom'

import './index.css'

class Popular extends Component {
  state = {movies: [], pageNumber: 1}

  componentDidMount() {
    this.getData()
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

  getData = async () => {
    const {pageNumber} = this.state
    const API_KEY = 'f6a522bcadcce7e0d970837819f15cd9'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`,
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
                className="image"
              />
              <h1 className="title">{each.title}</h1>
              <p className="rating">‪‪❤︎‬ {each.voteAverage}/10 Rating</p>
              <Link to={`/movie/${each.id}`}>
                <button type="button" className="viewButton">
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
export default Popular
