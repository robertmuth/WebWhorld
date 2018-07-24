library parameter;

import 'package:vector_math/vector_math.dart' as VM;
import 'dart:math' as Math;

const int TRIANGLE = 0;
const int SINE = 1;
const int RAMP_UP = 2;
const int RAMP_DOWN = 3;
const int SQUARE = 4;
const int PULSE = 5;
const int RANDOM = 6;
const int RANDOM_RAMP = 7;

const int FRAME_RATE = 50;
const double MIN_STAR_RATIO = 1e-2;
const double MIN_ASPECT_RATIO = 1e-9;

const int DM_FILL = 0x01; // fill area between rings
const int DM_OUTLINE = 0x02; // outline edges of filled rings
const int DM_XRAY = 0x04; // draw rings with XOR pen

class Oscillator {
  final double value; // parameter's base value, to which modulation is applied
  final int waveform; // modulation waveform
  final double amplitude; // modulation amplitude (negative -> phase inversion)
  final double freq; // modulation frequency, in Hz
  final double pulseWidth; // pulse width, from 0..1 (for pulse waveforms)

  double lastPhase = 1.0;
  double currValue = 0.0;
  double prevValue = 0.0;

  Oscillator(
      this.value, this.waveform, this.amplitude, this.freq, this.pulseWidth);

  void ClearState() {
    lastPhase = 1.0;
    currValue = 0.0;
    prevValue = 0.0;
  }

  double Delta(double frame, Math.Random rng) {
    final double pos = frame * freq / FRAME_RATE;
    double r;
    switch (waveform) {
      case TRIANGLE:
        r = (pos * 2 + .5) % 2.0;
        return r < 1 ? r * 2 - 1 : 3 - r * 2;
      case SINE:
        return Math.sin((pos % 1) * Math.pi * 2);
      case RAMP_UP:
        return (pos % 1.0) * 2 - 1;
      case RAMP_DOWN:
        return 1 - (pos % 1.0) * 2;
      case SQUARE:
        return (pos % 1.0) < .5 ? 1.0 : -1.0;
      case PULSE:
        return (pos % 1.0) < pulseWidth ? 1.0 : -1.0;
      case RANDOM:
        r = (pos % 1.0);
        if (r < 0.5 && lastPhase > 0.5) {
          currValue = rng.nextDouble();
        }
        lastPhase = r;
        return currValue;
      case RANDOM_RAMP:
        r = (pos % 1.0);
        if (r < 0.5 && lastPhase > 0.5) {
          prevValue = currValue;
          currValue = rng.nextDouble();
        }
        lastPhase = r;
        return currValue * r + prevValue * (1.0 - r);
      default:
        return 0.0;
    }
  }

  double Value(double frame, Math.Random rng) {
    return value + Delta(frame, rng) * amplitude;
  }
}

enum ValueType {
  OSCILLATOR,
  DOUBLE,
  INT,
  BOOL,
  POINT,
}
//  /stuff/Cool/Whorld/trunk/ParmDef.h

const String oRingGrowth = "RingGrowth";
const String oRingSpacing = "RingSpacing";
const String oPolySides = "PolySides";
const String oRotateSpeed = "RotateSpeed";
const String oAspectRatio = "AspectRatio";
const String oSkewRadius = "SkewRadius";
const String oSkewAngle = "SkewAngle";
const String oStarFactor = "StarFactor";
const String oColorSpeed = "ColorSpeed";
const String oLightness = "Lightness";
const String oSaturation = "Saturation";
const String oBkHue = "BkHue";
const String oBkLightness = "BkLightness";
const String oBkSaturation = "BkSaturation";
const String oPinwheel = "Pinwheel";
const String oLineWidth = "LineWidth";
const String oEvenCurve = "EvenCurve";
const String oOddCurve = "OddCurve";
const String oEvenShear = "EvenShear";
const String oOddShear = "OddShear";

