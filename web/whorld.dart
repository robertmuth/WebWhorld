import 'dart:math' as Math;
import 'dart:html' as HTML;
import 'dart:core';
import 'dart:collection';

import 'webutil.dart';
import 'rgb.dart';
import 'logging.dart' as log;
import 'config.dart';
import 'parameter.dart';

import 'package:vector_math/vector_math.dart' as VM;

final HTML.Element gFps = HTML.querySelector("#fps");
final HTML.CanvasElement gCanvasElement = HTML.querySelector("#area");
final HTML.InputElement gFilesElement =
    HTML.document.getElementById('loadfile');

Math.Random gRng = new Math.Random();

Parameters config = ConfigStars;
// Parameters config = ConfigMercedes;
// Parameters config = ConfigSaturn;
// Parameters config = ConfigTentacles;
// Parameters config = ConfigBullLotus2;
// Parameters config = ConfigAnemone;

final Parameters globalConfig = new Parameters(<String, dynamic>{});

class Rect {
  num x1;
  num y1;
  num x2;
  num y2;

  Rect(this.x1, this.y1, this.x2, this.y2);

  num get w => x2 - x1;

  num get h => y2 - y1;

  bool Contains(Point p) {
    if (p.x < x1) return false;
    if (p.x >= x2) return false;
    if (p.y < y1) return false;
    if (p.y >= y2) return false;
    return true;
  }
}

// Note, that point  defines a hash that is based on ix, iy
class Point {
  num x;
  num y;

  Point(this.x, this.y);

  // t in [0, 360[
  Point.fromAngle(num t) {
    x = Math.cos(t * Math.pi / 180);
    y = Math.sin(t * Math.pi / 180);
  }

  Point.randomInRect(Math.Random rng, Rect r) {
    x = rng.nextDouble() * r.w + r.x1;
    y = rng.nextDouble() * r.h + r.y1;
  }

  int get ix => x.floor();
  int get iy => y.floor();

  Point Clone() {
    return new Point(x, y);
  }

  void Wrap(Rect r) {
    if (x < r.x1) x += r.w;
    if (x >= r.x2) x -= r.w;
    if (y < r.y1) y += r.h;
    if (y >= r.y2) y -= r.h;
  }

  void Add(Point delta, num scalar) {
    x += scalar * delta.x;
    y += scalar * delta.y;
  }

  @override
  bool operator ==(dynamic o) => o.ix == ix && o.iy == iy;

  @override
  int get hashCode => ix * 8128 + iy;
} // end Point

num GetRandom(Math.Random rng, num a, num b) {
  return rng.nextDouble() * (b - a) + a;
}

double GetRightAngleOffset(Math.Random rng, double minAngle, double maxAngle) {
  double fuzz = GetRandom(rng, minAngle, maxAngle);
  return rng.nextBool() ? fuzz : -fuzz;
}

int count = 0;
// Pixel draw performance is the major bottleneck
// https://stackoverflow.com/questions/4899799/whats-the-best-way-to-set-a-single-pixel-in-an-html5-canvas
void DrawPixel(
    HTML.CanvasRenderingContext2D context, Point p, RGB color, double alpha) {
  count++;
  //print('@@@ ${count} rgba(${color.r},${color.g},${color.b},${alpha})');
  context
    ..fillStyle = 'rgba(${color.r},${color.g},${color.b},${alpha})'
    ..fillRect(p.ix, p.iy, 1, 1);
}


void DrawBackground(
    HTML.CanvasRenderingContext2D ctx, double w, double h, String color) {
  ctx
    ..fillStyle = color
    ..fillRect(0, 0, w, h);
}

