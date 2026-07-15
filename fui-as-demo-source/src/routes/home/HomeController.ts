import { ManagedApplicationController, Node } from "../../fui/Fui";
import { Callback1 } from "../../fui/FuiPrimitives";
import { onAppClockTick } from "../../host/generated/HostEvents";
import { HomeModel } from "./HomeModel";
import { HomeView } from "./HomeView";

class ClockTickHandler extends Callback1<i32> {
  private readonly controller: HomeController;

  constructor(controller: HomeController) {
    super();
    this.controller = controller;
  }

  invoke(value: i32): void {
    const model = this.controller.model;
    if (model.startTick < 0) {
      model.startTick = value;
    }
    const elapsed = value - model.startTick;
    this.controller.view.setElapsedSeconds(elapsed > 0 ? elapsed : 0);
  }
}

export class HomeController extends ManagedApplicationController {
  readonly model: HomeModel = new HomeModel();
  readonly view: HomeView = new HomeView(this.model);
  private readonly clockTickHandler: ClockTickHandler = new ClockTickHandler(this);

  constructor() {
    super();
    this.view.actionButton.onClickWith(this, (controller) => {
      controller.view.showDemoDialog();
    });
    this.view.foundationsToggleButton.onClickWith(this, (controller) => {
      controller.view.toggleFoundationsScope();
    });
    this.view.foundationsScopedButton.onClickWith(this, (controller) => {
      controller.view.recordFoundationsScopedAction();
    });
    this.view.foundationsScopedButton.onFocusChangedWith(this, (controller, event) => {
      controller.view.setFoundationsScopedFocused(event.focused);
    });
    this.view.foundationsKeyTargetBox.onFocusChangedWith(this, (controller, event) => {
      controller.view.setFoundationsKeyTargetFocused(event.focused);
    });
    this.view.foundationsKeyTargetBox.onKeyDownWith(this, (controller, event) => {
      controller.view.recordFoundationsKey(event.key);
    });
    onAppClockTick(this.clockTickHandler);
  }

  getRoot(): Node {
    return this.view.getRoot();
  }

  dispose(): void {
    onAppClockTick(null);
    this.view.dispose();
    super.dispose();
  }
}
