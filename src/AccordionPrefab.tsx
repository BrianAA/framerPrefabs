import { RenderTarget, addPropertyControls, ControlType } from "framer"
import { theme, sizes } from "./theme"
import { SharedControlProps } from "./propetryControls"
import * as Accordion from "@radix-ui/react-accordion"
import { styled } from "@stitches/react"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import { SkeletonBox } from "./SkeletonBox"
import { v4 as uuidv4 } from "uuid"


//Handles the Expansion animation for opening and closing the content
const contentVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
}

//Handles how custom icons will fade between each other
const displayVariants = {
    visible: { opacity: 0 },
    hidden: { opacity: 1 },
}


const AccordionRoot = styled(Accordion.Root, {
    display: "flex",
    flexDirection: "column",
    gap: sizes[100],
})
const AccordionItem = styled(Accordion.Item, {
    overflow: "hidden",
    boxSizing: "border-box",
    borderStyle: "solid",
    borderColor: theme.colors.outline_subtle,
    borderWidth: 1,
    borderRadius: 0,
    transition: "outline-color .25s",
    outlineColor: "transparent",
    "&:focus-within": {
        outlineWidth: 1,
        outlineStyle: "solid",
        outlineOffset: 0,
        outlineColor: theme.colors.signal,
    },
})

const StyledHeader = styled(Accordion.Header, {
    all: "unset",
})
const AccordionTrigger = styled(Accordion.Trigger, {
    all: "unset",
    boxSizing: "border-box",
    width: "100%",
    minHeight: sizes[500], //replace with property
    background: theme.colors.background,
    gap: sizes[50],
    display: "flex",
    alignItems: "center",
    verticalAlign: "center",
    textAlign: "left",
    color: theme.colors.onBackground,
    fontFamily: theme.text.meta.font,
    fontWeight: theme.text.meta.boldWeight,
    fontSize: theme.fontSize.md,
    lineHeight: theme.text.meta.lineHeight,
    letterSpacing: theme.text.meta.letterSpacing,
    textTransform: "none",
    padding: 0,
    "& span.prefab-text": {
        width: "100%",
        order: 0,
    },
})
const CustomIconHolder = styled("div", {
    position: "relative",
})

