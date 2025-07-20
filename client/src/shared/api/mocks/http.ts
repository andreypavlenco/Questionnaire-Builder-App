import { CONFIG } from "../../model/config";
import { createOpenApiHttp } from "openapi-msw";
import type { ApiPaths } from "../schema";

export const http = createOpenApiHttp<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL,
});