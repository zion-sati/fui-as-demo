import {
  Fetch,
  FetchErrorEventArgs,
  FetchRequest,
  FetchResponse,
  Unit } from "../../fui/Fui";
import { DemoButton,
  DemoButtonTone,
  DemoText,
  DemoTextStyle,
} from "../shared/design-system";

export class FetchSection {
  readonly getButton: DemoButton = new DemoButton("GET /posts/1")
    .width(156.0, Unit.Pixel) as DemoButton;
  readonly postButton: DemoButton = new DemoButton("POST /posts", DemoButtonTone.Primary)
    .width(156.0, Unit.Pixel) as DemoButton;
  readonly statusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  readonly requestText: DemoText = new DemoText("", DemoTextStyle.BodySecondary) as DemoText;
  readonly resultText: DemoText = new DemoText("", DemoTextStyle.BodySecondary)
    .maxLines(5) as DemoText;
  readonly hintText: DemoText = new DemoText(
    "This demo uses the shipped Fetch API against the live JSONPlaceholder service. The request is real and online; the current Fetch surface reports completion metadata (ok, status, statusText, resolved url) rather than response bodies.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;

  activeFetchRequest: FetchRequest | null = null;
  fetchRequestLabel: string = "";

  attachBindings(): void {
    this.getButton.onClickWith(this, (section): void => {
      section.startFetchRequest("GET");
    });
    this.postButton.onClickWith(this, (section): void => {
      section.startFetchRequest("POST");
    });
  }

  dispose(): void {
    const req = this.activeFetchRequest;
    this.activeFetchRequest = null;
    if (req != null) {
      req.dispose();
    }
  }

  private startFetchRequest(method: string): void {
    const req = this.activeFetchRequest;
    this.activeFetchRequest = null;
    if (req != null) {
      req.dispose();
    }
    const url = method == "GET"
      ? "https://jsonplaceholder.typicode.com/posts/1"
      : "https://jsonplaceholder.typicode.com/posts";
    let request = Fetch.request(url);
    if (method == "POST") {
      request = request.method("POST")
        .header("Content-Type", "application/json; charset=UTF-8")
        .bodyText('{"title":"EffinDom demo","body":"Posted through the shipped Fetch API.","userId":29}');
    }
    this.fetchRequestLabel = method + " " + url;
    this.activeFetchRequest = request
      .onCompleteWith(this, handleFetchCompleteFn)
      .onErrorWith(this, handleFetchErrorFn)
      .start();
    this.statusText.text("Fetch status: running");
    this.requestText.text("Request: " + this.fetchRequestLabel);
    this.resultText.text("Waiting for JSONPlaceholder to respond...");
  }
}

function handleFetchCompleteFn(section: FetchSection, response: FetchResponse): void {
  section.statusText.text("Fetch status: complete");
  section.resultText.text(
    section.fetchRequestLabel + " -> ok=" + (response.ok ? "true" : "false") +
    " - status " + response.status.toString() +
    " " + response.statusText +
    " - url " + response.url,
  );
  section.dispose();
}

function handleFetchErrorFn(section: FetchSection, event: FetchErrorEventArgs): void {
  section.statusText.text("Fetch status: error");
  section.resultText.text(section.fetchRequestLabel + " -> error - " + event.message);
  section.dispose();
}
