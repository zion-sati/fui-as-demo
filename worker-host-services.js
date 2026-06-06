// node_modules/@effindomv2/fui-as/browser/src/host-services.ts
function hostService(definition) {
  return definition;
}
function defineHostServices(services) {
  return services;
}

// src/host/worker-host-services.ts
var appWorkerHostServices = defineHostServices({
  appWorkerClock: {
    wallClockSinceEpochMs: hostService({
      args: [],
      returns: "f64",
      implementation() {
        return Date.now();
      }
    })
  }
});

// worker-host-services.ts
globalThis.__fuiWorkerHostServicesModule = {
  ...globalThis.__fuiWorkerHostServicesModule ?? {},
  appWorkerHostServices
};
