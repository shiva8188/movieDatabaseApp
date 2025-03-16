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
    console.log(movieData)
    return (
      <div className="viewDetails">
        <div className="movieData">
          <img src={movieData.image} alt="poster" width="10%" />
          <h1>{movieData.name}</h1>
          <ul className="genre">
            Genre:{' '}
            {movieData.genres !== undefined &&
              movieData.genres.map(each => <li key={each.id}>{each.name},</li>)}
          </ul>
          <div className="date-container">
            <p>Release Date: {movieData.releaseDate}</p>
            <p className="duration">
              Rating: {movieData.ratings} Duration:{movieData.duration}
            </p>
          </div>
          <p>Overview: {movieData.overview}</p>
        </div>
        <div className="castContainer">
          <h1>Cast:</h1>
          <ul className="cast">
            {castData.map(each => (
              <li key={each.id} className="castItem">
                <img src={each.image} alt={each.poster_path} width="20%" />
                <p>Name: {each.name}</p>
                <p>As: {each.cName}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Viewdetails
