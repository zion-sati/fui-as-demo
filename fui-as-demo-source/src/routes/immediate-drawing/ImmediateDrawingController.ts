import { ManagedApplicationController, Node } from "../../fui/Fui";
import { ImmediateDrawingView } from "./ImmediateDrawingView";

export class ImmediateDrawingController extends ManagedApplicationController {
  readonly view: ImmediateDrawingView = new ImmediateDrawingView();

  getRoot(): Node {
    return this.view.getRoot();
  }

  dispose(): void {
    this.view.dispose();
    super.dispose();
  }
}
