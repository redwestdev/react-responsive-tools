// generateSCSSMaps.js
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

// Function for generating SCSS map
// Breakpoints are numeric values (number); 'px' is appended here during output.
const generateSCSSMap = (breakpoints, name) => {
    return `$${name}-breakpoints: (
${Object.entries(breakpoints)
        .map(([key, value]) => `  ${key}: ${value}px`)
        .join(",\n")}
);`;
};

// Create the contents of the SCSS file
const scssContent = `
${generateSCSSMap(HORIZONTAL_BREAKPOINTS, "horizontal")}
${generateSCSSMap(VERTICAL_BREAKPOINTS, "vertical")}
`;

// Write the contents to the _custom-breakpoints.scss file
fs.writeFileSync(
    path.resolve(__dirname, "../scss/_custom-breakpoints.scss"),
    scssContent
);

console.log("SCSS file with breakpoints maps has been generated successfully.");
