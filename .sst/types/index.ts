import "sst/node/config";
declare module "sst/node/config" {
  export interface ConfigTypes {
    APP: string;
    STAGE: string;
  }
}

import "sst/node/api";
declare module "sst/node/api" {
  export interface ApiGatewayV1ApiResources {
    "Api": {
      url: string;
    }
  }
}

