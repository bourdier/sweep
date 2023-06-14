import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Friend from "../components/Friend";
import Upperbar from "../components/Upperbar";
import { addFriend } from "../redux/friend/action";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.usersData.token);
  // const friendSelector = useSelector((state) => state.friendsData.friend);
  const [modalState, setModalState] = useState(false);
  const [friendsUsername, setFriendsUsername] = useState("");
  const [friendButton, setFriendButton] = useState(true);

  let friend = 1;

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const openModal = () => {
    setModalState(true);
    setFriendButton(false);
  };

  const closeModal = () => {
    setModalState(false);
    setFriendButton(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addFriend(friendsUsername, token))
    closeModal(); // Temporary solution for testing purposes
  };

  return (
    <>
      <Upperbar title="Duo" />
      <div className="duo">
        <div className="float__bottom">
          {friendButton && (
            <button className="wide" onClick={() => openModal()}>
              Add friends
            </button>
          )}
        </div>

        <div className="duo__content">
          {friend ? ( // Temporary solution for testing purposes
            <>
              <h2>{friend > 1 ? 'Friends' : 'Friend'} list</h2>
              <Friend
                image="../images/avatar/1.jpg"
                name="tester"
                delete={() => console.log("delete")}
                invite={() => console.log("invite")}
              />
            </>
          ) : (
            <h2>Add friends to start swiping!</h2>
          )}
          {modalState && (
            <div className="modal">
              <div className="modal__header">
                <h2>Add friends</h2>
                <button className="close no" onClick={() => closeModal()}>
                  <i className="fa-solid fa-fw fa-times"></i>
                </button>
              </div>
              <form className="modal__body" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="@user"
                  onChange={(e) => setFriendsUsername(e.target.value)}
                  required
                />
                <button className="wide">Add</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
