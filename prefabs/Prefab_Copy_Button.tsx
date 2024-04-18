/**
 * Copyright (c) [2024] [Framer Prefabs] [Brian Alfaro]
 */

import React, { useState, useRef, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"
import Prefab_EventSymbol from "https://framer.com/m/Prefab-Symbol-hrte.js@F7K3e0kG5Xl8ud1r3Rn4"

//States supported for prefab
const copyStates = {
    ready: "default",
    copying: "copying",
    success: "success",
    error: "error",
}

/**
 * @framerDisableUnlink
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Copy_Button(props) {
    const {
        onDefault,
        onCopying,
        onSuccess,
        onError,
        style, //framer container styles
        copyData, //data to copy TEXT only
        ariaSuccess, //label for success
        ariaDefault, // label by default
        ariaError,
        timeout,
    } = props
    const [variant, setVariant] = useState(copyStates.ready)
    const [framerBtn, setFramerBtn] = useState(null)
    const spanRef = useRef()

    useEffect(() => {
        //Avoids overriding anything in the preview as it can get buggy
        if (spanRef.current && RenderTarget.current() != "CANVAS") {
            let parent = spanRef.current.parentNode
            while (
                parent &&
                parent !== document &&
                !parent.hasAttribute("data-framer-name")
            ) {
                parent = parent.parentNode
            }

            if (parent && parent !== document) {
                setFramerBtn(parent) //Set for reference
                //Handle Click
                const handleClick = () => {
                    onCopying && onCopying()
                    try {
                        navigator.clipboard.writeText(copyData)
                        onSuccess && onSuccess()
                        parent.setAttribute("aria-label", ariaSuccess)
                        setTimeout(() => {
                            onDefault && onDefault()
                            parent.setAttribute("aria-label", ariaDefault)
                        }, timeout * 1000)
                    } catch (error) {
                        console.warn(error.message)
                        onError && onError()
                        parent.setAttribute("aria-label", ariaError)
                    }
                }

                const handleKeyDown = (event) => {
                    // Check if key is Enter or Space
                    if (event.key === " ") {
                        event.preventDefault()
                    }
                }
                parent.setAttribute("role", "button")
                parent.setAttribute("aria-label", ariaDefault)
                //Handle Click Handler
                parent.addEventListener("click", handleClick)
                parent.addEventListener("keydown", handleKeyDown)

                // Remove event listener on cleanup
                return () => {
                    parent.removeEventListener("click", handleClick)
                    parent.removeEventListener("keydown", handleKeyDown)
                }
            }
        }
    }, [spanRef])

    return (
        <span
            ref={spanRef}
            aria-live={variant == copyStates.error ? "assertive" : "polite"}
            style={style}
            aria-hidden="true"
            aria-label={
                variant == copyStates.success ? ariaSuccess : ariaDefault
            }
        >
            <Prefab_EventSymbol />
        </span>
    )
}

addPropertyControls(Prefab_Copy_Button, {
    onDefault: {
        type: ControlType.EventHandler,
    },
    onCopying: {
        type: ControlType.EventHandler,
    },
    onSuccess: {
        type: ControlType.EventHandler,
    },
    onError: {
        type: ControlType.EventHandler,
    },
    copyData: {
        type: ControlType.String,
        description: "Text data that will be copied",
        displayTextArea: true,
    },
    ariaDefault: {
        type: ControlType.String,
        defaultValue: "Copy to clipboard",
    },
    ariaSuccess: {
        type: ControlType.String,
        defaultValue: "Copied to clipboard",
    },
    ariaError: {
        type: ControlType.String,
        defaultValue: "Failed to copy",
    },
    timeout: {
        type: ControlType.Number,
        description: "Delay in seconds before reseting to default",
        defaultValue: 1,
    },
})
