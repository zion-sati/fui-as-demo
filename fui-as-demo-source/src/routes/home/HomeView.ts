import {
  AlignItems,
  Bitmap,
  Checkbox,
  Column,
  Dialog,
  Disposable,
  Dropdown,
  DropdownItem,
  FlexBox,
  FlexDirection,
  Image,
  ObjectFit,
  Orientation,
  PlatformFamily,
  RadioGroup,
  RichText,
  Row,
  ScrollBarVisibility,
  SelectionArea,
  SemanticCheckedState,
  Slider,
  Svg,
  Text,
  Theme,
  ToolTip,
  Unit,
  activeTheme,
  bindTheme,
  disposeAll,
  getPlatformFamily,
  span,
  } from "../../fui/Fui";
import {
  createNavBar,
  DemoCheckbox,
  DemoDialog,
  DemoDropdown,
  DemoNavLink,
  DemoRadioButton,
  DemoRadioGroup,
  DemoScrollBox,
  DemoSlider,
  DemoText,
  DemoTextStyle,
  DemoVirtualList,
  HEADING_TO_BODY_GAP_PX,
  HEADING_TO_BODY_TIGHT_GAP_PX,
  HorizontalSpacer,
  LABEL_TO_CONTROL_GAP_PX,
  MICRO_STACK_GAP_PX,
  PAGE_SECTION_GAP_PX,
  PANEL_SECTION_GAP_PX,
  TITLE_TO_SUPPORTING_GAP_PX,
  VerticalSpacer,
  Panel,
  applyRowBackground,
  PrimaryButton,
} from "../shared/design-system";
import { changeColorAlpha } from "../shared/ColorUtils";
import { HomeModel } from "./HomeModel";

export class HomeView {
  readonly actionButton: PrimaryButton;
  readonly foundationsToggleButton: PrimaryButton;
  readonly foundationsScopedButton: PrimaryButton;
  readonly foundationsKeyTargetBox: FlexBox;
  private readonly elapsedText: Text;
  private readonly summaryText: Text;
  private readonly foundationsStatusText: Text;
  private readonly foundationsFocusText: Text;
  private readonly foundationsScopedActionText: Text;
  private readonly foundationsKeyTargetText: Text;
  private readonly foundationsScopeBox: Panel;
  private readonly root!: SelectionArea;
  private readonly virtualList!: DemoVirtualList;
  private readonly controlsDialog!: Dialog;
  private readonly dropdown!: Dropdown;
  private readonly triStateCheckbox!: Checkbox;
  private readonly biStateCheckbox!: Checkbox;
  private readonly qualityRadioGroup!: RadioGroup;
  private readonly horizontalSlider!: Slider;
  private readonly verticalSlider!: Slider;
  private readonly dropdownItems: Array<DropdownItem> = [
    new DropdownItem("tiny", "Tiny"),
    new DropdownItem("small", "Small"),
    new DropdownItem("medium", "Medium"),
    new DropdownItem("large", "Large"),
    new DropdownItem("xlarge", "Extra large"),
  ];
  private readonly picture1: Image = Image.load("https://upload.wikimedia.org/wikipedia/commons/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg", ObjectFit.Cover)
    .altText("Sample image1 - JPG")
    .width(640.0, Unit.Pixel)
    .height(480.0, Unit.Pixel)
    .toolTip(new ToolTip().text("Sample image1 - JPG").initialShowDelay(1000)) as Image;
  private readonly picture2: Image = Image.load("https://upload.wikimedia.org/wikipedia/commons/6/67/1932_eagle_reverse%28Transparency%29.png", ObjectFit.Cover)
    .altText("Sample image2 - PNG with transparency")
    .width(0.0, Unit.Auto)
    .height(0.0, Unit.Auto)
    .toolTip(new ToolTip().text("Sample image2 - PNG with transparency").initialShowDelay(1000)) as Image;
  private readonly picture3: Svg = Svg.load("https://upload.wikimedia.org/wikipedia/commons/d/d0/Drawsvgbird.svg", 0)
    .altText("Sample SVG image")
    .height(600.0, Unit.Pixel)
    .toolTip(new ToolTip().text("Sample SVG image").initialShowDelay(1000)) as Svg;
  private static readonly DEMO_BITMAP_SIZE: u32 = 512;
  private readonly bitmap: Bitmap = HomeView.createCustomBitmap();
  private readonly bitmapImage: Image = new Image(this.bitmap.textureId, ObjectFit.Contain)
    .altText("App-owned premultiplied RGBA bitmap sample")
    .width(0.0, Unit.Auto)
    .height(0.0, Unit.Auto)
    .toolTip(new ToolTip().text("App-owned premultiplied RGBA bitmap sample").initialShowDelay(1000)) as Image;

