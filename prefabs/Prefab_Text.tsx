import React, { useRef, useState, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"
import { v4 as uuidv4 } from "uuid"

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
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 *
 * @framerDisableUnlink
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
        <Text ref={TextRef} tag={tag} id={uid} style={{ ...setStyles }}>
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
