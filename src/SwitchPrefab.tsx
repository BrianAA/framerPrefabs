// Welcome to Code in Framer
// Get Started: https://www.framer.com/developers
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import {
    theme,
    sizes,
} from "./theme"

import React, { useState, useEffect, useRef, ButtonHTMLAttributes } from "react"
import { styled } from "@stitches/react"
import * as Switch from "@radix-ui/react-switch"
import { SkeletonBox } from "./SkeletonBox"
const ToggleContainer = styled(Switch.Root, {
    all: "unset",
    boxSizing: "border-box",
    width: "100%",
    height: sizes[300],
    backgroundColor: theme.colors.secondary,
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    padding: "2px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: theme.colors.secondaryHover,
    },
    "&:focus": {
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineColor: theme.colors.signal,
        outlineOffset: "2px",
    },
})

const ToggleCircle = styled(Switch.Thumb, {
    all: "unset",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    boxSizing: "border-box",
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    borderRadius: "50%",
    "& div": {
        // Optional: Set width and height if you want to standardize child dimensions
        maxWidth: "100%!important", // Adjust as needed
        maxHeight: "100%!important", // Adjust as needed
    },
})

const Flex = styled("div", {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
})

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerIntrinsicWidth 48
 *
 *
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight auto
 */
export function SwitchPrefab(props: any) {
    const {
        defaultChecked,
        useIcons,
        icons,
        animation,
        switchProps,
        thumbProps,
    } = props
    const [isActive, setIsActive] = useState(defaultChecked)
    const [animWidth, setAnimWidth] = useState(null)
    const [loading, setLoading] = useState(true)
    const refContainer = useRef()
    const offIcon = icons.length > 0 ? icons[0] : "⚠️"
    const onIcon = icons.length > 0 ? icons[1] : "⚠️"

    console.log(animation)
    useEffect(() => {
        // Function to update the width based on the container's current width
        setLoading(false)
    }, []) // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        // Function to update the width based on the container's current width
        const updateWidth = () => {
            if (refContainer.current && !loading) {
                setAnimWidth(refContainer.current.clientWidth)
            }
        }

        // Call updateWidth to set initial width
        updateWidth()

        // Add event listener to handle window resize
        window.addEventListener("resize", updateWidth)

        // Cleanup function to remove event listener
        return () => window.removeEventListener("resize", updateWidth)
    }, [loading]) // Empty dependency array ensures this effect runs only once on mount
    const handleClick = () => {
        setIsActive(!isActive)
    }
    const containerStyles = {
        height: switchProps?.height + "px",
        width: "100%",
        backgroundColor: switchProps?.inactive,
        padding: switchProps?.paddingPerSide
            ? `${switchProps?.paddingTop}px ${switchProps?.paddingRight}px ${switchProps?.paddingBottom}px ${switchProps?.paddingLeft}px`
            : `${switchProps?.padding}px`,
    }
    const thumbStyles = {
        height: thumbProps?.size + "px",
        width: thumbProps?.size + "px",
    }
    return (
        <>
            {loading ? (
                <SkeletonBox style={{ width: animWidth + "px", height: switchProps?.height, borderRadius: "9999px" }} />
            ) : (
                <Flex>
                    <ToggleContainer
                        defaultChecked={defaultChecked}
                        ref={refContainer}
                        as={motion.button}
                        onClick={handleClick}
                        whileHover={{
                            backgroundColor: isActive
                                ? switchProps?.hoverActive
                                : switchProps?.hover,
                        }}
                        transition={animation?.container}
                        animate={isActive ? "on" : "off"}
                        variants={{
                            on: { backgroundColor: switchProps?.active },
                            off: { backgroundColor: switchProps?.inactive },
                        }}
                        css={containerStyles}
                    >
                        <ToggleCircle
                            as={motion.div}
                            css={thumbStyles}
                            layout
                            initial={"off"}
                            animate={isActive ? "on" : "off"}
                            variants={{
                                on: {
                                    x: `${animWidth -
                                        thumbProps?.size -
                                        (switchProps?.height - thumbProps?.size)
                                        }px`,
                                },
                                off: { x: 0 },
                            }}
                            transition={animation?.thumb}
                        >
                            {useIcons && <>{isActive ? onIcon : offIcon}</>}
                        </ToggleCircle>
                    </ToggleContainer>
                </Flex>
            )}
        </>
    )
}

addPropertyControls(SwitchPrefab, {
    defaultChecked: {
        type: ControlType.Boolean,
        defaultValue: false,
    },

    useIcons: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    icons: {
        hidden: (props) => !props.useIcons,
        type: ControlType.Array,
        maxCount: 2,
        control: { type: ControlType.ComponentInstance },
    },
    animation: {
        type: ControlType.Object,
        controls: {
            container: {
                type: ControlType.Transition,
                defaultValue: {
                    type: "tween",
                    duration: 0.1,
                    ease: "easeInOut",
                },
            },
            thumb: {
                type: ControlType.Transition,
                defaultValue: {
                    type: "tween",
                    duration: 0.25,
                    ease: "easeInOut",
                },
            },
        },
    },
    switchProps: {
        title: "Container",
        type: ControlType.Object,
        controls: {
            height: {
                type: ControlType.Number,
                defaultValue: sizes[500],
            },
            active: {
                title: "On",
                type: ControlType.Color,
                defaultValue: theme.colors.primary,
            },
            hoverActive: {
                title: "On hover",
                type: ControlType.Color,
                defaultValue: theme.colors.primary_hover,
            },
            inactive: {
                title: "Off",
                type: ControlType.Color,
                defaultValue: theme.colors.secondary,
            },
            hover: {
                title: "Off hover",
                type: ControlType.Color,
                defaultValue: theme.colors.secondaryHover,
            },

            padding: {
                type: ControlType.FusedNumber,
                toggleKey: "paddingPerSide",
                toggleTitles: ["padding", "padding per side"],
                valueKeys: [
                    "paddingTop",
                    "paddingRight",
                    "paddingBottom",
                    "paddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                defaultValue: 2,
            },
            focus: {
                type: ControlType.Object,
                controls: {
                    offset: {
                        type: ControlType.Number,
                        defaultValue: 0,
                    },
                    width: {
                        type: ControlType.Number,
                        defaultValue: 1,
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.signal,
                    },
                },
            },
        },
    },
    thumbProps: {
        title: "Thumb",
        type: ControlType.Object,
        controls: {
            size: {
                type: ControlType.Number,
                defaultValue: sizes[400],
            },
            active: {
                type: ControlType.Color,
                defaultValue: theme.colors.primary,
            },
            inactive: {
                type: ControlType.Color,
                defaultValue: theme.colors.secondary,
            },
        },
    },
    transition: {
        type: ControlType.Transition,
    },
})