  private readonly nestedScrollContent: FlexBox = new FlexBox()
    .width(800.0, Unit.Pixel)
    .height(0.0, Unit.Auto)
    .padding(16.0, 16.0, 16.0, 16.0)
    .child(
      Column(
        new DemoText("Nested Scroll Content - START", DemoTextStyle.Label),
        VerticalSpacer(72.0),
        new DemoText("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software including versions of Lorem Ipsum.", DemoTextStyle.BodySecondary),
        VerticalSpacer(116.0),
        new DemoText("Nested Scroll Content - END", DemoTextStyle.Label),
      ),
    ) as FlexBox;

  private readonly themeBindings: Array<Disposable> = new Array<Disposable>();
  private themeBindingDisposed: bool = false;
  private foundationsScopeEnabled: bool = true;
  private foundationsScopedFocused: bool = false;
  private foundationsScopedActionCount: i32 = 0;
  private foundationsKeyTargetFocused: bool = false;
  private foundationsLastKey: string = "";

  constructor(model: HomeModel) {
    const elapsedText: Text = new DemoText("Time since app started: 00:00:00", DemoTextStyle.Lead);
    const summaryText: Text = new DemoText("Selections: waiting for interaction.", DemoTextStyle.BodySecondary);
    const actionButton = new PrimaryButton(model.actionLabel);
    const foundationsToggleButton = new PrimaryButton("Disable scoped child");
    const foundationsScopedButton = new PrimaryButton("Scoped child action");
    const foundationsStatusText: Text = new DemoText("", DemoTextStyle.BodySecondary);
    const foundationsFocusText: Text = new DemoText("", DemoTextStyle.BodySecondary);
    const foundationsScopedActionText: Text = new DemoText("", DemoTextStyle.BodySecondary);
    const foundationsKeyTargetText = new DemoText("", DemoTextStyle.Body)
      .selectable(false) as Text;
    const foundationsKeyTargetBox = new FlexBox()
      .width(280.0, Unit.Pixel)
      .padding(12.0, 10.0, 12.0, 10.0)
      .cornerRadius(12.0)
      .child(foundationsKeyTargetText)
      .focusable(true) as FlexBox;
    const foundationsScopeBox = new Panel()
      .width(0.0, Unit.Auto)
      .children([
        new DemoText("This child button inherits enabled/disabled from its parent scope.", DemoTextStyle.BodySecondary),
        VerticalSpacer(10.0),
        foundationsScopedButton,
        VerticalSpacer(8.0),
        foundationsFocusText,
        VerticalSpacer(8.0),
        foundationsScopedActionText,
      ]) as Panel;
    this.elapsedText = elapsedText;
    this.summaryText = summaryText;
    this.actionButton = actionButton;
    this.foundationsToggleButton = foundationsToggleButton;
    this.foundationsScopedButton = foundationsScopedButton;
    this.foundationsStatusText = foundationsStatusText;
    this.foundationsFocusText = foundationsFocusText;
    this.foundationsScopedActionText = foundationsScopedActionText;
    this.foundationsKeyTargetText = foundationsKeyTargetText;
    this.foundationsKeyTargetBox = foundationsKeyTargetBox;
    this.foundationsScopeBox = foundationsScopeBox;

    const controlsDialog = new DemoDialog("Demo dialog form", "No selection captured yet.");
    controlsDialog
      .onAcceptWith(this, (view) => view.setSummary("Dialog accepted."))
      .onCancelWith(this, (view) => view.setSummary("Dialog cancelled."));
    this.controlsDialog = controlsDialog;

    const dropdown = new DemoDropdown();
    dropdown
      .items(this.dropdownItems)
      .selectIndex(2)
      .onChangedWith(this, (view) => view.setSummary(view.buildSelectionSummary()));
    this.dropdown = dropdown;

    const triStateCheckbox = new DemoCheckbox("Tri-state checkbox");
    triStateCheckbox
      .triState(true)
      .mixed(true)
      .onChangedWith(this, (view) => view.setSummary(view.buildSelectionSummary()));
    this.triStateCheckbox = triStateCheckbox;

    const biStateCheckbox = new DemoCheckbox("Bi-state checkbox");
    biStateCheckbox
      .check(true)
      .onChangedWith(this, (view) => view.setSummary(view.buildSelectionSummary()));
    this.biStateCheckbox = biStateCheckbox;

    const qualityRadioGroup = new DemoRadioGroup();
    qualityRadioGroup
      .addRadio(new DemoRadioButton("balanced", "Balanced"))
      .addRadio(new DemoRadioButton("quality", "Quality first"))
      .addRadio(new DemoRadioButton("speed", "Speed first"))
      .selectIndex(0)
      .onChangedWith(this, (view) => view.setSummary(view.buildSelectionSummary()));
    this.qualityRadioGroup = qualityRadioGroup;

    const horizontalSlider = new DemoSlider(40.0);
    horizontalSlider
      .min(0.0)
      .max(100.0)
      .step(5.0)
      .length(300.0)
      .orientation(Orientation.Horizontal)
      .onChangedWith(this, (view) => view.setSummary(view.buildSelectionSummary()));
    this.horizontalSlider = horizontalSlider;

    const verticalSlider = new DemoSlider(65.0);
    verticalSlider
      .min(0.0)
      .max(100.0)
      .step(5.0)
      .length(150.0)
      .orientation(Orientation.Vertical)
      .onChangedWith(this, (view) => view.setSummary(view.buildSelectionSummary()));
    this.verticalSlider = verticalSlider;

    this.virtualList = new DemoVirtualList("VirtualList", 100000, 62.0)
      .fillSize() as DemoVirtualList;
    this.rebindVisibleListItems();

    const content = this.createContentLayout(model);

    const rootHost = new FlexBox()
      .fillSize()
      .child(content)
      .child(this.controlsDialog);

    this.root = new SelectionArea()
      .fillSize()
      .child(rootHost) as SelectionArea;

    this.trackTheme(bindTheme(this, (view, theme): void => {
      view.applyTheme(theme);
    }));
    this.applyTheme(activeTheme.value);
    this.refreshFoundationsState();
    this.setSummary(this.buildSelectionSummary());
  }