void DrawContour(HTML.CanvasRenderingContext2D ctx, String color, int lineWidth,
    int n, List<VM.Vector2> contour, bool curved) {
  assert(lineWidth > 0);
  HTML.Path2D path = new HTML.Path2D();

  if (curved) {
    VM.Vector2 last = contour[contour.length - 2];
    path.moveTo(last.x, last.y);
    for (int i = 0; i < n; i += 3) {
      VM.Vector2 c1 = contour[(i - 1 + n) % n];
      VM.Vector2 c2 = contour[i];
      VM.Vector2 p = contour[(i + 1) % n];
      path.bezierCurveTo(c1.x.round(), c1.y.round(), c2.x.round(), c2.y.round(),
          p.x.round(), p.y.round());
    }
  } else {
    VM.Vector2 last = contour[n - 1];
    path.moveTo(last.x, last.y);
    for (int i = 0; i < n; i++) {
      path.lineTo(contour[i].x, contour[i].y);
    }
  }

  ctx
    ..strokeStyle = color
    ..lineWidth = lineWidth
    ..stroke(path);
}

/*
void Fill(HTML.CanvasRenderingContext2D ctx, String color, int nInner,
    List<VM.Vector2> inner, int nOuter, List<VM.Vector2> outer) {
  HTML.Path2D path = new HTML.Path2D();

  VM.Vector2 last;

  last = inner[nInner - 1];
  path.moveTo(last.x, last.y);
  for (int i = 0; i < nInner; i++) {
    path.lineTo(inner[i].x, inner[i].y);
  }

  last = outer[nOuter - 1];
  path.moveTo(last.x, last.y);
  for (int i = 0; i < nOuter; i++) {
    path.lineTo(outer[i].x, outer[i].y);
  }
  ctx
    ..fillStyle = color
    ..(path, "evenodd");

}
*/

void Reset() {
  theRings = new TheRings();
  frameCount = 0.0;
  gRng = new Math.Random();
}

HTML.FileReader reader;

void HandleFileLoad(HTML.ProgressEvent e) {
  print("Content: ${reader.result}");
  config = new Parameters(ReadParameter(reader.result));
  Reset();
}

void HandleFileSelect(HTML.Event e) {
  HTML.InputElement input = e.target;
  print("@@@@@@@ ${input.files} ${e}");
  reader = new HTML.FileReader();
  reader.onLoad.listen(HandleFileLoad);
  reader.readAsText(input.files[0]);
}

void HandleCommand(String cmd, String param) {
  log.LogInfo("HandleCommand: ${cmd} ${param}");
  switch (cmd) {
    case "A":
      Toggle(HTML.querySelector(".about"));
      break;
    case "C":
      Toggle(HTML.querySelector(".config"));
      break;
    case "P":
      Toggle(HTML.querySelector(".performance"));
      break;
    case "R":
      gOptions.SaveToLocalStorage();
      HTML.window.location.hash = "";
      HTML.window.location.reload();
      break;
    case "A+":
      Show(HTML.querySelector(".about"));
      break;
    case "A-":
      Hide(HTML.querySelector(".about"));
      break;
    case "F":
      ToggleFullscreen();
      break;
    case "C-":
      Hide(HTML.querySelector(".config"));
      break;
    case "C+":
      Show(HTML.querySelector(".config"));
      break;
    case "X":
      String preset =
          (HTML.querySelector("#preset") as HTML.SelectElement).value;
      gOptions.SetNewSettings(preset);
      break;
    case "":
      Reset();
      break;
  }
}

class CopyState {
  double CopyDelta;
  double CopySpread;
  double CopyTheta;

  VM.Vector2 GetShift() {
    double oldTheta = CopyTheta;
    CopyTheta += CopyDelta;
    return new VM.Vector2(Math.sin(oldTheta), Math.cos(oldTheta));
  }
}

class RingGeometry {
  // Variable Stuff
  double Rot = 0.0; // rotation for all vertices, in radians (changes over time)
  double Steps =
      0.0; // radius of even vertices, in pixels (increases over time)
  VM.Vector2 Origin = new VM
      .Vector2.zero(); // origin in client coords relative to window center
  VM.Vector2 Shift = new VM.Vector2.zero(); // shear, in pixels

