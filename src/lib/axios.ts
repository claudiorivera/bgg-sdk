import axiosBase, { type AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import convert from "xml-js";
import type { BggClientConfig } from "~/index";

export const createAxiosInstance = (config: BggClientConfig): AxiosInstance => {
  const instance = axiosBase.create({
    baseURL: "https://boardgamegeek.com/xmlapi2/",
  });

  axiosRetry(instance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });

  instance.interceptors.request.use((requestConfig) => {
    requestConfig.headers.Authorization = `Bearer ${config.token}`;
    return requestConfig;
  });

  instance.interceptors.response.use(
    (response) => {
      try {
        const jsonData = convert.xml2js(response.data, { compact: true });
        response.data = jsonData;
        return response;
      } catch {
        throw new Error("Failed to parse XML data from BGG");
      }
    },
    (error) => {
      return Promise.reject(`Unexpected error calling BGG API: ${error.stack}`);
    },
  );

  return instance;
};
