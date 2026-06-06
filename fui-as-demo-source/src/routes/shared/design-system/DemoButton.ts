import { Button, Disposable, Theme, Unit, activeTheme, bindTheme, disposeAll } from "../../../fui/Fui";

const BUTTON_RADIUS: f32 = 12.0;
const BUTTON_PADDING_X: f32 = 18.0;
const BUTTON_PADDING_Y: f32 = 10.0;

export const enum DemoButtonTone {
  Primary = 0,
  Secondary = 1,
}

export class DemoButton extends Button {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;
  private toneValue: DemoButtonTone;

  constructor(label: string, tone: DemoButtonTone = DemoButtonTone.Secondary) {
    super(label);
    this.toneValue = tone;
    this
      .cornerRadius(BUTTON_RADIUS)
      .padding(BUTTON_PADDING_X, BUTTON_PADDING_Y, BUTTON_PADDING_X, BUTTON_PADDING_Y)
      .fontSize(15.0)
      .width(0.0, Unit.Auto);
    this.trackTheme(bindTheme(this, (btn, theme): void => {
      btn.applyButtonTheme(theme);
    }));
  }

  dispose(): void {
    this.disposeThemeBindings();
    super.dispose();
  }

  private applyButtonTheme(theme: Theme): void {
    if (this.toneValue == DemoButtonTone.Primary) {
      this.bgColor(theme.colors.accent);
      this.textColor(theme.colors.textOnAccent);
    } else {
      this.bgColor(theme.colors.surface);
      this.textColor(theme.colors.textPrimary);
    }
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
