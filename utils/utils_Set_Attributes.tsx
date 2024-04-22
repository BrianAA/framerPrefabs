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
export default function Utils_Set_Atrributes(props) {
    const { uid, attributes, isComponent } = props
    const framerComponent = useRef()
    useEffect(() => {
        //Avoids overriding anything in the preview as it can get buggy
        if (framerComponent.current && RenderTarget.current() != "CANVAS") {
            let parent = framerComponent.current.parentNode
            if (!isComponent) {
                parent = parent.parentNode
            } else {
                while (
                    parent &&
                    parent !== document &&
                    !parent.hasAttribute("data-framer-name")
                ) {
                    parent = parent.parentNode
                }
            }

            if (parent && parent !== document) {
                parent.id = uid
                attributes.forEach((attr) => {
                    parent.setAttribute(attr.name, attr.value)
                })
            }
        }
    }, [framerComponent])
    return (
        <span ref={framerComponent}>
            <Prefab_Symbol />
        </span>
    )
}

addPropertyControls(Utils_Set_Atrributes, {
    uid: {
        title: "ID",
        type: ControlType.String,
    },
    isComponent: {
        type: ControlType.Boolean,
        description: "If the prefab is within a component or layer",
        defaultValue: false,
    },
    attributes: {
        type: ControlType.Array,
        control: {
            type: ControlType.Object,
            controls: {
                name: {
                    type: ControlType.String,
                    description: "Name of attribute to set",
                },
                value: {
                    type: ControlType.String,
                },
            },
        },
    },
})
