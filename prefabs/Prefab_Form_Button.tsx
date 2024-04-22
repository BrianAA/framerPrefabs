// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { withCSS, ControlType, addPropertyControls, RenderTarget } from "framer"
import { useEffect, useRef, useState } from "react"
import Prefab_Symbol from "https://framer.com/m/Prefab-Symbol-hrte.js@F7K3e0kG5Xl8ud1r3Rn4"
/**
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Prefab_Form_Button(props) {
    const { style, buttonType, formID } = props
    const prefabRef = useRef()
    const [framerBtn, setFramerButton] = useState(null)

    //Sets up parent and event listeners
    useEffect(() => {
        //Avoids overriding anything in the preview as it can get buggy
        if (prefabRef.current && RenderTarget.current() != "CANVAS") {
            let parent = prefabRef.current.parentNode
            while (
                parent &&
                parent !== document &&
                !parent.hasAttribute("data-framer-name")
            ) {
                parent = parent.parentNode
            }

            if (parent && parent !== document) {
                setFramerButton(parent) //Set for reference
                parent.setAttribute("form", formID)
                parent.setAttribute("type", buttonType)
            }
        }
    }, [prefabRef, formID, buttonType])
    return (
        <span ref={prefabRef}>
            <Prefab_Symbol />
        </span>
    )
}

addPropertyControls(Prefab_Form_Button, {
    buttonType: {
        type: ControlType.Enum,
        options: ["submit", "reset"],
        optionTitles: ["Submit", "Reset"],
    },
    formID: {
        type: ControlType.String,
    },
})
