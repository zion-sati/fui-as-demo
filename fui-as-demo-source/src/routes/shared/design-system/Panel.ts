import { AlignItems, Disposable, FlexDirection, Theme, activeTheme, bindTheme, disposeAll, viewportWidthSignal } from "@effindomv2/fui-as/src/Fui";
import { isCompactLayout } from "./Responsive";
import { FlexBox } from "@effindomv2/fui-as/src/nodes";

export class Panel extends FlexBox {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  constructor() {
    super();
    this.flexDirection(FlexDirection.Column)
      .alignItems(AlignItems.Start)
      .cornerRadius(16.0);
    this.trackTheme(viewportWidthSignal.bind(this, (panel, _width): void => {
      panel.applySpacing();
    }));
    this.applySpacing();

    this.trackTheme(bindTheme(this, (panel, theme): void => {
      panel.applyTheme(theme);
    }));
    this.applyTheme(activeTheme.value);
  }

  /** Nested panels keep less of a phone's width for their own spacing in the compact layout. */
  private applySpacing(): void {
    const compact = isCompactLayout();
    const padding: f32 = compact ? 14.0 : 24.0;
    const margin: f32 = compact ? 6.0 : 12.0;
    this.padding(padding, padding, padding, padding).margin(margin, margin, margin, margin);
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
