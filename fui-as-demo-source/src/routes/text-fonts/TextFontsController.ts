import { ManagedApplicationController, Node } from "../../fui/Fui";
import { TextFontsModel } from "./TextFontsModel";
import { TextFontsView } from "./TextFontsView";

export class TextFontsController extends ManagedApplicationController {
  readonly model: TextFontsModel = new TextFontsModel();
  readonly view: TextFontsView = new TextFontsView(this.model);

  constructor() {
    super();
    this.view.attachTextAreaBindings();
  }

  getRoot(): Node {
    return this.view.getRoot();
  }

  dispose(): void {
    this.view.disposeThemeBindings();
    super.dispose();
  }
}
