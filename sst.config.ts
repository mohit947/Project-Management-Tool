import type { SSTConfig } from "sst";
import { ApiGatewayV1Api } from "sst/constructs";

export default {
  config() {
    return {
      name: "project-management-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(({ stack }) => {
      // Create an API Gateway API
      const api = new ApiGatewayV1Api(stack, "Api", {
        routes: {
          "GET /": "functions/lambda.handler",
        },
      });

      // Output the API endpoint
      stack.addOutputs({
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;
