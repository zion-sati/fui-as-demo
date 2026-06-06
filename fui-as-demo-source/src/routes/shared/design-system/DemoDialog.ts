import { Dialog } from "../../../fui/Fui";

export class DemoDialog extends Dialog {
  constructor(title: string, body: string) {
    super(title, body);
    this.acceptActionButton.label("Apply");
    this.cancelActionButton.label("Cancel");
    this.cardCornerRadius(16.0);
  }
}