/*
	RING_GROWTH,	// pixels of ring growth per tick
	RING_SPACING,	// gap between rings, in pixels
	LINE_WIDTH,		// line width, in pixels
	POLY_SIDES,		// ring's number of sides, rounded to int
	ROTATE_SPEED,	// ring rotation per tick, in radians
	ASPECT_RATIO,	// 1 = double width, -1 = double height
	SKEW_RADIUS,	// size of origin offset, in pixels
	SKEW_ANGLE,		// angle of origin offset, in radians
	STAR_FACTOR,	// 0 = no star, > 1 = convex, < 1 = concave
	PINWHEEL,		// odd vertex rotation, in radians
	COLOR_SPEED,	// hue change per tick, in degrees
	LIGHTNESS,		// color lightness, from 0..1
	SATURATION,		// color saturation, from 0..1
	BK_HUE,			// background color hue, in degrees
	BK_LIGHTNESS,	// background color lightness, from 0..1
	BK_SATURATION,	// background color saturation, from 0..1
	EVEN_CURVE,		// even vertex curvature, as fraction of radius
	ODD_CURVE,		// odd vertex curvature, as fraction of radius
	EVEN_SHEAR,		// even vertex curvature asymmetry, as a ratio
	ODD_SHEAR		// odd vertex curvature asymmetry, as a ratio
*/

const String oOrigin = "Origin";
const String oDrawMode = "DrawMode";
const String oOrgMotion = "OrgMotion";
const String oHue = "Hue";
const String oMirror = "Mirror";
const String oReverse = "Reverse";
const String oConvex = "Convex";
const String oInvertColor = "InvertColor";
const String oLoopHue = "LoopHue";
const String oPause = "Pause";

/*
MAINDEF(Origin,			DPOINT)	// view origin, in normalized coordinates
MAINDEF(DrawMode,		INT)	// draw mode; see enum in CWhorldView
MAINDEF(OrgMotion,		INT)	// origin motion; see enum in CMainFrame
MAINDEF(Hue,			DOUBLE)	// current hue in degrees
MAINDEF(Mirror,			bool)	// true if mirroring
MAINDEF(Reverse,		bool)	// true if rings growing inward
MAINDEF(Convex,			bool)	// true if drawing in descending size order
MAINDEF(InvertColor,	bool)	// true if inverting color
MAINDEF(LoopHue,		bool)	// true if looping hue
MAINDEF(Pause,			bool)	// true if paused
MAINDEF(ZoomCenter,		bool)	// true if zoom is window-centered
*/

const String oSpeed = "Speed";
const String oDamping = "Damping";
const String oTrail = "Trail";
const String oTempo = "Tempo";
const String oHueLoopLength = "HueLoopLength";
const String oCanvasScale = "CanvasScale";
const String oCopies = "Copies";
const String oSpread = "Spread";

/*
MASTERDEF(SPEED,	Speed,			DOUBLE)	// master speed, as a fraction; 1 = nominal
MASTERDEF(ZOOM,		Zoom,			DOUBLE)	// zoom, as a fraction; 1 = nominal
MASTERDEF(DAMPING,	Damping,		DOUBLE)	// origin/zoom damping; 1 = none, 0 = stuck
MASTERDEF(TRAIL,	Trail,			DOUBLE)	// origin trail; 0 = none, 1 = stuck
MASTERDEF(RINGS,	Rings,			DOUBLE)	// maximum number of rings
MASTERDEF(TEMPO,	Tempo,			DOUBLE)	// tempo, in BMP
MASTERDEF(HUE_LOOP,	HueLoopLength,	DOUBLE)	// if looping hue, loop length in degrees
MASTERDEF(CANVAS,	CanvasScale,	DOUBLE)	// canvas size, as fraction of window size
MASTERDEF(COPIES,	Copies,			DOUBLE)	// number of instances
MASTERDEF(SPREAD,	Spread,			DOUBLE)	// radius of instance origins, in pixels
*/

