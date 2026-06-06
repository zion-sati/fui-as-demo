import { TextArea, TextInputColors, Theme, Unit, activeTheme, bindTheme, Disposable, disposeAll } from "../../../fui/Fui";
import { lightenColor } from "../ColorUtils";

export class DemoTextArea extends TextArea {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  constructor(value: string = "") {
    super(value);
    this
      .fillWidth()
      .height(220.0, Unit.Pixel);
    this.trackTheme(bindTheme(this, (area, theme): void => {
      area.applyAreaTheme(theme);
    }));
    this.applyAreaTheme(activeTheme.value);
  }

  dispose(): void {
    this.disposeThemeBindings();
    super.dispose();
  }

  private applyAreaTheme(theme: Theme): void {
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
