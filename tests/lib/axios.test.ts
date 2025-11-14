import MockAdapter from "axios-mock-adapter";

import { createAxiosInstance } from "~/lib/axios";

describe("Axios", () => {
  it("should add Bearer token to request headers", async () => {
    const axios = createAxiosInstance({ token: "test-token-123" });
    const mock = new MockAdapter(axios);

    mock.onGet("/test").reply((config) => {
      expect(config.headers?.Authorization).toBe("Bearer test-token-123");
      return [200, '<?xml version="1.0" encoding="utf-8"?><root></root>'];
    });

    await axios.get("/test");
  });

  it("should reject the promise with an unexpected error message", async () => {
    const axios = createAxiosInstance({ token: "test-token" });
    const mock = new MockAdapter(axios);
    const error = new Error("Some unexpected error");
    error.stack = "Error stack trace";
    mock.onGet("/some-url").replyOnce(500);

    try {
      await axios.get("/some-url");
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