final Map<String, ValueType> parameterTypes = {
  // /stuff/Cool/Whorld/trunk/ParmDef.h
  oRingGrowth: ValueType.OSCILLATOR,
  oRingSpacing: ValueType.OSCILLATOR,
  oPolySides: ValueType.OSCILLATOR,
  oRotateSpeed: ValueType.OSCILLATOR,
  oAspectRatio: ValueType.OSCILLATOR,
  oSkewRadius: ValueType.OSCILLATOR,
  oSkewAngle: ValueType.OSCILLATOR,
  oStarFactor: ValueType.OSCILLATOR,
  oColorSpeed: ValueType.OSCILLATOR,
  oLightness: ValueType.OSCILLATOR,
  oSaturation: ValueType.OSCILLATOR,
  oBkHue: ValueType.OSCILLATOR,
  oBkLightness: ValueType.OSCILLATOR,
  oBkSaturation: ValueType.OSCILLATOR,
  oPinwheel: ValueType.OSCILLATOR,
  oLineWidth: ValueType.OSCILLATOR,
  oEvenCurve: ValueType.OSCILLATOR,
  oOddCurve: ValueType.OSCILLATOR,
  oEvenShear: ValueType.OSCILLATOR,
  oOddShear: ValueType.OSCILLATOR,

  //  /stuff/Cool/Whorld/trunk/MainDef.h
  oOrigin: ValueType.POINT,
  oDrawMode: ValueType.INT,
  oOrgMotion: ValueType.INT,
  oHue: ValueType.DOUBLE,
  oMirror: ValueType.BOOL,
  oReverse: ValueType.BOOL,
  oConvex: ValueType.BOOL,
  oInvertColor: ValueType.BOOL,
  oLoopHue: ValueType.BOOL,
  oPause: ValueType.BOOL,
  // oZoomCenter: ValueType.BOOL,

  // /stuff/Cool/Whorld/trunk/MasterDef.h
  oSpeed: ValueType.DOUBLE,
  // oZoom: ValueType.DOUBLE,
  oDamping: ValueType.DOUBLE,
  oTrail: ValueType.DOUBLE,
  oTempo: ValueType.DOUBLE,
  oHueLoopLength: ValueType.DOUBLE,
  oCanvasScale: ValueType.DOUBLE,
  oCopies: ValueType.DOUBLE,
  oSpread: ValueType.DOUBLE,
};

final Map<String, dynamic> parameterDefaults = <String, dynamic>{
  oOrigin: VM.Vector2(0.5, 0.5),
  oSpeed: 1.0,
  oDamping: .186261,
  oTrail: 0.0,
  oTempo: 100.0,
  oHueLoopLength: 30.0,
  oCanvasScale: 1.4,
  oCopies: 1.0,
  oSpread: 100.0,
  //
  oColorSpeed: Oscillator(1.0, TRIANGLE, 0.0, 0.0, 0.0),
  oLightness: Oscillator(0.5, TRIANGLE, 0.0, 0.0, 0.0),
  oSaturation: Oscillator(1.0, TRIANGLE, 0.0, 0.0, 0.0),
  oLineWidth: Oscillator(1.0, TRIANGLE, 0.0, 0.0, 0.0),
  //oEvenCurve: new Oscillator(1.0, TRIANGLE, 0.0, 0.0, 0.0),
  //oOddCurve: new Oscillator(1.0, TRIANGLE, 0.0, 0.0, 0.0),
};

class Parameters {
  final Map<String, dynamic> _p;

  Parameters(this._p);

  bool GetBool(String key) {
    assert(parameterTypes[key] == ValueType.BOOL);
    if (_p.containsKey(key)) return _p[key];
    if (parameterDefaults.containsKey(key)) return parameterDefaults[key];
    return false;
  }

  double GetDouble(String key) {
    assert(parameterTypes[key] == ValueType.DOUBLE);
    if (_p.containsKey(key)) return _p[key];
    if (parameterDefaults.containsKey(key)) return parameterDefaults[key];
    return 0.0;
  }

  int GetInt(String key) {
    assert(parameterTypes[key] == ValueType.INT);
    if (_p.containsKey(key)) return _p[key];
    if (parameterDefaults.containsKey(key)) return parameterDefaults[key];
    return 0;
  }

  VM.Vector2 GetPoint(String key) {
    assert(parameterTypes[key] == ValueType.POINT);
    if (_p.containsKey(key)) return _p[key];
    if (parameterDefaults.containsKey(key)) return parameterDefaults[key];
    return VM.Vector2.zero();
  }

