"use strict";
(0, require("./fixbug/appendFiles/index.js").AppendFilesToReactNativeSync)(),
  require("@react-native-community/cli");
require("commander");
var e = require("path"),
  r = (require("fs"), require("./config/common")),
  t = r.project_dir,
  s = r.API_LEVEL,
  o = (r.SDK_VERSION, r.SUPPORTED_ASSET_FILE_TYPES, r.IDX_MOD, r.DEV),
  i = require("qrcode-terminal");
var n = {
    ip: (function () {
      var e = require("os").networkInterfaces();
      for (var r in e)
        for (var t = e[r], s = 0; s < t.length; s++) {
          var o = t[s];
          if ("IPv4" === o.family && "127.0.0.1" !== o.address && !o.internal)
            return o.address;
        }
    })(),
    package: process.argv[2],
  },
  a = o;
o &&
  process.argv.length > 2 &&
  "--test" == process.argv[2] &&
  ((a = !1), console.log("run as real sdk for github"));
var c,
  u =
    a || process.argv.includes("--reset-cache") || process.argv.includes("-r"),
  l = e.join(t, "miot-sdk", "native");
if (!a) {
  var d = require("metro-resolver");
  (d._miot_resolve = d.resolve),
    (d.resolve = function (r, t, s) {
      return (
        r._miot_dirExists ||
          ((r._miot_dirExists = r.dirExists),
          (r.dirExists = function (e) {
            return !!e.startsWith(l) || r._miot_dirExists(e);
          }),
          (r._miot_doesFileExist = r.doesFileExist),
          (r.doesFileExist = function (t) {
            if (t.startsWith(l)) {
              var s = e.relative(l, t);
              return !(
                s.indexOf(".") != s.lastIndexOf(".") ||
                !s.endsWith(".js") ||
                s.startsWith("android.") ||
                s.startsWith("ios.") ||
                s.startsWith("common.")
              );
            }
            return r._miot_doesFileExist(t);
          })),
        d._miot_resolve(r, t, s)
      );
    });
}
c = process.argv.length > 2;
var v = require("@react-native-community/cli/node_modules/metro/src/node-haste/DependencyGraph.js");
function _(e) {
  for (var r = process.argv, t = 0; t < r.length; t++)
    if (e == r[t]) {
      if (++t == r.length) return !1;
      var s = r[t];
      return !!(s && s.length > 0) && ("-" == s.charAt(0) ? null : s);
    }
  return !1;
}
(v._miot_load = v.load),
  (v.load = function (e) {
    return v._miot_load(e).then(function (e) {
      if (!a) {
        var r = e._moduleCache;
        (r._miot_getModule = r.getModule),
          (r.getModule = function (e) {
            var t = r._miot_getModule(e);
            return (
              null == t._sourceCode && e.startsWith(l) && (t._sourceCode = ""),
              t
            );
          });
      }
      return (
        console.log("node server ready!"),
        console.log(
          "\n      \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n      \u2502  MIOT SDK API_LEVEL is " +
            s +
            "                                                 \u2502\n      \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n"
        ),
        c &&
          (console.log("\n"),
          i.generate(JSON.stringify(n)),
          console.log(
            "\n\t\u4f7f\u7528\u7c73\u5bb6APP\u626b\u63cf\u4e8c\u7ef4\u7801\u5373\u53ef\u5f00\u542f\u8c03\u8bd5\u6a21\u5f0f\n"
          )),
        e
      );
    });
  });
var g = _("--host") || _("-h"),
  m = _("--port") || _("-p");
(process.argv = ["", "", "start"]),
  u && process.argv.push("--reset-cache"),
  g && process.argv.push("--host", g),
  m && process.argv.push("--port", m),
  require("@react-native-community/cli").run();
