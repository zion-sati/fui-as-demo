import { ManagedApplicationController, Node } from "../../fui/Fui";
import { AdvancedModel } from "./AdvancedModel";
import { AdvancedView } from "./AdvancedView";

export class AdvancedController extends ManagedApplicationController {
  readonly model: AdvancedModel = new AdvancedModel();
  readonly view: AdvancedView = new AdvancedView(this.model);

  constructor() {
    super();
    this.attachBindings();
  }

  private attachBindings(): void {
    this.view.worker.attachBindings();
    this.view.fetch.attachBindings();
    this.view.drop.attachBindings();
    // ReorderSection is self-contained, no explicit bindings needed
    this.view.attachAnimationBindings();
  }

  getRoot(): Node {
    return this.view.getRoot();
  }

  dispose(): void {
    this.view.worker.dispose();
    this.view.fetch.dispose();
    this.view.drop.dispose();
    this.view.disposeThemeBindings();
    super.dispose();
  }
}
