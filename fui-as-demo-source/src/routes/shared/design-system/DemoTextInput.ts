import { TextInput, TextInputColors, Theme, Unit, activeTheme, bindTheme, Disposable, disposeAll } from "../../../fui/Fui";
import { lightenColor } from "../ColorUtils";

export class DemoTextInput extends TextInput {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  constructor() {
    super();
    this
      .fontSize(14.0)
      .height(40.0, Unit.Pixel)
      .fillWidth();
    this.trackTheme(bindTheme(this, (input, theme): void => {
      input.applyInputTheme(theme);
    }));
    this.applyInputTheme(activeTheme.value);
  }

  dispose(): void {
    this.disposeThemeBindings();
    super.dispose();
  }

  private applyInputTheme(theme: Theme): void {
    const bg = lightenColor(theme.colors.surface, 0.05);
    this.colors(new TextInputColors().background(bg));
  }

  private trackTheme(disposable: Disposable): void {
    this.themeBindings.push(disposable);
  }

  private disposeThemeBindings(): void {
    if (this.themeBindingDisposed) {
      return;
    }
    this.themeBindingDisposed = true;
    disposeAll(this.themeBindings);
  }
}
