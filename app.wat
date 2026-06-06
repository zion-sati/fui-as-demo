(module
 (type $0 (func (param i32) (result i32)))
 (type $1 (func (param i32 i32)))
 (type $2 (func (param i32 i32) (result i32)))
 (type $3 (func (param i32)))
 (type $4 (func (param i32 i32 i32)))
 (type $5 (func))
 (type $6 (func (param i32 i32 i32) (result i32)))
 (type $7 (func (result i32)))
 (type $8 (func (param i64) (result i32)))
 (type $9 (func (param i32 i32 i32 i32)))
 (type $10 (func (result f64)))
 (type $11 (func (param i32 i64 i32)))
 (type $12 (func (param i32 i32 i64)))
 (type $13 (func (param f64 f64) (result i32)))
 (type $14 (func (param i32 i32 i32 i32 i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "fui_host_service" "appWorkerClockWallClockSinceEpochMs" (func $src/host/generated/WorkerHostServices/__host_appWorkerClockWallClockSinceEpochMs (result f64)))
 (import "fui_worker_host" "fui_worker_request_yield" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_request_yield))
 (import "fui_worker_host" "fui_worker_report_progress" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_report_progress (param i32 i32)))
 (import "fui_worker_host" "fui_worker_is_cancelled" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_is_cancelled (result i32)))
 (import "fui_worker_host" "fui_worker_input_length" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_input_length (result i32)))
 (import "fui_worker_host" "fui_worker_fail" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_fail (param i32 i32)))
 (import "fui_worker_host" "fui_worker_copy_input" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_copy_input (param i32 i32) (result i32)))
 (import "fui_worker_host" "fui_worker_complete_string" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_complete_string (param i32 i32)))
 (import "fui_worker_host" "fui_file_worker_write_chunk" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_file_worker_write_chunk (param i32 i32)))
 (import "fui_worker_host" "fui_file_read_chunk" (func $~lib/@effindomv2/fui-as/src/worker/ffi/fui_file_read_chunk (param i32 i32 i32) (result i32)))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/total (mut i32) (i32.const 0))
 (global $~lib/@effindomv2/fui-as/src/core/Fetch/pendingFetchRequests (mut i32) (i32.const 0))
 (global $~lib/@effindomv2/fui-as/src/worker/Worker/inputRead (mut i32) (i32.const 0))
 (global $~lib/@effindomv2/fui-as/src/worker/Worker/inputCache (mut i32) (i32.const 1696))
 (global $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent (mut i32) (i32.const 0))
 (global $~lib/@effindomv2/fui-as/src/worker/Worker/WORKER_CALLBACK_BUFFER (mut i32) (i32.const 0))
 (global $src/workers/advanced_workers/largestPrimeCalculatorJob (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/__rtti_base i32 (i32.const 3504))
 (memory $0 1)
 (data $0 (i32.const 1036) ",")
 (data $0.1 (i32.const 1048) "\02\00\00\00\1a\00\00\00F\00e\00t\00c\00h\00.\00r\00e\00q\00u\00e\00s\00t")
 (data $1 (i32.const 1084) "<")
 (data $1.1 (i32.const 1096) "\02\00\00\00&\00\00\00F\00e\00t\00c\00h\00R\00e\00q\00u\00e\00s\00t\00.\00m\00e\00t\00h\00o\00d")
 (data $2 (i32.const 1148) "<")
 (data $2.1 (i32.const 1160) "\02\00\00\00&\00\00\00F\00e\00t\00c\00h\00R\00e\00q\00u\00e\00s\00t\00.\00h\00e\00a\00d\00e\00r")
 (data $3 (i32.const 1212) "<")
 (data $3.1 (i32.const 1224) "\02\00\00\00,\00\00\00F\00e\00t\00c\00h\00R\00e\00q\00u\00e\00s\00t\00.\00b\00o\00d\00y\00B\00y\00t\00e\00s")
 (data $4 (i32.const 1276) "<")
 (data $4.1 (i32.const 1288) "\02\00\00\00*\00\00\00F\00e\00t\00c\00h\00R\00e\00q\00u\00e\00s\00t\00.\00b\00o\00d\00y\00T\00e\00x\00t")
 (data $5 (i32.const 1340) "<")
 (data $5.1 (i32.const 1352) "\02\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data $6 (i32.const 1404) "<")
 (data $6.1 (i32.const 1416) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00c\00m\00s\00.\00t\00s")
 (data $7 (i32.const 1468) "<")
 (data $7.1 (i32.const 1480) "\02\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data $9 (i32.const 1564) ",")
 (data $9.1 (i32.const 1576) "\02\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data $10 (i32.const 1612) "<")
 (data $10.1 (i32.const 1624) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data $11 (i32.const 1676) "\1c")
 (data $11.1 (i32.const 1688) "\02")
 (data $12 (i32.const 1708) ",")
 (data $12.1 (i32.const 1720) "\02\00\00\00\14\00\00\00c\00a\00n\00c\00e\00l\00l\00e\00d\00:")
 (data $13 (i32.const 1756) "|")
 (data $13.1 (i32.const 1768) "\02\00\00\00d\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00(\00)\00 \00r\00a\00d\00i\00x\00 \00a\00r\00g\00u\00m\00e\00n\00t\00 \00m\00u\00s\00t\00 \00b\00e\00 \00b\00e\00t\00w\00e\00e\00n\00 \002\00 \00a\00n\00d\00 \003\006")
 (data $14 (i32.const 1884) "<")
 (data $14.1 (i32.const 1896) "\02\00\00\00&\00\00\00~\00l\00i\00b\00/\00u\00t\00i\00l\00/\00n\00u\00m\00b\00e\00r\00.\00t\00s")
 (data $15 (i32.const 1948) "\1c")
 (data $15.1 (i32.const 1960) "\02\00\00\00\02\00\00\000")
 (data $16 (i32.const 1980) "\\")
 (data $16.1 (i32.const 1992) "\02\00\00\00H\00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z")
 (data $17 (i32.const 2076) "\1c")
 (data $17.1 (i32.const 2088) "\0e\00\00\00\08\00\00\00\01")
 (data $18 (i32.const 2108) "<")
 (data $18.1 (i32.const 2120) "\02\00\00\00$\00\00\00U\00n\00p\00a\00i\00r\00e\00d\00 \00s\00u\00r\00r\00o\00g\00a\00t\00e")
 (data $19 (i32.const 2172) ",")
 (data $19.1 (i32.const 2184) "\02\00\00\00\1c\00\00\00~\00l\00i\00b\00/\00s\00t\00r\00i\00n\00g\00.\00t\00s")
 (data $20 (i32.const 2220) "<")
 (data $20.1 (i32.const 2232) "\02\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data $21 (i32.const 2284) "<")
 (data $21.1 (i32.const 2296) "\02\00\00\00$\00\00\00~\00l\00i\00b\00/\00t\00y\00p\00e\00d\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $22 (i32.const 2348) "\1c")
 (data $22.1 (i32.const 2360) "\0e\00\00\00\08\00\00\00\02")
 (data $23 (i32.const 2380) "\1c")
 (data $23.1 (i32.const 2392) "\0e\00\00\00\08\00\00\00\03")
 (data $24 (i32.const 2412) "\1c")
 (data $24.1 (i32.const 2424) "\02\00\00\00\08\00\00\00h\00a\00s\00h")
 (data $25 (i32.const 2444) "\1c")
 (data $25.1 (i32.const 2456) "\02\00\00\00\08\00\00\00a\00l\00g\00o")
 (data $26 (i32.const 2476) "\1c")
 (data $26.1 (i32.const 2488) "\02\00\00\00\08\00\00\00d\00j\00b\002")
 (data $27 (i32.const 2508) "\1c")
 (data $27.1 (i32.const 2520) "\02\00\00\00\n\00\00\00b\00y\00t\00e\00s")
 (data $28 (i32.const 2540) ",")
 (data $28.1 (i32.const 2552) "\02\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data $29 (i32.const 2588) "|")
 (data $29.1 (i32.const 2600) "\02\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y")
 (data $30 (i32.const 2716) "<")
 (data $30.1 (i32.const 2728) "\02\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t")
 (data $31 (i32.const 2780) ",")
 (data $31.1 (i32.const 2792) "\02\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s")
 (data $32 (i32.const 2828) "\1c")
 (data $32.1 (i32.const 2840) "\02\00\00\00\02\00\00\00\"")
 (data $33 (i32.const 2860) "\1c")
 (data $33.1 (i32.const 2872) "\02\00\00\00\04\00\00\00\"\00:")
 (data $34 (i32.const 2892) "\1c")
 (data $34.1 (i32.const 2904) "\02\00\00\00\02\00\00\00{")
 (data $35 (i32.const 2924) "\1c")
 (data $35.1 (i32.const 2936) "\02\00\00\00\02\00\00\00,")
 (data $36 (i32.const 2956) "\1c")
 (data $36.1 (i32.const 2968) "\02\00\00\00\02\00\00\00}")
 (data $37 (i32.const 2988) "<")
 (data $37.1 (i32.const 3000) "\02\00\00\00*\00\00\00F\00e\00t\00c\00h\00 \00r\00e\00q\00u\00e\00s\00t\00 \00f\00a\00i\00l\00e\00d\00.")
 (data $38 (i32.const 3052) "<")
 (data $38.1 (i32.const 3064) "\02\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d")
 (data $40 (i32.const 3148) "<")
 (data $40.1 (i32.const 3160) "\02\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d")
 (data $42 (i32.const 3244) "\1c")
 (data $42.1 (i32.const 3256) "\02\00\00\00\04\00\00\00\\\00\"")
 (data $43 (i32.const 3276) "\1c")
 (data $43.1 (i32.const 3288) "\02\00\00\00\04\00\00\00\\\00\\")
 (data $44 (i32.const 3308) "\1c")
 (data $44.1 (i32.const 3320) "\02\00\00\00\04\00\00\00\\\00b")
 (data $45 (i32.const 3340) "\1c")
 (data $45.1 (i32.const 3352) "\02\00\00\00\04\00\00\00\\\00n")
 (data $46 (i32.const 3372) "\1c")
 (data $46.1 (i32.const 3384) "\02\00\00\00\04\00\00\00\\\00r")
 (data $47 (i32.const 3404) "\1c")
 (data $47.1 (i32.const 3416) "\02\00\00\00\04\00\00\00\\\00t")
 (data $48 (i32.const 3436) "\1c")
 (data $48.1 (i32.const 3448) "\02\00\00\00\04\00\00\00\\\00f")
 (data $49 (i32.const 3468) "\1c")
 (data $49.1 (i32.const 3480) "\02\00\00\00\0c\00\00\00\\\00u\000\000\000\00b")
 (data $50 (i32.const 3504) "\14\00\00\00 \00\00\00 \00\00\00 ")
 (data $50.1 (i32.const 3528) " \00\00\00\02A\00\00A\00\00\00\00\00\00\00 \00\00\00 \00\00\00\10A\02\00 \00\00\00 ")
 (data $50.2 (i32.const 3572) " \00\00\00\10A\82\00 ")
 (table $0 4 4 funcref)
 (elem $0 (i32.const 1) $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.fail~anonymous|0 $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.reportProgress~anonymous|0 $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.complete~anonymous|0)
 (export "largestPrimeCalculatorWorker" (func $src/workers/advanced_workers/largestPrimeCalculatorWorker))
 (export "fileProcessorWorker" (func $src/workers/advanced_workers/fileProcessorWorker))
 (export "__fui_on_fetch_complete" (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_complete))
 (export "__fui_on_fetch_error" (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_error))
 (export "__fui_worker_text_buffer" (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer))
 (export "__fui_worker_text_buffer_size" (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer_size))
 (export "__new" (func $~lib/rt/tcms/__new))
 (export "__pin" (func $~lib/rt/tcms/__pin))
 (export "__unpin" (func $~lib/rt/tcms/__unpin))
 (export "__collect" (func $~lib/rt/tcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (start $~start)
 (func $~lib/rt/tcms/__visit (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  global.get $~lib/rt/tcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/tcms/Object#unlink
   local.get $0
   global.get $~lib/rt/tcms/toSpace
   global.get $~lib/rt/tcms/white
   i32.eqz
   call $~lib/rt/tcms/Object#linkTo
  end
 )
 (func $~lib/rt/tcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1360
   i32.const 1424
   i32.const 125
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.get $0
  i32.const 16
  i32.add
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  local.get $2
  global.get $~lib/rt/tcms/fromSpace
  global.get $~lib/rt/tcms/white
  call $~lib/rt/tcms/Object#linkTo
  global.get $~lib/rt/tcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/tcms/total
  local.get $2
  i32.const 20
  i32.add
 )
 (func $~lib/string/String.__concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  i32.const 1696
  local.set $2
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const -2
  i32.and
  local.tee $3
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const -2
  i32.and
  local.tee $4
  i32.add
  local.tee $5
  if
   local.get $5
   i32.const 2
   call $~lib/rt/tcms/__new
   local.tee $2
   local.get $0
   local.get $3
   memory.copy
   local.get $2
   local.get $3
   i32.add
   local.get $1
   local.get $4
   memory.copy
  end
  local.get $2
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1584
   i32.const 1632
   i32.const 52
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 1
  call $~lib/rt/tcms/__new
  local.tee $1
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
 )
 (func $~lib/string/String.__eq (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  local.get $1
  i32.eq
  if
   i32.const 1
   return
  end
  local.get $1
  i32.eqz
  local.get $0
  i32.eqz
  i32.or
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $3
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.ne
  if
   i32.const 0
   return
  end
  block $__inlined_func$~lib/util/string/compareImpl$15 (result i32)
   local.get $0
   local.tee $2
   i32.const 7
   i32.and
   local.get $1
   i32.const 7
   i32.and
   i32.or
   i32.eqz
   local.get $3
   local.tee $0
   i32.const 4
   i32.ge_u
   i32.and
   if
    loop $do-loop|0
     local.get $2
     i64.load
     local.get $1
     i64.load
     i64.eq
     if
      local.get $2
      i32.const 8
      i32.add
      local.set $2
      local.get $1
      i32.const 8
      i32.add
      local.set $1
      local.get $0
      i32.const 4
      i32.sub
      local.tee $0
      i32.const 4
      i32.ge_u
      br_if $do-loop|0
     end
    end
   end
   loop $while-continue|1
    local.get $0
    local.tee $3
    i32.const 1
    i32.sub
    local.set $0
    local.get $3
    if
     local.get $2
     i32.load16_u
     local.tee $3
     local.get $1
     i32.load16_u
     local.tee $4
     i32.ne
     if
      local.get $3
      local.get $4
      i32.sub
      br $__inlined_func$~lib/util/string/compareImpl$15
     end
     local.get $2
     i32.const 2
     i32.add
     local.set $2
     local.get $1
     i32.const 2
     i32.add
     local.set $1
     br $while-continue|1
    end
   end
   i32.const 0
  end
  i32.eqz
 )
 (func $~lib/util/hash/HASH<u32> (param $0 i32) (result i32)
  local.get $0
  i32.const -1028477379
  i32.mul
  i32.const 374761397
  i32.add
  i32.const 17
  i32.rotl
  i32.const 668265263
  i32.mul
  local.tee $0
  i32.const 15
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -2048144777
  i32.mul
  local.tee $0
  i32.const 13
  i32.shr_u
  local.get $0
  i32.xor
  i32.const -1028477379
  i32.mul
  local.tee $0
  i32.const 16
  i32.shr_u
  local.get $0
  i32.xor
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1488
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.tee $3
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1488
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $3
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $3
   local.get $3
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $3
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $2
   local.get $3
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $3
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1488
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $1
  local.get $0
  local.get $2
  i32.const 4
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.tee $1
  i32.load offset=96
  i32.eq
  if
   local.get $1
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $0
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $3
    i32.rotl
    i32.and
    local.set $3
    local.get $1
    local.get $3
    i32.store offset=4
    local.get $3
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $2
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tcms/Object#linkTo (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  i32.load offset=8
  local.set $3
  local.get $0
  local.get $1
  local.get $2
  i32.or
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $0
  call $~lib/rt/tcms/Object#set:next
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/array/Array<~lib/string/String>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  i32.const 16
  i32.const 6
  call $~lib/rt/tcms/__new
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 0
  i32.store offset=12
  local.get $0
  i32.const 268435455
  i32.gt_u
  if
   i32.const 1584
   i32.const 2560
   i32.const 70
   i32.const 60
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 8
  local.get $0
  local.get $0
  i32.const 8
  i32.le_u
  select
  i32.const 2
  i32.shl
  local.tee $2
  i32.const 1
  call $~lib/rt/tcms/__new
  local.tee $3
  i32.const 0
  local.get $2
  memory.fill
  local.get $1
  local.get $3
  i32.store
  local.get $1
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  local.get $1
  local.get $0
  i32.store offset=12
  local.get $1
 )
 (func $~lib/util/number/utoa_dec_simple<u32> (param $0 i32) (param $1 i32) (param $2 i32)
  loop $do-loop|0
   local.get $0
   local.get $2
   i32.const 1
   i32.sub
   local.tee $2
   i32.const 1
   i32.shl
   i32.add
   local.get $1
   i32.const 10
   i32.rem_u
   i32.const 48
   i32.add
   i32.store16
   local.get $1
   i32.const 10
   i32.div_u
   local.tee $1
   br_if $do-loop|0
  end
 )
 (func $~lib/util/number/itoa32 (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.eqz
  if
   i32.const 1968
   return
  end
  i32.const 0
  local.get $0
  i32.sub
  local.get $0
  local.get $0
  i32.const 31
  i32.shr_u
  i32.const 1
  i32.shl
  local.tee $3
  select
  local.tee $2
  call $~lib/util/number/decimalCount32
  local.tee $0
  i32.const 1
  i32.shl
  local.get $3
  i32.add
  i32.const 2
  call $~lib/rt/tcms/__new
  local.tee $1
  local.get $3
  i32.add
  local.get $2
  local.get $0
  call $~lib/util/number/utoa_dec_simple<u32>
  local.get $3
  if
   local.get $1
   i32.const 45
   i32.store16
  end
  local.get $1
 )
 (func $~lib/util/number/decimalCount32 (param $0 i32) (result i32)
  local.get $0
  i32.const 100000
  i32.lt_u
  if (result i32)
   local.get $0
   i32.const 10
   i32.ge_u
   i32.const 1
   i32.add
   local.get $0
   i32.const 10000
   i32.ge_u
   i32.const 3
   i32.add
   local.get $0
   i32.const 1000
   i32.ge_u
   i32.add
   local.get $0
   i32.const 100
   i32.lt_u
   select
  else
   local.get $0
   i32.const 1000000
   i32.ge_u
   i32.const 6
   i32.add
   local.get $0
   i32.const 1000000000
   i32.ge_u
   i32.const 8
   i32.add
   local.get $0
   i32.const 100000000
   i32.ge_u
   i32.add
   local.get $0
   i32.const 10000000
   i32.lt_u
   select
  end
 )
 (func $~lib/util/hash/HASH<~lib/string/String> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  if (result i32)
   local.get $0
   local.tee $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const -2
   i32.and
   local.tee $3
   i32.const 16
   i32.ge_u
   if (result i32)
    i32.const 606290984
    local.set $2
    i32.const -2048144777
    local.set $4
    i32.const 1640531535
    local.set $5
    local.get $1
    local.get $3
    i32.add
    i32.const 16
    i32.sub
    local.set $7
    loop $while-continue|0
     local.get $1
     local.get $7
     i32.le_u
     if
      local.get $2
      local.get $1
      i32.load
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $2
      local.get $4
      local.get $1
      i32.load offset=4
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $4
      local.get $6
      local.get $1
      i32.load offset=8
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $6
      local.get $5
      local.get $1
      i32.load offset=12
      i32.const -2048144777
      i32.mul
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $5
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    local.get $3
    local.get $2
    i32.const 1
    i32.rotl
    local.get $4
    i32.const 7
    i32.rotl
    i32.add
    local.get $6
    i32.const 12
    i32.rotl
    i32.add
    local.get $5
    i32.const 18
    i32.rotl
    i32.add
    i32.add
   else
    local.get $3
    i32.const 374761393
    i32.add
   end
   local.set $2
   local.get $0
   local.get $3
   i32.add
   i32.const 4
   i32.sub
   local.set $4
   loop $while-continue|1
    local.get $1
    local.get $4
    i32.le_u
    if
     local.get $2
     local.get $1
     i32.load
     i32.const -1028477379
     i32.mul
     i32.add
     i32.const 17
     i32.rotl
     i32.const 668265263
     i32.mul
     local.set $2
     local.get $1
     i32.const 4
     i32.add
     local.set $1
     br $while-continue|1
    end
   end
   local.get $0
   local.get $3
   i32.add
   local.set $0
   loop $while-continue|2
    local.get $0
    local.get $1
    i32.gt_u
    if
     local.get $2
     local.get $1
     i32.load8_u
     i32.const 374761393
     i32.mul
     i32.add
     i32.const 11
     i32.rotl
     i32.const -1640531535
     i32.mul
     local.set $2
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $while-continue|2
    end
   end
   local.get $2
   local.get $2
   i32.const 15
   i32.shr_u
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $0
   i32.const 13
   i32.shr_u
   local.get $0
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $0
   i32.const 16
   i32.shr_u
   local.get $0
   i32.xor
  else
   i32.const 0
  end
 )
 (func $~lib/string/String.UTF8.decodeUnsafe (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  local.get $1
  i32.add
  local.tee $3
  local.get $0
  i32.lt_u
  if
   i32.const 0
   i32.const 2192
   i32.const 770
   i32.const 7
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 1
  i32.shl
  i32.const 2
  call $~lib/rt/tcms/__new
  local.tee $4
  local.set $1
  loop $while-continue|0
   local.get $0
   local.get $3
   i32.lt_u
   if
    block $while-break|0
     local.get $0
     i32.load8_u
     local.set $5
     local.get $0
     i32.const 1
     i32.add
     local.set $0
     local.get $5
     i32.const 128
     i32.and
     if
      local.get $0
      local.get $3
      i32.eq
      br_if $while-break|0
      local.get $0
      i32.load8_u
      i32.const 63
      i32.and
      local.set $6
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      local.get $5
      i32.const 224
      i32.and
      i32.const 192
      i32.eq
      if
       local.get $1
       local.get $5
       i32.const 31
       i32.and
       i32.const 6
       i32.shl
       local.get $6
       i32.or
       i32.store16
      else
       local.get $0
       local.get $3
       i32.eq
       br_if $while-break|0
       local.get $0
       i32.load8_u
       i32.const 63
       i32.and
       local.set $2
       local.get $0
       i32.const 1
       i32.add
       local.set $0
       local.get $5
       i32.const 240
       i32.and
       i32.const 224
       i32.eq
       if
        local.get $5
        i32.const 15
        i32.and
        i32.const 12
        i32.shl
        local.get $6
        i32.const 6
        i32.shl
        i32.or
        local.get $2
        i32.or
        local.set $2
       else
        local.get $0
        local.get $3
        i32.eq
        br_if $while-break|0
        local.get $0
        i32.load8_u
        i32.const 63
        i32.and
        local.get $5
        i32.const 7
        i32.and
        i32.const 18
        i32.shl
        local.get $6
        i32.const 12
        i32.shl
        i32.or
        local.get $2
        i32.const 6
        i32.shl
        i32.or
        i32.or
        local.set $2
        local.get $0
        i32.const 1
        i32.add
        local.set $0
       end
       local.get $2
       i32.const 65536
       i32.lt_u
       if
        local.get $1
        local.get $2
        i32.store16
       else
        local.get $1
        local.get $2
        i32.const 65536
        i32.sub
        local.tee $2
        i32.const 10
        i32.shr_u
        i32.const 55296
        i32.or
        local.get $2
        i32.const 1023
        i32.and
        i32.const 56320
        i32.or
        i32.const 16
        i32.shl
        i32.or
        i32.store
        local.get $1
        i32.const 2
        i32.add
        local.set $1
       end
      end
     else
      local.get $1
      local.get $5
      i32.store16
     end
     local.get $1
     i32.const 2
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
  end
  local.get $4
  local.get $1
  local.get $4
  i32.sub
  call $~lib/rt/tcms/__renew
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1488
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1488
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1488
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1488
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  local.get $1
  i32.const 4
  i32.add
  local.get $2
  i32.add
  i32.ne
  if
   i32.const 0
   i32.const 1488
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1073741820
   local.get $2
   local.get $2
   i32.const 1073741820
   i32.ge_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1488
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $0
  local.get $5
  i32.const 4
  i32.shl
  local.get $2
  i32.add
  i32.const 2
  i32.shl
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $0
  local.get $5
  i32.const 2
  i32.shl
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 3600
  i32.const 0
  i32.store
  i32.const 5168
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 3600
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $0
      i32.const 4
      i32.shl
      local.get $1
      i32.add
      i32.const 2
      i32.shl
      i32.const 3600
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 3600
  i32.const 5172
  memory.size
  i64.extend_i32_s
  i64.const 16
  i64.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 3600
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/tlsf/checkUsedBlock (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.const 15
  i32.and
  i32.const 1
  local.get $0
  select
  if (result i32)
   i32.const 1
  else
   local.get $1
   i32.load
   i32.const 1
   i32.and
  end
  if
   i32.const 0
   i32.const 1488
   i32.const 562
   i32.const 3
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
 )
 (func $~lib/rt/tcms/initLazy (param $0 i32) (result i32)
  local.get $0
  local.get $0
  i32.store offset=4
  local.get $0
  local.get $0
  i32.store offset=8
  local.get $0
 )
 (func $~lib/rt/tcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   local.get $0
   i32.load offset=8
   i32.eqz
   local.get $0
   i32.const 3588
   i32.lt_u
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1424
    i32.const 101
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.eqz
  if
   i32.const 0
   i32.const 1424
   i32.const 105
   i32.const 16
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $1
  call $~lib/rt/tcms/Object#set:next
 )
 (func $~lib/rt/tcms/Object#set:next (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.or
  i32.store offset=4
 )
 (func $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#set" (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  local.tee $3
  call $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#find"
  local.tee $4
  if
   local.get $4
   local.get $2
   i32.store offset=4
  else
   local.get $0
   i32.load offset=16
   local.get $0
   i32.load offset=12
   i32.eq
   if
    local.get $0
    local.get $0
    i32.load offset=20
    local.get $0
    i32.load offset=12
    i32.const 3
    i32.mul
    i32.const 4
    i32.div_s
    i32.lt_s
    if (result i32)
     local.get $0
     i32.load offset=4
    else
     local.get $0
     i32.load offset=4
     i32.const 1
     i32.shl
     i32.const 1
     i32.or
    end
    call $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#rehash"
   end
   local.get $0
   i32.load offset=8
   local.get $0
   local.get $0
   i32.load offset=16
   local.tee $5
   i32.const 1
   i32.add
   i32.store offset=16
   local.get $5
   i32.const 12
   i32.mul
   i32.add
   local.tee $4
   local.get $1
   i32.store
   local.get $4
   local.get $2
   i32.store offset=4
   local.get $0
   local.get $0
   i32.load offset=20
   i32.const 1
   i32.add
   i32.store offset=20
   local.get $4
   local.get $0
   i32.load
   local.get $3
   local.get $0
   i32.load offset=4
   i32.and
   i32.const 2
   i32.shl
   i32.add
   local.tee $0
   i32.load
   i32.store offset=8
   local.get $0
   local.get $4
   i32.store
  end
 )
 (func $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>#find" (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.load
  local.get $2
  local.get $0
  i32.load offset=4
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  loop $while-continue|0
   local.get $0
   if
    local.get $0
    i32.load offset=8
    local.tee $2
    i32.const 1
    i32.and
    if (result i32)
     i32.const 0
    else
     local.get $0
     i32.load
     local.get $1
     i32.eq
    end
    if
     local.get $0
     return
    end
    local.get $2
    i32.const -2
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
  i32.const 0
 )
 (func $~lib/array/ensureCapacity (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $3
  i32.const 2
  i32.shr_u
  i32.gt_u
  if
   local.get $1
   i32.const 268435455
   i32.gt_u
   if
    i32.const 1584
    i32.const 2560
    i32.const 19
    i32.const 48
    call $~lib/builtins/abort
    unreachable
   end
   i32.const 8
   local.get $1
   local.get $1
   i32.const 8
   i32.le_u
   select
   i32.const 2
   i32.shl
   local.set $1
   local.get $2
   if
    i32.const 1073741820
    local.get $3
    i32.const 1
    i32.shl
    local.tee $2
    local.get $2
    i32.const 1073741820
    i32.ge_u
    select
    local.tee $2
    local.get $1
    local.get $1
    local.get $2
    i32.lt_u
    select
    local.set $1
   end
   local.get $3
   local.get $0
   i32.load
   local.tee $4
   local.get $1
   call $~lib/rt/tcms/__renew
   local.tee $2
   i32.add
   i32.const 0
   local.get $1
   local.get $3
   i32.sub
   memory.fill
   local.get $2
   local.get $4
   i32.ne
   if
    local.get $0
    local.get $2
    i32.store
    local.get $0
    local.get $2
    i32.store offset=4
   end
   local.get $0
   local.get $1
   i32.store offset=8
  end
 )
 (func $~lib/array/Array<~lib/string/String>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $1
  local.get $0
  i32.load offset=12
  i32.ge_u
  if
   local.get $1
   i32.const 0
   i32.lt_s
   if
    i32.const 2240
    i32.const 2560
    i32.const 130
    i32.const 22
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   i32.const 1
   i32.add
   local.tee $3
   i32.const 1
   call $~lib/array/ensureCapacity
   local.get $0
   local.get $3
   i32.store offset=12
  end
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  local.get $2
  i32.store
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/sendText (param $0 i32) (param $1 i32)
  local.get $0
  call $~lib/@effindomv2/fui-as/src/worker/Worker/encodeUtf8
  local.tee $0
  i32.load offset=8
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $0
   i32.load offset=4
  else
   i32.const 0
  end
  local.get $0
  i32.load offset=8
  local.get $1
  i32.load
  call_indirect (type $1)
 )
 (func $~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#constructor (param $0 i32) (result i32)
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 16
   call $~lib/rt/tcms/__new
   local.set $0
  end
  local.get $0
  if (result i32)
   local.get $0
  else
   i32.const 0
   i32.const 0
   call $~lib/rt/tcms/__new
  end
 )
 (func $~lib/util/string/joinReferenceArray<~lib/string/String> (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.const 1
  i32.sub
  local.tee $3
  i32.const 0
  i32.lt_s
  if
   i32.const 1696
   return
  end
  local.get $3
  i32.eqz
  if
   i32.const 1696
   local.get $0
   i32.load
   local.tee $0
   local.get $0
   i32.const 0
   call $~lib/string/String.__eq
   select
   return
  end
  i32.const 1696
  local.set $1
  local.get $2
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.set $5
  loop $for-loop|0
   local.get $3
   local.get $4
   i32.gt_s
   if
    local.get $0
    local.get $4
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    i32.const 0
    call $~lib/string/String.__eq
    i32.eqz
    if
     local.get $1
     local.get $6
     call $~lib/string/String.__concat
     local.set $1
    end
    local.get $5
    if
     local.get $1
     local.get $2
     call $~lib/string/String.__concat
     local.set $1
    end
    local.get $4
    i32.const 1
    i32.add
    local.set $4
    br $for-loop|0
   end
  end
  local.get $0
  local.get $3
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.const 0
  call $~lib/string/String.__eq
  if (result i32)
   local.get $1
  else
   local.get $1
   local.get $0
   call $~lib/string/String.__concat
  end
 )
 (func $~lib/util/number/utoa_dec_simple<u64> (param $0 i32) (param $1 i64) (param $2 i32)
  loop $do-loop|0
   local.get $0
   local.get $2
   i32.const 1
   i32.sub
   local.tee $2
   i32.const 1
   i32.shl
   i32.add
   local.get $1
   i64.const 10
   i64.rem_u
   i32.wrap_i64
   i32.const 48
   i32.add
   i32.store16
   local.get $1
   i64.const 10
   i64.div_u
   local.tee $1
   i64.const 0
   i64.ne
   br_if $do-loop|0
  end
 )
 (func $~lib/util/number/decimalCount64High (param $0 i64) (result i32)
  local.get $0
  i64.const 1000000000000000
  i64.lt_u
  if (result i32)
   local.get $0
   i64.const 100000000000
   i64.ge_u
   i32.const 10
   i32.add
   local.get $0
   i64.const 10000000000
   i64.ge_u
   i32.add
   local.get $0
   i64.const 100000000000000
   i64.ge_u
   i32.const 13
   i32.add
   local.get $0
   i64.const 10000000000000
   i64.ge_u
   i32.add
   local.get $0
   i64.const 1000000000000
   i64.lt_u
   select
  else
   local.get $0
   i64.const 10000000000000000
   i64.ge_u
   i32.const 16
   i32.add
   local.get $0
   i64.const -8446744073709551616
   i64.ge_u
   i32.const 18
   i32.add
   local.get $0
   i64.const 1000000000000000000
   i64.ge_u
   i32.add
   local.get $0
   i64.const 100000000000000000
   i64.lt_u
   select
  end
 )
 (func $~lib/typedarray/Uint8Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  i32.const 12
  i32.const 7
  call $~lib/rt/tcms/__new
  local.tee $1
  i32.eqz
  if
   i32.const 12
   i32.const 3
   call $~lib/rt/tcms/__new
   local.set $1
  end
  local.get $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1584
   i32.const 1632
   i32.const 19
   i32.const 57
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.const 1
  call $~lib/rt/tcms/__new
  local.tee $2
  i32.const 0
  local.get $0
  memory.fill
  local.get $1
  local.get $2
  i32.store
  local.get $1
  local.get $2
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $1
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $1
   call $~lib/rt/tlsf/roundSize
   local.tee $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $2
   local.get $1
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1488
   i32.const 334
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $2
  i32.const 2
  i32.shl
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $0
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $0
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1488
     i32.const 347
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/tlsf/roundSize (param $0 i32) (result i32)
  local.get $0
  i32.const 536870910
  i32.lt_u
  if (result i32)
   local.get $0
   i32.const 1
   i32.const 27
   local.get $0
   i32.clz
   i32.sub
   i32.shl
   i32.add
   i32.const 1
   i32.sub
  else
   local.get $0
  end
 )
 (func $~lib/rt/tlsf/prepareSize (param $0 i32) (result i32)
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1360
   i32.const 1488
   i32.const 461
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  i32.const 12
  local.get $0
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $0
  i32.const 12
  i32.le_u
  select
 )
 (func $~lib/rt/tlsf/prepareBlock (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.load
  local.set $3
  local.get $2
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1488
   i32.const 361
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $3
  i32.const -4
  i32.and
  local.get $2
  i32.sub
  local.tee $4
  i32.const 16
  i32.ge_u
  if
   local.get $1
   local.get $2
   local.get $3
   i32.const 2
   i32.and
   i32.or
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $2
   i32.add
   local.tee $1
   local.get $4
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $1
   local.get $3
   i32.const -2
   i32.and
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $0
   local.get $0
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
 )
 (func $~lib/rt/tlsf/moveBlock (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  local.get $2
  call $~lib/rt/tlsf/allocateBlock
  local.tee $2
  i32.const 4
  i32.add
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  memory.copy
  local.get $1
  i32.const 3588
  i32.ge_u
  if
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/freeBlock
  end
  local.get $2
 )
 (func $~lib/rt/tlsf/freeBlock (param $0 i32) (param $1 i32)
  local.get $1
  local.get $1
  i32.load
  i32.const 1
  i32.or
  i32.store
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/allocateBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/prepareSize
  local.tee $2
  call $~lib/rt/tlsf/searchBlock
  local.tee $1
  i32.eqz
  if
   local.get $2
   i32.const 256
   i32.ge_u
   if (result i32)
    local.get $2
    call $~lib/rt/tlsf/roundSize
   else
    local.get $2
   end
   i32.const 4
   local.get $0
   i32.load offset=1568
   memory.size
   local.tee $3
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.set $1
   local.get $3
   local.get $1
   local.get $1
   local.get $3
   i32.lt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $1
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $0
   local.get $3
   i32.const 16
   i32.shl
   memory.size
   i64.extend_i32_s
   i64.const 16
   i64.shl
   call $~lib/rt/tlsf/addMemory
   local.get $0
   local.get $2
   call $~lib/rt/tlsf/searchBlock
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1488
    i32.const 499
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.gt_u
  if
   i32.const 0
   i32.const 1488
   i32.const 501
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/removeBlock
  local.get $0
  local.get $1
  local.get $2
  call $~lib/rt/tlsf/prepareBlock
  local.get $1
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i64)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $2
  local.get $1
  i64.extend_i32_u
  i64.lt_u
  if
   i32.const 0
   i32.const 1488
   i32.const 382
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $3
  if
   local.get $3
   i32.const 4
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1488
    i32.const 389
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $3
   local.get $1
   i32.const 16
   i32.sub
   local.tee $5
   i32.eq
   if
    local.get $3
    i32.load
    local.set $4
    local.get $5
    local.set $1
   end
  else
   local.get $0
   i32.const 1572
   i32.add
   local.get $1
   i32.gt_u
   if
    i32.const 0
    i32.const 1488
    i32.const 402
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.wrap_i64
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $3
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $4
  i32.const 2
  i32.and
  local.get $3
  i32.const 8
  i32.sub
  local.tee $3
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $1
  i32.const 4
  i32.add
  local.get $3
  i32.add
  local.tee $3
  i32.const 2
  i32.store
  local.get $0
  local.get $3
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tcms/__renew (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $0
  i32.const 20
  i32.sub
  local.set $2
  local.get $0
  i32.const 3588
  i32.lt_u
  if
   local.get $1
   local.get $2
   i32.load offset=12
   call $~lib/rt/tcms/__new
   local.tee $3
   local.get $0
   local.get $1
   local.get $2
   i32.load offset=16
   local.tee $0
   local.get $0
   local.get $1
   i32.gt_u
   select
   memory.copy
   local.get $3
   return
  end
  local.get $1
  i32.const 1073741804
  i32.gt_u
  if
   i32.const 1360
   i32.const 1424
   i32.const 143
   i32.const 30
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/tcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.sub
  global.set $~lib/rt/tcms/total
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  local.get $1
  i32.const 16
  i32.add
  local.set $2
  local.get $0
  i32.const 16
  i32.sub
  local.tee $0
  i32.const 3588
  i32.lt_u
  if (result i32)
   global.get $~lib/rt/tlsf/ROOT
   local.get $0
   call $~lib/rt/tlsf/checkUsedBlock
   local.get $2
   call $~lib/rt/tlsf/moveBlock
  else
   block $__inlined_func$~lib/rt/tlsf/reallocateBlock$21 (result i32)
    global.get $~lib/rt/tlsf/ROOT
    local.set $5
    local.get $0
    call $~lib/rt/tlsf/checkUsedBlock
    local.set $0
    block $folding-inner0
     local.get $2
     call $~lib/rt/tlsf/prepareSize
     local.tee $3
     local.get $0
     i32.load
     local.tee $6
     i32.const -4
     i32.and
     local.tee $4
     i32.le_u
     br_if $folding-inner0
     local.get $0
     i32.const 4
     i32.add
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.add
     local.tee $7
     i32.load
     local.tee $8
     i32.const 1
     i32.and
     if
      local.get $4
      i32.const 4
      i32.add
      local.get $8
      i32.const -4
      i32.and
      i32.add
      local.tee $4
      local.get $3
      i32.ge_u
      if
       local.get $5
       local.get $7
       call $~lib/rt/tlsf/removeBlock
       local.get $0
       local.get $6
       i32.const 3
       i32.and
       local.get $4
       i32.or
       i32.store
       br $folding-inner0
      end
     end
     local.get $5
     local.get $0
     local.get $2
     call $~lib/rt/tlsf/moveBlock
     br $__inlined_func$~lib/rt/tlsf/reallocateBlock$21
    end
    local.get $5
    local.get $0
    local.get $3
    call $~lib/rt/tlsf/prepareBlock
    local.get $0
   end
  end
  i32.const 20
  i32.add
  local.tee $0
  i32.const 20
  i32.sub
  local.tee $2
  local.get $1
  i32.store offset=16
  local.get $2
  i32.load offset=4
  i32.const -4
  i32.and
  local.get $2
  i32.store offset=8
  local.get $2
  i32.load offset=8
  local.get $2
  call $~lib/rt/tcms/Object#set:next
  global.get $~lib/rt/tcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/tcms/total
  local.get $0
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  block $folding-inner0
   block $invalid
    block $~lib/@devcycle/assemblyscript-json/assembly/JSON/Integer
     block $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>"
      block $~lib/@devcycle/assemblyscript-json/assembly/JSON/Value
       block $~lib/function/Function<%28usize%2Cu32%29=>void>
        block $~lib/@effindomv2/fui-as/src/worker/WorkerJob/WorkerJob
         block $src/workers/advanced_workers/LargestPrimeCalculatorJob
          block $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>"
           block $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/string/String>
            block $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse>
             block $~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse
              block $~lib/array/Array<~lib/string/String>
               block $~lib/@effindomv2/fui-as/src/core/Disposable/Disposable
                block $~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest
                 block $~lib/string/String
                  block $~lib/arraybuffer/ArrayBuffer
                   block $~lib/object/Object
                    local.get $0
                    i32.const 8
                    i32.sub
                    i32.load
                    br_table $~lib/object/Object $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner0 $~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest $~lib/@effindomv2/fui-as/src/core/Disposable/Disposable $~lib/array/Array<~lib/string/String> $folding-inner0 $~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse> $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/string/String> $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>" $src/workers/advanced_workers/LargestPrimeCalculatorJob $~lib/@effindomv2/fui-as/src/worker/WorkerJob/WorkerJob $~lib/function/Function<%28usize%2Cu32%29=>void> $folding-inner0 $~lib/@devcycle/assemblyscript-json/assembly/JSON/Value $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>" $~lib/@devcycle/assemblyscript-json/assembly/JSON/Integer $folding-inner0 $invalid
                   end
                   return
                  end
                  return
                 end
                 return
                end
                local.get $0
                i32.load
                call $~lib/rt/tcms/__visit
                local.get $0
                i32.load offset=4
                call $~lib/rt/tcms/__visit
                local.get $0
                i32.load offset=8
                call $~lib/rt/tcms/__visit
                local.get $0
                i32.load offset=12
                call $~lib/rt/tcms/__visit
                local.get $0
                i32.load offset=16
                call $~lib/rt/tcms/__visit
                local.get $0
                i32.load offset=20
                call $~lib/rt/tcms/__visit
                return
               end
               return
              end
              local.get $0
              i32.load offset=4
              local.tee $1
              local.get $0
              i32.load offset=12
              i32.const 2
              i32.shl
              i32.add
              local.set $3
              loop $while-continue|0
               local.get $1
               local.get $3
               i32.lt_u
               if
                local.get $1
                i32.load
                local.tee $2
                if
                 local.get $2
                 call $~lib/rt/tcms/__visit
                end
                local.get $1
                i32.const 4
                i32.add
                local.set $1
                br $while-continue|0
               end
              end
              br $folding-inner0
             end
             local.get $0
             i32.load offset=8
             call $~lib/rt/tcms/__visit
             local.get $0
             i32.load offset=12
             call $~lib/rt/tcms/__visit
             return
            end
            return
           end
           return
          end
          local.get $0
          i32.load
          call $~lib/rt/tcms/__visit
          local.get $0
          i32.load offset=8
          local.tee $2
          local.tee $1
          local.get $0
          i32.load offset=16
          i32.const 12
          i32.mul
          i32.add
          local.set $0
          loop $while-continue|00
           local.get $0
           local.get $1
           i32.gt_u
           if
            local.get $1
            i32.load offset=8
            i32.const 1
            i32.and
            i32.eqz
            if
             local.get $1
             i32.load offset=4
             call $~lib/rt/tcms/__visit
            end
            local.get $1
            i32.const 12
            i32.add
            local.set $1
            br $while-continue|00
           end
          end
          local.get $2
          call $~lib/rt/tcms/__visit
          return
         end
         return
        end
        return
       end
       local.get $0
       i32.load offset=4
       call $~lib/rt/tcms/__visit
       return
      end
      return
     end
     local.get $0
     i32.load
     call $~lib/rt/tcms/__visit
     local.get $0
     i32.load offset=8
     local.tee $2
     local.tee $1
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $0
     loop $while-continue|01
      local.get $0
      local.get $1
      i32.gt_u
      if
       local.get $1
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        local.get $1
        i32.load
        call $~lib/rt/tcms/__visit
        local.get $1
        i32.load offset=4
        call $~lib/rt/tcms/__visit
       end
       local.get $1
       i32.const 12
       i32.add
       local.set $1
       br $while-continue|01
      end
     end
     local.get $2
     call $~lib/rt/tcms/__visit
     return
    end
    return
   end
   unreachable
  end
  local.get $0
  i32.load
  call $~lib/rt/tcms/__visit
 )
 (func $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#find" (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  local.get $0
  i32.load
  local.get $2
  local.get $0
  i32.load offset=4
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  loop $while-continue|0
   local.get $0
   if
    local.get $0
    i32.load offset=8
    local.tee $2
    i32.const 1
    i32.and
    if (result i32)
     i32.const 0
    else
     local.get $0
     i32.load
     local.get $1
     call $~lib/string/String.__eq
    end
    if
     local.get $0
     return
    end
    local.get $2
    i32.const -2
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
  i32.const 0
 )
 (func $~lib/array/Array<~lib/string/String>#__uget (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.reportProgress (param $0 i32)
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent
  if
   return
  end
  local.get $0
  i32.const 2368
  call $~lib/@effindomv2/fui-as/src/worker/Worker/sendText
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.complete (param $0 i32)
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent
  if
   return
  end
  i32.const 1
  global.set $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent
  local.get $0
  i32.const 2400
  call $~lib/@effindomv2/fui-as/src/worker/Worker/sendText
 )
 (func $~lib/@effindomv2/fui-as/src/core/Fetch/findPendingFetchRequest (param $0 i32) (result i32)
  global.get $~lib/@effindomv2/fui-as/src/core/Fetch/pendingFetchRequests
  local.get $0
  local.get $0
  call $~lib/util/hash/HASH<u32>
  call $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>#find"
  if (result i32)
   global.get $~lib/@effindomv2/fui-as/src/core/Fetch/pendingFetchRequests
   local.get $0
   local.get $0
   call $~lib/util/hash/HASH<u32>
   call $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>#find"
   local.tee $0
   i32.eqz
   if
    i32.const 2736
    i32.const 2800
    i32.const 105
    i32.const 17
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   i32.load offset=4
  else
   i32.const 0
  end
 )
 (func $~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest#finish (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.load8_u offset=29
  if
   return
  end
  local.get $0
  i32.load offset=24
  if
   global.get $~lib/@effindomv2/fui-as/src/core/Fetch/pendingFetchRequests
   local.tee $1
   local.get $0
   i32.load offset=24
   local.tee $2
   local.get $2
   call $~lib/util/hash/HASH<u32>
   call $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>#find"
   local.tee $2
   if
    local.get $2
    local.get $2
    i32.load offset=8
    i32.const 1
    i32.or
    i32.store offset=8
    local.get $1
    local.get $1
    i32.load offset=20
    i32.const 1
    i32.sub
    i32.store offset=20
    local.get $1
    i32.load offset=4
    i32.const 1
    i32.shr_u
    local.tee $3
    i32.const 1
    i32.add
    i32.const 4
    local.get $1
    i32.load offset=20
    local.tee $2
    local.get $2
    i32.const 4
    i32.lt_u
    select
    i32.ge_u
    if (result i32)
     local.get $1
     i32.load offset=20
     local.get $1
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
    else
     i32.const 0
    end
    if
     local.get $1
     local.get $3
     call $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>#rehash"
    end
   end
   local.get $0
   i32.const 0
   i32.store offset=24
  end
  local.get $0
  i32.const 1
  i32.store8 offset=29
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
 )
 (func $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse>#invoke@override (param $0 i32)
  local.get $0
  i32.const 8
  i32.sub
  i32.load
  unreachable
 )
 (func $~lib/@devcycle/assemblyscript-json/assembly/JSON/Obj#stringify (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i64)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  local.get $0
  i32.load
  local.tee $5
  i32.load offset=8
  local.set $6
  local.get $5
  i32.load offset=16
  local.tee $5
  call $~lib/array/Array<~lib/string/String>#constructor
  local.set $7
  loop $for-loop|0
   local.get $3
   local.get $5
   i32.lt_s
   if
    local.get $6
    local.get $3
    i32.const 12
    i32.mul
    i32.add
    local.tee $8
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     local.get $7
     local.get $1
     local.get $8
     i32.load
     call $~lib/array/Array<~lib/string/String>#__set
     local.get $1
     i32.const 1
     i32.add
     local.set $1
    end
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  local.get $7
  local.get $1
  i32.const 0
  call $~lib/array/ensureCapacity
  local.get $7
  local.get $1
  i32.store offset=12
  local.get $7
  i32.load offset=12
  call $~lib/array/Array<~lib/string/String>#constructor
  local.set $5
  loop $for-loop|00
   local.get $2
   local.get $7
   i32.load offset=12
   i32.lt_s
   if
    local.get $2
    local.get $7
    i32.load offset=12
    i32.ge_u
    if
     i32.const 2240
     i32.const 2560
     i32.const 114
     i32.const 42
     call $~lib/builtins/abort
     unreachable
    end
    local.get $7
    i32.load offset=4
    local.get $2
    i32.const 2
    i32.shl
    i32.add
    i32.load
    local.tee $6
    i32.eqz
    if
     i32.const 2608
     i32.const 2560
     i32.const 118
     i32.const 40
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.load
    local.get $6
    local.get $6
    call $~lib/util/hash/HASH<~lib/string/String>
    call $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#find"
    local.tee $1
    i32.eqz
    if
     i32.const 2736
     i32.const 2800
     i32.const 105
     i32.const 17
     call $~lib/builtins/abort
     unreachable
    end
    block $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#stringify@override$218 (result i32)
     block $case2
      block $case1
       block $case0
        block $tablify|0
         local.get $1
         i32.load offset=4
         local.tee $8
         i32.const 8
         i32.sub
         i32.load
         i32.const 15
         i32.sub
         br_table $case2 $tablify|0 $tablify|0 $case1 $case0 $tablify|0
        end
        unreachable
       end
       i32.const 0
       local.set $3
       local.get $8
       i32.load
       i32.const 20
       i32.sub
       i32.load offset=16
       i32.const 1
       i32.shr_u
       call $~lib/array/Array<~lib/string/String>#constructor
       local.set $9
       loop $for-loop|01
        local.get $3
        local.get $8
        i32.load
        i32.const 20
        i32.sub
        i32.load offset=16
        i32.const 1
        i32.shr_u
        i32.lt_s
        if
         local.get $3
         local.get $8
         i32.load
         local.tee $10
         i32.const 20
         i32.sub
         i32.load offset=16
         i32.const 1
         i32.shr_u
         local.tee $11
         i32.const 0
         local.get $3
         i32.const 0
         i32.lt_s
         select
         i32.add
         local.tee $1
         local.get $11
         i32.ge_u
         if
          i32.const 2240
          i32.const 2192
          i32.const 57
          i32.const 31
          call $~lib/builtins/abort
          unreachable
         end
         i32.const 2
         i32.const 2
         call $~lib/rt/tcms/__new
         local.tee $11
         local.get $10
         local.get $1
         i32.const 1
         i32.shl
         i32.add
         i32.load16_u
         i32.store16
         local.get $9
         local.get $3
         block $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67 (result i32)
          block $case8|0
           block $case7|0
            block $case6|0
             block $case5|0
              block $case4|0
               block $case3|0
                block $case2|0
                 block $case1|0
                  local.get $11
                  i32.const 20
                  i32.sub
                  i32.load offset=16
                  i32.const 1
                  i32.shr_u
                  if (result i32)
                   local.get $11
                   i32.load16_u
                  else
                   i32.const -1
                  end
                  local.tee $1
                  i32.const 34
                  i32.ne
                  if
                   local.get $1
                   i32.const 92
                   i32.eq
                   br_if $case1|0
                   local.get $1
                   i32.const 8
                   i32.eq
                   br_if $case2|0
                   local.get $1
                   i32.const 10
                   i32.eq
                   br_if $case3|0
                   local.get $1
                   i32.const 13
                   i32.eq
                   br_if $case4|0
                   local.get $1
                   i32.const 9
                   i32.eq
                   br_if $case5|0
                   local.get $1
                   i32.const 12
                   i32.eq
                   br_if $case6|0
                   local.get $1
                   i32.const 11
                   i32.eq
                   br_if $case7|0
                   br $case8|0
                  end
                  i32.const 3264
                  br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
                 end
                 i32.const 3296
                 br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
                end
                i32.const 3328
                br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
               end
               i32.const 3360
               br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
              end
              i32.const 3392
              br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
             end
             i32.const 3424
             br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
            end
            i32.const 3456
            br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
           end
           i32.const 3488
           br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/escapeChar$67
          end
          local.get $11
         end
         call $~lib/array/Array<~lib/string/String>#__set
         local.get $3
         i32.const 1
         i32.add
         local.set $3
         br $for-loop|01
        end
       end
       i32.const 2848
       local.get $9
       i32.load offset=4
       local.get $9
       i32.load offset=12
       i32.const 1696
       call $~lib/util/string/joinReferenceArray<~lib/string/String>
       call $~lib/string/String.__concat
       i32.const 2848
       call $~lib/string/String.__concat
       br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#stringify@override$218
      end
      local.get $8
      i64.load
      local.tee $4
      i64.eqz
      if (result i32)
       i32.const 1968
      else
       i64.const 0
       local.get $4
       i64.sub
       local.get $4
       local.get $4
       i64.const 63
       i64.shr_u
       i32.wrap_i64
       i32.const 1
       i32.shl
       local.tee $1
       select
       local.tee $4
       i64.const 4294967295
       i64.le_u
       if
        local.get $4
        i32.wrap_i64
        local.tee $8
        call $~lib/util/number/decimalCount32
        local.tee $9
        i32.const 1
        i32.shl
        local.get $1
        i32.add
        i32.const 2
        call $~lib/rt/tcms/__new
        local.tee $3
        local.get $1
        i32.add
        local.get $8
        local.get $9
        call $~lib/util/number/utoa_dec_simple<u32>
       else
        local.get $4
        call $~lib/util/number/decimalCount64High
        local.tee $8
        i32.const 1
        i32.shl
        local.get $1
        i32.add
        i32.const 2
        call $~lib/rt/tcms/__new
        local.tee $3
        local.get $1
        i32.add
        local.get $4
        local.get $8
        call $~lib/util/number/utoa_dec_simple<u64>
       end
       local.get $1
       if
        local.get $3
        i32.const 45
        i32.store16
       end
       local.get $3
      end
      br $__inlined_func$~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#stringify@override$218
     end
     local.get $8
     call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Obj#stringify
    end
    local.set $1
    local.get $5
    local.get $2
    i32.const 2848
    local.get $6
    call $~lib/string/String.__concat
    i32.const 2880
    call $~lib/string/String.__concat
    local.get $1
    call $~lib/string/String.__concat
    call $~lib/array/Array<~lib/string/String>#__set
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|00
   end
  end
  i32.const 2912
  local.get $5
  i32.load offset=4
  local.get $5
  i32.load offset=12
  i32.const 2944
  call $~lib/util/string/joinReferenceArray<~lib/string/String>
  call $~lib/string/String.__concat
  i32.const 2976
  call $~lib/string/String.__concat
 )
 (func $~lib/@devcycle/assemblyscript-json/assembly/JSON/Integer#constructor (param $0 i64) (result i32)
  (local $1 i32)
  i32.const 8
  i32.const 18
  call $~lib/rt/tcms/__new
  local.tee $1
  local.get $0
  i64.store
  local.get $1
  call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#constructor
 )
 (func $src/workers/advanced_workers/parsePrimeSearchPercent (param $0 f64) (param $1 f64) (result i32)
  local.get $1
  local.get $0
  f64.sub
  local.tee $0
  f64.const 0
  f64.le
  if
   i32.const 0
   return
  end
  local.get $0
  f64.const 5e3
  f64.ge
  if
   i32.const 100
   return
  end
  local.get $0
  f64.const 100
  f64.mul
  f64.const 5e3
  f64.div
  i32.trunc_sat_f64_s
 )
 (func $~start
  (local $0 i32)
  i32.const 1536
  call $~lib/rt/tcms/initLazy
  global.set $~lib/rt/tcms/fromSpace
  i32.const 24
  i32.const 11
  call $~lib/rt/tcms/__new
  local.tee $0
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store
  local.get $0
  i32.const 3
  i32.store offset=4
  local.get $0
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store offset=8
  local.get $0
  i32.const 4
  i32.store offset=12
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  local.get $0
  global.set $~lib/@effindomv2/fui-as/src/core/Fetch/pendingFetchRequests
  i32.const 1048576
  call $~lib/typedarray/Uint8Array#constructor
  global.set $~lib/@effindomv2/fui-as/src/worker/Worker/WORKER_CALLBACK_BUFFER
  i32.const 3120
  call $~lib/rt/tcms/initLazy
  global.set $~lib/rt/tcms/pinSpace
  i32.const 3216
  call $~lib/rt/tcms/initLazy
  global.set $~lib/rt/tcms/toSpace
 )
 (func $~lib/string/String.UTF8.encodeUnsafe (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  local.get $1
  i32.const 1
  i32.shl
  i32.add
  local.set $3
  local.get $2
  local.set $1
  loop $while-continue|0
   local.get $0
   local.get $3
   i32.lt_u
   if
    local.get $0
    i32.load16_u
    local.tee $2
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $1
     local.get $2
     i32.store8
     local.get $1
     i32.const 1
     i32.add
    else
     local.get $2
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $1
      local.get $2
      i32.const 6
      i32.shr_u
      i32.const 192
      i32.or
      local.get $2
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.const 8
      i32.shl
      i32.or
      i32.store16
      local.get $1
      i32.const 2
      i32.add
     else
      local.get $2
      i32.const 56320
      i32.lt_u
      local.get $0
      i32.const 2
      i32.add
      local.get $3
      i32.lt_u
      i32.and
      local.get $2
      i32.const 63488
      i32.and
      i32.const 55296
      i32.eq
      i32.and
      if
       local.get $0
       i32.load16_u offset=2
       local.tee $4
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $1
        local.get $2
        i32.const 1023
        i32.and
        i32.const 10
        i32.shl
        i32.const 65536
        i32.add
        local.get $4
        i32.const 1023
        i32.and
        i32.or
        local.tee $2
        i32.const 63
        i32.and
        i32.const 128
        i32.or
        i32.const 24
        i32.shl
        local.get $2
        i32.const 6
        i32.shr_u
        i32.const 63
        i32.and
        i32.const 128
        i32.or
        i32.const 16
        i32.shl
        i32.or
        local.get $2
        i32.const 12
        i32.shr_u
        i32.const 63
        i32.and
        i32.const 128
        i32.or
        i32.const 8
        i32.shl
        i32.or
        local.get $2
        i32.const 18
        i32.shr_u
        i32.const 240
        i32.or
        i32.or
        i32.store
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        local.get $0
        i32.const 4
        i32.add
        local.set $0
        br $while-continue|0
       end
      end
      local.get $1
      local.get $2
      i32.const 12
      i32.shr_u
      i32.const 224
      i32.or
      local.get $2
      i32.const 6
      i32.shr_u
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.const 8
      i32.shl
      i32.or
      i32.store16
      local.get $1
      local.get $2
      i32.const 63
      i32.and
      i32.const 128
      i32.or
      i32.store8 offset=2
      local.get $1
      i32.const 3
      i32.add
     end
    end
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/tcms/__unpin (param $0 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 3168
   i32.const 1424
   i32.const 195
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  call $~lib/rt/tcms/Object#unlink
  local.get $0
  global.get $~lib/rt/tcms/fromSpace
  global.get $~lib/rt/tcms/white
  call $~lib/rt/tcms/Object#linkTo
 )
 (func $~lib/rt/tcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 3072
    i32.const 1424
    i32.const 181
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/tcms/Object#unlink
   local.get $1
   global.get $~lib/rt/tcms/pinSpace
   i32.const 3
   call $~lib/rt/tcms/Object#linkTo
  end
  local.get $0
 )
 (func $~lib/rt/tcms/__collect
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $src/workers/advanced_workers/largestPrimeCalculatorJob
  local.tee $0
  if
   local.get $0
   call $~lib/rt/tcms/__visit
  end
  i32.const 2240
  call $~lib/rt/tcms/__visit
  i32.const 1584
  call $~lib/rt/tcms/__visit
  i32.const 2608
  call $~lib/rt/tcms/__visit
  i32.const 2736
  call $~lib/rt/tcms/__visit
  i32.const 1360
  call $~lib/rt/tcms/__visit
  i32.const 3072
  call $~lib/rt/tcms/__visit
  i32.const 3168
  call $~lib/rt/tcms/__visit
  i32.const 2128
  call $~lib/rt/tcms/__visit
  i32.const 2000
  call $~lib/rt/tcms/__visit
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/inputCache
  local.tee $0
  if
   local.get $0
   call $~lib/rt/tcms/__visit
  end
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/WORKER_CALLBACK_BUFFER
  local.tee $0
  if
   local.get $0
   call $~lib/rt/tcms/__visit
  end
  i32.const 1056
  call $~lib/rt/tcms/__visit
  i32.const 1104
  call $~lib/rt/tcms/__visit
  i32.const 1168
  call $~lib/rt/tcms/__visit
  i32.const 1232
  call $~lib/rt/tcms/__visit
  i32.const 1296
  call $~lib/rt/tcms/__visit
  global.get $~lib/@effindomv2/fui-as/src/core/Fetch/pendingFetchRequests
  local.tee $0
  if
   local.get $0
   call $~lib/rt/tcms/__visit
  end
  global.get $~lib/rt/tcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1424
     i32.const 213
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/rt/tcms/white
  i32.eqz
  local.set $3
  global.get $~lib/rt/tcms/toSpace
  local.tee $2
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|1
   local.get $0
   local.get $2
   i32.ne
   if
    local.get $3
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1424
     i32.const 223
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|1
   end
  end
  global.get $~lib/rt/tcms/fromSpace
  local.tee $4
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|2
   local.get $0
   local.get $4
   i32.ne
   if
    global.get $~lib/rt/tcms/white
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1424
     i32.const 232
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.get $0
    i32.const 3588
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/tcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/tcms/total
     local.get $0
     i32.const 4
     i32.add
     local.tee $0
     i32.const 3588
     i32.ge_u
     if
      global.get $~lib/rt/tlsf/ROOT
      i32.eqz
      if
       call $~lib/rt/tlsf/initialize
      end
      global.get $~lib/rt/tlsf/ROOT
      local.get $0
      call $~lib/rt/tlsf/checkUsedBlock
      call $~lib/rt/tlsf/freeBlock
     end
    end
    local.set $0
    br $while-continue|2
   end
  end
  local.get $4
  local.get $4
  i32.store offset=4
  local.get $4
  local.get $4
  i32.store offset=8
  local.get $2
  global.set $~lib/rt/tcms/fromSpace
  local.get $4
  global.set $~lib/rt/tcms/toSpace
  local.get $3
  global.set $~lib/rt/tcms/white
 )
 (func $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#rehash" (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  i32.shl
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $6
  local.get $2
  i32.const 3
  i32.shl
  i32.const 3
  i32.div_s
  local.tee $5
  i32.const 12
  i32.mul
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $3
  local.get $0
  i32.load offset=8
  local.tee $7
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  i32.add
  local.set $4
  local.get $3
  local.set $2
  loop $while-continue|0
   local.get $4
   local.get $7
   i32.ne
   if
    local.get $7
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     local.get $2
     local.get $7
     i32.load
     local.tee $8
     i32.store
     local.get $2
     local.get $7
     i32.load offset=4
     i32.store offset=4
     local.get $2
     local.get $6
     local.get $8
     call $~lib/util/hash/HASH<~lib/string/String>
     local.get $1
     i32.and
     i32.const 2
     i32.shl
     i32.add
     local.tee $8
     i32.load
     i32.store offset=8
     local.get $8
     local.get $2
     i32.store
     local.get $2
     i32.const 12
     i32.add
     local.set $2
    end
    local.get $7
    i32.const 12
    i32.add
    local.set $7
    br $while-continue|0
   end
  end
  local.get $0
  local.get $6
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $0
  local.get $5
  i32.store offset=12
  local.get $0
  local.get $0
  i32.load offset=20
  i32.store offset=16
 )
 (func $"~lib/map/Map<u32,~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest>#rehash" (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  local.get $1
  i32.const 1
  i32.add
  local.tee $2
  i32.const 2
  i32.shl
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $6
  local.get $2
  i32.const 3
  i32.shl
  i32.const 3
  i32.div_s
  local.tee $5
  i32.const 12
  i32.mul
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.set $3
  local.get $0
  i32.load offset=8
  local.tee $7
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  i32.add
  local.set $4
  local.get $3
  local.set $2
  loop $while-continue|0
   local.get $4
   local.get $7
   i32.ne
   if
    local.get $7
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     local.get $2
     local.get $7
     i32.load
     local.tee $8
     i32.store
     local.get $2
     local.get $7
     i32.load offset=4
     i32.store offset=4
     local.get $2
     local.get $6
     local.get $8
     call $~lib/util/hash/HASH<u32>
     local.get $1
     i32.and
     i32.const 2
     i32.shl
     i32.add
     local.tee $8
     i32.load
     i32.store offset=8
     local.get $8
     local.get $2
     i32.store
     local.get $2
     i32.const 12
     i32.add
     local.set $2
    end
    local.get $7
    i32.const 12
    i32.add
    local.set $7
    br $while-continue|0
   end
  end
  local.get $0
  local.get $6
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $3
  i32.store offset=8
  local.get $0
  local.get $5
  i32.store offset=12
  local.get $0
  local.get $0
  i32.load offset=20
  i32.store offset=16
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/readWorkerTextParts (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  i32.const 0
  call $~lib/array/Array<~lib/string/String>#constructor
  local.set $2
  local.get $0
  i32.eqz
  local.get $1
  i32.const 4
  i32.lt_u
  i32.or
  if
   local.get $2
   return
  end
  local.get $0
  local.get $1
  i32.add
  local.set $7
  local.get $0
  i32.load
  local.set $1
  local.get $0
  i32.const 4
  i32.add
  local.set $0
  loop $for-loop|0
   local.get $1
   local.get $3
   i32.gt_u
   if
    local.get $0
    i32.const 4
    i32.add
    local.get $7
    i32.gt_u
    if
     local.get $2
     return
    end
    local.get $0
    i32.const 4
    i32.add
    local.tee $5
    local.get $0
    i32.load
    local.tee $6
    i32.add
    local.get $7
    i32.gt_u
    if
     local.get $2
     return
    end
    local.get $6
    if (result i32)
     local.get $5
     local.get $6
     call $~lib/string/String.UTF8.decodeUnsafe
    else
     i32.const 1696
    end
    local.set $8
    local.get $2
    local.get $2
    i32.load offset=12
    local.tee $0
    i32.const 1
    i32.add
    local.tee $4
    i32.const 1
    call $~lib/array/ensureCapacity
    local.get $2
    i32.load offset=4
    local.get $0
    i32.const 2
    i32.shl
    i32.add
    local.get $8
    i32.store
    local.get $2
    local.get $4
    i32.store offset=12
    local.get $5
    local.get $6
    i32.add
    local.set $0
    local.get $3
    i32.const 1
    i32.add
    local.set $3
    br $for-loop|0
   end
  end
  local.get $2
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/encodeUtf8 (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $0
  local.tee $1
  i32.const 20
  i32.sub
  i32.load offset=16
  local.get $1
  i32.add
  local.set $3
  loop $while-continue|0
   local.get $1
   local.get $3
   i32.lt_u
   if
    local.get $1
    i32.load16_u
    local.tee $4
    i32.const 128
    i32.lt_u
    if (result i32)
     local.get $2
     i32.const 1
     i32.add
    else
     local.get $4
     i32.const 2048
     i32.lt_u
     if (result i32)
      local.get $2
      i32.const 2
      i32.add
     else
      local.get $4
      i32.const 64512
      i32.and
      i32.const 55296
      i32.eq
      local.get $1
      i32.const 2
      i32.add
      local.get $3
      i32.lt_u
      i32.and
      if
       local.get $1
       i32.load16_u offset=2
       i32.const 64512
       i32.and
       i32.const 56320
       i32.eq
       if
        local.get $2
        i32.const 4
        i32.add
        local.set $2
        local.get $1
        i32.const 4
        i32.add
        local.set $1
        br $while-continue|0
       end
      end
      local.get $2
      i32.const 3
      i32.add
     end
    end
    local.set $2
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  local.get $2
  i32.const 1
  call $~lib/rt/tcms/__new
  local.set $1
  local.get $0
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.get $1
  call $~lib/string/String.UTF8.encodeUnsafe
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  local.set $0
  i32.const 12
  i32.const 7
  call $~lib/rt/tcms/__new
  local.tee $2
  local.get $1
  i32.store
  local.get $2
  local.get $0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $2
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer_size (result i32)
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/WORKER_CALLBACK_BUFFER
  i32.load offset=8
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_worker_text_buffer (result i32)
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/WORKER_CALLBACK_BUFFER
  i32.load offset=4
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_error (param $0 i32) (param $1 i32) (param $2 i32)
  block $__inlined_func$~lib/@effindomv2/fui-as/src/core/Fetch/handleFetchError$269
   local.get $2
   i32.eqz
   local.get $1
   i32.eqz
   i32.or
   if (result i32)
    i32.const 0
   else
    local.get $1
    local.get $2
    call $~lib/string/String.UTF8.decodeUnsafe
   end
   local.get $0
   call $~lib/@effindomv2/fui-as/src/core/Fetch/findPendingFetchRequest
   local.tee $0
   i32.eqz
   br_if $__inlined_func$~lib/@effindomv2/fui-as/src/core/Fetch/handleFetchError$269
   i32.const 0
   call $~lib/string/String.__eq
   drop
   local.get $0
   i32.load8_u offset=29
   i32.eqz
   if
    local.get $0
    i32.load offset=20
    local.set $1
    local.get $0
    call $~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest#finish
    local.get $1
    if
     local.get $1
     call $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse>#invoke@override
    end
   end
  end
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/__fui_on_fetch_complete (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
  (local $5 i32)
  local.get $3
  local.get $4
  call $~lib/@effindomv2/fui-as/src/worker/Worker/readWorkerTextParts
  local.tee $3
  i32.load offset=12
  i32.const 0
  i32.gt_s
  if (result i32)
   local.get $3
   i32.const 0
   call $~lib/array/Array<~lib/string/String>#__uget
  else
   i32.const 1696
  end
  local.set $4
  local.get $3
  i32.load offset=12
  i32.const 1
  i32.gt_s
  if (result i32)
   local.get $3
   i32.const 1
   call $~lib/array/Array<~lib/string/String>#__uget
  else
   i32.const 1696
  end
  local.set $3
  local.get $0
  call $~lib/@effindomv2/fui-as/src/core/Fetch/findPendingFetchRequest
  local.tee $5
  if
   i32.const 16
   i32.const 8
   call $~lib/rt/tcms/__new
   local.tee $0
   i32.const 0
   i32.store8
   local.get $0
   i32.const 0
   i32.store offset=4
   local.get $0
   i32.const 0
   i32.store offset=8
   local.get $0
   i32.const 0
   i32.store offset=12
   local.get $0
   local.get $1
   i32.store8
   local.get $0
   local.get $2
   i32.store offset=4
   local.get $0
   local.get $4
   i32.store offset=8
   local.get $0
   local.get $3
   i32.store offset=12
   local.get $5
   i32.load8_u offset=29
   i32.eqz
   if
    local.get $5
    i32.load offset=16
    local.set $0
    local.get $5
    call $~lib/@effindomv2/fui-as/src/core/Fetch/FetchRequest#finish
    local.get $0
    if
     local.get $0
     call $~lib/@effindomv2/fui-as/src/core/BoundCallback/Callback1<~lib/@effindomv2/fui-as/src/core/Fetch/FetchResponse>#invoke@override
    end
   end
  end
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.reportProgress~anonymous|0 (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_report_progress
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.fail~anonymous|0 (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_fail
 )
 (func $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.complete~anonymous|0 (param $0 i32) (param $1 i32)
  local.get $0
  local.get $1
  call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_complete_string
 )
 (func $src/workers/advanced_workers/largestPrimeCalculatorWorker
  (local $0 i32)
  (local $1 f64)
  (local $2 i32)
  (local $3 i32)
  global.get $src/workers/advanced_workers/largestPrimeCalculatorJob
  local.tee $0
  i32.eqz
  if
   i32.const 40
   i32.const 12
   call $~lib/rt/tcms/__new
   local.tee $0
   i32.eqz
   if
    i32.const 2
    i32.const 13
    call $~lib/rt/tcms/__new
    local.set $0
   end
   local.get $0
   i32.eqz
   if
    i32.const 0
    i32.const 0
    call $~lib/rt/tcms/__new
    local.set $0
   end
   local.get $0
   i32.const 0
   i32.store8
   local.get $0
   i32.const 0
   i32.store8 offset=1
   local.get $0
   f64.const 0
   f64.store offset=8
   local.get $0
   f64.const 0
   f64.store offset=16
   local.get $0
   f64.const 0
   f64.store offset=24
   local.get $0
   i32.const 2
   i32.store offset=32
   local.get $0
   i32.const 2
   i32.store offset=36
  end
  local.get $0
  i32.load8_u
  i32.eqz
  if
   local.get $0
   i32.const 1
   i32.store8
   local.get $0
   i32.const 8
   i32.sub
   i32.load
   i32.const 12
   i32.eq
   if
    global.get $~lib/@effindomv2/fui-as/src/worker/Worker/inputRead
    i32.eqz
    if
     block $__inlined_func$~lib/@effindomv2/fui-as/src/worker/Worker/readInputMessage$371 (result i32)
      i32.const 0
      i32.const 0
      i32.const 0
      call $~lib/string/String.__eq
      i32.eqz
      br_if $__inlined_func$~lib/@effindomv2/fui-as/src/worker/Worker/readInputMessage$371
      drop
      i32.const 1696
      call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_input_length
      local.tee $2
      i32.eqz
      br_if $__inlined_func$~lib/@effindomv2/fui-as/src/worker/Worker/readInputMessage$371
      drop
      i32.const 1696
      local.get $2
      call $~lib/typedarray/Uint8Array#constructor
      local.tee $2
      i32.load offset=4
      local.get $2
      i32.load offset=8
      call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_copy_input
      local.tee $3
      i32.eqz
      br_if $__inlined_func$~lib/@effindomv2/fui-as/src/worker/Worker/readInputMessage$371
      drop
      local.get $2
      i32.load offset=4
      local.get $3
      call $~lib/string/String.UTF8.decodeUnsafe
     end
     global.set $~lib/@effindomv2/fui-as/src/worker/Worker/inputCache
     i32.const 1
     global.set $~lib/@effindomv2/fui-as/src/worker/Worker/inputRead
    end
    local.get $0
    call $src/host/generated/WorkerHostServices/__host_appWorkerClockWallClockSinceEpochMs
    local.tee $1
    f64.store offset=8
    local.get $0
    local.get $1
    f64.const 5e3
    f64.add
    f64.store offset=16
    local.get $0
    local.get $1
    f64.const 10
    f64.add
    f64.store offset=24
    local.get $0
    i32.const 2
    i32.store offset=32
    local.get $0
    i32.const 2
    i32.store offset=36
   end
  end
  local.get $0
  i32.load8_u offset=1
  if (result i32)
   i32.const 0
  else
   local.get $0
   call $src/workers/advanced_workers/LargestPrimeCalculatorJob#run
   i32.const 0
   local.get $0
   local.get $0
   i32.load8_u offset=1
   select
  end
  global.set $src/workers/advanced_workers/largestPrimeCalculatorJob
 )
 (func $src/workers/advanced_workers/fileProcessorWorker
  (local $0 i32)
  (local $1 i64)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/WORKER_CALLBACK_BUFFER
  i32.load offset=4
  local.set $4
  i32.const 5381
  local.set $2
  loop $while-continue|0
   local.get $1
   i64.const 4294967295
   i64.and
   i32.wrap_i64
   local.get $1
   i64.const 32
   i64.shr_u
   i64.const 4294967295
   i64.and
   i32.wrap_i64
   i32.const 65536
   call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_file_read_chunk
   local.tee $3
   i32.const 0
   i32.gt_s
   if
    i32.const 0
    local.set $0
    loop $for-loop|1
     local.get $0
     local.get $3
     i32.lt_s
     if
      local.get $0
      local.get $4
      i32.add
      i32.load8_u
      local.get $2
      i32.const 5
      i32.shl
      local.get $2
      i32.add
      i32.add
      local.set $2
      local.get $0
      i32.const 1
      i32.add
      local.set $0
      br $for-loop|1
     end
    end
    local.get $4
    local.get $3
    call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_file_worker_write_chunk
    local.get $1
    local.get $3
    i64.extend_i32_s
    i64.add
    local.tee $1
    i64.eqz
    if (result i32)
     i32.const 1968
    else
     local.get $1
     i64.const 4294967295
     i64.le_u
     if
      local.get $1
      i32.wrap_i64
      local.tee $5
      call $~lib/util/number/decimalCount32
      local.tee $3
      i32.const 1
      i32.shl
      i32.const 2
      call $~lib/rt/tcms/__new
      local.tee $0
      local.get $5
      local.get $3
      call $~lib/util/number/utoa_dec_simple<u32>
     else
      local.get $1
      call $~lib/util/number/decimalCount64High
      local.tee $3
      i32.const 1
      i32.shl
      i32.const 2
      call $~lib/rt/tcms/__new
      local.tee $0
      local.get $1
      local.get $3
      call $~lib/util/number/utoa_dec_simple<u64>
     end
     local.get $0
    end
    call $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.reportProgress
    br $while-continue|0
   end
  end
  i32.const 4
  i32.const 15
  call $~lib/rt/tcms/__new
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#constructor
  local.set $0
  i32.const 24
  i32.const 17
  call $~lib/rt/tcms/__new
  local.tee $3
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store
  local.get $3
  i32.const 3
  i32.store offset=4
  local.get $3
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  i32.store offset=8
  local.get $3
  i32.const 4
  i32.store offset=12
  local.get $3
  i32.const 0
  i32.store offset=16
  local.get $3
  i32.const 0
  i32.store offset=20
  local.get $0
  local.get $3
  i32.store
  local.get $0
  i32.load
  i32.const 2432
  local.get $2
  i64.extend_i32_u
  call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Integer#constructor
  call $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#set"
  local.get $0
  i32.load
  i32.const 4
  i32.const 19
  call $~lib/rt/tcms/__new
  local.tee $3
  i32.const 2496
  i32.store
  i32.const 2464
  local.get $3
  call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Value#constructor
  call $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#set"
  local.get $0
  i32.load
  i32.const 2528
  local.get $1
  call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Integer#constructor
  call $"~lib/map/Map<~lib/string/String,~lib/@devcycle/assemblyscript-json/assembly/JSON/Value>#set"
  local.get $0
  call $~lib/@devcycle/assemblyscript-json/assembly/JSON/Obj#stringify
  call $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.complete
 )
 (func $src/workers/advanced_workers/LargestPrimeCalculatorJob#run (param $0 i32)
  (local $1 f64)
  (local $2 i32)
  (local $3 f64)
  (local $4 i32)
  call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_is_cancelled
  if
   i32.const 1728
   local.get $0
   f64.load offset=8
   call $src/host/generated/WorkerHostServices/__host_appWorkerClockWallClockSinceEpochMs
   call $src/workers/advanced_workers/parsePrimeSearchPercent
   call $~lib/util/number/itoa32
   call $~lib/string/String.__concat
   local.set $2
   local.get $0
   i32.load8_u offset=1
   i32.eqz
   if
    local.get $0
    i32.const 1
    i32.store8 offset=1
    global.get $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent
    i32.eqz
    if
     i32.const 1
     global.set $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent
     local.get $2
     i32.const 2096
     call $~lib/@effindomv2/fui-as/src/worker/Worker/sendText
    end
   end
   return
  end
  call $src/host/generated/WorkerHostServices/__host_appWorkerClockWallClockSinceEpochMs
  local.set $1
  local.get $0
  f64.load offset=24
  local.get $0
  f64.load offset=16
  f64.lt
  if (result f64)
   local.get $0
   f64.load offset=24
  else
   local.get $0
   f64.load offset=16
  end
  local.set $3
  loop $while-continue|0
   local.get $1
   local.get $3
   f64.lt
   if
    block $__inlined_func$src/workers/advanced_workers/isPrime$101 (result i32)
     i32.const 0
     local.get $0
     i32.load offset=32
     local.tee $4
     i32.const 2
     i32.lt_s
     br_if $__inlined_func$src/workers/advanced_workers/isPrime$101
     drop
     i32.const 1
     local.get $4
     i32.const 2
     i32.eq
     br_if $__inlined_func$src/workers/advanced_workers/isPrime$101
     drop
     i32.const 0
     local.get $4
     i32.const 1
     i32.and
     i32.eqz
     br_if $__inlined_func$src/workers/advanced_workers/isPrime$101
     drop
     i32.const 3
     local.set $2
     loop $while-continue|01
      local.get $2
      local.get $4
      local.get $2
      i32.div_s
      i32.le_s
      if
       i32.const 0
       local.get $4
       local.get $2
       i32.rem_s
       i32.eqz
       br_if $__inlined_func$src/workers/advanced_workers/isPrime$101
       drop
       local.get $2
       i32.const 2
       i32.add
       local.set $2
       br $while-continue|01
      end
     end
     i32.const 1
    end
    if
     local.get $0
     local.get $0
     i32.load offset=32
     i32.store offset=36
    end
    local.get $0
    local.get $0
    i32.load offset=32
    i32.const 1
    i32.add
    i32.store offset=32
    local.get $0
    i32.load offset=32
    i32.const 127
    i32.and
    i32.eqz
    if
     call $src/host/generated/WorkerHostServices/__host_appWorkerClockWallClockSinceEpochMs
     local.set $1
    end
    br $while-continue|0
   end
  end
  call $src/host/generated/WorkerHostServices/__host_appWorkerClockWallClockSinceEpochMs
  local.set $1
  local.get $0
  f64.load offset=8
  local.get $1
  call $src/workers/advanced_workers/parsePrimeSearchPercent
  call $~lib/util/number/itoa32
  local.set $2
  local.get $0
  i32.load8_u offset=1
  i32.eqz
  if
   local.get $2
   call $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.reportProgress
  end
  local.get $1
  local.get $0
  f64.load offset=16
  f64.ge
  if
   local.get $0
   i32.load offset=36
   call $~lib/util/number/itoa32
   local.set $2
   local.get $0
   i32.load8_u offset=1
   i32.eqz
   if
    local.get $0
    i32.const 1
    i32.store8 offset=1
    local.get $2
    call $~lib/@effindomv2/fui-as/src/worker/Worker/Worker.complete
   end
   return
  end
  local.get $0
  local.get $0
  f64.load offset=24
  f64.const 10
  f64.add
  f64.store offset=24
  local.get $0
  f64.load offset=24
  local.get $0
  f64.load offset=16
  f64.gt
  if
   local.get $0
   local.get $0
   f64.load offset=16
   f64.store offset=24
  end
  global.get $~lib/@effindomv2/fui-as/src/worker/Worker/terminalSent
  local.get $0
  i32.load8_u offset=1
  i32.or
  i32.eqz
  if
   call $~lib/@effindomv2/fui-as/src/worker/ffi/fui_worker_request_yield
  end
 )
)
