// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { useRef, useState, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"

const _root = React.forwardRef(({ ...props }, ref) => {
    return (
        <label
            ref={ref}
            {...props}
            className={`prefab-label-root ${props.showRequired ? "required" : ""
                }`}
        >
            {props.children}
        </label>
    )
})
const Label = withCSS(_root, [
    `:root {
        --prefab-label-fontSize: 14px;
        --prefab-label-fontWeight:300;
        --prefab-label-fontFamily:'inter'; 
        --prefab-label-color:blue;
        --prefab-label-required-color:red;
        --prefab-label-textTransform:blue;  
        --prefab-label-letterSpacing:blue; 
        --prefab-label-lineHeight:1.1;
        --prefab-label-textAlign:left;
    }`,
    `.prefab-label-root{
        display:inline-block;
        user-select: none;
        font-family:var(--prefab-label-fontFamily);
        font-size:var(--prefab-label-fontSize);
        font-weight:var(--prefab-label-fontWeight);
        color:var(--prefab-label-color);
        text-align:var(--prefab-label-textAlign);
        text-transform:var(--prefab-label-textTransform);
        letter-spacing:var(--prefab-label-letterSpacing);
        line-height:var(--prefab-label-line-height);

    }`,
    `.prefab-label-root.required::after{
        content:"*";
        color:var(--prefab-label-required-color);
    }`,
])

/**
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Label(props) {
    const {
        text,
        styles,
        nested,
        instance,
        htmlFor,
        showRequired,
        style,
        wcag,
    } = props
    const labelRef = useRef()
    const setStyles = {
        "--prefab-label-fontSize": styles?.font?.fontSize,
        "--prefab-label-fontWeight": styles?.font?.fontWeight,
        "--prefab-label-fontFamily": styles?.font?.fontFamily,
        "--prefab-label-color": styles?.color,
        "--prefab-label-required-color": styles?.requiredColor,
        "--prefab-label-textTransform": styles?.transform,
        "--prefab-label-letterSpacing": styles?.spacing,
        "--prefab-label-lineHeight": styles?.line,
        "--prefab-label-textAlign": styles?.font?.textAlign,
    }
    const LabelInstance = instance && instance[0]
    //Sends Event to
    function AssignLabel() {
        const event = new CustomEvent(`AssignLabel-${props.htmlFor}`, {
            detail: {
                label: htmlFor + "-label",
            },
            bubbles: true,
        })
        if (labelRef.current) {
            console.log("assignin")
            labelRef.current.dispatchEvent(event)
        }
    }
    useEffect(() => {
        if (!nested && htmlFor) {
            AssignLabel()
        }
    }, [htmlFor, nested])

    function handleClick() {
        const event = new CustomEvent(`label-clicked-${props.htmlFor}`, {
            bubbles: true,
        })
        if (labelRef.current) {
            labelRef.current.dispatchEvent(event)
        }
    }
    return (
        <Label
            ref={labelRef}
            style={{ ...setStyles }}
            htmlFor={htmlFor}
            onClick={handleClick}
            id={htmlFor + "-Label"}
        >
            {text}
        </Label>
    )
}

addPropertyControls(Prefab_Label, {
    htmlFor: {
        title: "htmlFor",
        placeholder: "Input's ID",
        type: ControlType.String,
    },
    text: {
        title: "Text",
        type: ControlType.String,
        displayTextArea: true,
        defaultValue: "Label",
    },
    showRequired: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    nested: {
        type: ControlType.Boolean,
        defaultValue: true,
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
                defaultValue: "#5f3dc4",
            },
            requiredColor: {
                type: ControlType.Color,
                defaultValue: "#f03e3e",
            },
            transform: {
                type: ControlType.Enum,
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
            },
        },
    },
})
