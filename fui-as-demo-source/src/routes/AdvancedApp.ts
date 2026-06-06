export * from "../fui/FuiExports";
export * from "../host/generated/HostEvents";

import { createManagedApplication } from "../fui/Fui";
import { AdvancedController } from "./advanced/AdvancedController";

const app = createManagedApplication<AdvancedController>(() => new AdvancedController());
app.useSystemTheme();

export function __runApp(): void {
  app.run();
}

export function __disposeApp(): void {
  app.dispose();
}
