import { Column, Disposable, FlexBox, FontFace, FontFamily, FontStack, FontWeight, Grid, GridUnit, RichText, Row, ScrollBarVisibility, SelectionArea, SemanticCheckedState, TextAlign, TextVerticalAlign, Theme, Unit, Visibility, activeTheme, bindTheme, disposeAll, DropdownItem, rgb, span } from "../../fui/Fui";
import { DemoText, DemoTextStyle } from "../shared/design-system/DemoText";
import { DemoCheckbox } from "../shared/design-system/DemoCheckbox";
import { DemoRadioGroup } from "../shared/design-system/DemoRadioGroup";
import { DemoRadioButton } from "../shared/design-system/DemoRadioButton";
import { DemoDropdown } from "../shared/design-system/DemoDropdown";
import { createNavBar } from "../shared/design-system/NavBar";
import { Panel } from "../shared/design-system/Panel";
import {
  HEADING_TO_BODY_GAP_PX,
  HorizontalSpacer,
  PAGE_SECTION_GAP_PX,
  TITLE_TO_SUPPORTING_GAP_PX,
  VerticalSpacer,
} from "../shared/design-system/Spacers";
import { TextFontsModel } from "./TextFontsModel";
import { DemoScrollBox } from "../shared/design-system/DemoScrollBox";
import { DemoTextInput } from "../shared/design-system/DemoTextInput";
import { DemoTextArea } from "../shared/design-system/DemoTextArea";
import { CustomFontSection } from "./CustomFontSection";
import { RichTextSection } from "./RichTextSection";

const FIXED_LINE_HEIGHT_PX: f32 = 28.0;

function createFullWidthCheckbox(label: string, checked: bool = false): DemoCheckbox {
  const cb = new DemoCheckbox(label);
  if (checked) {
    cb.check(true);
  }
  return cb;
}

function createStatusText(): DemoText {
  return new DemoText("", DemoTextStyle.Caption) as DemoText;
}

function createSupportingStatusText(): DemoText {
  return new DemoText("", DemoTextStyle.BodySecondary) as DemoText;
}

function createVerticalPolicyGroup(): DemoRadioGroup {
  return (new DemoRadioGroup()
    .addOptions([
      new DemoRadioButton("auto", "Vertical scrollbar: Auto"),
      new DemoRadioButton("always", "Vertical scrollbar: Always"),
      new DemoRadioButton("never", "Vertical scrollbar: Never"),
    ]) as DemoRadioGroup).selectIndex(0) as DemoRadioGroup;
}

function createHorizontalPolicyGroup(): DemoRadioGroup {
  return (new DemoRadioGroup()
    .addOptions([
      new DemoRadioButton("auto", "Horizontal scrollbar: Auto"),
      new DemoRadioButton("always", "Horizontal scrollbar: Always"),
      new DemoRadioButton("never", "Horizontal scrollbar: Never"),
    ]) as DemoRadioGroup).selectIndex(0) as DemoRadioGroup;
}

function createLineHeightGroup(): DemoRadioGroup {
  return (new DemoRadioGroup()
    .addOptions([
      new DemoRadioButton("normal", "Line height: Normal"),
      new DemoRadioButton("fixed-28", "Line height: Fixed 28 px"),
    ]) as DemoRadioGroup).selectIndex(0) as DemoRadioGroup;
}

function createFontModeGroup(): DemoRadioGroup {
  return (new DemoRadioGroup()
    .addOptions([
      new DemoRadioButton("variable", "Text font: Variable width"),
      new DemoRadioButton("mono", "Text font: Monospace"),
    ]) as DemoRadioGroup).selectIndex(0) as DemoRadioGroup;
}

function createVisibilityDropdown(): DemoDropdown {
  const dd = new DemoDropdown() as DemoDropdown;
  dd.items([
    new DropdownItem("normal", "Visibility: Normal - keep layout reserved and content rendered"),
    new DropdownItem("hidden", "Visibility: Hidden - keep layout reserved but stop painting content"),
    new DropdownItem("collapsed", "Visibility: Collapsed - remove layout space and hide the content"),
  ]);
  dd.selectIndex(0);
  dd.width(350.0, Unit.Pixel);
  return dd;
}

