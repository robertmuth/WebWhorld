import 'dart:math' as Math;
import 'dart:html' as HTML;
import 'dart:core';

import 'webutil.dart';
import 'rgb.dart';
import 'logging.dart' as log;
import 'config.dart';
import 'parameter.dart';
import 'patches.dart';

import 'package:vector_math/vector_math.dart' as VM;

final HTML.Element gFps = HTML.querySelector("#fps");
final HTML.CanvasElement gCanvasElement = HTML.querySelector("#area");
final HTML.InputElement gFilesElement =
    HTML.document.getElementById('loadfile');

Math.Random gRng = Math.Random();

final Parameters globRing = Parameters(<String, dynamic>{});

// Mouse collects Mouse-Events and provides a convenient API
class Mouse {
  static const int RIGHT = 2;
  static const int MIDDLE = 1;
  static const int LEFT = 0;

  final Set<int> _currentlyPressedButtons = Set<int>();
  final Set<int> _justPressedButtons = Set<int>();
  final Set<int> _justReleasedButtons = Set<int>();

  int moveDeltaX = 0;
  int moveDeltaY = 0;
  int wheelDeltaY = 0;
  int currentX = 0;
  int currentY = 0;

  Mouse(dynamic elem) {
    if (elem == null) elem = HTML.document;

    elem.onMouseMove.listen((HTML.MouseEvent e) {
      e.preventDefault();

      currentX = e.offset.x;
      currentY = e.offset.y;

      moveDeltaX = e.movement.x;
      moveDeltaY = e.movement.y;
      //print ("MOVE ${moveDeltaX}x${moveDeltaY}");
    });

    elem.onMouseDown.listen((HTML.MouseEvent e) {
      e.preventDefault();
      print("BUTTON ${e.button}");
      _currentlyPressedButtons.add(e.button);
      _justPressedButtons.add(e.button);
    });

    elem.onMouseUp.listen((HTML.MouseEvent e) {
      e.preventDefault();
      _currentlyPressedButtons.remove(e.button);
      _justReleasedButtons.add(e.button);
    });

    elem.onMouseWheel.listen((HTML.WheelEvent e) {
      e.preventDefault();
      wheelDeltaY = e.deltaY;
    });

    /*
   canvas.onContextMenu.listen((HTML.MouseEvent e) {
     e.preventDefault();
     //e.stopPropagation();
     //e.cancelBubble = true;
   });

     canvas.onDragStart.listen((HTML.MouseEvent event) {
       event.preventDefault();
     });
     */
    /*

     eventElement.onTouchStart.listen((HTML.TouchEvent e) {
       mouseDownX = e.touches[0].client.x;
       mouseDownY = e.touches[0].client.y;
     });

     eventElement.onTouchMove.listen((HTML.TouchEvent e) {
       //azimuth += e.movement.x*0.01;
       //polar += e.movement.y*0.01;
       HTML.Point p = e.touches[0].client;
       azimuth += (p.x - mouseDownX) * 0.01;
       polar += (mouseDownY - p.y) * 0.01;
       mouseDownX = p.x;
       mouseDownY = p.y;
     });

     setUpEventCapture(null);
     */
  }

  bool currentlyPressedButton(int key) =>
      _currentlyPressedButtons.contains(key);

  // if you use this function make sure you call AfterFrameCleanup
  bool justPressedButton(int key) => _justPressedButtons.contains(key);

  // if you use this function make sure you call AfterFrameCleanup
  bool justReleasedButton(int key) => _justReleasedButtons.contains(key);

  // AfterFrameCleanup must be called at the end of each frame
  void AfterFrameCleanup() {
    moveDeltaY = 0;
    moveDeltaX = 0;
    wheelDeltaY = 0;
    _justReleasedButtons.clear();
    _justPressedButtons.clear();
  }
}

Mouse gMouse;

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
    return Point(x, y);
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

void AddContourToPath(HTML.Path2D path, int n, List<VM.Vector2> contour) {
  VM.Vector2 last = contour[n - 1];
  path.moveTo(last.x, last.y);
  for (int i = 0; i < n; i++) {
    path.lineTo(contour[i].x, contour[i].y);
  }
}

