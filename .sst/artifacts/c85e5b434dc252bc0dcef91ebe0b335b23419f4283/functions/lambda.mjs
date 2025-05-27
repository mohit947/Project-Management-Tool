import { createRequire as topLevelCreateRequire } from 'module';
const require = topLevelCreateRequire(import.meta.url);
import { fileURLToPath as topLevelFileUrlToPath, URL as topLevelURL } from "url"
const __dirname = topLevelFileUrlToPath(new topLevelURL(".", import.meta.url))

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// functions/lambda.ts
var handler = /* @__PURE__ */ __name(async (event) => {
  console.log("Event received:", JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Lambda function executed successfully"
    })
  };
}, "handler");
export {
  handler
};
//# sourceMappingURL=lambda.mjs.map
