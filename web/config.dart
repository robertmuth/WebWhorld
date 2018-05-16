library config;

import 'dart:async';
import 'dart:html' as HTML;

import 'option.dart';
import 'logging.dart' as log;
import 'webutil.dart';


Options gOptions;

void OptionsSetup() {
  gOptions = new Options("substrate")
    ..AddOption("hideAbout", "B", "false", true)
    ..AddOption("randomSeed", "I", "0")
    ..AddOption("logLevel", "I", "0", true);

  gOptions.AddSetting("Standard", {

  });


  gOptions.ProcessUrlHash();

  HTML.SelectElement presets = HTML.querySelector("#preset");
  for (String name in gOptions.SettingsNames()) {
    HTML.OptionElement o = new HTML.OptionElement(data: name, value: name);
    presets.append(o);
  }

  log.gLogLevel = gOptions.GetInt("logLevel");

  if (gOptions.GetBool("hideAbout")) {
    var twentyMillis = const Duration(seconds: 4);
    new Timer(twentyMillis, () => Hide(HTML.querySelector(".about")));
  }
}
