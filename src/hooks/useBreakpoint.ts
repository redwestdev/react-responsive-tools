import { useMediaQuery } from 'react-responsive';
import { PREFERRED_VARIANT, HORIZONTAL_BREAKPOINTS } from '../breakpoints.config';
import { TBreakpoint } from '../interfaces/TBreakpoint';
import { TAdaptiveVariant } from '../interfaces/TAdaptiveVariant';

/**
 * Low-level hook that checks if the current viewport matches a horizontal breakpoint.
 *
 * It supports:
 *  - named breakpoints (e.g. "md", "lg"),
 *  - custom numeric pixel values (e.g. 768).
 *
 * The check is performed using `react-responsive` and the current adaptive variant:
 *  - for mobile-first (MtF) the hook uses `min-width`,
 *  - for desktop-first (DtF) the hook uses `max-width`.
 *
 * To avoid overlap between opposite variants (e.g. `min-width: 300px` and
 * `max-width: 300px` both including 300px), the hook shifts the opposite
 * boundary by 1px when the requested variant differs from `PREFERRED_VARIANT`.
 *
 * @param b Breakpoint name or explicit pixel value.
 * @param variant Adaptive variant: "MtF" (mobile to first) or "DtF" (desktop to first).
 *                By default, uses {@link PREFERRED_VARIANT}.
 * @returns `true` if the media query matches, otherwise `false` or `null`
 *          (depending on `react-responsive` behavior).
 */


export function useBreakpoint(b: TBreakpoint | number, variant: TAdaptiveVariant = PREFERRED_VARIANT) {
    let _bp: number = typeof b === 'number' ? b : HORIZONTAL_BREAKPOINTS[b];
    const v = variant === 'MtF' ? 'min': 'max';

    if('DtF' === variant && PREFERRED_VARIANT === 'MtF'){
        _bp = _bp - 1;
    } else if('MtF' === variant && PREFERRED_VARIANT === 'DtF'){
        _bp = _bp + 1;
    }

    return useMediaQuery({query: `(${v}-width: ${_bp}px)`});
}

/**
 * Optimized hook for checking if the current viewport is between two breakpoints.
 *
 * This hook is designed as a safe alternative to using a combination of
 * `For` (mobile-first) and `Before` (desktop-first) when their ranges would
 * otherwise overlap.
 *
 * Example of the overlap problem:
 *  - `min-width: 300px` includes 300px,
 *  - `max-width: 300px` also includes 300px,
 * so both conditions are `true` at exactly 300px.
 *
 * To prevent this, {@link useBreakpointBetween} automatically shifts the
 * opposite boundary by 1px depending on the adaptive variant:
 *
 *  - preferredVariant === "MtF":
 *      max = max - 1 (so the upper bound becomes exclusive by 1px),
 *  - preferredVariant === "DtF":
 *      min = min - 1 (so the lower bound becomes exclusive by 1px),
 *
 * ensuring that a particular pixel belongs to only one logical range.
 *
 * @param min Lower breakpoint (inclusive in the original definition).
 * @param max Upper breakpoint (inclusive in the original definition).
 * @param preferredVariant Adaptive variant used to resolve the 1px overlap.
 *                         By default, uses {@link PREFERRED_VARIANT}.
 * @returns `true` if the viewport width is within the adjusted [min, max] range.
 */
export function useBreakpointBetween(
    min: TBreakpoint | number,
    max: TBreakpoint | number,
    preferredVariant: TAdaptiveVariant = PREFERRED_VARIANT){
    let _min: number = typeof min === 'number' ? min : HORIZONTAL_BREAKPOINTS[min];
    let _max: number = typeof max === 'number' ? max : HORIZONTAL_BREAKPOINTS[max];

    switch (preferredVariant) {
        case 'MtF':
            _max = _max - 1;
            break;
        case 'DtF':
            _min = _min + 1;
            break;
    }

    return useMediaQuery({ minWidth: _min, maxWidth: _max});
}
