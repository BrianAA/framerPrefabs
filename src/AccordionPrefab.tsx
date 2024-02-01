import { RenderTarget } from "framer"
import * as Accordion from "@radix-ui/react-accordion"
import { styled, css, keyframes } from "@stitches/react"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RadixIconPrefab } from "./radixIcon"

const contentVariants = {
    open: { opacity: 1, height: "var(--radix-accordion-content-height)" },
    closed: { opacity: 0, height: 0 },
}

const displayVariants = {
    visible: { opacity: 0 },
    hidden: { opacity: 1 },
}
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
export default function AccordionPrefab(props: any) {
    const {
        style,
        items = [],
        activeItem,
        useDefaultIcon,
        icons = [],
        animation,
        header,
        content,
        transition,
    } = props
    const openIcon = icons.length > 0 ? icons[0] : "⚠️"
    const closeIcon = icons.length > 1 ? icons[1] : "⚠️"
    const [currentItem, setCurrentItem] = useState(null)
    useEffect(() => {
        setCurrentItem(`item-${activeItem}`)
    }, [activeItem])
    //Animation Variants and Transitions
    const iconVariants = {
        opened: { rotate: animation.iconDefault.start },
        closed: { rotate: animation.iconDefault.end },
    }
    const AccordionRoot = styled(Accordion.Root, {})
    const AccordionItem = styled(Accordion.Item, {
        borderStyle: "solid",
        overflow: "hidden",
        borderColor: header.border.color,
        borderWidth: header.border.borderWidthPerSide
            ? `${header.border.borderWidthTop}px ${header.border.borderWidthRight}px ${header.border.borderWidthBottom}px ${header.border.borderWidthLeft}px`
            : `${header.border.width}px`,
        borderRadius: header.border.borderRadiusPerSide
            ? `${header.border.borderRadiusTop}px ${header.border.borderRadiusRight}px ${header.border.borderRadiusBottom}px ${header.border.borderRadiusLeft}px`
            : `${header.border.radius}px`,
    })
    const StyledHeader = styled(Accordion.Header, {
        all: "unset",
    })
    const AccordionTrigger = styled(Accordion.Trigger, {
        all: "unset",
        boxSizing: "border-box",
        width: "100%",
        minHeight: header.height, //replace with property
        background: header.background,
        gap: header.iconMargin,
        display: "flex",
        alignItems: "center",
        verticalAlign: "center",
        textAlign: header.text.font?.textAlign,
        color: header.text.color,
        fontFamily: header.text.font?.fontFamily,
        fontWeight: header.text.font?.fontWeight,
        fontSize: header.text.font?.fontSize,
        lineHeight: header.text.lineHeight,
        letterSpacing: header.text.spacing,
        textTransform: header.text.transform,
        padding: header.paddingPerSide
            ? `${header.paddingTop}px ${header.paddingRight}px ${header.paddingBottom}px ${header.paddingLeft}px`
            : `${header.padding}px`,
        "& span.prefab-text": {
            width: "100%",
            order: header.position,
        },
    })
    const CustomIconHolder = styled("div", {
        position: "relative",
        height: 16,
        width: 16,
    })
    // Define the animation variants for the icon

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
        color: content.color,
        background: content?.background,
        fontFamily: content.font?.fontFamily,
        fontWeight: content.font?.fontWeight,
        fontSize: content.font?.fontSize,
        lineHeight: content.line,
        letterSpacing: content.spacing + "em",
        textAlign: content.font?.textAlign,
        textTransform: content.transform,
        padding: content.paddingPerSide
            ? `${content.paddingTop}px ${content.paddingRight}px ${content.paddingBottom}px ${content.paddingLeft}px`
            : `${content.padding}px`,
        "& p,h1,h2,h3,h4,h5,h6": {
            all: "unset",
        },
        "& a": {
            textDecoration: content.link?.decoration,
            color: content.link?.color,
            textTransform: content.link?.transform,
        },
        "& ul": {
            listStyle: content.list?.unordered.style,
            margin: 0,
            padding: content.list?.unordered.paddingPerSide
                ? `${content.list.unordered.paddingTop}px ${content.list.unordered.paddingRight}px ${content.list.unordered.paddingBottom}px ${content.list.unordered.paddingLeft}px`
                : `${content.list.unordered.padding}px`,
            "& li::marker": {
                color: content.list?.unordered.color,
            },
        },
        "& ol": {
            listStyle: content.list?.ordered.style,
            margin: 0,
            padding: content.list?.ordered.paddingPerSide
                ? `${content.list.ordered.paddingTop}px ${content.list.ordered.paddingRight}px ${content.list.ordered.paddingBottom}px ${content.list.ordered.paddingLeft}px`
                : `${content.list.ordered.padding}px`,
            "& li::marker": {
                color: content.list?.ordered.color,
            },
        },
    })

    // Updated onValueChange handler
    const handleValueChange = (value) => {
        if (value === currentItem) {
            // Close the current item
            setCurrentItem(null)
        } else {
            // Open the new item
            setCurrentItem(value)
        }
    }
    return (
        <AccordionRoot
            style={{ width: style.width }}
            defaultValue={`item-${activeItem}`}
            onValueChange={handleValueChange}
            type="single"
            collapsible
            value={currentItem}
        >
            {items.length > 0 &&
                items.map((item, i) => (
                    <AccordionItem key={item} value={`item-${i + 1}`}>
                        <AccordionHeader>
                            <span className="prefab-text">{item.header}</span>
                            {useDefaultIcon ? (
                                RenderTarget.current() != "CANVAS" ? (
                                    <motion.div
                                        animate={
                                            currentItem === `item-${i + 1}`
                                                ? "opened"
                                                : "closed"
                                        }
                                        transition={
                                            animation.iconDefault.transition
                                        }
                                        variants={iconVariants}
                                    >
                                        <RadixIconPrefab
                                            aria-hidden
                                            name={"ChevronDownIcon"}
                                        />
                                    </motion.div>
                                ) : currentItem === `item-${i + 1}` ? (
                                    <RadixIconPrefab
                                        aria-hidden
                                        name={"ChevronUpIcon"}
                                    />
                                ) : (
                                    <RadixIconPrefab
                                        aria-hidden
                                        name={"ChevronDownIcon"}
                                    />
                                )
                            ) : RenderTarget.current() === "CANVAS" ? (
                                currentItem === `item-${i + 1}` ? (
                                    closeIcon
                                ) : (
                                    openIcon
                                )
                            ) : (
                                <CustomIconHolder>
                                    <motion.div
                                        initial="visible"
                                        animate={
                                            currentItem != `item-${i + 1}`
                                                ? "hidden"
                                                : "visible"
                                        }
                                        variants={displayVariants}
                                        transition={{ duration: 0.03 }}
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
                                            currentItem === `item-${i + 1}`
                                                ? "hidden"
                                                : "visible"
                                        }
                                        variants={displayVariants}
                                        transition={{ duration: 0.03 }}
                                    >
                                        {closeIcon}
                                    </motion.div>
                                </CustomIconHolder>
                            )}
                        </AccordionHeader>
                        <AccordionContent>
                            {RenderTarget.current() === "CANVAS" ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}
                                ></div>
                            ) : (
                                <AnimatePresence>
                                    <motion.div
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        variants={contentVariants}
                                        transition={transition}
                                    >
                                        {item.content}
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                ))}
        </AccordionRoot>
    )
}

