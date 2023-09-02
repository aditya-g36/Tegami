import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import ProfileImageList from "../components/ProfileImageList";
import PostContext from "../context/PostContext";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";

const profile = () => {
  let { user } = useContext(AuthContext);
  let { Posts } = useContext(PostContext);
  let { User } = useContext(PostContext);
  let { UserFollowing } = useContext(PostContext);
  let following = 0;
  let followers = 0;

  for (let i = 0; i < UserFollowing.length; i++) {
    if (UserFollowing[i].following_user_id === user.user_id) {
      following++;
    }
    if (UserFollowing[i].user_id === user.user_id) {
      followers++;
    }
  }
  return (
    <div className="border-x-2">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard>
            <div
              className=" text-white d-flex flex-row"
              style={{ backgroundColor: "#000", height: "200px" }}
            >
              <div
                className="ms-4 mt-5 d-flex flex-column"
                style={{ width: "150px" }}
              >
                <MDBCardImage
                  src={"http://127.0.0.1:8000" + User.profileimg}
                  alt="Generic placeholder image"
                  className="mt-4 mb-2 img-thumbnail"
                  fluid
                  style={{ width: "150px", zIndex: "1" }}
                />
                <MDBBtn
                  outline
                  color="dark"
                  style={{ height: "36px", overflow: "visible" }}
                >
                  Edit
                </MDBBtn>
              </div>
              <div className="ms-3" style={{ marginTop: "130px" }}>
                <MDBTypography tag="h5">{User.username}</MDBTypography>
                <MDBCardText>New York</MDBCardText>
              </div>
            </div>
            <div
              className="p-4 text-black"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <MDBCardText className="mb-1 h5">253</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Photos
                  </MDBCardText>
                </div>
                <div className="px-3">
                  <MDBCardText className="mb-1 h5">{followers}</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Followers
                  </MDBCardText>
                </div>
                <div>
                  <MDBCardText className="mb-1 h5">{following}</MDBCardText>
                  <MDBCardText className="small text-muted mb-0">
                    Following
                  </MDBCardText>
                </div>
              </div>
              <br />
              <p>{User.bio}</p>
            </div>
            <MDBCardBody className="text-black p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <MDBCardText className="lead fw-normal mb-0">
                  Recent photos
                </MDBCardText>
                <MDBCardText className="mb-0">
                  <a href="#!" className="text-muted">
                    Show all
                  </a>
                </MDBCardText>
              </div>

              {Posts.map((post) => (
                <li key={post.id} style={{ listStyle: "none" }}>
                  {user.user_id == post.user_id && (
                    <ProfileImageList data={post} />
                  )}
                </li>
              ))}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  );
};

export default profile;