  // Const Stuff
  double RotDelta = 0.0; // additional rotation per tick
  VM.Vector2 ShiftDelta = new VM.Vector2.zero(); // additional shear per tick

  VM.Vector2 Scale = new VM.Vector2(1.0, 1.0); // anisotropic scaling
  double StarRatio = 1.0; // ratio of odd radii to even radii
  int Sides = 4; // polygon's number of sides
  bool Reverse = false; // true if ring was born growing inward
  double Pinwheel = 0.0; // additional rotation for odd vertices

  double EvenCurve = 0.0; // even vertex curvature, as multiple of radius
  double OddCurve = 0.0; // odd vertex curvature, as multiple of radius
  double EvenShear = 0.0; // even vertex curve point asymmetry ratio
  double OddShear = 0.0; // odd vertex curve point asymmetry ratio

  RingGeometry();

  void Set(VM.Vector2 canvasSize, Parameters config, double frame,
      Math.Random rng, CopyState copying) {
    final double newGrowth =
        config.GetOscillatingDouble(oRingGrowth, frame, rng);
    RotDelta = config.GetOscillatingDouble(oRotateSpeed, frame, rng);
    Reverse = newGrowth < 0.0;

    // Variable Stuff (see Update())
    Rot = 0.0;
    if (Reverse) {
      Steps =
          Math.max(canvasSize.x, canvasSize.y) / 2.0 / config.GetDouble(oZoom);
    } else {
      Steps = 0.0;
    }
    config.SetScale(frame, rng, Scale);

    final double angle = config.GetOscillatingDouble(oSkewAngle, frame, rng);
    ShiftDelta
      ..setValues(Math.sin(angle), Math.cos(angle))
      ..scale(config.GetOscillatingDouble(oSkewRadius, frame, rng));
    Shift = new VM.Vector2.zero();
    if (copying != null) {
      Shift += copying.GetShift();
    }
    Sides = config.GetOscillatingDouble(oPolySides, frame, rng).round();
    StarRatio = Math.cos(Math.pi / Sides) * config.GetStarRatio(frame, rng);
    Pinwheel =
        Math.pi / Sides * config.GetOscillatingDouble(oPinwheel, frame, rng);

    //	Origin = m_st.MirrorOrg;
    EvenCurve = config.GetOscillatingDouble(oEvenCurve, frame, rng);
    OddCurve = config.GetOscillatingDouble(oOddCurve, frame, rng) / StarRatio;
    EvenShear = config.GetOscillatingDouble(oEvenShear, frame, rng);
    OddShear = config.GetOscillatingDouble(oOddShear, frame, rng);
  }

  VM.Vector2 Update(double trail, double newGrowth, VM.Vector2 PrevOrg) {
    if (PrevOrg != null) {
      Origin += (PrevOrg - Origin) * trail;
    }
    Steps += newGrowth;
    Rot += RotDelta * newGrowth;
    Shift += ShiftDelta * newGrowth;

    return Origin;
  }

