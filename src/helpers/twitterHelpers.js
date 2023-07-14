import axios from "axios";
import base64 from "base-64";
import { TwitterApi } from "twitter-api-v2";
import UserModel from "../modules/User/model";

export const twitterAuthorizationToken = (() => {
  const token = `${process.env.TWITTER_API_KEY}:${process.env.TWITTER_API_KEY_SECRET}`;
  const encodedToken = base64.encode(token);
  return "Basic " + encodedToken;
})();

export const getTwitterApi = () => {
  const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
  const twitterApi = twitterClient.readOnly;
  return twitterApi;
};

export const getTwitterAccessToken = async (userId, code, redirect_uri) => {
  let params = {
    client_id: process.env.TWITTER_API_KEY,
    grant_type: "authorization_code",
    code,
    code_verifier: "challenge",
    redirect_uri,
  };
  const paramString = new URLSearchParams(params);
  let headers = {
    Authorization: twitterAuthorizationToken,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const { data } = await axios.post(
    "https://api.twitter.com/2/oauth2/token",
    paramString,
    {
      headers,
    }
  );
  await UserModel.updateOne(
    { _id: userId },
    {
      "externalLinks.twitter": {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      },
    }
  );
  return data.access_token;
};

export const checkIfFollowingTwitterAccount = async (
  userHandle,
  accountHandle
) => {
  const twitterApi = getTwitterApi();
  try {
    const {
      relationship: {
        source: { following },
      },
    } = await twitterApi.v1.friendship({
      source_screen_name: userHandle,
      target_screen_name: accountHandle,
    });
    return following;
  } catch (err) {
    return false;
  }
};