void AddBezierContourToPath(HTML.Path2D path, int n, List<VM.Vector2> contour) {
  VM.Vector2 last = contour[contour.length - 2];
  path.moveTo(last.x, last.y);
  for (int i = 0; i < n; i += 3) {
    VM.Vector2 c1 = contour[(i - 1 + n) % n];
    VM.Vector2 c2 = contour[i];
    VM.Vector2 p = contour[(i + 1) % n];
    path.bezierCurveTo(c1.x.round(), c1.y.round(), c2.x.round(), c2.y.round(),
        p.x.round(), p.y.round());
  }
}

void DrawContour(HTML.CanvasRenderingContext2D ctx, String color, int lineWidth,
    int n, List<VM.Vector2> contour, bool curved) {
  assert(lineWidth > 0);
  HTML.Path2D path = HTML.Path2D();
  if (curved) {
    AddBezierContourToPath(path, n, contour);
  } else {
    AddContourToPath(path, n, contour);
  }
  ctx
    ..strokeStyle = color
    ..lineWidth = lineWidth
    ..stroke(path);
}

void Fill(HTML.CanvasRenderingContext2D ctx, String color, int nInner,
    List<VM.Vector2> inner, int nOuter, List<VM.Vector2> outer) {
  HTML.Path2D path = HTML.Path2D();
  if (nInner > 0) {
    AddContourToPath(path, nInner, inner);
  }
  AddContourToPath(path, nOuter, outer);

  ctx
    ..fillStyle = color
    ..fill(path, "evenodd");
}

void FillWithOutline(
    HTML.CanvasRenderingContext2D ctx,
    String fillColor,
    String lineColor,
    int lineWidth,
    int nInner,
    List<VM.Vector2> inner,
    int nOuter,
    List<VM.Vector2> outer) {
  HTML.Path2D path = HTML.Path2D();
  if (nInner > 0) {
    AddContourToPath(path, nInner, inner);
  }
  AddContourToPath(path, nOuter, outer);

  ctx
    ..fillStyle = fillColor
    ..fill(path, "evenodd")
    ..strokeStyle = lineColor
    ..lineWidth = lineWidth
    ..stroke(path);
}

void Reset() {
  theRings = TheRings();
  frameCount = 0.0;
  gRng = Math.Random();
}

HTML.FileReader reader;

void HandleFileLoad(HTML.ProgressEvent e) {
  print("Content: ${reader.result}");
  AllConfigs["Custom"] = Parameters(ReadParameter(reader.result));
  gOptions.Set(oPatch, "Custom");
}

void HandleFileSelect(HTML.Event e) {
  HTML.InputElement input = e.target;
  print("Reading file: ${input.files} ${e}");
  reader = HTML.FileReader();
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
    case "Z":
      gOptions.Set(oZoom, "1.0");
      gOptions.Set(oZoomCenterX, "0.0");
      gOptions.Set(oZoomCenterY, "0.0");
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
    case "E":
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
    return VM.Vector2(Math.sin(oldTheta), Math.cos(oldTheta));
  }
}

class RingGeometry {
  // Variable Stuff
  double Rot = 0.0; // rotation for all vertices, in radians (changes over time)
  double Steps =
      0.0; // radius of even vertices, in pixels (increases over time)
  VM.Vector2 Origin =
      VM.Vector2.zero(); // origin in client coords relative to window center
  VM.Vector2 Shift = VM.Vector2.zero(); // shear, in pixels

  // Const Stuff
  double RotDelta = 0.0; // additional rotation per tick
  VM.Vector2 ShiftDelta = VM.Vector2.zero(); // additional shear per tick

  VM.Vector2 Scale = VM.Vector2(1.0, 1.0); // anisotropic scaling
  double StarRatio = 1.0; // ratio of odd radii to even radii
  int Sides = 4; // polygon's number of sides
  bool Reverse = false; // true if ring was born growing inward
  double Pinwheel = 0.0; // additional rotation for odd vertices

