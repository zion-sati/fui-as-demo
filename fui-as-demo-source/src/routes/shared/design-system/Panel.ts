import { AlignItems, Disposable, FlexDirection, Theme, activeTheme, bindTheme, disposeAll } from "@effindomv2/fui-as/src/Fui";
import { FlexBox } from "@effindomv2/fui-as/src/nodes";

export class Panel extends FlexBox {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  constructor() {
    super();
    this.flexDirection(FlexDirection.Column)
      .alignItems(AlignItems.Start)
      .padding(24.0, 24.0, 24.0, 24.0)
      .margin(12.0, 12.0, 12.0, 12.0)
      .cornerRadius(16.0);

    this.trackTheme(bindTheme(this, (panel, theme): void => {
      panel.applyTheme(theme);
    }));
    this.applyTheme(activeTheme.value);
  }

  private applyTheme(theme: Theme): void {
    this.border(1.0, theme.colors.border)
      .bgColor(theme.colors.surface)
      .dropShadow(theme.colors.panelShadow, 0.0, 2.0, 7.0);
  }

  private trackTheme(disposable: Disposable): void {
    this.themeBindings.push(disposable);
  }

  dispose(): void {
    if (!this.themeBindingDisposed) {
      this.themeBindingDisposed = true;
      disposeAll(this.themeBindings);
    }
    super.dispose();
  }
}
