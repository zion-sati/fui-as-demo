import { currentRoute } from "./fui/Fui";
import { routeManifest } from "./route-config";
import { resolveRoutePath } from "@effindomv2/fui-as/browser/routed-app-conventions";

export function homeRoute(): string {
  return resolveRoutePath(routeManifest, "home", currentRoute.value);
}

export function textFontsRoute(): string {
  return resolveRoutePath(routeManifest, "text-fonts", currentRoute.value);
}

export function advancedRoute(): string {
  return resolveRoutePath(routeManifest, "advanced", currentRoute.value);
}