  int Contour(Parameters globRing, double frame, Math.Random rng,
      VM.Vector2 windowCenter, bool curved, List<VM.Vector2> vertices) {
    final double stateZoom = globRing.GetDouble(oZoom); //
    double steps = Steps * stateZoom;
    VM.Vector2 globalScale = new VM.Vector2.zero();
    globRing.SetScale(frame, rng, globalScale);

    final VM.Vector2 scale = Scale.clone()..multiply(globalScale);
    VM.Vector2 shift = Shift * stateZoom + Origin + windowCenter;
    // TODO: maybe use ShiftDelta?
    shift += globRing.GetShift(frame, rng)..scale(steps);

    // numPoints == vertices in original
    final int numPoints = 2 *
        (Sides + globRing.GetOscillatingDouble(oPolySides, frame, rng).round());

    final VM.Vector2 radEven = scale * steps;
    final VM.Vector2 radOdd =
        scale * (steps * StarRatio * globRing.GetStarRatio(frame, rng));

    final double tr =
        Rot + globRing.GetOscillatingDouble(oRotateSpeed, frame, rng) / 5 * 180;
    final double trExtraOdd = Pinwheel +
        2.0 *
            Math.pi /
            numPoints *
            globRing.GetOscillatingDouble(oPinwheel, frame, rng);

    final int total = curved ? numPoints * 3 : numPoints;
    while (vertices.length < total) {
      vertices.add(new VM.Vector2.zero());
    }

    for (int i = 0; i < numPoints; i++) {
      double theta = Math.pi * 2.0 * i / numPoints + tr;
      VM.Vector2 rad = radEven;
      if (i % 2 != 0) {
        rad = radOdd;
        theta += trExtraOdd;
      }

      VM.Vector2 c1; // prev control 2
      VM.Vector2 p; // curr
      VM.Vector2 c2; // curr control 1

      if (curved) {
        c1 = vertices[3 * i + 0];
        p = vertices[3 * i + 1];
        c2 = vertices[3 * i + 2];
      } else {
        p = vertices[i];
      }
      p.setValues(Math.sin(theta), Math.cos(theta));
      p
        ..multiply(rad)
        ..add(shift);

      if (!curved) {
        continue;
      }

      double curveLenPrev;
      double curveLenNext;

      if (i % 2 != 0) {
        curveLenPrev =
            OddCurve + globRing.GetOscillatingDouble(oOddCurve, frame, rng);
        curveLenNext = curveLenPrev *
            (OddShear + globRing.GetOscillatingDouble(oOddShear, frame, rng));
      } else {
        curveLenPrev =
            EvenCurve + globRing.GetOscillatingDouble(oEvenCurve, frame, rng);
        curveLenNext = curveLenPrev *
            (EvenShear + globRing.GetOscillatingDouble(oEvenShear, frame, rng));
      }

      VM.Vector2 t = (p - shift);
      c1.setValues(p.x - t.y * curveLenPrev, p.y + t.x * curveLenPrev);
      c2.setValues(p.x + t.y * curveLenNext, p.y + t.x * curveLenNext);
    }
    return total;
  }
}

bool IsVisible(int n, List<VM.Vector2> contour, VM.Vector2 canvasSize) {
  for (int i = 0; i < n; i++) {
    VM.Vector2 p = contour[i];
    if (0 <= p.x && p.x < canvasSize.x && 0 <= p.y && p.y < canvasSize.y)
      return true;
  }
  return false;
}

class RingStyle {
  String Color = ""; // ring's current color, in RGB
  double LineWidth = 1.0; // pen width, in pixels, or 0 to use DC pen
  int DrawMode = 0; // see draw mode enum

  RingStyle();

  void Set(State state, Parameters config, double frame, Math.Random rng) {
    double hue = state.Hue % 360.0;
    double saturation =
        100.0 * config.GetOscillatingDouble(oSaturation, frame, rng);
    double lightness =
        100.0 * config.GetOscillatingDouble(oLightness, frame, rng);
    Color = "hsl(${hue}, ${saturation}%, ${lightness}%)";
    LineWidth = config.GetOscillatingDouble(oLineWidth, frame, rng);
    DrawMode = config.GetInt(oDrawMode);
  }
}

class RingDrawable {
  bool curved = false;
  double lineWidth = 1.0;
  String color = "";
  int nVertices = 0;
  List<VM.Vector2> vertices = [];
}

class Ring {
  final RingGeometry geometry = new RingGeometry();
  final RingStyle style = new RingStyle();
  final RingDrawable drawable = new RingDrawable();

  Ring();

