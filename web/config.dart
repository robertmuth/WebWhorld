library config;

import 'dart:async';
import 'dart:html' as HTML;

import 'option.dart';
import 'logging.dart' as log;
import 'webutil.dart';
import 'patches.dart';

Options gOptions;

const String oPatch = "patch";
const String oRandomSeed = "randomSeed";
const String oLogLevel = "logLevel";
const String oHideAbout = "hideAbout";
const String oMaxRings = "maxRings";
const String oZoomCenterX = "zoomCenterX";
const String oZoomCenterY = "zoomCenterY";
const String oZoom = "zoom";

void OptionsSetup() {
  HTML.SelectElement patterns = HTML.querySelector("#patch");
  for (String name in AllConfigs.keys) {
    HTML.OptionElement o = HTML.OptionElement(data: name, value: name);
    patterns.append(o);
  }

  gOptions = Options("whorld")
    ..AddOption(oHideAbout, "B", "false", true)
    ..AddOption(oRandomSeed, "I", "0")
    ..AddOption(oLogLevel, "I", "0", true)
    ..AddOption(oPatch, "O", "Default")
    ..AddOption(oZoom, "D", "1.0")
    ..AddOption(oZoomCenterX, "D", "0.0")
    ..AddOption(oZoomCenterY, "D", "0.0")
    ..AddOption(oMaxRings, "I", "50");

  gOptions.AddSetting("Standard", {});

  gOptions.ProcessUrlHash();

  /*
  HTML.SelectElement presets = HTML.querySelector("#preset");
  for (String name in gOptions.SettingsNames()) {
    HTML.OptionElement o = HTML.OptionElement(data: name, value: name);
    presets.append(o);
  }
  */

  log.gLogLevel = gOptions.GetInt("logLevel");

  if (gOptions.GetBool("hideAbout")) {
    var twentyMillis = const Duration(seconds: 4);
    Timer(twentyMillis, () => Hide(HTML.querySelector(".about")));
  }
}
