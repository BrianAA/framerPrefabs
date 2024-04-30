// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { useRef, useState, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"

const _root = React.forwardRef(({ ...props }, ref) => {
    return (
        <span ref={ref} {...props} className="prefab-helper-root">
            {props.children}
        </span>
    )
})
const Helper = withCSS(_root, [
    `:root {
        --prefab-helper-fontSize: 14px;
        --prefab-helper-fontWeight:300;
        --prefab-helper-fontFamily:'inter'; 
        --prefab-helper-color:blue;
        --prefab-helper-textTransform:blue;  
        --prefab-helper-letterSpacing:blue; 
        --prefab-helper-lineHeight:1.1;
        --prefab-helper-textAlign:left;
    }`,
    `.prefab-helper-root{
        display:inline-block;
        font-family:var(--prefab-helper-fontFamily);
        font-size:var(--prefab-helper-fontSize);
        font-weight:var(--prefab-helper-fontWeight);
        color:var(--prefab-helper-color);
        text-align:var(--prefab-helper-textAlign);
        text-transform:var(--prefab-helper-textTransform);
        letter-spacing:var(--prefab-helper-letterSpacing);
        line-height:var(--prefab-helper-line-height);
    }`,
])

/**
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Helper(props) {
    const { text, styles, helperType, instance, uid, style } = props
    const labelRef = useRef()
    const setStyles = {
        "--prefab-helper-fontSize": styles?.font?.fontSize,
        "--prefab-helper-fontWeight": styles?.font?.fontWeight,
        "--prefab-helper-fontFamily": styles?.font?.fontFamily,
        "--prefab-helper-color": styles?.color,
        "--prefab-helper-textTransform": styles?.transform,
        "--prefab-helper-letterSpacing": styles?.spacing,
        "--prefab-helper-lineHeight": styles?.line,
        "--prefab-helper-textAlign": styles?.font?.textAlign,
    }
    const LabelInstance = instance && instance[0]

    return (
        <Helper
            aria-live={helperType == "hint" ? "polite" : "assertive"}
            style={{ ...setStyles }}
            id={uid ? uid : undefined}
        >
            {text}
        </Helper>
    )
}

addPropertyControls(Prefab_Helper, {
    uid: {
        title: "id",
        type: ControlType.String,
    },
    text: {
        title: "Text",
        type: ControlType.String,
        displayTextArea: true,
        defaultValue: "Helper text",
    },
    helperType: {
        type: ControlType.Enum,
        options: ["hint", "error"],
        optionTitles: ["Hint", "Error"],
        description: `Sets if aria-live will be polite or assertive.`,
    },
    styles: {
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
                description: "EM units",
                displayStepper: true,
            },
            color: {
                type: ControlType.Color,
                defaultValue: "#111111",
            },
            transform: {
                type: ControlType.Enum,
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
            },
        },
    },
})