//Make the whole header a trigger
const AccordionHeader = React.forwardRef(
    ({ children, value, ...props }, forwardedRef) => (
        <StyledHeader>
            <AccordionTrigger {...props} ref={forwardedRef}>
                {children}
            </AccordionTrigger>
        </StyledHeader>
    )
)
const AccordionContent = styled(Accordion.Content, {
    overflow: "hidden",
    "& p,h1,h2,h3,h4,h5,h6": {
        all: "unset",
    },
})

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerIntrinsicWidth 400
 *
 *
 * @framerDisableUnlink
 *
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export function AccordionPrefab(props: any) {
    const {
        style,
        items = [],
        itemGap,
        activeItem,
        useDefaultIcon,
        icons = [],
        animation,
        header,
        content,
    } = props
    const openIcon = icons.length > 0 ? icons[0] : "⚠️"
    const closeIcon = icons.length > 1 ? icons[1] : "⚠️"
    const [currentItem, setCurrentItem] = useState("")
    const [loading, setLoading] = useState(true)

    //Handles when component is loading. 
    useEffect(() => {
        setLoading(false)
    }, [])

    useEffect(() => {
        setCurrentItem(`item-${activeItem}`)
    }, [activeItem])

    //Animation Variants and Transitions
    const iconVariants = {
        opened: { rotate: animation?.iconDefault?.start },
        closed: { rotate: animation?.iconDefault?.end },
    }

    const rootStyles = {
        gap: itemGap,
    }
    const itemStyles = {
        borderColor: header?.border?.color,
        borderWidth: header?.border?.borderWidthPerSide
            ? `${header?.border?.borderWidthTop}px ${header?.border?.borderWidthRight}px ${header?.border?.borderWidthBottom}px ${header?.border?.borderWidthLeft}px`
            : `${header?.border?.width}px`,
        borderRadius: header?.border?.borderRadiusPerSide
            ? `${header?.border?.borderRadiusTop}px ${header?.border?.borderRadiusRight}px ${header?.border?.borderRadiusBottom}px ${header?.border?.borderRadiusLeft}px`
            : `${header?.border?.radius}px`,
        "&:focus-within": {
            outlineWidth: header?.focus?.width + "px",
            outlineOffset: header?.focus?.offset + "px",
            outlineColor: header?.focus?.color,
        },
    }

    const headerStyles = {
        minHeight: header?.height, //replace with property
        background: header?.background,
        gap: header?.icon?.gap,
        textAlign: header?.text?.font?.textAlign,
        color: header?.text?.color,
        fontFamily: header?.text?.font?.fontFamily,
        fontWeight: header?.text?.font?.fontWeight,
        fontSize: header?.text?.font?.fontSize,
        lineHeight: header?.text?.lineHeight,
        letterSpacing: header?.text?.spacing,
        textTransform: header?.text?.transform,
        padding: header?.paddingPerSide
            ? `${header?.paddingTop}px ${header?.paddingRight}px ${header?.paddingBottom}px ${header?.paddingLeft}px`
            : `${header?.padding}px`,
        "& span.prefab-text": {
            order: header?.position,
        },
    }
    const customIconHolderStyles = {
        height: useDefaultIcon && header?.icon?.height + "px",
        width: useDefaultIcon && header?.icon?.width + "px",
    }


    const contentStyles = {
        color: content?.color,
        background: content?.background,
        fontFamily: content?.font?.fontFamily,
        fontWeight: content?.font?.fontWeight,
        fontSize: content?.font?.fontSize,
        lineHeight: content?.line,
        letterSpacing: content?.spacing + "em",
        textAlign: content.font?.textAlign,
        textTransform: content?.transform,
        padding: content?.paddingPerSide
            ? `${content?.paddingTop}px ${content?.paddingRight}px ${content?.paddingBottom}px ${content?.paddingLeft}px`
            : `${content?.padding}px`,
        "& a": {
            textDecoration: content?.link?.decoration,
            color: content?.link?.color,
            textTransform: content?.link?.transform,
        },
        "& ul": {
            listStyle: content?.list?.unordered?.style,
            margin: 0,
            padding: content?.list?.unordered?.paddingPerSide
                ? `${content?.list?.unordered?.paddingTop}px ${content?.list?.unordered?.paddingRight}px ${content?.list?.unordered?.paddingBottom}px ${content?.list?.unordered?.paddingLeft}px`
                : `${content?.list?.unordered?.padding}px`,
            "& li::marker": {
                color: content?.list?.unordered?.color,
            },
        },
        "& ol": {
            listStyle: content?.list?.ordered?.style,
            margin: 0,
            padding: content?.list?.ordered?.paddingPerSide
                ? `${content?.list.ordered?.paddingTop}px ${content?.list.ordered?.paddingRight}px ${content?.list.ordered?.paddingBottom}px ${content?.list.ordered?.paddingLeft}px`
                : `${content?.list.ordered?.padding}px`,
            "& li::marker": {
                color: content?.list?.ordered.color,
            },
        },
    }

    return (
        <>
            {loading ? (
                items.length > 0 && items.map((item, i) => {
                    return <SkeletonBox key={i} style={{ height: header?.height, width: "100%" }} />
                })
            ) : (
                <AccordionRoot
                    css={rootStyles}
                    style={{ width: style.width }}
                    defaultValue={`item-${activeItem}`}
                    onValueChange={(e) => setCurrentItem(e)}
                    type="single"
                    collapsible
                >
                    {items.length > 0 &&
                        items.map((item, i) => (
                            <AccordionItem
                                css={itemStyles}
                                data-prefab-value={item.tag}
                                key={uuidv4()}
                                value={`item-${i + 1}`}
                            >
                                <AccordionHeader css={headerStyles}>
                                    <span className="prefab-text">
                                        {item.header}
                                    </span>
                                    {useDefaultIcon ? (
                                        RenderTarget.current() != "CANVAS" ? (
                                            <motion.div
                                                animate={
                                                    currentItem ===
                                                        `item-${i + 1}`
                                                        ? "opened"
                                                        : "closed"
                                                }
                                                transition={
                                                    animation?.iconDefault?.transition
                                                }
                                                variants={iconVariants}
                                            >
                                                <ChevronDownIcon
                                                    height={
                                                        useDefaultIcon &&
                                                        header?.icon?.height +
                                                        "px"
                                                    }
                                                    width={
                                                        useDefaultIcon &&
                                                        header?.icon?.width +
                                                        "px"
                                                    }
                                                    aria-hidden
                                                />
                                            </motion.div>
                                        ) : currentItem === `item-${i + 1}` ? (
                                            <ChevronUpIcon
                                                height={
                                                    useDefaultIcon &&
                                                    header?.icon?.height + "px"
                                                }
                                                width={
                                                    useDefaultIcon &&
                                                    header?.icon?.width + "px"
                                                }
                                                aria-hidden
                                            />
                                        ) : (
                                            <ChevronDownIcon
                                                height={
                                                    useDefaultIcon &&
                                                    header?.icon?.height + "px"
                                                }
                                                width={
                                                    useDefaultIcon &&
                                                    header?.icon?.width + "px"
                                                }
                                                aria-hidden
                                            />
                                        )
                                    ) : RenderTarget.current() === "CANVAS" ? (
                                        currentItem === `item-${i + 1}` ? (
                                            closeIcon
                                        ) : (
                                            openIcon
                                        )
                                    ) : (
                                        <CustomIconHolder css={customIconHolderStyles}>
                                            <motion.div
                                                initial="visible"
                                                animate={
                                                    currentItem !=
                                                        `item-${i + 1}`
                                                        ? "hidden"
                                                        : "visible"
                                                }
                                                variants={displayVariants}
                                                transition={
                                                    animation?.iconCustom
                                                }
                                            >
                                                {openIcon}
                                            </motion.div>
                                            <motion.div
                                                initial="visible"
                                                style={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: 0,
                                                }}
                                                animate={
                                                    currentItem ===
                                                        `item-${i + 1}`
                                                        ? "hidden"
                                                        : "visible"
                                                }
                                                variants={displayVariants}
                                                transition={
                                                    animation?.iconCustom
                                                }
                                            >
                                                {closeIcon}
                                            </motion.div>
                                        </CustomIconHolder>
                                    )}
                                </AccordionHeader>
                                <AnimatePresence>
                                    <AccordionContent
                                        as={motion.div}
                                        initial="closed"
                                        animate={currentItem == `item-${i + 1}` ? "open" : "closed"}
                                        exit="closed"
                                        variants={contentVariants}
                                        transition={animation?.expand} css={contentStyles}>
                                        {RenderTarget.current() === "CANVAS" ? (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></div>
                                        ) : (
                                            { item.content }
                                        )}
                                    </AccordionContent>
                                </AnimatePresence>
                            </AccordionItem>
                        ))}
                </AccordionRoot>
            )}
        </>
    )
}