  bool UpdateDrawable(VM.Vector2 windowCenter, VM.Vector2 canvasSize,
      double frame, Math.Random rng) {
    if (geometry.Reverse && geometry.Steps <= 0) return false;

    drawable.curved = geometry.EvenCurve != 0 ||
        geometry.OddCurve != 0 ||
        globalConfig.GetOscillatingDouble(oEvenCurve, frame, rng) != 0 ||
        globalConfig.GetOscillatingDouble(oOddCurve, frame, rng) != 0;

    drawable.lineWidth = style.LineWidth +
        globalConfig.GetOscillatingDouble(oLineWidth, frame, rng);

    drawable.color = style.Color;
    drawable.nVertices = geometry.Contour(globalConfig, frame, rng,
        windowCenter, drawable.curved, drawable.vertices);

    return IsVisible(drawable.nVertices, drawable.vertices, canvasSize);
  }
}

class TheRings {
  Queue<Ring> _rings = new Queue();

  List<Ring> _freeList = [];

  TheRings();

  Ring addRing(VM.Vector2 canvasSize, Parameters config, double frame,
      Math.Random rng, State state, CopyState copying) {
    Ring ring;
    if (_freeList.length > 0) {
      ring = _freeList.removeLast();
    } else {
      ring = new Ring();
    }
    ring.style.Set(state, config, frame, rng);
    ring.geometry.Set(canvasSize, config, frame, rng, copying);

    if (ring.geometry.Reverse) {
      _rings.addLast(ring);
      while (_rings.length > config.GetDouble(oRings)) {
        _freeList.add(_rings.removeFirst());
      }
      print("reverse: ${_rings.length}");
    } else {
      _rings.addFirst(ring);
      while (_rings.length > config.GetDouble(oRings)) {
        _freeList.add(_rings.removeLast());
      }
    }
    return ring;
  }

  void removeRings(List<Ring> toBeDeleted) {
    for (Ring r in toBeDeleted) {
      _rings.remove(r);
      _freeList.add(r);
    }
  }

  int get length => _rings.length;
  Queue<Ring> get rr => _rings;
}

TheRings theRings = new TheRings();

double _lastTimeMs = 0.0;

const double SPEED = 0.3;
double frameCount = 0.0;

// TODO: set initial Hue
final State state = new State();

List<Ring> DrawRings(HTML.CanvasRenderingContext2D ctx, VM.Vector2 windowCenter,
    VM.Vector2 canvasSize, double frame, Math.Random rng) {
  List<Ring> toBeDeleted = [];
  // Ring last;
  for (Ring ring in theRings.rr) {
    if (!ring.UpdateDrawable(windowCenter, canvasSize, frame, rng)) {
      toBeDeleted.add(ring);
      continue;
    }
    final RingDrawable d = ring.drawable;

    if (d.lineWidth > 0.0) {
      DrawContour(
          ctx, d.color, d.lineWidth.ceil(), d.nVertices, d.vertices, d.curved);
    }

    /*
    if (last != null) {
      Fill(ctx, d.color, last.drawable.nVertices, last.drawable.vertices,
          d.nVertices, d.vertices);
    }
    last = ring;
    */
  }

  return toBeDeleted;
}

String GetBackgroundColor(Parameters config, double frame, Math.Random rng) {
  double hue = config.GetOscillatingDouble(oBkHue, frame, rng);
  double saturation = config.GetOscillatingDouble(oBkSaturation, frame, rng);
  double lightness = config.GetOscillatingDouble(oBkLightness, frame, rng);
  return "hsl(${hue}, ${saturation}%, ${lightness}%)";
}

void MaybeAddRings(
  State state,
) {}

