import axios from 'axios';

import {
  FETCH_JOBS,
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from './types';
import REACT_APP_YELP_API_KEY from '../config_keys';

const YELP_API_KEY = REACT_APP_YELP_API_KEY;
export const fetchJobs = (region, callback) => async (dispatch) => {
  try{
    let { data } = await axios.get(`https://api.yelp.com/v3/businesses/search?`,{
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
      params: {
        limit: 2,
        categories: 'coffee,coffeeroasteries,coffeeshops',
        latitude: region.latitude,
        longitude: region.longitude,
      }
    });
    dispatch ({ type: FETCH_JOBS, payload: data });
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
