import { DemoButton } from "../shared/design-system/DemoButton";
import { DemoText, DemoTextStyle } from "../shared/design-system/DemoText";
import { ProgressBar, Unit, Worker } from "../../fui/Fui";

function parseLeadingPercent(text: string): f32 {
  let value: i32 = 0;
  let sawDigit: bool = false;
  for (let i: i32 = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      sawDigit = true;
      value = (value * 10) + (code - 48);
      continue;
    }
    if (sawDigit) {
      break;
    }
  }
  return <f32>value;
}

export class WorkerSection {
  readonly progressBar: ProgressBar = new ProgressBar(0.0).length(320.0) as ProgressBar;
  readonly startButton: DemoButton = new DemoButton("Start prime worker")
    .width(170.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly cancelButton: DemoButton = new DemoButton("Cancel prime worker")
    .width(170.0, Unit.Pixel).height(60.0, Unit.Pixel) as DemoButton;
  readonly statusText: DemoText = new DemoText("", DemoTextStyle.Caption) as DemoText;
  readonly detailText: DemoText = new DemoText("", DemoTextStyle.BodySecondary) as DemoText;
  readonly hintText: DemoText = new DemoText(
    "This sample connects the Worker API to a retained ProgressBar. Start runs a 5-second prime search with once-per-second yields; cancel waits for the next yield and then reports cooperative cancellation.",
    DemoTextStyle.BodySecondary,
  ) as DemoText;

  private workerInstance: Worker | null = null;

  attachBindings(): void {
    this.startButton.onClickWith(this, (section): void => {
      section.startWorker();
    });
    this.cancelButton.onClickWith(this, (section): void => {
      section.cancelWorker();
    });
  }

  dispose(): void {
    this.cancelWorker();
  }

  private startWorker(): void {
    if (this.workerInstance != null) {
      return;
    }

    this.progressBar.value(0.0);
    this.statusText.text("Worker: computing primes...");
    this.detailText.text("");

    const worker = Worker.start("largestPrimeCalculatorWorker")
      .onProgress(this, (section, message: string): void => {
        const pct = parseLeadingPercent(message);
        section.progressBar.value(pct);
        section.detailText.text("Prime search progress: " + pct.toString() + "%.");
      })
      .onComplete(this, (section, result: string): void => {
        section.workerInstance = null;
        section.progressBar.value(100.0);
        section.statusText.text("Worker: completed");
        section.detailText.text("Largest prime after 5s: " + result);
      })
      .onError(this, (section, message: string): void => {
        section.workerInstance = null;
        if (message.indexOf("cancelled:") == 0) {
          const cancelledPct = parseLeadingPercent(message);
          section.progressBar.value(cancelledPct);
          section.statusText.text("Worker: cancelled");
          section.detailText.text(
            "Prime search cancelled after yielding at " + cancelledPct.toString() + "%.",
          );
        } else {
          section.statusText.text("Worker: error");
          section.detailText.text("Worker error: " + message);
        }
      });
    this.workerInstance = worker;
    worker.sendString("advanced-demo");
  }

  private cancelWorker(): void {
    const worker = this.workerInstance;
    if (worker != null) {
      worker.cancel();
    }
  }
}
