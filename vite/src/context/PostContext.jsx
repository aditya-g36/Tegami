import { createContext, useState, useEffect, useContext } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";

const PostContext = createContext();

export default PostContext;

export const PostProvider = ({ children }) => {
  let [Posts, setPosts] = useState([]);
  let { user } = useContext(AuthContext);
  let [User, setUser] = useState([]);
  let [UserFollowing, setUserFollowing] = useState([]);

  let api = useAxios();

  useEffect(() => {
    getPosts();
    getUser();
    getUserFollowing();
  }, []);

  let getPosts = async () => {
    let formdata = new FormData();
    formdata.set("user_id", user.user_id);

    const response = await api.post("/api/posts/", formdata, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      setPosts(response.data);
    }
  };

  let getUser = async () => {
    let response = await api.get("/api/profile/");

    if (response.status === 200) {
      response.data.map((itr) => itr.id == user.user_id && setUser(itr));
    }
  };

  let getUserFollowing = async () => {
    let response = await api.get("/api/following/");

    if (response.status === 200) {
      setUserFollowing(response.data);
    }
  };

  let contextData = {
    Posts: Posts,
    User: User,
    UserFollowing: UserFollowing,
  };
  return (
    <PostContext.Provider value={contextData}>{children}</PostContext.Provider>
  );
};
