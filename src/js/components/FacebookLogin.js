import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from "axios";

/**
 * Used to pre-emptively fetch a large version of the user's
 * profile picture.
 */
const fetchPhoto = (data, callback) => {
  // User closed the screen
  if (!data || !data.id) {
    return callback(null);
  }

  axios.get(`https://graph.facebook.com/${data.id}/picture?redirect=false&width=300`)
    .then((res) => {
      callback(null, {
        ...data,
        picture: res.data.data,
      });
    })
    .catch((err) => {
      callback(err);
    });
};

export default function FacebookLoginButton(props) {
  return (
    <FacebookLogin
      appId="206127820131428"
      fields="first_name,gender,name,email,picture"
      scope="email"
      callback={(data) => fetchPhoto(data, props.onLogin)}
      onClick={props.onLoginStart}
      tag="p"
      textButton={props.text}
      cssClass="facebook-login-button"
    />
  );
}
