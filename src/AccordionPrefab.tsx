import { addPropertyControls, RenderTarget, ControlType } from "framer"
import * as Accordion from "@radix-ui/react-accordion"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styles from "./AccordionPrefab.modules.css"
import {
    RadixIconPrefab,
} from "https://www.thoughttolife.com/framerPrefabs/framerprefabs@0.0.1/index.js?21"
import { v4 as uuidv4 } from "uuid"

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
export function AccordionPrefab(props: any) {
    const {
        items,
        activeItem,
        useDefaultIcon,
        icons,
        animation,
        header,
        content,
    } = props

    const openIcon = icons.length > 0 ? icons[0] : "⚠️";
    const closeIcon = icons.length > 0 ? icons[1] : "⚠️";
    const [currentItem, setCurrentItem] = useState("item")
    useEffect(() => {
        setCurrentItem(`item-${activeItem}`)
    }, [activeItem])

    const iconVariants = {
        opened: { rotate: animation?.iconDefault?.start },
        closed: { rotate: animation?.iconDefault?.end },
    }
    // Updated onValueChange handler
    const handleValueChange = (value: string) => {
        if (value === currentItem) {
            // Close the current item
            setCurrentItem("")
        } else {
            // Open the new item
            setCurrentItem(value)
        }
    }
    const itemStyleVariables = {
        "--headerBorderColor": header?.border?.color,
        "--headerBorderWidth": header?.border?.width,
        "--headerBorderRadius": header?.border?.borderWidthPerSide
            ? `${header.border.borderWidthTop}px ${header.border.borderWidthRight}px ${header.border.borderWidthBottom}px ${header.border.borderWidthLeft}px` : `${header.border.width}px`,
    }
    const headerStyleVariables = {
        "--headerMinHeight": header?.height + "px",
        "--headerBackground": header?.background,
        "--headerIconMargin": header?.iconMargin + "px",
        "--headerTextAlign": header?.text?.textAlign,
        "--headerColor": header?.text?.color,
        "--headerFontFamily": header?.text?.font?.fontFamily,
        "--headerFontWeight": header?.text?.font?.fontWeight,
        "--headerLineHeight": header?.text?.lineHeight,
        "--headerFontSize": header?.text?.font?.fontSize + "px",
        "--headerLetterSpacing": header?.text?.spacing + "em",
        "--headerTextTransform": header?.text?.transform,
        "--headerPadding": header?.paddingPerSide
            ? `${header.paddingTop}px ${header.paddingRight}px ${header.paddingBottom}px ${header.paddingLeft}px`
            : `${header.padding}px`,
    }
    const headerTextStyleVariables = {
        "--headerPosition": header?.position,
    }

    const contentStyleVariables = {
        "--contentColor": content?.color,
        "--contentBackground": content?.background,
        "--contentTextAlign": content?.font?.textAlign,
        "--contentFontFamily": content?.font?.fontFamily,
        "--contentFontWeight": content?.font?.fontWeight,
        "--contentLineHeight": content?.line,
        "--contentFontSize": content?.font?.fontSize + "px",
        "--contentLetterSpacing": content?.spacing + "em",
        "--contentTextTransform": content?.transform,
        "--contentPadding": content?.paddingPerSide
            ? `${content.paddingTop}px ${content.paddingRight}px ${content.paddingBottom}px ${content.paddingLeft}px`
            : `${content.padding}px`,
        "--contentLinkDecoration": content?.link?.decoration,
        "--contentLinkColor": content?.link?.color,
        "--contentLinkTransform": content?.link?.transform,
        "--contentListUnorderedStyle": content?.list?.unordered.style,
        "--contentListUnorderedPadding": content?.list?.unordered.paddingPerSide
            ? `${content.list.unordered.paddingTop}px ${content.list.unordered.paddingRight}px ${content.list.unordered.paddingBottom}px ${content.list.unordered.paddingLeft}px` : `${content.list.unordered.padding}px`,
        "--contentListUnorderedMarkerColor": content?.list?.unordered.color,
        "--contentListOrderedStyle": content?.list?.ordered.style,
        "--contentListOrderedPadding": content?.list?.ordered.paddingPerSide
            ? `${content.list.ordered.paddingTop}px ${content.list.ordered.paddingRight}px ${content.list.ordered.paddingBottom}px ${content.list.ordered.paddingLeft}px`
            : `${content.list.ordered.padding}px`,
        "--contentListOrderedMarkerColor": content?.list?.ordered.color,
    }
    return (
        <Accordion.Root
            style={{ width: "100%" }}
            defaultValue={currentItem}
            onValueChange={handleValueChange}
            type="single"
            collapsible
            value={currentItem}
        >
            {items.length > 0 ? items.map((item, i) => {
                return (<Accordion.Item style={itemStyleVariables} className={styles.itemStyle} key={uuidv4()} value={`item-${i}`}>
                    <Accordion.Header>
                        <Accordion.Trigger style={headerStyleVariables} className={styles.triggerStyle}>
                            <span style={headerTextStyleVariables} className={styles.headerText}>{item.header}</span>
                            {useDefaultIcon ? (
                                RenderTarget.current() != "CANVAS" ? (
                                    <motion.div
                                        animate={
                                            currentItem === `item-${i} `
                                                ? "opened"
                                                : "closed"
                                        }
                                        transition={
                                            animation?.iconDefault?.transition
                                        }
                                        variants={iconVariants}
                                    >
                                        <RadixIconPrefab
                                            aria-hidden
                                            name={"ChevronDownIcon"}
                                        />
                                    </motion.div>
                                ) : currentItem === `item-${i} ` ? (
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
                                currentItem === `item-${i} ` ? (
                                    closeIcon
                                ) : (
                                    openIcon
                                )
                            ) : (
                                <div className={styles.iconHolder}>
                                    <motion.div
                                        initial="visible"
                                        animate={
                                            currentItem != `item-${i} `
                                                ? "hidden"
                                                : "visible"
                                        }
                                        variants={displayVariants}
                                        transition={animation?.iconCustom}
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
                                            currentItem === `item-${i} `
                                                ? "hidden"
                                                : "visible"
                                        }
                                        variants={displayVariants}
                                        transition={{ duration: 0.03 }}
                                    >
                                        {closeIcon}
                                    </motion.div>
                                </div>
                            )}
                        </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content style={contentStyleVariables} className={styles.contentStyle}>
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
                                    transition={
                                        animation?.expand
                                    }
                                >
                                    {item.content}
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </Accordion.Content>
                </Accordion.Item>)
            }) : "⚠️ Add an item to the items prop array"}
        </Accordion.Root >
    )
}