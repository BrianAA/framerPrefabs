// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { useRef, useState, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"

const _root = React.forwardRef(({ ...props }, ref) => {
    const { tag, children, ...rest } = props
    return React.createElement(
        tag,
        {
            ref: ref,
            ...rest,
            className: `prefab-Text-root`,
        },
        children
    )
})
const Text = withCSS(_root, [
    `:root {
        --prefab-Text-fontSize: 14px;
        --prefab-Text-fontWeight:300;
        --prefab-Text-fontFamily:'inter'; 
        --prefab-Text-color:blue;
        --prefab-Text-textTransform:blue;  
        --prefab-Text-letterSpacing:blue; 
        --prefab-Text-lineHeight:1.1;
        --prefab-Text-textAlign:left;
    }`,
    `.prefab-Text-root{
        margin:0;
        padding:0;
        display:inline-block;
        font-family:var(--prefab-Text-fontFamily);
        font-size:var(--prefab-Text-fontSize);
        font-weight:var(--prefab-Text-fontWeight);
        color:var(--prefab-Text-color);
        text-align:var(--prefab-Text-textAlign);
        text-transform:var(--prefab-Text-textTransform);
        letter-spacing:var(--prefab-Text-letterSpacing);
        line-height:var(--prefab-Text-line-height);
    }`,
])

/**
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Text(props) {
    const { text, tag, uid, styles, showRequired, style } = props
    const TextRef = useRef()
    const setStyles = {
        "--prefab-Text-fontSize": styles?.font?.fontSize,
        "--prefab-Text-fontWeight": styles?.font?.fontWeight,
        "--prefab-Text-fontFamily": styles?.font?.fontFamily,
        "--prefab-Text-color": styles?.color,
        "--prefab-Text-required-color": styles?.requiredColor,
        "--prefab-Text-textTransform": styles?.transform,
        "--prefab-Text-letterSpacing": styles?.spacing,
        "--prefab-Text-lineHeight": styles?.line,
        "--prefab-Text-textAlign": styles?.font?.textAlign,
    }

    return (
        <Text
            ref={TextRef}
            tag={tag}
            id={uid ? uid : undefined}
            style={{ ...setStyles }}
        >
            {text}
        </Text>
    )
}

addPropertyControls(Prefab_Text, {
    tag: {
        type: ControlType.Enum,
        optionTitles: [
            "H1",
            "H2",
            "H3",
            "H4",
            "H5",
            "H6",
            "P",
            "SPAN",
            "DIV",
            "FIGCAPTION",
        ],
        options: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "p",
            "span",
            "div",
            "figcaption",
        ],
    },
    uid: {
        title: "ID",
        type: ControlType.String,
    },
    text: {
        title: "Text",
        type: ControlType.String,
        displayTextArea: true,
        defaultValue: "Text",
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

            transform: {
                type: ControlType.Enum,
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
            },
        },
    },
})
