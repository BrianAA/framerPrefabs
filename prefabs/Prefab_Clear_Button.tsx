import { RenderTarget, ControlType, addPropertyControls } from "framer"
import { useState, useEffect, useRef } from "react"
import Prefab_Symbol from "https://framer.com/m/Prefab-Symbol-hrte.js@qQVi68ZdndULp73ZRsiB"
/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 * @framerDisableUnlink
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
