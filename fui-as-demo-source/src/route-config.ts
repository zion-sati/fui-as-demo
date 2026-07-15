import { defineRoutedAppManifest, routeDef, routeHead } from "@effindomv2/fui-as/browser/routed-app-conventions";

export const sourceRouteBase = "";

export const routeManifest = defineRoutedAppManifest(sourceRouteBase, [
  routeDef("home", "Home", routeHead(
    "description", "Home page for the FUI-AS routed demo.",
  )),
  routeDef("text-fonts", "Text \u0026 Fonts", routeHead(
    "description", "Rich text, custom fonts, and control configuration samples.",
  )),
  routeDef("advanced", "Advanced", routeHead(
    "description", "Transitions, scroll surfaces, workers, and browser bridge interop demos.",
  )),
  routeDef("immediate-drawing", "Immediate Drawing", routeHead(
    "description", "CustomDrawable widgets: gauge, bar chart, waveform, sparkline.",
  )),
]);

const routes = routeManifest.routes;
export const homeRouteConfig = routes[0];
export const textFontsRouteConfig = routes[1];
export const advancedRouteConfig = routes[2];
export const immediateDrawingRouteConfig = routes[3];