  double GetOscillatingDouble(String key, double frame, Math.Random rng) {
    assert(parameterTypes[key] == ValueType.OSCILLATOR);
    Oscillator o = _p[key];
    if (o == null) o = parameterDefaults[key];
    if (o != null) return o.Value(frame, rng);
    return 0.0;
  }

  void SetScale(double frame, Math.Random rng, VM.Vector2 out) {
    final double r = Math.max(
        Math.pow(2.0, GetOscillatingDouble(oAspectRatio, frame, rng)),
        MIN_ASPECT_RATIO);
    out.setValues(r > 1.0 ? r : 1.0, r < 1.0 ? 1.0 / r : 1.0);
  }

  double GetStarRatio(double frame, Math.Random rng) {
    return Math.max(
        Math.pow(2.0, GetOscillatingDouble(oStarFactor, frame, rng)),
        MIN_STAR_RATIO);
  }

  VM.Vector2 GetShift(double frame, Math.Random rng) {
    final double angle = GetOscillatingDouble(oSkewAngle, frame, rng);
    return VM.Vector2(Math.sin(angle), Math.cos(angle))
      ..scale(GetOscillatingDouble(oSkewRadius, frame, rng));
  }
}

Map<String, dynamic> ReadParameter(String data) {
  Map<String, dynamic> out = <String, dynamic>{};
  final List<String> lines = data.split("\n");
  final String header = lines.removeAt(0);
  if (header.trim() != "WHORLD1") {
    print("#@@ bad header: [${header}]");
  }
  for (String line in lines) {
    line = line.trim();
    if (line.length == 0) continue;
    List<String> token = line.split(RegExp(r"\s+"));
    if (token.length == 0 || token[0].startsWith("#")) continue;
    final String key = token.removeAt(0);

    if (!parameterTypes.containsKey(key)) {
      print("@@ bad param: [${key}]");
      continue;
    }
    switch (parameterTypes[key]) {
      case ValueType.BOOL:
        assert(token.length == 1);
        out[key] = 1 == int.parse(token[0]);
        break;
      case ValueType.INT:
        assert(token.length == 1);
        out[key] = int.parse(token[0]);
        break;
      case ValueType.DOUBLE:
        assert(token.length == 1);
        out[key] = double.parse(token[0]);
        break;
      case ValueType.OSCILLATOR:
        if (token.length == 4) {
          token.add("0.5");
        }
        assert(token.length == 5);
        out[key] = Oscillator(
            double.parse(token[0]),
            int.parse(token[1]),
            double.parse(token[2]),
            double.parse(token[3]),
            double.parse(token[4]));
        break;
      case ValueType.POINT:
        assert(token.length == 2);
        out[key] = VM.Vector2(double.parse(token[0]), double.parse(token[1]));
        break;
    }
  }
  return out;
}

class State {
  double RingOffset = 0.0; // size of gap since last ring, in pixels
  double CanvasScale; // canvas size, as a fraction of client window
  double Hue = 0.0; // hue of new rings, in degrees
  double Color; // color of new rings, in RGB
  int BkColor; // background color, in RGB
  // int DrawMode = 0; // see draw mode enum
  bool Mirror; // true if we're mirroring
  bool HueLoop; // true if hue is being looped
  bool Convex; // true if rings are drawn in descending size order
  int VideoROPIdx; // index of video raster operation
  VM.Vector2 NormOrg; // normalized origin: 0,0 = upper left, 1,1 = lower right
  VM.Vector2
      MirrorOrg; // distance from origin to window center, in client coords
  double HueLoopPos; // hue loop position, in degrees
  double HueLoopLength; // length of hue loop, in degrees
  double HueLoopBase; // hue loop's base hue, in degrees
  int InvertMask; // 0xffffff if inverting color, else zero
  double Zoom; // magnification factor, 1 = normal
  double Trail = 0.0; // origin propagation: 0 = no trail, 1 = permanent origin
  VM.Vector2 VideoOrg; // video origin in mirror mode
}


