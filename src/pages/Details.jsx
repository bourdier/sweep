import { useSelector } from "react-redux";
import Upperbar from "../components/Upperbar";

export default function Details() {
  const movieDetails = useSelector((state) => state.movieDetails);

  if (movieDetails.title === null) {
    window.history.back();
  }

  function sliceVote(vote) {
    let voteString = vote.toString();
    return voteString.slice(0, 3);
  }

  function sliceDate(date) {
    return date.slice(0, 4);
  }

  function formatTime(time) {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return hours + "h" + minutes;
  }

  return (
    <>
      <Upperbar title={movieDetails.title} button="true" />
      <div className="details">
        {movieDetails.backdrop_path && (
          <div className="details__poster">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
              alt="poster"
            />
          </div>
        )}
        <div className="details__infos">
          <div className="details__infos__header">
            <div>
              <h1>{movieDetails.title}</h1>
              <h2>{movieDetails.tagline}</h2>
            </div>
            <div className="details__infos__header__row">
              <span>
                <i className="fa-regular fa-calendar"></i>
                {movieDetails.release_date === 0
                  ? "N/A"
                  : sliceDate(movieDetails.release_date)}
              </span>
              <span>
                <i className="fa-regular fa-fw fa-clock"></i>
                {movieDetails.runtime === 0
                  ? "N/A"
                  : formatTime(movieDetails.runtime)}
              </span>
              {movieDetails.vote_average && (
                <span>
                  {movieDetails.vote_average >= 5 ? (
                    <i className="fa-solid fa-fw fa-face-smile"></i>
                  ) : (
                    <i className="fa-solid fa-fw fa-face-sad-tear"></i>
                  )}
                  {sliceVote(movieDetails.vote_average)}/10
                </span>
              )}
            </div>
            <div className="details__infos__overview">
              <h3>Overview</h3>
              <p>{movieDetails.overview ? movieDetails.overview : "N/A"}</p>
            </div>
            {movieDetails.genres && (
              <div className="details__infos__genres">
                <h3>Genres</h3>
                <ul>
                  {movieDetails.genres.slice(0, 3).map((genre, index) => (
                    <li key={index}>{genre}</li>
                  ))}
                </ul>
              </div>
            )}
            {movieDetails.credits && (
              <div className="details__infos__credits">
                <h3>Cast</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        {movieDetails.credits
                          .slice(0, 5)
                          .map((actor, index) => (
                            <span key={index}>{actor}</span>
                          ))}
                      </td>
                      <td>
                        {movieDetails.credits
                          .slice(5, 10)
                          .map((actor, index) => (
                            <span key={index}>{actor}</span>
                          ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {movieDetails.credits && (
              <div className="details__infos__details">
                <h3>Details</h3>
                <div className="details__infos__details__box">
                  <table>
                    <tbody>
                      <tr>
                        <td className="title">Production</td>
                        <td>
                          {movieDetails.production_companies ? (
                            movieDetails.production_companies.map((company, index) => (
                              <span key={index}>{company}</span>
                            ))
                          ) : (
                            <span>N/A</span>
                          )}
                        </td>
                      </tr>
                      {movieDetails.budget > 0 ? (
                        <tr>
                          <td className="title">Budget</td>
                          <td>{movieDetails.budget}$</td>
                        </tr>
                      ) : (
                        ""
                      )}
                      {movieDetails.revenue > 0 ? (
                        <tr>
                          <td className="title">Revenue</td>
                          <td>{movieDetails.revenue}$</td>
                        </tr>
                      ) : (
                        ""
                      )}
                    </tbody>
                  </table>
                </div>
                <div></div>
              </div>
            )}
          </div>
        </div>
        {movieDetails.poster_path && (
          <div className="details__bg">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt="bg"
            />
          </div>
        )}
      </div>
    </>
  );
}
