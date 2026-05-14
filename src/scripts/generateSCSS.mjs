// generateSCSS.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
    HORIZONTAL_BREAKPOINTS,
    VERTICAL_BREAKPOINTS,
} from "../breakpoints.config.js";

// Definition of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function for generating SCSS content for horizontal breakpoints
// Breakpoints are numeric values; 'px' is appended only during output.
const generateHorizontalSCSS = (breakpoints) => {
    const beforeMixins = Object.keys(breakpoints)
        .map(
            (bp) => `
/// Applies styles for screens ${breakpoints[bp]}px and wider (mobile-first, min-width: ${breakpoints[bp]}px).
/// @content
/// @example scss
///   @include for-${bp} {
///     display: flex;
///   }
@mixin for-${bp}() {
  @include mob-first(${bp}) {
    @content;
  }
}`
        )
        .join("\n");

    const afterMixins = Object.keys(breakpoints)
        .map(
            (bp) => `
/// Applies styles for screens up to ${breakpoints[bp]}px (desktop-first, max-width: ${breakpoints[bp]}px).
/// @content
/// @example scss
///   @include before-${bp} {
///     display: none;
///   }
@mixin before-${bp}() {
  @include desk-first(${bp}) {
    @content;
  }
}`
        )
        .join("\n");

    return `
@use "horizontal" as *;

${beforeMixins}

${afterMixins}
`;
};

// Function for generating SCSS content for vertical breakpoints
const generateVerticalSCSS = (breakpoints) => {
    const beforeMixins = Object.keys(breakpoints)
        .map(
            (bp) => `
/// Applies styles for screens ${breakpoints[bp]}px tall and taller (mobile-first vertical, min-height: ${breakpoints[bp]}px).
/// @content
/// @example scss
///   @include v-for-${bp} {
///     padding-top: 20px;
///   }
@mixin v-for-${bp}() {
  @include v-mob-first(${bp}) {
    @content;
  }
}`
        )
        .join("\n");

    const afterMixins = Object.keys(breakpoints)
        .map(
            (bp) => `
/// Applies styles for screens up to ${breakpoints[bp]}px tall (desktop-first vertical, max-height: ${breakpoints[bp]}px).
/// @content
/// @example scss
///   @include v-before-${bp} {
///     padding-top: 0;
///   }
@mixin v-before-${bp}() {
  @include v-desk-first(${bp}) {
    @content;
  }
}`
        )
        .join("\n");

    return `
@use "vertical" as *;

${beforeMixins}

${afterMixins}
`;
};

// Create SCSS files with mixins
const horizontalSCSSContent = generateHorizontalSCSS(HORIZONTAL_BREAKPOINTS);
const verticalSCSSContent = generateVerticalSCSS(VERTICAL_BREAKPOINTS);

fs.writeFileSync(
    path.resolve(__dirname, "../scss/_horizontal-breakpoints.scss"),
    horizontalSCSSContent
);

fs.writeFileSync(
    path.resolve(__dirname, "../scss/_vertical-breakpoints.scss"),
    verticalSCSSContent
);

console.log("SCSS files have been generated successfully.");