void animate(num timeMs) {
  //double elapsed = timeMs - _lastTimeMs;
  _lastTimeMs = timeMs + 0.0;

  frameCount += 1.0;

  VM.Vector2 canvasSize =
      new VM.Vector2(gCanvasElement.width + 0.0, gCanvasElement.height + 0.0);
  VM.Vector2 windowCenter = canvasSize.clone()..scale(0.5);

  final double growth =
      SPEED * config.GetOscillatingDouble(oRingGrowth, frameCount, gRng);
  final double ringSpaceing =
      config.GetOscillatingDouble(oRingSpacing, frameCount, gRng);
  assert(ringSpaceing > 0);
  assert(growth >= 0.0);
  assert(ringSpaceing >= 0.0);
  double unusedGrowth = growth;
  double currentFrame = frameCount -
      1.0; // approximately the time when the new ring should have been created.
  while (unusedGrowth > 0.0) {
    if (unusedGrowth + state.RingOffset <= 0.0) {
      state.RingOffset += unusedGrowth;
      unusedGrowth = 0.0;
      break;
    }
    double fracTick = -state.RingOffset / growth;
    currentFrame += fracTick;
    unusedGrowth += state.RingOffset;
    state.RingOffset = -ringSpaceing;
    // we need to create one or more new rings

    final Ring ring =
        theRings.addRing(canvasSize, config, currentFrame, gRng, state, null);
    ring.geometry.Update(0.0, growth * (frameCount - currentFrame), null);
  }

  //
  final HTML.CanvasRenderingContext2D ctx = gCanvasElement.getContext("2d");
  // Clear Canvas
  DrawBackground(ctx, canvasSize.x, canvasSize.y,
      GetBackgroundColor(config, frameCount, gRng));
  // Draw Rings and determine invisible ones
  List<Ring> toBeDeleted =
      DrawRings(ctx, windowCenter, canvasSize, frameCount, gRng);

  state.Hue +=
      config.GetOscillatingDouble(oColorSpeed, frameCount, gRng) * SPEED;
  VM.Vector2 PrevOrg = windowCenter;
  for (Ring ring in theRings.rr) {
    PrevOrg = ring.geometry.Origin;
  }

  for (Ring ring in theRings.rr) {
    final trail = 1.0 - config.GetDouble(oTrail);

    // PrevOrg =
    ring.geometry.Update(trail, growth, PrevOrg);
  }

  theRings.removeRings(toBeDeleted);

  HTML.window.requestAnimationFrame(animate);
  List<String> extra = ["Rings: ${theRings.length}", "hue: ${state.Hue}"];
  //for (Ring ring in theRings.rr) {}

  UpdateFrameCount(_lastTimeMs, gFps, extra.join("\n"));
}

void main() {
  OptionsSetup();

  HTML.document.body.onKeyDown.listen((HTML.KeyboardEvent e) {
    log.LogInfo("key pressed ${e.keyCode} ${e.target.runtimeType}");
    if (e.target.runtimeType == HTML.InputElement) {
      return;
    }

    String cmd = new String.fromCharCodes([e.keyCode]);
    HandleCommand(cmd, "");
  });

  HTML.document.body.onClick.listen((HTML.MouseEvent ev) {
    if (ev.target.runtimeType != HTML.CanvasElement) return;
    log.LogInfo("click ${ev.target.runtimeType}");
    HandleCommand("C", "");
  });

  gFilesElement.onChange.listen(HandleFileSelect);

  void resolutionChange(HTML.Event ev) {
    int w = gCanvasElement.clientWidth;
    int h = gCanvasElement.clientHeight;
    gCanvasElement.width = w;
    gCanvasElement.height = h;
    print("size change $w $h");
  }

  HTML.window.onResize.listen(resolutionChange);
  resolutionChange(null);

  HTML.ElementList<HTML.Element> buttons =
      HTML.document.body.querySelectorAll("button");
  log.LogInfo("found ${buttons.length} buttons");
  buttons.onClick.listen((HTML.Event ev) {
    String cmd = (ev.target as HTML.Element).dataset['cmd'];
    String param = (ev.target as HTML.Element).dataset['param'];
    HandleCommand(cmd, param);
  });

  state.Color = config.GetDouble(oHue);
  HTML.window.requestAnimationFrame(animate);
}
