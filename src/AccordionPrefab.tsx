import { addPropertyControls, RenderTarget, ControlType } from "framer"
import * as Accordion from "@radix-ui/react-accordion"
import { styled, css, keyframes } from "@stitches/react"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import prefabStyle from "./AccordionPrefab.module.css"
import {
    RadixIconPrefab,
} from "https://www.thoughttolife.com/framerPrefabs/framerprefabs@0.0.1/index.js?21"

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

    const openIcon = "⚠️"
    const closeIcon = "⚠️"
    const [currentItem, setCurrentItem] = useState(null)
    useEffect(() => {
        setCurrentItem(`item-1`)
    }, [])

    const iconVariants = {
        opened: { rotate: 0 },
        closed: { rotate: 180 },
    }
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
    const useDefaultIcon = true;
    return (
        <Accordion.Root
            style={{ width: "100%" }}
            defaultValue={`item-1`}
            onValueChange={handleValueChange}
            type="single"
            collapsible
            value={currentItem}
        >
            <Accordion.Item value={`item-1`}>
                <Accordion.Header>
                    <Accordion.Trigger style={{ width: "200px" }} className={prefabStyle.accordionTrigger}>
                        <span className="prefab-text">Hello</span>
                        {useDefaultIcon ? (
                            RenderTarget.current() != "CANVAS" ? (
                                <motion.div
                                    animate={
                                        currentItem === `item-1`
                                            ? "opened"
                                            : "closed"
                                    }
                                    transition={{ duration: 0.03 }}
                                    variants={iconVariants}
                                >
                                    <RadixIconPrefab
                                        aria-hidden
                                        name={"ChevronDownIcon"}
                                    />
                                </motion.div>
                            ) : currentItem === `item-1` ? (
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
                            currentItem === `item-1` ? (
                                closeIcon
                            ) : (
                                openIcon
                            )
                        ) : (
                            <div>
                                <motion.div
                                    initial="visible"
                                    animate={
                                        currentItem != `item-1`
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
                                        currentItem === `item-1`
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
                <Accordion.Content>
                    {RenderTarget.current() === "CANVAS" ? (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: "<p>Hi canvas content</p>",
                            }}
                        ></div>
                    ) : (
                        <AnimatePresence>
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={contentVariants}
                                transition={{ duration: 0.03 }}
                            >
                                <p>Hi content</p>
                            </motion.div>
                        </AnimatePresence>
                    )}
                </Accordion.Content>
            </Accordion.Item>
        </Accordion.Root>
    )
}