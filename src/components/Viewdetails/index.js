import {Component} from 'react'
import './index.css'

class Viewdetails extends Component {
  state = {movieData: {}, castData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const API_KEY = 'f6a522bcadcce7e0d970837819f15cd9'
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response1 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
    )
    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
    )
    const movieDetailsData = await response1.json()
    const castDetailsData = await response2.json()
    const updatedMoviedata = {
      name: movieDetailsData.title,
      image: movieDetailsData.poster_path,
      ratings: movieDetailsData.vote_average,
      duration: Math.round(movieDetailsData.runtime / 60),
      genres: movieDetailsData.genres,
      releaseDate: movieDetailsData.release_date,
      overview: movieDetailsData.overview,
    }
    const castData = castDetailsData.cast.map(each => ({
      id: each.id,
      image: each.profile_path,
      name: each.original_name,
      cName: each.character,
    }))

    this.setState({movieData: updatedMoviedata, castData})
  }

  render() {
    const {movieData, castData} = this.state

    return (
      <div className="viewDetails">
        <div className="movieData">
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.image}`}
            alt="poster"
            className="viewDetails-image"
          />
          <div>
            <h1 className="viewDetails-movie-title">{movieData.name}</h1>
            <ul className="genre">
              <h1 className="genre-heading">Genre: </h1>
              {movieData.genres !== undefined &&
                movieData.genres.map(each => (
                  <li key={each.id}>{each.name},</li>
                ))}
            </ul>
            <div className="date-container">
              <p>
                <span className="genre-heading">Release Date: </span>{' '}
                {movieData.releaseDate}
              </p>
              <p className="duration">
                <span className="genre-heading">Rating: </span>
                {movieData.ratings}/10{' '}
                <span className="genre-heading">Duration: </span>
                {movieData.duration} hrs
              </p>
            </div>
            <p className="overview">
              <span className="genre-heading">Overview: </span>
              {movieData.overview}
            </p>
          </div>
        </div>
        <div className="castContainer">
          <h1 className="cast-heading">Cast:</h1>
          <ul className="cast-container">
            {castData.map(each => (
              <li key={each.id} className="castItem">
                <img
                  src={`https://image.tmdb.org/t/p/original${each.image}`}
                  alt="not found"
                  className="cast-image"
                />
                <p className="cast-name">Name: {each.name}</p>
                <p className="cast-name">As: {each.cName}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Viewdetails