addPropertyControls(AccordionPrefab, {
    ...SharedControlProps,
    items: {
        type: ControlType.Array,
        defaultValue: [
            { header: "Header 1", content: "Content 1" },
            { header: "Header 2", content: "Content 2" },
        ],
        control: {
            type: ControlType.Object,
            controls: {
                tag: {
                    title: "Tag",
                    type: ControlType.String,
                },
                header: {
                    title: "Header",
                    type: ControlType.String,
                    displayTextArea: true,
                },
                content: {
                    title: "content",
                    type: "richtext",
                },
            },
        },
    },
    itemGap: {
        type: ControlType.Number,
        defaultValue: sizes[50],
    },
    activeItem: {
        title: "Active",
        type: ControlType.Number,
        defaultValue: 0,
        displayStepper: true,
        step: 1,
    },
    useDefaultIcon: {
        title: "Icon",
        type: ControlType.Boolean,
        defaultValue: true,
        disabledTitle: "Custom",
        enabledTitle: "Default",
    },
    icons: {
        hidden: (props) => props.useDefaultIcon,
        type: ControlType.Array,
        maxCount: 2,
        control: {
            type: ControlType.ComponentInstance,
        },
    },
    animation: {
        type: ControlType.Object,
        controls: {
            iconDefault: {
                title: "Icon",
                hidden: (props) => !props.useDefaultIcon,
                type: ControlType.Object,
                controls: {
                    transition: { type: ControlType.Transition },
                    start: {
                        type: ControlType.Number,
                        description: "Controls intial rotation when closed",
                        defaultValue: 180,
                    },
                    end: {
                        type: ControlType.Number,
                        description: "Controls intial rotation when opened",
                        defaultValue: 0,
                    },
                },
            },
            iconCustom: {
                title: "Icons",
                hidden: (props) => props.useDefaultIcon,
                description: "Controls fade between open/close",
                type: ControlType.Transition,
            },
            expand: {
                type: ControlType.Transition,
                description:
                    "Controls transition the accordions expand/collapse",
            },
        },
    },
    header: {
        type: ControlType.Object,
        controls: {
            height: {
                type: ControlType.Number,
                defaultValue: sizes[800],
            },
            background: {
                type: ControlType.Color,
                defaultValue: theme.colors.background,
            },
            icon: {
                type: ControlType.Object,
                controls: {
                    width: {
                        type: ControlType.Number,
                        defaultValue: theme.fontSize.md,
                    },
                    height: {
                        type: ControlType.Number,
                        defaultValue: theme.fontSize.md,
                    },
                    gap: {
                        type: ControlType.Number,
                        description: "Gap between icon and text",
                        defaultValue: sizes[50],
                    },
                },
            },
            position: {
                type: ControlType.Enum,
                options: [0, 1],
                displaySegmentedControl: true,
                optionTitles: ["Left", "Right"],
            },
            text: {
                type: ControlType.Object,
                controls: {
                    font: {
                        controls: "extened",
                        type: "font",
                        title: "Font",
                        displayFontSize: true,
                        displayFontStyle: true,
                        displayTextAlignment: true,
                        textAlign: "left",
                    },
                    line: {
                        title: "Line",
                        type: ControlType.Number,
                        defaultValue: 1.1,
                        step: 0.1,
                        displayStepper: true,
                    },
                    spacing: {
                        title: "Spacing",
                        type: ControlType.Number,
                        step: 0.01,
                        description: "EM units",
                        displayStepper: true,
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.onBackground,
                    },
                    transform: {
                        type: ControlType.Enum,
                        options: [
                            "none",
                            "uppercase",
                            "lowercase",
                            "capitalize",
                        ],
                        optionTitles: [
                            "None",
                            "Uppercase",
                            "Lowercase",
                            "Capitalize",
                        ],
                    },
                },
            },
            border: {
                type: ControlType.Object,
                controls: {
                    radius: {
                        type: ControlType.FusedNumber,
                        toggleKey: "borderRadiusPerSide",
                        toggleTitles: ["Border", "Border per side"],
                        valueKeys: [
                            "borderRadiusTop",
                            "borderRadiusRight",
                            "borderRadiusBottom",
                            "borderRadiusLeft",
                        ],
                        valueLabels: ["T", "R", "B", "L"],
                        defaultValue: 0,
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.outline,
                    },
                    width: {
                        type: ControlType.FusedNumber,
                        toggleKey: "borderWidthPerSide",
                        toggleTitles: ["Border", "Border per side"],
                        valueKeys: [
                            "borderWidthTop",
                            "borderWidthRight",
                            "borderWidthBottom",
                            "borderWidthLeft",
                        ],
                        valueLabels: ["T", "R", "B", "L"],
                        defaultValue: 0,
                    },
                },
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
                defaultValue: sizes[50],
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
    content: {
        title: "Content",
        type: ControlType.Object,
        controls: {
            font: {
                controls: "extened",
                type: "font",
                title: "Font",
                displayFontSize: true,
                displayFontStyle: true,
                displayTextAlignment: true,
            },
            line: {
                title: "Line",
                type: ControlType.Number,
                defaultValue: 1.1,
                step: 0.1,
                displayStepper: true,
            },
            spacing: {
                title: "Spacing",
                type: ControlType.Number,
                step: 0.01,
                displayStepper: true,
            },
            color: {
                type: ControlType.Color,
                defaultValue: theme.colors.onBackground_subtle,
            },
            background: {
                type: ControlType.Color,
                defaultValue: theme.colors.background,
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
                defaultValue: sizes[100],
            },
            transform: {
                type: ControlType.Enum,
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
            },
            link: {
                type: ControlType.Object,
                controls: {
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.signal,
                    },
                    transform: {
                        type: ControlType.Enum,
                        options: [
                            "none",
                            "uppercase",
                            "lowercase",
                            "capitalize",
                        ],
                        optionTitles: [
                            "None",
                            "Uppercase",
                            "Lowercase",
                            "Capitalize",
                        ],
                    },
                    decoration: {
                        type: ControlType.Enum,
                        optionTitles: ["Aa", "A͟a"],
                        options: ["none", "underline"],
                        displaySegmentedControl: true,
                    },
                },
            },
            list: {
                type: ControlType.Object,
                controls: {
                    unordered: {
                        type: ControlType.Object,
                        controls: {
                            style: {
                                type: ControlType.Enum,
                                options: [
                                    "none",
                                    "disc",
                                    "circle",
                                    "square",
                                    "custom",
                                ],
                                optionTitles: [
                                    "none",
                                    "disc",
                                    "circle",
                                    "square",
                                    "custom",
                                    ,
                                ],
                                defaultValue: "disc",
                            },
                            color: {
                                type: ControlType.Color,
                                defaultValue: theme.colors.onBackground_subtle,
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
                                defaultValue: sizes[100],
                            },
                        },
                    },
                    ordered: {
                        type: ControlType.Object,
                        controls: {
                            style: {
                                type: ControlType.Enum,
                                options: [
                                    "none",
                                    "decimal",
                                    "lower-alpha",
                                    "lower-roman",
                                    "upper-alpha",
                                    "upper-roman",
                                ],
                                optionTitles: [
                                    "none",
                                    "decimal",
                                    "lower-alpha",
                                    "lower-roman",
                                    "upper-alpha",
                                    "upper-roman",
                                ],
                                defaultValue: "decimal",
                            },
                            color: {
                                type: ControlType.Color,
                                defaultValue: theme.colors.onBackground_subtle,
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
                                defaultValue: sizes[100],
                            },
                        },
                    },
                },
            },
        },
    },
})