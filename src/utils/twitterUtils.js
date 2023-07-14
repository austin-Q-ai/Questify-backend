import axios from "axios";
import base64 from "base-64";
import UserModel from "../modules/User/model";

export const twitterAuthorizationToken = (() => {
  const token = `${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_KEY_SECRET}`;
  const encodedToken = base64.encode(token);
  console.log(encodedToken);
  return "Basic " + encodedToken;
})();

export const getTwitterAccessToken = async (userId, code, redirect_uri) => {
  let params = {
    client_id: process.env.TWITTER_CLIENT_ID,
    grant_type: "authorization_code",
    code,
    code_verifier: "challenge",
    redirect_uri,
  };

  console.log({
    username: process.env.TWITTER_CLIENT_ID,
    password: process.env.TWITTER_CLIENT_SECRET,
  });

  const paramString = new URLSearchParams(params);
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const { data } = await axios.post(
    "https://api.twitter.com/2/oauth2/token",
    paramString,
    {
      headers,
      auth: {
        username: process.env.TWITTER_CLIENT_ID,
        password: process.env.TWITTER_CLIENT_SECRET,
      },
    }
  );
  await UserModel.updateOne(
    {
      _id: userId,
    },
    {
      "externalLinks.twitter": {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      },
    }
  );
  return data.access_token;
};

export const revokeTwitter = async (accessToken) => {
  let params = {
    token: accessToken,
    client_id: process.env.TWITTER_API_KEY,
  };
  const paramString = new URLSearchParams(params);
  const { data: response } = await axios.post(
    "https://api.twitter.com/2/oauth2/revoke",
    paramString,
    {
      Authorization: twitterAuthorizationToken,
      "Content-Type": "application/x-www-form-urlencoded",
    }
  );
  return response;
};