  getRoot(): SelectionArea {
    return this.root;
  }

  dispose(): void {
    this.disposeThemeBindings();
  }

  showDemoDialog(): void {
    this.controlsDialog.content("Demo dialog form", this.buildSelectionSummary());
    this.controlsDialog.show();
  }

  toggleFoundationsScope(): void {
    this.foundationsScopeEnabled = !this.foundationsScopeEnabled;
    if (!this.foundationsScopeEnabled) {
      this.foundationsScopedFocused = false;
    }
    this.refreshFoundationsState();
  }

  recordFoundationsScopedAction(): void {
    if (!this.foundationsScopeEnabled) {
      return;
    }
    this.foundationsScopedActionCount += 1;
    this.refreshFoundationsActionState();
  }

  setFoundationsScopedFocused(focused: bool): void {
    this.foundationsScopedFocused = focused && this.foundationsScopeEnabled;
    this.refreshFoundationsFocusState();
  }

  setFoundationsKeyTargetFocused(focused: bool): void {
    this.foundationsKeyTargetFocused = focused;
    this.refreshFoundationsKeyTargetState();
  }

  recordFoundationsKey(key: string): void {
    this.foundationsLastKey = key;
    this.refreshFoundationsKeyTargetText();
  }

  setElapsedSeconds(value: i32): void {
    const formatted = HomeView.formatElapsedTime(value);
    this.elapsedText.text("Time since app started: " + formatted);
  }

