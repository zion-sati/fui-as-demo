import { Disposable, FontWeight, Text, Theme, activeTheme, bindTheme, disposeAll } from "../../../fui/Fui";

export const enum DemoTextStyle {
  Heading1,
  Heading2,
  Heading3,
  Lead,
  Label,
  Body,
  BodySecondary,
  Caption,
}

function isMutedStyle(style: DemoTextStyle): bool {
  return style == DemoTextStyle.BodySecondary || style == DemoTextStyle.Caption;
}

export class DemoText extends Text {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;
  private styleValue: DemoTextStyle;
  private readonly managesThemeColor: bool;

  constructor(
    value: string = "",
    style: DemoTextStyle = DemoTextStyle.Body,
    managesThemeColor: bool = true,
  ) {
    super(value);
    this.styleValue = style;
    this.managesThemeColor = managesThemeColor;
    this.applyTypography();
    if (this.managesThemeColor) {
      this.trackTheme(bindTheme(this, (text, theme): void => {
        text.applyTheme(theme);
      }));
      this.applyTheme(activeTheme.value);
    }
  }

  style(style: DemoTextStyle): this {
    this.styleValue = style;
    this.applyTypography();
    if (this.managesThemeColor) {
      this.applyTheme(activeTheme.value);
    }
    return this;
  }

  dispose(): void {
    this.disposeThemeBindings();
    super.dispose();
  }

  private applyTypography(): void {
    let fontSize: f32 = 15.0;
    let fontWeight: FontWeight = FontWeight.Regular;
    switch (this.styleValue) {
      case DemoTextStyle.Heading1:
        fontSize = 26.0;
        fontWeight = FontWeight.Bold;
        break;
      case DemoTextStyle.Heading2:
        fontSize = 22.0;
        fontWeight = FontWeight.Bold;
        break;
      case DemoTextStyle.Heading3:
        fontSize = 18.0;
        fontWeight = FontWeight.Bold;
        break;
      case DemoTextStyle.Lead:
        fontSize = 17.0;
        break;
      case DemoTextStyle.Label:
        fontSize = 16.0;
        break;
      case DemoTextStyle.Body:
        fontSize = 15.0;
        break;
      case DemoTextStyle.BodySecondary:
        fontSize = 14.0;
        break;
      case DemoTextStyle.Caption:
        fontSize = 12.0;
        break;
    }
    this
      .fontSize(fontSize)
      .fontWeight(fontWeight);
  }

  private applyTheme(theme: Theme): void {
    this.textColor(isMutedStyle(this.styleValue) ? theme.colors.textMuted : theme.colors.textPrimary);
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
