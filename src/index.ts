import { TBreakpoint, TVerticalBreakpoint } from './interfaces/TBreakpoint';
import { TBreakpoints, TVerticalBreakpoints } from './interfaces/TBreakpoints';
import {HORIZONTAL_BREAKPOINTS, VERTICAL_BREAKPOINTS} from './breakpoints.config'

import { useBreakpointBetween, useBreakpoint } from './hooks/useBreakpoint.js';
import { useVBreakpoint } from './hooks/useVBreakpoint.js';

export type {
  TBreakpoints,
  TBreakpoint,
  TVerticalBreakpoint,
  TVerticalBreakpoints,
};

export {
    useBreakpointBetween,
    useBreakpoint,
    useVBreakpoint,
    VERTICAL_BREAKPOINTS,
    HORIZONTAL_BREAKPOINTS,
}

export * from './components/horizontal';
