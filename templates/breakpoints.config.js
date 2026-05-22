// breakpoints.config.js
// User-editable breakpoints configuration for react-responsive-tools.
// Types for editor hints live in the sibling breakpoints.config.d.mts file.

/**
 * Preferred adaptive layout variant.
 *
 * 'DtF' stands for "Desktop To First" and is used as the default strategy
 * for resolving overlaps between "mobile-first" (`min-width`) and
 * "desktop-first" (`max-width`) breakpoints.
 *
 * When switching between these variants we shift the opposite boundary
 * by 1px to avoid cases when two ranges overlap at the exact same pixel.
 *
 * For example:
 *  - `min-width: 300px` includes 300px,
 *  - `max-width: 300px` also includes 300px,
 * which causes an overlap. By shifting one of them by 1px we guarantee
 * that a given pixel belongs to only one range.
 */
export const PREFERRED_VARIANT = "MtF"; // Mobile to first

export const HORIZONTAL_BREAKPOINTS = {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    lt: 1024,
    ltm: 1200,
    ltl: 1440,
    xl: 1920,
    xxl: 2560,
    qxl: 384,
};

export const VERTICAL_BREAKPOINTS = {
    xs: 600,
    sm: 800,
    md: 1000,
    lg: 1200,
    xl: 1600,
    xxl: 160,
};
