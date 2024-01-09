// Welcome to Code in Framer
// Get Started: https://www.framer.com/developers

import { useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { css } from "@stitches/react"
/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth 200
 * @framerSupportedLayoutHeight 100
 */

export default function Filterable(props) {
    const { data, layer, style, setChildHeight, setChildWidth, control } = props
    console.log(layer)
    const filterStyle = css({
        background: "#F7f7f7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& > :first-child": {
            width: "100%!important",
        },
    })

    const parentStyle = css({
        "& > :first-child": {
            width: setChildWidth ? "100%!important" : "",
            height: setChildWidth ? "100%!important" : "",
        },
    })

    return (
        <div
            data-prefab-control={control}
            style={...style}
            className={parentStyle()}
            data-key={data}
        >
            {layer && layer[0] ? (
                layer[0]
            ) : (
                <div className={filterStyle()}>
                    🔌 Connect a layer to filter
                </div>
            )}
        </div>
    )
}

addPropertyControls(Filterable, {
    data: {
        title: "Data-Key",
        type: ControlType.String,
        defaultValue: "Enter unique-Key",
    },
    setChildHeight: {
        title: "Control child height",
        type: ControlType.Boolean,
    },
    setChildWidth: {
        title: "Control Child width",
        type: ControlType.Boolean,
    },
    controls: {
        title: "Controls",
        type: ControlType.Enum,
        options: ["Parent", "Collection Item", "Child"],
        optionTitles: ["Parent", "Collection Item", "Child"],
        description: "Select what you want this component to control.",
    },
    layer: {
        title: "Layer",
        hidden: (props) => props.controls != "Child",
        type: ControlType.ComponentInstance,
    },
    control: {
        title: "Controlled by",
        type: ControlType.String,
        description:
            "Match the UID of the input you want to control this component",
    },
})
