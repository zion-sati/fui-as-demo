export * from "../fui/FuiExports";
export * from "../host/generated/HostEvents";

import { createManagedApplication } from "../fui/Fui";
import { ImmediateDrawingController } from "./immediate-drawing/ImmediateDrawingController";

const app = createManagedApplication<ImmediateDrawingController>(
  () => new ImmediateDrawingController(),
);
app.useSystemTheme();

export function __runApp(): void {
  app.run();
}

export function __disposeApp(): void {
  app.dispose();
}
