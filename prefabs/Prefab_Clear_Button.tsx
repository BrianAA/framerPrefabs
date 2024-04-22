// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { RenderTarget, ControlType, addPropertyControls } from "framer"
import { useState, useEffect, useRef } from "react"
import Prefab_Symbol from "https://framer.com/m/Prefab-Symbol-hrte.js@qQVi68ZdndULp73ZRsiB"
/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Prefab_Clear_Button(props) {
    const { controls } = props
    const framerComponent = useRef()
    useEffect(() => {
        //Avoids overriding anything in the preview as it can get buggy
        if (framerComponent.current && RenderTarget.current() != "CANVAS") {
            let parent = framerComponent.current.parentNode
            while (
                parent &&
                parent !== document &&
                !parent.hasAttribute("data-framer-name")
            ) {
                parent = parent.parentNode
            }

            if (parent && parent !== document) {
                parent.setAttribute("role", "button")
                parent.setAttribute("aria-controls", `${controls}`)

                parent.addEventListener("click", SendClearEvent)

                return () => {
                    parent.removeEventListener("click", SendClearEvent)
                }
            }
        }
    }, [framerComponent])
    function SendClearEvent() {
        const event = new CustomEvent(`clear-${controls}`, {
            detail: {
                description: `clear input with the ID ${controls}`,
            },
            bubbles: true,
        })
        if (framerComponent.current) {
            framerComponent.current.dispatchEvent(event)
        }
    }
    return (
        <span ref={framerComponent}>
            <Prefab_Symbol />
        </span>
    )
}

addPropertyControls(Prefab_Clear_Button, {
    controls: {
        description:
            "Set the ID of the input that will be controlled by this clear button",
        type: ControlType.String,
    },
})
