import httpService from "./htpp.service";

const qualityEndpoint = "quality/";

const qualityService = {
  fethAll: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return data;
  }
};

export default qualityService;
