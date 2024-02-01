
import { styled, keyframes } from "@stitches/react"

// Define keyframes for shimmer effect
const shimmer = keyframes({
    "100%": { transform: "translateX(100%)" },
})
// Create a styled component for the skeleton box
export const SkeletonBox = styled("div", {
    display: "inline-block",
    width: "100%",
    height: "1em",
    position: "relative",
    overflow: "hidden",
    backgroundColor: "#E9E9E9",

    // Pseudo-element for the shimmer effect
    "&::after": {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        transform: "translateX(-100%)",
        backgroundImage:
            "linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))",
        animation: `${shimmer} 5s infinite`,
        content: "",
    },
})