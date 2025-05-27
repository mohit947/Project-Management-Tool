import { App } from "sst/constructs";
import { MyStack } from "./stacks/MyStack";

export default function main(app: App): void {
  app.stack(MyStack);
}
