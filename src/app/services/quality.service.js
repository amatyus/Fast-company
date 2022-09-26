import httpService from "./htpp.service";

const qualityEndpoint = "quality/";

const qualityService = {
  update: async (id, content) => {
    const { data } = await httpService.put(qualityEndpoint + id, content);
    return data;
  },
  get: async (id) => {
    const { data } = await httpService.get(qualityEndpoint + id);
    console.log(data);
    return data;
  },
  fethAll: async () => {
    const { data } = await httpService.get(qualityEndpoint);
    return data;
  }
};

export default qualityService;
