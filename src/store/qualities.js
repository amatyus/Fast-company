import { createSlice } from "@reduxjs/toolkit";
import qualityService from "../app/services/quality.service";

const qualitiesSlice = createSlice({
  name: "qualities",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true;
    },
    qualitiesReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualitiesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
  actions;

export const loadQualitiesList = () => async (dispatch, getState) => {
  dispatch(qualitiesRequested());
  try {
    const { content } = await qualityService.fetchAll();

    dispatch(qualitiesReceived(content));
  } catch (error) {
    dispatch(qualitiesRequestFailed(error.message));
  }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadind = () => (state) =>
  state.qualities.isLoadingStatus;
export const getQualitiesByIds = (qualitiesIds) => (state) => {
  if (state.qualities.entities) {
    const qualitiesArray = [];
    for (const qualId of qualitiesIds) {
      for (const qiality of state.qualities.entities) {
        if (qiality._id === qualId) {
          qualitiesArray.push(qiality);
        }
      }
    }
    return qualitiesArray;
  }
};

export default qualitiesReducer;
