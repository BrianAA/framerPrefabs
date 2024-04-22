// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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
                    Copy(parent)
                }

                const handleKeyDown = (event) => {
                    // Check if key is Enter or Space
                    if (event.key === " " || event.key === "Enter") {
                        event.preventDefault()
                        Copy(parent)
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

    function Copy(parent) {
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
