"""sRGB <-> OKLCH helpers used by the token generator."""
import math

def _srgb_to_lin(c):
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def _lin_to_srgb(c):
    v = 12.92 * c if c <= 0.0031308 else 1.055 * (c ** (1 / 2.4)) - 0.055
    return max(0.0, min(1.0, v)) * 255

def hex_to_oklch(h):
    r, g, b = (_srgb_to_lin(int(h[i:i + 2], 16)) for i in (1, 3, 5))
    l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    l_, m_, s_ = l ** (1 / 3), m ** (1 / 3), s ** (1 / 3)
    L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    C = math.hypot(a, bb)
    H = math.degrees(math.atan2(bb, a)) % 360
    return L, C, H

def oklch_to_rgb(L, C, H):
    a = C * math.cos(math.radians(H))
    bb = C * math.sin(math.radians(H))
    l_ = L + 0.3963377774 * a + 0.2158037573 * bb
    m_ = L - 0.1055613458 * a - 0.0638541728 * bb
    s_ = L - 0.0894841775 * a - 1.2914855480 * bb
    l, m, s = l_ ** 3, m_ ** 3, s_ ** 3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    return r, g, b

def in_gamut(L, C, H):
    return all(-1e-4 <= v <= 1.0001 for v in oklch_to_rgb(L, C, H))

def oklch_to_hex(L, C, H):
    """Convert, reducing chroma until the colour fits in sRGB."""
    lo, hi = 0.0, C
    if not in_gamut(L, C, H):
        for _ in range(40):
            mid = (lo + hi) / 2
            if in_gamut(L, mid, H):
                lo = mid
            else:
                hi = mid
        C = lo
    r, g, b = oklch_to_rgb(L, C, H)
    return "#%02X%02X%02X" % tuple(int(round(_lin_to_srgb(v))) for v in (r, g, b))

def contrast(h1, h2):
    def lum(h):
        r, g, b = (_srgb_to_lin(int(h[i:i + 2], 16)) / 255 * 255 for i in (1, 3, 5))
        r, g, b = (_srgb_to_lin(int(h[i:i + 2], 16)) for i in (1, 3, 5))
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    a, b = sorted((lum(h1), lum(h2)), reverse=True)
    return (a + 0.05) / (b + 0.05)