export class TextFontsView {
  private readonly root!: SelectionArea;
  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;

  readonly textArea: DemoTextArea = new DemoTextArea(
    "Line one\nLine two\nLine three\nLonger content so scrollbar policy is easy to spot.",
  )
    .placeholder("Type notes here or paste sample content. Use the controls below to reconfigure the TextArea live.")
    .nodeId("demo-advanced:text-area") as DemoTextArea;

  readonly readOnlyToggle: DemoCheckbox = createFullWidthCheckbox("Read-only") as DemoCheckbox;
  readonly wrappingToggle: DemoCheckbox = createFullWidthCheckbox("Wrapping", true) as DemoCheckbox;
  readonly alwaysVerticalToggle: DemoCheckbox = createFullWidthCheckbox("Always show vertical scrollbar") as DemoCheckbox;
  readonly neverVerticalToggle: DemoCheckbox = createFullWidthCheckbox("Hide vertical scrollbar") as DemoCheckbox;
  readonly alwaysHorizontalToggle: DemoCheckbox = createFullWidthCheckbox("Always show horizontal scrollbar") as DemoCheckbox;
  readonly neverHorizontalToggle: DemoCheckbox = createFullWidthCheckbox("Hide horizontal scrollbar") as DemoCheckbox;

  readonly focusStatusText: DemoText = createStatusText();
  readonly selectionStatusText: DemoText = createStatusText();
  readonly settingsStatusText: DemoText = createSupportingStatusText();

  readonly verticalPolicyGroup: DemoRadioGroup = createVerticalPolicyGroup();
  readonly horizontalPolicyGroup: DemoRadioGroup = createHorizontalPolicyGroup();
  readonly lineHeightGroup: DemoRadioGroup = createLineHeightGroup();
  readonly fontModeGroup: DemoRadioGroup = createFontModeGroup();
  readonly visibilityDropdown: DemoDropdown = createVisibilityDropdown();

  readonly textAreaHint: DemoText = (new DemoText(
    "Use the quick toggles for common changes, or the radio groups when you want an exact scrollbar or line-height setting.",
    DemoTextStyle.BodySecondary,
  ) as DemoText);

  // Text inputs with theme-bound colors
  readonly standardTextInput: DemoTextInput = new DemoTextInput()
    .placeholder("Type here") as DemoTextInput;

  readonly passwordTextInput: DemoTextInput = new DemoTextInput()
    .password() as DemoTextInput;

  // Custom font section
  readonly customFont: CustomFontSection = new CustomFontSection();

  // Rich text section
  readonly richText: RichTextSection = new RichTextSection(
    this.customFont.emojiFace,
    this.customFont.family,
  );

  constructor(model: TextFontsModel) {
    const content = Column(
      createNavBar("Text & Fonts - FUI-AS Demo \u{1FAF6}", "text-fonts"),
      VerticalSpacer(PAGE_SECTION_GAP_PX),
      this.createMainPanel(model),
    )
      .fillSize()
      .padding(24.0, 24.0, 24.0, 24.0);

    this.root = new SelectionArea()
      .fillSize()
      .child(content) as SelectionArea;
    this.trackTheme(bindTheme(this, (view, theme): void => {
      view.applyTheme(theme);
    }));
    this.applyTheme(activeTheme.value);
  }

  getRoot(): SelectionArea {
    return this.root;
  }

  private applyTheme(theme: Theme): void {
    this.root.bgColor(theme.colors.background);
    this.richText.syncTheme(theme);
  }



