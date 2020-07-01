import React from "react";
import Context from "../context/Context";

const Profile = () => {
  return (
    <Context.Consumer>
      {(context) =>
        !context.loadingUser ? (
          context.authenticated ? (
            <div>
              <img src={context.credentials.imageUrl} alt="profile" />
            </div>
          ) : (
            <div>not authenticated</div>
          )
        ) : (
          <div>loading</div>
        )
      }
    </Context.Consumer>
  );
};

export default Profile;
