/**
 * Created by westp on 15.05.2023
 */

import React, {Fragment} from "react";

import { TBreakpoint } from '../interfaces/TBreakpoint';
import { useBreakpoint, useBreakpointBetween} from '../hooks/useBreakpoint';

export interface ForProps {
    children: React.ReactNode;
    p: TBreakpoint | number;
}

export type BeforeProps = ForProps;

export interface BetweenProps {
    children: React.ReactNode;
    max: TBreakpoint | number;
    min: TBreakpoint | number;
}

/**
 * Renders children only when the current viewport matches
 * the given breakpoint using the mobile-first ("MtF") strategy.
 *
 * Internally it uses {@link useBreakpoint} with variant "MtF".
 */
export function For({children, p}: ForProps) {
    const is = useBreakpoint(p, 'MtF');
    if (is) return <Fragment>{children}</Fragment>;
    return null;
}

/**
 * Renders children only when the current viewport matches
 * the given breakpoint using the desktop-first ("DtF") strategy.
 *
 * Internally it uses {@link useBreakpoint} with variant "DtF".
 */
export function Before({children ,p}: BeforeProps) {
    const is = useBreakpoint(p, 'DtF');
    if (is) return <Fragment>{children}</Fragment>;
    return null;
}

/**
 * Renders children only when the current viewport is between
 * two breakpoints (`min` and `max`).
 *
 * This component is an optimized alternative to combining `For`
 * and `Before` when their ranges would overlap at the same pixel
 * (e.g. `min-width: 300px` and `max-width: 300px` both including 300px).
 *
 * Under the hood it uses {@link useBreakpointBetween}, which shifts
 * one of the boundaries by 1px depending on the preferred adaptive
 * variant (see {@link PREFERRED_VARIANT}) to guarantee that a given
 * pixel belongs to only one logical range.
 */
export function Between({children, min, max}: BetweenProps) {
    const is = useBreakpointBetween(min, max);
    if (is) return <Fragment>{children}</Fragment>;
    return null;
}
