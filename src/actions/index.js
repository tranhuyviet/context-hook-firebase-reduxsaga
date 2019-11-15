import { IMAGES, STATS } from "../constants";

export const loadImages = () => ({
  type: IMAGES.LOAD
});

export const setImages = images => ({
  type: IMAGES.LOAD_SUCCESS,
  images
});

export const setError = error => ({
  type: IMAGES.LOAD_FAIL,
  error
});

export const loadImageStats = id => ({
  type: STATS.LOAD,
  id
});

export const setImageStats = (id, download) => ({
  type: STATS.LOAD_SUCCESS,
  id,
  download
});

export const setImageStatsError = id => ({
  type: STATS.LOAD_FAIL,
  id
});

// export { loadImages, setImages, setError };