  private createMainPanel(model: TextFontsModel): Panel {
    return new Panel()
      .children([
        new DemoText(model.title, DemoTextStyle.Heading2),
        VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
        new DemoText(model.subtitle, DemoTextStyle.BodySecondary),
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        new DemoText(model.description, DemoTextStyle.BodySecondary),
        VerticalSpacer(PAGE_SECTION_GAP_PX),
        new DemoScrollBox("AdvancedControlsScrollBox")
          .fillSize()
          .children([
            new Panel().children([
              new DemoText("Text Inputs", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              new DemoText("The following also demos Grid layout and alignment properties.", DemoTextStyle.BodySecondary),
              VerticalSpacer(HEADING_TO_BODY_GAP_PX),
              new Grid()
                .columns(2, [180.0, 1.0], [GridUnit.Pixel, GridUnit.Star])
                .rows(3, [40.0, 12.0, 40.0], [GridUnit.Pixel, GridUnit.Pixel, GridUnit.Pixel])
                .placeChild(
                  new DemoText("Standard Text Input:   ", DemoTextStyle.Body)
                    .verticalAlign(TextVerticalAlign.Center)
                    .textAlign(TextAlign.Right),
                  0, 0)
                .placeChild(
                  this.standardTextInput,
                  0, 1)
                .placeChild(
                  new DemoText("Password Text Input:   ", DemoTextStyle.Body)
                    .verticalAlign(TextVerticalAlign.Center)
                    .textAlign(TextAlign.Right),
                  2, 0)
                .placeChild(
                  this.passwordTextInput,
                  2, 1)
                .width(500.0, Unit.Pixel),
              VerticalSpacer(PAGE_SECTION_GAP_PX),

              new DemoText("Text Area", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.textArea,
              VerticalSpacer(14.0),
              this.textAreaHint,
              VerticalSpacer(14.0),
              Row(
                Column(
                  this.readOnlyToggle,
                  VerticalSpacer(8.0),
                  this.wrappingToggle,
                  VerticalSpacer(8.0),
                  this.alwaysVerticalToggle,
                  VerticalSpacer(8.0),
                  this.neverVerticalToggle,
                  VerticalSpacer(8.0),
                  this.alwaysHorizontalToggle,
                  VerticalSpacer(8.0),
                  this.neverHorizontalToggle,
                ),
                HorizontalSpacer(96.0),
                Column(
                  this.verticalPolicyGroup,
                  VerticalSpacer(12.0),
                  this.horizontalPolicyGroup,
                  VerticalSpacer(12.0),
                  this.lineHeightGroup,
                  VerticalSpacer(12.0),
                  this.fontModeGroup,
                  VerticalSpacer(12.0),
                  this.visibilityDropdown,
                ),
              ),
              VerticalSpacer(14.0),
              this.focusStatusText,
              VerticalSpacer(6.0),
              this.selectionStatusText,
              VerticalSpacer(6.0),
              this.settingsStatusText,
              VerticalSpacer(PAGE_SECTION_GAP_PX),
            ]),
            new Panel().children([
              new DemoText("Static Rich Text", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.richText.containerText,
              VerticalSpacer(10.0),
              this.richText.helperText,
              VerticalSpacer(10.0),
              this.richText.hintText,
              VerticalSpacer(PAGE_SECTION_GAP_PX),
            ])
              .width(800.0, Unit.Pixel),
            new Panel().children([
              new DemoText("App-authored Custom Fonts", DemoTextStyle.Heading3),
              VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
              this.customFont.headingText,
              VerticalSpacer(10.0),
              this.customFont.bodyText,
              VerticalSpacer(10.0),
              this.customFont.directStackText,
              VerticalSpacer(8.0),
              this.customFont.comparisonText,
            ])
              .width(800.0, Unit.Pixel)
          ])
          .fillWidth(),
      ])
      .fillSize() as Panel;
  }

  attachTextAreaBindings(): void {
    this.readOnlyToggle.onChangedWith(this, (view, state) => {
      view.textArea.readOnly(state != SemanticCheckedState.False);
      view.syncStatus();
    });

    this.wrappingToggle.onChangedWith(this, (view, state) => {
      const enabled = state != SemanticCheckedState.False;
      view.textArea.wrapping(enabled);
      if (enabled) {
        view.horizontalPolicyGroup.selectIndex(0);
      }
      view.syncHorizontalPolicy();
      view.syncStatus();
    });

    this.alwaysVerticalToggle.onChangedWith(this, (view, state) => {
      if (state != SemanticCheckedState.False) {
        view.neverVerticalToggle.check(false);
      }
      view.syncVerticalPolicyFromCheckboxes();
    });

    this.neverVerticalToggle.onChangedWith(this, (view, state) => {
      if (state != SemanticCheckedState.False) {
        view.alwaysVerticalToggle.check(false);
      }
      view.syncVerticalPolicyFromCheckboxes();
    });

    this.alwaysHorizontalToggle.onChangedWith(this, (view, state) => {
      if (state != SemanticCheckedState.False) {
        view.neverHorizontalToggle.check(false);
      }
      view.syncHorizontalPolicyFromCheckboxes();
    });

    this.neverHorizontalToggle.onChangedWith(this, (view, state) => {
      if (state != SemanticCheckedState.False) {
        view.alwaysHorizontalToggle.check(false);
      }
      view.syncHorizontalPolicyFromCheckboxes();
    });

    this.textArea.onFocusChangedWith(this, (view, _focused) => {
      view.syncStatus();
    });
    this.textArea.onSelectionChangedWith(this, (view, _start, _end) => {
      view.syncStatus();
    });
    this.textArea.onChangedWith(this, (view, _text) => {
      view.syncStatus();
    });

    this.verticalPolicyGroup.onChangedWith(this, (view, _value) => {
      view.syncVerticalPolicy();
    });
    this.horizontalPolicyGroup.onChangedWith(this, (view, _value) => {
      view.syncHorizontalPolicy();
    });
    this.lineHeightGroup.onChangedWith(this, (view, _value) => {
      view.syncLineHeight();
    });
    this.fontModeGroup.onChangedWith(this, (view, _value) => {
      view.syncFontMode();
    });
    this.visibilityDropdown.onChangedWith(this, (view, _item, _index) => {
      view.syncVisibility();
    });

    // initialize states
    this.wrappingToggle.check(true);
    this.verticalPolicyGroup.selectIndex(0);
    this.horizontalPolicyGroup.selectIndex(0);
    this.lineHeightGroup.selectIndex(0);
    this.fontModeGroup.selectIndex(0);
    this.visibilityDropdown.selectIndex(0);

    this.syncFontMode();
    this.syncVerticalPolicy();
    this.syncHorizontalPolicy();
    this.syncLineHeight();
    this.syncVisibility();
    this.syncStatus();
  }

  private syncVerticalPolicyFromCheckboxes(): void {
    if (this.neverVerticalToggle.checked) {
      this.verticalPolicyGroup.selectIndex(2);
    } else if (this.alwaysVerticalToggle.checked) {
      this.verticalPolicyGroup.selectIndex(1);
    } else {
      this.verticalPolicyGroup.selectIndex(0);
    }
    this.syncVerticalPolicy();
    this.syncStatus();
  }

  private syncHorizontalPolicyFromCheckboxes(): void {
    if (this.neverHorizontalToggle.checked) {
      this.horizontalPolicyGroup.selectIndex(2);
    } else if (this.alwaysHorizontalToggle.checked) {
      this.horizontalPolicyGroup.selectIndex(1);
    } else {
      this.horizontalPolicyGroup.selectIndex(0);
    }
    this.syncHorizontalPolicy();
    this.syncStatus();
  }

  private syncVerticalPolicy(): void {
    const value = this.verticalPolicyGroup.selectedValue;
    if (value == "never") {
      this.textArea.verticalScrollbarVisibility(ScrollBarVisibility.Never);
      this.alwaysVerticalToggle.check(false);
      this.neverVerticalToggle.check(true);
      return;
    }
    if (value == "always") {
      this.textArea.verticalScrollbarVisibility(ScrollBarVisibility.Always);
      this.alwaysVerticalToggle.check(true);
      this.neverVerticalToggle.check(false);
      return;
    }
    this.textArea.verticalScrollbarVisibility(ScrollBarVisibility.Auto);
    this.alwaysVerticalToggle.check(false);
    this.neverVerticalToggle.check(false);
  }

  private syncHorizontalPolicy(): void {
    const value = this.horizontalPolicyGroup.selectedValue;
    if (value == "never") {
      this.textArea.horizontalScrollbarVisibility(ScrollBarVisibility.Never);
      this.alwaysHorizontalToggle.check(false);
      this.neverHorizontalToggle.check(true);
      return;
    }
    if (value == "always") {
      this.textArea.horizontalScrollbarVisibility(ScrollBarVisibility.Always);
      this.alwaysHorizontalToggle.check(true);
      this.neverHorizontalToggle.check(false);
      return;
    }
    this.textArea.horizontalScrollbarVisibility(ScrollBarVisibility.Auto);
    this.alwaysHorizontalToggle.check(false);
    this.neverHorizontalToggle.check(false);
  }

  private syncLineHeight(): void {
    const value = this.lineHeightGroup.selectedValue;
    if (value == "fixed-28") {
      this.textArea.lineHeight(FIXED_LINE_HEIGHT_PX);
    } else {
      this.textArea.lineHeight(0.0);
      this.lineHeightGroup.selectIndex(0);
    }
    this.syncStatus();
  }

  private syncFontMode(): void {
    const themeFonts = activeTheme.value.fonts;
    if (this.fontModeGroup.selectedValue == "mono") {
      this.textArea.fontFamily(themeFonts.monoFamily);
      this.textArea.fontSize(themeFonts.sizeMono);
      this.syncStatus();
      return;
    }
    this.textArea.fontFamily(themeFonts.bodyFamily);
    this.textArea.fontSize(themeFonts.sizeBody);
    this.fontModeGroup.selectIndex(0);
    this.syncStatus();
  }

  private syncVisibility(): void {
    const index = this.visibilityDropdown.selectedIndex;
    if (index == 1) {
      this.textArea.visibility(Visibility.Hidden);
      this.syncStatus();
      return;
    }
    if (index == 2) {
      this.textArea.visibility(Visibility.Collapsed);
      this.syncStatus();
      return;
    }
    this.textArea.visibility(Visibility.Normal);
    this.visibilityDropdown.selectIndex(0);
    this.syncStatus();
  }

  private visibilitySummaryLabel(): string {
    const index = this.visibilityDropdown.selectedIndex;
    if (index == 1) {
      return "hidden";
    }
    if (index == 2) {
      return "collapsed";
    }
    return "normal";
  }

  private syncStatus(): void {
    const text = this.textArea.value;
    this.focusStatusText.text("Focus: " + (this.textArea.isFocused ? "focused" : "blurred") + " • Text length: " + text.length.toString());
    this.selectionStatusText.text("Selection: " + this.textArea.selectionStart.toString() + "-" + this.textArea.selectionEnd.toString());
    const summary =
      "Read-only: " + (this.textArea.isReadOnly ? "on" : "off") +
      " • Wrapping: " + (this.wrappingToggle.checked ? "on" : "off") +
      " • Visibility: " + this.visibilitySummaryLabel() +
      " • Vertical: " + this.verticalPolicyGroup.selectedValue +
      " • Horizontal: " + this.horizontalPolicyGroup.selectedValue +
      " • Line height: " + (this.lineHeightGroup.selectedValue == "fixed-28" ? "fixed 28px" : "normal") +
      " • Font: " + (this.fontModeGroup.selectedValue == "mono" ? "monospace" : "variable");
    this.settingsStatusText.text(summary);
  }

  private trackTheme(disposable: Disposable): void {
    this.themeBindings.push(disposable);
  }

  disposeThemeBindings(): void {
    if (this.themeBindingDisposed) {
      return;
    }
    this.themeBindingDisposed = true;
    disposeAll(this.themeBindings);
  }
}
