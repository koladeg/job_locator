import axios from 'axios';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';

import { CLIENT_ID, CLIENT_SECRET } from '../config_keys';


export const fetchJobs = (region, callback) => async (dispatch) => {
  try{
    let { data } = await axios.get(`https://api.foursquare.com/v2/venues/explore?`,{
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        v: 20190305,
        ll: `${region.latitude}, ${region.longitude}`,
        limit: 1,
        radius: 20000,
        openNow: 1,
        venuePhotos: 1,
        categoryId: '4bf58dd8d48988d196941735',

      }
    });
    let datum = data.response.groups[0].items;
    dispatch ({ type: FETCH_JOBS, payload: datum });
    callback();
  } catch(e) {
    console.error(e);
  }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
