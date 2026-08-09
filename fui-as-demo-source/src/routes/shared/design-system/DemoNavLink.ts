import {
  activeTheme,
  bindTheme,
  Disposable,
  disposeAll,
  NavLink,
  NavLinkInteractionState,
  Text,
  Theme,
} from "../../../fui/Fui";

export class DemoNavLink extends NavLink {
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingsDisposed: bool = false;
  private hoveredValue: bool = false;
  readonly labelNode: Text;

  constructor(href: string, label: string, openInNewTab: bool = false) {
    super(href, openInNewTab);
    this.labelNode = new Text(label).fontSize(14.0).selectable(false) as Text;
    this.child(this.labelNode).semanticLabel(label);
    this.bindInteractionState<DemoNavLink>(this, applyDemoNavLinkInteractionState);
    this.trackTheme(bindTheme(this, (link, theme): void => {
      link.applyVisualState(theme);
    }));
    this.applyVisualState(activeTheme.value);
  }

  dispose(): void {
    this.disposeThemeBindings();
    super.dispose();
  }

  applyInteractionState(state: NavLinkInteractionState, theme: Theme): void {
    this.hoveredValue = state.hovered || state.pressed;
    this.applyVisualState(theme);
  }

  private applyVisualState(theme: Theme): void {
    this.labelNode.textColor(
      this.hoveredValue ? theme.colors.accentHovered : theme.colors.accent,
    );
  }

  private trackTheme(disposable: Disposable): void {
    this.themeBindings.push(disposable);
  }

  private disposeThemeBindings(): void {
    if (this.themeBindingsDisposed) {
      return;
    }
    this.themeBindingsDisposed = true;
    disposeAll(this.themeBindings);
  }
}

function applyDemoNavLinkInteractionState(
  link: DemoNavLink,
  state: NavLinkInteractionState,
  theme: Theme,
): void {
  link.applyInteractionState(state, theme);
}