  private createControlsSurfacePanel(): Panel {
    const accessibilityDescription = new RichText([
      span("Use keyboard Tab to navigate through the controls and inspect the semantic tree to explore accessibility features - FUI-AS is fully ARIA compliant out of the box. Press "),
      span(HomeView.debugShortcutLabel()).bold(),
      span(" to open the debug dialog when on-requested developer tools are enabled; apps can enable or disable this surface through runtime configuration."),
    ])
      .fontSize(14.0)
      .fillWidth() as RichText;
    this.trackTheme(bindTheme(accessibilityDescription, (text, theme): void => {
      text.textColor(theme.colors.textMuted);
    }));
    accessibilityDescription.textColor(activeTheme.value.colors.textMuted);

    return new Panel()
      .children([
        new DemoText("Common Controls", DemoTextStyle.Heading3),
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        accessibilityDescription,
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        new DemoText("Dropdown", DemoTextStyle.Label),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.dropdown,
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        new DemoText("Checkboxes", DemoTextStyle.Label),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.triStateCheckbox,
        VerticalSpacer(MICRO_STACK_GAP_PX),
        this.biStateCheckbox,
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        new DemoText("Radio group", DemoTextStyle.Label),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.qualityRadioGroup,
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        new DemoText("Sliders", DemoTextStyle.Label),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        Row(
          new FlexBox()
            .flexDirection(FlexDirection.Column)
            .child(new DemoText("Horizontal", DemoTextStyle.BodySecondary))
            .child(VerticalSpacer(MICRO_STACK_GAP_PX))
            .child(this.horizontalSlider),
          HorizontalSpacer(16.0),
          new FlexBox()
            .flexDirection(FlexDirection.Column)
            .child(new DemoText("Vertical", DemoTextStyle.BodySecondary))
            .child(VerticalSpacer(MICRO_STACK_GAP_PX))
            .child(this.verticalSlider),
        ).alignItems(AlignItems.Stretch),
        VerticalSpacer(PAGE_SECTION_GAP_PX),
      ])
      .width(0.0, Unit.Auto) as Panel;
  }

  private createControlsImagesPanel(): Panel {
    return new Panel()
      .children([
        new DemoText("Images with Transparency", DemoTextStyle.Heading3),
        VerticalSpacer(PANEL_SECTION_GAP_PX),
        new DemoText("Image 1: JPG with no transparency", DemoTextStyle.BodySecondary),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.picture1,
        VerticalSpacer(PANEL_SECTION_GAP_PX),
        new DemoText("Image 2: PNG with transparency", DemoTextStyle.BodySecondary),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.picture2,
        VerticalSpacer(PANEL_SECTION_GAP_PX),
        new DemoText("Image 3: SVG", DemoTextStyle.BodySecondary),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.picture3,
        VerticalSpacer(PANEL_SECTION_GAP_PX),
        new DemoText("Image 4: Custom bitmap", DemoTextStyle.BodySecondary),
        VerticalSpacer(LABEL_TO_CONTROL_GAP_PX),
        this.bitmapImage,
      ]) as Panel;
  }

  private createNestedScrollPanel(): Panel {
    return new Panel()
      .children([
        new DemoText("Nested ScrollBox", DemoTextStyle.Heading3),
        VerticalSpacer(PANEL_SECTION_GAP_PX),
        new Panel()
          .child(
            new DemoScrollBox("Nested ScrollBox")
              .scrollEnabledX(true)
              .scrollEnabledY(true)
              .horizontalScrollbarVisibility(ScrollBarVisibility.Always)
              .verticalScrollbarVisibility(ScrollBarVisibility.Always)
              .scrollbarGutter(8.0)
              .width(300.0, Unit.Pixel)
              .height(240.0, Unit.Pixel)
              .child(this.nestedScrollContent)
          )
          .width(360.0, Unit.Pixel),
      ]) as Panel;
  }