  double EvenCurve = 0.0; // even vertex curvature, as multiple of radius
  double OddCurve = 0.0; // odd vertex curvature, as multiple of radius
  double EvenShear = 0.0; // even vertex curve point asymmetry ratio
  double OddShear = 0.0; // odd vertex curve point asymmetry ratio

  RingGeometry();

  void Set(double maxCoord, Parameters config, double frame, Math.Random rng,
      CopyState copying) {
    final double newGrowth =
        config.GetOscillatingDouble(oRingGrowth, frame, rng);
    RotDelta = config.GetOscillatingDouble(oRotateSpeed, frame, rng);
    Reverse = newGrowth < 0.0;

    // Variable Stuff (see Update())
    Rot = 0.0;
    if (Reverse) {
      Steps = maxCoord;
    } else {
      Steps = 0.0;
    }
    config.SetScale(frame, rng, Scale);

    final double angle = config.GetOscillatingDouble(oSkewAngle, frame, rng);
    ShiftDelta
      ..setValues(Math.sin(angle), Math.cos(angle))
      ..scale(config.GetOscillatingDouble(oSkewRadius, frame, rng));
    Shift = VM.Vector2.zero();
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

  int Contour(Parameters globRing, double frame, Math.Random rng, bool curved,
      List<VM.Vector2> vertices) {
    double steps = Steps;
    VM.Vector2 globalScale = VM.Vector2.zero();
    globRing.SetScale(frame, rng, globalScale);

    final VM.Vector2 scale = Scale.clone()..multiply(globalScale);
    VM.Vector2 shift = Shift + Origin;
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
      vertices.add(VM.Vector2.zero());
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

bool IsVisible(int n, List<VM.Vector2> contour, double maxCoord) {
  for (int i = 0; i < n; i++) {
    VM.Vector2 p = contour[i];
    if (p.x.abs() < maxCoord && p.y.abs() < maxCoord) return true;
  }
  return false;
}

class RingStyle {
  double Hue;
  double Saturation;
  double Lightness;
  double LineWidth; // pen width, in pixels, or 0 to use DC pen
  int DrawMode; // see draw mode enum
  double FadeStart; // negative is invalid

  RingStyle();

  void Set(State state, Parameters config, double frame, Math.Random rng) {
    Hue = state.Hue % 360.0;
    Saturation = 100.0 * config.GetOscillatingDouble(oSaturation, frame, rng);
    Lightness = 100.0 * config.GetOscillatingDouble(oLightness, frame, rng);
    LineWidth = config.GetOscillatingDouble(oLineWidth, frame, rng);
    DrawMode = config.GetInt(oDrawMode);
    FadeStart = -1.0;
  }

  void StartFading(double frame) {
    if (FadeStart < 0.0) {
      FadeStart = frame;
    }
  }
}

class RingDrawable {
  bool curved = false;
  double lineWidth = 1.0;
  String color = "";
  double alpha = 1.0;
  int drawMode = 0;
  int nVertices = 0;
  List<VM.Vector2> vertices = [];
}

/// Ring represents an individual Ring
class Ring {
  final RingGeometry geometry = RingGeometry();
  final RingStyle style = RingStyle();
  // drawable is periodically updated from geometry and style
  final RingDrawable drawable = RingDrawable();

  Ring();

  bool UpdateDrawable(
      double maxCoord, Parameters globRing, double frame, Math.Random rng) {
    if (geometry.Reverse && geometry.Steps <= 0) return false;

    drawable.curved = geometry.EvenCurve != 0 ||
        geometry.OddCurve != 0 ||
        globRing.GetOscillatingDouble(oEvenCurve, frame, rng) != 0 ||
        globRing.GetOscillatingDouble(oOddCurve, frame, rng) != 0;

    drawable.lineWidth =
        style.LineWidth + globRing.GetOscillatingDouble(oLineWidth, frame, rng);
    drawable.drawMode = style.DrawMode;

    drawable.nVertices = geometry.Contour(
        globRing, frame, rng, drawable.curved, drawable.vertices);

    drawable.alpha =
        style.FadeStart < 0.0 ? 1.0 : 1.0 - (frame - style.FadeStart) * 0.01;
    drawable.color =
        "hsla(${style.Hue}, ${style.Saturation}%, ${style.Lightness}%, ${drawable.alpha})";

    return drawable.alpha > 0.0 &&
        IsVisible(drawable.nVertices, drawable.vertices, maxCoord);
  }
}

/// TheRings represent a set of rings
class TheRings {
  List<Ring> _rings = [];

  List<Ring> _freeList = [];

  TheRings();

  Ring addRing(double maxCoord, Parameters config, double frame,
      Math.Random rng, State state, CopyState copying) {
    Ring ring;
    if (_freeList.length > 0) {
      ring = _freeList.removeLast();
    } else {
      ring = Ring();
    }
    ring.style.Set(state, config, frame, rng);
    ring.geometry.Set(maxCoord, config, frame, rng, copying);

    final int maxRings = gOptions.GetInt(oMaxRings);
    if (ring.geometry.Reverse) {
      _rings.add(ring);
      if (_rings.length > maxRings) {
        for (int i = 0; i < _rings.length - maxRings; i++) {
          _rings[i].style.StartFading(frame);
        }
      }
    } else {
      _rings.insert(0, ring);
      if (_rings.length > maxRings) {
        for (int i = maxRings; i < _rings.length; i++) {
          _rings[i].style.StartFading(frame);
        }
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

  void removeAllRings() {
    _freeList.addAll(_rings);
    _rings.clear();
  }

  int get length => _rings.length;
  List<Ring> get rr => _rings;
}

TheRings theRings = TheRings();

double _lastTimeMs = 0.0;

const double SPEED = 0.3;
double frameCount = 0.0;

// TODO: set initial Hue
final State state = State();

List<Ring> DrawRings(HTML.CanvasRenderingContext2D ctx, double maxCoord,
    double frame, Math.Random rng, String bgColor) {
  List<Ring> toBeDeleted = [];
  Ring last;
  // Ring last;
  for (Ring ring in theRings.rr) {
    if (!ring.UpdateDrawable(maxCoord, globRing, frame, rng)) {
      toBeDeleted.add(ring);
      continue;
    }
    final RingDrawable d = ring.drawable;
    final int drawMode = d.drawMode;
    if (drawMode & DM_XRAY != 0) {
      // https://stackoverflow.com/questions/6754496/using-html5s-globalcompositeoperation-xor-with-shape-and-text-elements-in-chr
      // https://bugs.chromium.org/p/chromium/issues/detail?id=89881
      // ctx.globalCompositeOperation = 'xor';
      ctx.globalCompositeOperation = 'difference';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
    if (drawMode & DM_FILL != 0) {
      if (drawMode & DM_OUTLINE != 0) {
        if (last == null) {
          FillWithOutline(ctx, d.color, bgColor, d.lineWidth.ceil(), 0, [],
              d.nVertices, d.vertices);
        } else {
          FillWithOutline(
              ctx,
              d.color,
              bgColor,
              d.lineWidth.ceil(),
              last.drawable.nVertices,
              last.drawable.vertices,
              d.nVertices,
              d.vertices);
        }
      } else {
        if (last == null) {
          Fill(ctx, d.color, 0, [], d.nVertices, d.vertices);
        } else {
          Fill(ctx, d.color, last.drawable.nVertices, last.drawable.vertices,
              d.nVertices, d.vertices);
        }
      }
    } else {
      if (d.lineWidth > 0.0) {
        DrawContour(ctx, d.color, d.lineWidth.ceil(), d.nVertices, d.vertices,
            d.curved);
      }
    }

    last = ring;
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
  final Parameters config = AllConfigs[gOptions.Get(oPatch)];
  //double elapsed = timeMs - _lastTimeMs;
  _lastTimeMs = timeMs + 0.0;

  frameCount += 1.0;
  final double zoom = gOptions.GetDouble(oZoom);
  final double zoomCenterX = gOptions.GetDouble(oZoomCenterX);
  final double zoomCenterY = gOptions.GetDouble(oZoomCenterY);
  final VM.Vector2 canvasSize =
      VM.Vector2(gCanvasElement.width + 0.0, gCanvasElement.height + 0.0);

  final double maxCoord = Math.max(canvasSize.x, canvasSize.y) * 0.5 * zoom;

  final double growth =
      SPEED * config.GetOscillatingDouble(oRingGrowth, frameCount, gRng);
  final double ringSpacing =
      config.GetOscillatingDouble(oRingSpacing, frameCount, gRng);
  assert(ringSpacing > 0, "spacing needs to be > 0 is ${ringSpacing}");
  assert(growth >= 0.0, "growth needs to be >= 0 is ${growth}");
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
    state.RingOffset = -ringSpacing;
    // we need to create one or more new rings

    final Ring ring =
        theRings.addRing(maxCoord, config, currentFrame, gRng, state, null);
    ring.geometry.Update(0.0, growth * (frameCount - currentFrame), null);
  }
  //
  final HTML.CanvasRenderingContext2D ctx = gCanvasElement.getContext("2d");
  ctx.globalCompositeOperation = 'source-over';
  ctx.setTransform(1.0, 0.0, 0.0, 1.0, 0.0, 0.0);

  final String bgColor = GetBackgroundColor(config, frameCount, gRng);
  // Clear Canvas
  DrawBackground(ctx, canvasSize.x, canvasSize.y, bgColor);

  // We draw the rings pretending the center of the canvas has
  // coordinates 0,0
  ctx.translate(
      0.5 * canvasSize.x + zoomCenterX, 0.5 * canvasSize.y + zoomCenterY);
  ctx.scale(zoom, zoom);

  // Draw Rings and determine invisible ones
  List<Ring> toBeDeleted = DrawRings(ctx, maxCoord, frameCount, gRng, bgColor);
  state.Hue +=
      config.GetOscillatingDouble(oColorSpeed, frameCount, gRng) * SPEED;
  VM.Vector2 PrevOrg = VM.Vector2.zero();
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

  if (gMouse.currentlyPressedButton(Mouse.LEFT)) {
    if (gMouse.moveDeltaX != 0) {
      gOptions.Set(oZoomCenterX, "${zoomCenterX + gMouse.moveDeltaX}");
    }
    if (gMouse.moveDeltaY != 0) {
      gOptions.Set(oZoomCenterY, "${zoomCenterY + gMouse.moveDeltaY}");
    }
  }
  if (gMouse.wheelDeltaY != 0) {
    double delta = gMouse.wheelDeltaY * 0.01 * zoom;
    if (zoom + delta > 0.0) {
      gOptions.Set(oZoom, "${zoom + delta}");
    }
  }
  gMouse.AfterFrameCleanup();
}

void main() {
  OptionsSetup();

  HTML.document.body.onKeyDown.listen((HTML.KeyboardEvent e) {
    log.LogInfo("key pressed ${e.keyCode} ${e.target.runtimeType}");
    if (e.target.runtimeType == HTML.InputElement) {
      return;
    }

    String cmd = String.fromCharCodes([e.keyCode]);
    HandleCommand(cmd, "");
  });

  /*
  HTML.document.body.onClick.listen((HTML.MouseEvent ev) {
    if (ev.target.runtimeType != HTML.CanvasElement) return;
    log.LogInfo("click ${ev.target.runtimeType}");
    HandleCommand("C", "");
  });
*/
  gMouse = Mouse(gCanvasElement);

  gFilesElement.onChange.listen(HandleFileSelect);

  void resolutionChange(HTML.Event ev) {
    final int w = HTML.window.innerWidth;
    final int h = HTML.window.innerHeight;

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

  Parameters config = AllConfigs[gOptions.Get(oPatch)];
  state.Color = config.GetDouble(oHue);
  HTML.window.requestAnimationFrame(animate);
}
