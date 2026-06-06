export * from "@effindomv2/fui-as/src/FuiWorkerExports";

import {
  WorkerJob,
  fui_file_read_chunk,
  fui_file_worker_write_chunk,
  Worker as WorkerRuntime,
} from "@effindomv2/fui-as/src/FuiWorker";
import { __fui_worker_text_buffer } from "@effindomv2/fui-as/src/FuiWorkerExports";
import { JSON } from "@devcycle/assemblyscript-json/assembly/index";
import { appWorkerClockWallClockSinceEpochMs } from "../host/generated/WorkerHostServices";

const PRIME_SEARCH_TOTAL_MS: f64 = 5000.0;
const PRIME_SEARCH_YIELD_INTERVAL_MS: f64 = 10.0;
const PRIME_TIME_CHECK_MASK: i32 = 127;

function parsePrimeSearchPercent(startedAtMs: f64, nowMs: f64): i32 {
  const elapsedMs = nowMs - startedAtMs;
  if (elapsedMs <= 0.0) {
    return 0;
  }
  if (elapsedMs >= PRIME_SEARCH_TOTAL_MS) {
    return 100;
  }
  return <i32>((elapsedMs * 100.0) / PRIME_SEARCH_TOTAL_MS);
}

function isPrime(value: i32): bool {
  if (value < 2) {
    return false;
  }
  if (value == 2) {
    return true;
  }
  if ((value & 1) == 0) {
    return false;
  }
  let divisor: i32 = 3;
  while (divisor <= value / divisor) {
    if (value % divisor == 0) {
      return false;
    }
    divisor += 2;
  }
  return true;
}

class LargestPrimeCalculatorJob extends WorkerJob {
  private startedAtMs: f64 = 0.0;
  private deadlineMs: f64 = 0.0;
  private nextYieldAtMs: f64 = 0.0;
  private candidate: i32 = 2;
  private largestPrime: i32 = 2;

  protected onStart(): void {
    this.receiveMessage();
    const now = appWorkerClockWallClockSinceEpochMs();
    this.startedAtMs = now;
    this.deadlineMs = now + PRIME_SEARCH_TOTAL_MS;
    this.nextYieldAtMs = now + PRIME_SEARCH_YIELD_INTERVAL_MS;
    this.candidate = 2;
    this.largestPrime = 2;
  }

  run(): void {
    if (this.isCancelled()) {
      this.fail("cancelled:" + parsePrimeSearchPercent(this.startedAtMs, appWorkerClockWallClockSinceEpochMs()).toString());
      return;
    }
    let now = appWorkerClockWallClockSinceEpochMs();
    const sliceDeadline = this.nextYieldAtMs < this.deadlineMs ? this.nextYieldAtMs : this.deadlineMs;
    while (now < sliceDeadline) {
      if (isPrime(this.candidate)) {
        this.largestPrime = this.candidate;
      }
      this.candidate += 1;
      if ((this.candidate & PRIME_TIME_CHECK_MASK) == 0) {
        now = appWorkerClockWallClockSinceEpochMs();
      }
    }
    now = appWorkerClockWallClockSinceEpochMs();
    this.reportProgress(parsePrimeSearchPercent(this.startedAtMs, now).toString());
    if (now >= this.deadlineMs) {
      this.complete(this.largestPrime.toString());
      return;
    }
    this.nextYieldAtMs += PRIME_SEARCH_YIELD_INTERVAL_MS;
    if (this.nextYieldAtMs > this.deadlineMs) {
      this.nextYieldAtMs = this.deadlineMs;
    }
    this.yield();
  }
}

let largestPrimeCalculatorJob: LargestPrimeCalculatorJob | null = null;

export function largestPrimeCalculatorWorker(): void {
  let activeJob = largestPrimeCalculatorJob;
  if (activeJob === null) {
    activeJob = new LargestPrimeCalculatorJob();
  }
  largestPrimeCalculatorJob = WorkerJob.resume<LargestPrimeCalculatorJob>(activeJob);
}

export function fileProcessorWorker(): void {
  const READ_CHUNK_SIZE: i32 = 65536;
  const bufPtr = __fui_worker_text_buffer();

  let offset: u64 = 0;
  let hash: u32 = 5381;

  while (true) {
    const offsetLow = i32(offset & 0xFFFFFFFF);
    const offsetHigh = i32((offset >> 32) & 0xFFFFFFFF);

    const bytesRead = fui_file_read_chunk(offsetLow, offsetHigh, READ_CHUNK_SIZE);
    if (bytesRead <= 0) {
      break;
    }

    for (let i: i32 = 0; i < bytesRead; i++) {
      hash = ((hash << 5) + hash) + u32(load<u8>(bufPtr + i));
    }

    fui_file_worker_write_chunk(bufPtr, bytesRead);
    offset += u64(bytesRead);

    WorkerRuntime.reportProgress(offset.toString());
  }

  const result = new JSON.Obj();
  result.set("hash", hash);
  result.set("algo", "djb2");
  result.set("bytes", i64(offset));
  WorkerRuntime.complete(result.stringify());
}