  private createControlFoundationsPanel(): Panel {
    return new Panel()
      .children([
        new DemoText("Control foundations", DemoTextStyle.Heading3),
        VerticalSpacer(HEADING_TO_BODY_TIGHT_GAP_PX),
        new DemoText("Tab onto these buttons to see the focus ring. Use the outer toggle to disable the parent scope and watch the child button dim and stop activating.", DemoTextStyle.BodySecondary),
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        this.foundationsStatusText,
        VerticalSpacer(HEADING_TO_BODY_GAP_PX),
        this.foundationsToggleButton,
        VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
        this.foundationsScopeBox,
        VerticalSpacer(PANEL_SECTION_GAP_PX),
        new DemoText("Keyboard focus target", DemoTextStyle.Label),
        VerticalSpacer(HEADING_TO_BODY_TIGHT_GAP_PX),
        new DemoText("Tab onto this box, then press keys to verify retained focus and key routing.", DemoTextStyle.BodySecondary),
        VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX),
        this.foundationsKeyTargetBox,
      ])
      .width(0.0, Unit.Auto) as Panel;
  }

  private createControlsScrollBox(): DemoScrollBox {
    return new DemoScrollBox("ControlsScrollBox")
      .fillSize()
      .child(this.createControlsSurfacePanel())
      .child(VerticalSpacer(PANEL_SECTION_GAP_PX))
      .child(this.createControlsImagesPanel())
      .child(VerticalSpacer(PANEL_SECTION_GAP_PX))
      .child(this.createNestedScrollPanel())
      .child(VerticalSpacer(PANEL_SECTION_GAP_PX))
      .child(this.createControlFoundationsPanel()) as DemoScrollBox;
  }

  private createVirtualListPanel(): Panel {
    return new Panel()
      .child(new DemoText("Virtual List", DemoTextStyle.Heading2))
      .child(VerticalSpacer(HEADING_TO_BODY_GAP_PX))
      .child(new DemoText("This list contains 100,000 items. Scroll to see more.", DemoTextStyle.BodySecondary))
      .child(VerticalSpacer(HEADING_TO_BODY_GAP_PX))
      .child(this.virtualList)
      .width(250.0)
      .fillHeight() as Panel;
  }

  private createMainPanel(model: HomeModel): Panel {
    return new Panel()
      .child(new DemoText(model.title, DemoTextStyle.Heading2))
      .child(VerticalSpacer(TITLE_TO_SUPPORTING_GAP_PX))
      .child(new DemoText(model.subtitle, DemoTextStyle.BodySecondary))
      .child(VerticalSpacer(HEADING_TO_BODY_TIGHT_GAP_PX))
      .child(new DemoNavLink(
        "https://github.com/zion-sati/fui-as-demo",
        "View the FUI-AS demo source code on GitHub",
      ))
      .child(VerticalSpacer(PANEL_SECTION_GAP_PX))
      .child(this.elapsedText)
      .child(VerticalSpacer(HEADING_TO_BODY_GAP_PX))
      .child(this.actionButton)
      .child(VerticalSpacer(HEADING_TO_BODY_GAP_PX))
      .child(this.summaryText)
      .child(VerticalSpacer(PANEL_SECTION_GAP_PX))
      .child(this.createControlsScrollBox())
      .fillSize() as Panel;
  }

  private createContentLayout(model: HomeModel): FlexBox {
    return new DemoScrollBox("mainScrollBox").child(
      Column(
        createNavBar("Home Page - FUI-AS Demo ✌🏼", "home"),
        VerticalSpacer(PAGE_SECTION_GAP_PX),
        Row(
          this.createVirtualListPanel(),
          HorizontalSpacer(24.0),
          this.createMainPanel(model),
        )
          .alignItems(AlignItems.Stretch)
          .fillHeight(),
      )
        .minWidth(800.0, Unit.Pixel)
        .minHeight(600.0, Unit.Pixel)
        .fillSize()
        .padding(24.0, 24.0, 24.0, 24.0) as FlexBox
    )
      .scrollEnabledX(true)
      .scrollEnabledY(true)
      .horizontalScrollbarVisibility(ScrollBarVisibility.Auto)
      .verticalScrollbarVisibility(ScrollBarVisibility.Auto)
      .fillSize();
  }

  private static ensureListItemTemplate(container: FlexBox): void {
    if (container.childCount > 0) return;
    const title: Text = new DemoText("", DemoTextStyle.Body);
    const description: Text = new DemoText("", DemoTextStyle.Caption);
    container
      .fillWidth()
      .padding(16.0, 8.0, 8.0, 8.0)
      .cornerRadius(12.0)
      .children([
        title,
        new FlexBox().fillWidth().height(4.0, Unit.Pixel),
        description,
      ]);
  }

  private static applyListItemChrome(container: FlexBox, theme: Theme, index: i32): void {
    applyRowBackground(container, index, theme);
  }

  private static getListItemTitle(container: FlexBox): Text {
    return container.getChildAt(0)! as Text;
  }

  private static getListItemDescription(container: FlexBox): Text {
    return container.getChildAt(2)! as Text;
  }

  private static setListItemTitle(container: FlexBox, value: string): void {
    this.getListItemTitle(container).text(value);
  }

  private static setListItemDescription(container: FlexBox, value: string): void {
    this.getListItemDescription(container).text(value);
  }

  private bindListItem(container: FlexBox, index: i32): void {
    HomeView.ensureListItemTemplate(container);
    HomeView.applyListItemChrome(container, activeTheme.value, index);
    HomeView.setListItemTitle(container, "Item " + index.toString());
    HomeView.setListItemDescription(container, "Description for item " + index.toString());
  }

  private rebindVisibleListItems(): void {
    this.virtualList.onBindItemWith<HomeView>(this, (owner: HomeView, container: FlexBox, index: i32) => {
      owner.bindListItem(container, index);
    });
  }

  private applyTheme(theme: Theme): void {
    this.root.bgColor(theme.colors.background);
    this.rebindVisibleListItems();
    this.refreshFoundationsKeyTargetState();
  }

  private refreshFoundationsState(): void {
    this.foundationsStatusText.text(
      this.foundationsScopeEnabled
        ? "Scoped parent: enabled"
        : "Scoped parent: disabled via parent container",
    );
    this.foundationsToggleButton.label(this.foundationsScopeEnabled ? "Disable scoped child" : "Enable scoped child");
    this.foundationsScopeBox.enabled(this.foundationsScopeEnabled);
    this.refreshFoundationsFocusState();
    this.refreshFoundationsActionState();
  }

  private refreshFoundationsFocusState(): void {
    this.foundationsFocusText.text(
      this.foundationsScopedFocused
        ? "Scoped child focus: focused"
        : "Scoped child focus: unfocused",
    );
  }

  private refreshFoundationsActionState(): void {
    this.foundationsScopedActionText.text(
      "Scoped child activations " + this.foundationsScopedActionCount.toString(),
    );
  }

  private refreshFoundationsKeyTargetState(): void {
    const theme = activeTheme.value;
    const borderColor = this.foundationsKeyTargetFocused ? theme.colors.focusRing : theme.colors.border;
    const background = this.foundationsKeyTargetFocused
      ? changeColorAlpha(theme.colors.accent, 0x22)
      : theme.colors.surface;
    this.foundationsKeyTargetBox
      .bgColor(background)
      .border(1.0, borderColor);
    this.refreshFoundationsKeyTargetText();
  }

  private refreshFoundationsKeyTargetText(): void {
    const lastKey = this.foundationsLastKey.length > 0 ? this.foundationsLastKey : "none";
    this.foundationsKeyTargetText.text("Focus me, then press keys. Last key: " + lastKey);
  }

  private setSummary(value: string): void {
    this.summaryText.text(value);
  }

  private buildSelectionSummary(): string {
    const dropdownIndex = this.dropdown.selectedIndex;
    const dropdownLabel = dropdownIndex >= 0 && dropdownIndex < this.dropdownItems.length
      ? unchecked(this.dropdownItems[dropdownIndex]).label
      : "none";
    const triState = HomeView.checkedStateLabel(this.triStateCheckbox.checkedState);
    const biState = this.biStateCheckbox.checked ? "checked" : "unchecked";
    const radio = this.qualityRadioGroup.selectedValue;
    const horizontal = <i32>Math.round(this.horizontalSlider.value);
    const vertical = <i32>Math.round(this.verticalSlider.value);
    return "Selections: size=" +
      dropdownLabel +
      ", tri=" +
      triState +
      ", bi=" +
      biState +
      ", radio=" +
      radio +
      ", horizontal=" +
      horizontal.toString() +
      ", vertical=" +
      vertical.toString();
  }

  private static premultiplyChannel(channel: u8, alpha: u8): u8 {
    return <u8>((<u32>channel * <u32>alpha + 127) / 255);
  }

  private static setPremultipliedPixel(pixels: Uint8Array, width: i32, x: i32, y: i32, red: u8, green: u8, blue: u8, alpha: u8): void {
    const offset = (x + (y * width)) * 4;
    pixels[offset + 0] = HomeView.premultiplyChannel(red, alpha);
    pixels[offset + 1] = HomeView.premultiplyChannel(green, alpha);
    pixels[offset + 2] = HomeView.premultiplyChannel(blue, alpha);
    pixels[offset + 3] = alpha;
  }

  private static createCustomBitmap(): Bitmap {
    const bitmap = new Bitmap(HomeView.DEMO_BITMAP_SIZE, HomeView.DEMO_BITMAP_SIZE);
    const pixels = bitmap.pixels();
    const center = (HomeView.DEMO_BITMAP_SIZE - 1.0) * 0.5;

    const scale: f64 = f64(HomeView.DEMO_BITMAP_SIZE) / 96.0;
    const radius: f64 = 34.0 * scale;
    const radiusSquared: f64 = radius * radius;

    const minSquare: i32 = i32(20.0 * scale);
    const maxSquare: i32 = i32(76.0 * scale);
    const diagMin: i32 = i32(93.0 * scale);
    const diagMax: i32 = i32(99.0 * scale);

    memory.fill(pixels.dataStart, 0, pixels.length);

    for (let y: i32 = 0; y < <i32>HomeView.DEMO_BITMAP_SIZE; ++y) {
      for (let x: i32 = 0; x < <i32>HomeView.DEMO_BITMAP_SIZE; ++x) {
        const dx: f64 = x - center;
        const dy: f64 = y - center;
        const distanceSquared: f64 = (dx * dx) + (dy * dy);

        if (distanceSquared <= radiusSquared) {
          const falloff: f64 = 1.0 - (distanceSquared / radiusSquared);
          const alpha: u8 = <u8>(64.0 + (falloff * 144.0));
          HomeView.setPremultipliedPixel(pixels, HomeView.DEMO_BITMAP_SIZE, x, y, 0xff, 0x40, 0x40, alpha);
        }

        if (x >= minSquare && x <= maxSquare && y >= minSquare && y <= maxSquare) {
          const diagonal: i32 = x + y;
          if (diagonal >= diagMin && diagonal <= diagMax) {
            HomeView.setPremultipliedPixel(pixels, HomeView.DEMO_BITMAP_SIZE, x, y, 0xff, 0xff, 0x22, 0xd8);
          }
        }
      }
    }

    bitmap.commit();
    return bitmap;
  }

  private static checkedStateLabel(value: SemanticCheckedState): string {
    if (value == SemanticCheckedState.True) {
      return "checked";
    }
    if (value == SemanticCheckedState.Mixed) {
      return "mixed";
    }
    return "unchecked";
  }

  private static debugShortcutLabel(): string {
    switch (getPlatformFamily()) {
      case PlatformFamily.Apple:
        return "Cmd+Shift+F12";
      case PlatformFamily.Windows:
        return "Win+Shift+F12";
      case PlatformFamily.Linux:
        return "Super+Shift+F12";
      default:
        return "Meta+Shift+F12";
    }
  }

  private static formatElapsedTime(totalSeconds: i32): string {
    const safeSeconds = totalSeconds > 0 ? totalSeconds : 0;
    const hours = safeSeconds / 3600;
    const minutes = (safeSeconds % 3600) / 60;
    const seconds = safeSeconds % 60;
    return HomeView.pad2(hours) + ":" + HomeView.pad2(minutes) + ":" + HomeView.pad2(seconds);
  }

  private static pad2(value: i32): string {
    return value < 10 ? "0" + value.toString() : value.toString();
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
