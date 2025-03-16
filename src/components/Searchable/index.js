import {Component} from 'react'
import {Link} from 'react-router-dom'

class Searchable extends Component {
  state = {movies: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const API_KEY = 'f6a522bcadcce7e0d970837819f15cd9'
    const {inputValue} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${inputValue}&page=1`,
    )
    const data = await response.json()
    this.setState({movies: data.results})
  }

  render() {
    const {movies} = this.state
    console.log(movies)

    return (
      <div>
        <ul className="details">
          {movies.map(each => (
            <li className="movie">
              <img src={each.poster_path} alt={each.poster_path} />
              <h1>{each.title}</h1>
              <p>{each.vote_average}</p>
              <Link to={`/movie/${each.id}`}>
                <button>View Details</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
export default Searchable
