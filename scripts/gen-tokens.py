"""
Generates src/styles/tokens.css from the client's approved palette.

The supplied palette is a barbell: four very dark primaries and five very light
secondaries, with almost nothing in between. Usable UI needs mid-tones for
borders, muted text and hover states, so each brand colour is expanded into a
full ramp by interpolating lightness in OKLCH at fixed hue, with chroma tapered
toward both ends so the pale and deep steps don't turn muddy.

Client colours are pinned to their nearest ramp step, so every approved hex
appears verbatim in the output rather than being approximated.

Run:  python scripts/gen-tokens.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from oklch import hex_to_oklch, oklch_to_hex, contrast

# --- client's approved palette -------------------------------------------
BRAND = {
    "crimson-hour":   "#471224",  # PRIMARY
    "forest-depth":   "#1D3D3C",  # PRIMARY
    "midnight-moss":  "#012B2A",  # PRIMARY
    "velvet-dusk":    "#331628",  # PRIMARY
    "candlelight":    "#F7EEC7",  # SECONDARY
    "dusk-lilac":     "#D3C5D4",  # SECONDARY
    "pressed-violet": "#BFA8C2",  # SECONDARY
    "raw-linen":      "#E8D4AF",  # SECONDARY
    "morning-sage":   "#C4D9CA",  # ACCENT
    "rose-wine":      "#8C3A51",  # ACCENT
}

# family -> (hue, peak chroma, {step: lightness}, {step: pinned brand hex})
FAMILIES = {
    "wine": (4.0, 0.1180, {
        50: .965, 100: .925, 200: .870, 300: .800, 400: .700, 500: .585,
        600: .466, 700: .395, 800: .335, 900: .278, 950: .225, 975: .175,
    }, {600: "rose-wine", 900: "crimson-hour"}),

    "plum": (343.7, 0.0620, {
        50: .960, 100: .920, 200: .862, 300: .790, 400: .690, 500: .575,
        600: .470, 700: .390, 800: .320, 900: .250, 950: .200, 975: .155,
    }, {900: "velvet-dusk"}),

    "teal": (192.6, 0.0520, {
        50: .960, 100: .920, 200: .865, 300: .795, 400: .690, 500: .575,
        600: .470, 700: .400, 800: .335, 900: .262, 950: .210, 975: .165,
    }, {800: "forest-depth", 900: "midnight-moss"}),

    "cream": (92.0, 0.0570, {
        50: .975, 100: .946, 200: .877, 300: .805, 400: .720, 500: .635,
        600: .545, 700: .460, 800: .375, 900: .300, 950: .240, 975: .185,
    }, {100: "candlelight", 200: "raw-linen"}),

    "lilac": (323.0, 0.0470, {
        50: .960, 100: .905, 200: .839, 300: .760, 400: .680, 500: .595,
        600: .510, 700: .430, 800: .355, 900: .285, 950: .225, 975: .175,
    }, {200: "dusk-lilac", 300: "pressed-violet"}),

    "sage": (154.6, 0.0400, {
        50: .960, 100: .910, 200: .865, 300: .790, 400: .705, 500: .620,
        600: .535, 700: .450, 800: .370, 900: .295, 950: .235, 975: .180,
    }, {200: "morning-sage"}),
}


def chroma_at(L, peak):
    """Taper chroma toward white and black so ends stay clean."""
    t = 1.0 - abs((L - 0.52) / 0.52) ** 1.45
    return peak * max(0.12, t)


def build():
    ramps = {}
    for fam, (hue, peak, steps, pins) in FAMILIES.items():
        ramp = {}
        for step, L in steps.items():
            ramp[step] = (
                BRAND[pins[step]] if step in pins
                else oklch_to_hex(L, chroma_at(L, peak), hue)
            )
        ramps[fam] = ramp
    return ramps


def verify(r):
    """Fail loudly if a semantic pairing drops below its required ratio."""
    checks = [
        ("body text on canvas",      r["cream"][100],  r["plum"][975], 7.0),
        ("body text on surface",     r["cream"][100],  r["plum"][900], 7.0),
        ("body text on raised",      r["cream"][100],  r["wine"][900], 7.0),
        ("muted text on surface",    r["lilac"][300],  r["plum"][900], 4.5),
        ("subtle text on surface",   r["lilac"][500],  r["plum"][900], 3.0),
        ("primary btn label",        r["wine"][900],   r["cream"][100], 7.0),
        ("accent btn label",         r["cream"][100],  r["wine"][600], 4.5),
        ("link on surface",          r["cream"][200],  r["plum"][900], 4.5),
        ("focus ring on surface",    r["sage"][200],   r["plum"][900], 3.0),
        ("success on surface",       r["sage"][200],   r["plum"][900], 4.5),
        ("danger on surface",        r["wine"][300],   r["plum"][900], 4.5),
        ("warning on surface",       r["cream"][200],  r["plum"][900], 4.5),
        ("text on teal section",     r["cream"][100],  r["teal"][900], 7.0),
        # The cream alternate ground is a LIGHT surface inside a dark system,
        # so its text roles invert. These pairings are what make tone="alt"
        # legible; without them the inherited cream text is invisible.
        ("text on cream alt",        r["wine"][900],   r["cream"][100], 7.0),
        ("muted text on cream alt",  r["wine"][700],   r["cream"][100], 4.5),
        ("text on cream alt-raised", r["wine"][900],   r["cream"][200], 7.0),
        ("accent btn on cream alt",  r["wine"][600],   r["cream"][100], 4.5),
        ("border visible on surface",r["plum"][700],   r["plum"][900], 1.2),
    ]
    ok = True
    print(f"{'pairing':28s} {'fg':9s} {'bg':9s} {'ratio':>7s}  {'min':>5s}")
    for label, fg, bg, need in checks:
        v = contrast(fg, bg)
        flag = "OK " if v >= need else "FAIL"
        if v < need:
            ok = False
        print(f"{label:28s} {fg:9s} {bg:9s} {v:7.2f}  {need:5.1f}  {flag}")
    return ok


def emit(r):
    L = []
    w = L.append
    w("/*")
    w(" * DESIGN TOKENS — generated file, do not edit by hand.")
    w(" * Source of truth: scripts/gen-tokens.py  (run `npm run tokens`)")
    w(" *")
    w(" * Built from the client's approved palette. Brand colours are pinned to")
    w(" * their exact hex; intermediate steps are interpolated in OKLCH because")
    w(" * the supplied palette has no mid-tones of its own.")
    w(" */")
    w("")
    w("@theme {")
    for fam, (hue, peak, steps, pins) in FAMILIES.items():
        rev = {v: k for k, v in pins.items()}
        w(f"  /* --- {fam} --- */")
        for step in sorted(steps):
            hexv = r[fam][step]
            note = ""
            for name, s in pins.items():
                if name == step:
                    note = f"  /* {s} */"
            w(f"  --color-{fam}-{step}: {hexv};{note}")
        w("")
    w("}")
    return "\n".join(L)


if __name__ == "__main__":
    ramps = build()
    if not verify(ramps):
        print("\nContrast verification FAILED - tokens not written.")
        raise SystemExit(1)
    out = os.path.normpath(
        os.path.join(os.path.dirname(__file__), "..", "src", "styles", "tokens.css")
    )
    with open(out, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(emit(ramps) + "\n")
    print("\nAll contrast checks passed. Wrote src/styles/tokens.css")
