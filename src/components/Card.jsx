import propTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMovieDetails } from "../redux/movieDetails/reducer";
import { useNavigate } from "react-router";

export default function Card({ api }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  function openDetails(movie) {
    dispatch(setMovieDetails(movie));
    navigate("/details");
  }

  return api !== undefined ? (
    api.map((movie, index) => (
      <div className="card" key={index} onClick={() => openDetails(movie)}>
        <div className="card__poster">
          <img
            src={
              "https://www.themoviedb.org/t/p/w600_and_h900_bestv2" +
              movie.poster_path
            }
            alt={movie.name}
          />
        </div>
        <div className="card__infos">
          <ul>
            <li className="card__infos title">{movie.title}</li>
            <li>
              {movie.tagline}
            </li>
            <li>
              <i className="fa-solid fa-fw fa-calendar-days"></i>{sliceDate(movie.release_date)}
            </li>
            <li>
              <i className="fa-regular fa-fw fa-clock"></i>{formatTime(movie.runtime)} 
            </li>
          </ul>
        </div>
      </div>
    ))
  ) : (
    <p style={{ fontSize: 28, textAlign: "center", margin: 0 }}>Loading</p>
  );
}

Card.propTypes = {
  api: propTypes.array,
};