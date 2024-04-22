// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React from "react"
import { ControlType, addPropertyControls } from "framer"

/**
 * @framerSupportedLayoutWidth auto-prefers-fixed
 * @framerSupportedLayoutHeight auto-prefers-fixed
 */
export default function Prefab_List(props) {
    const { gap, direction, items } = props

    return (
        <div
            role="list"
            style={{
                ...props.style,
                display: "flex",
                gap: gap,
                flexDirection: direction == "horizontal" ? "row" : "column",
            }}
        >
            {items && items.length > 0
                ? items.map((item, i) => {
                    return React.cloneElement(item, {
                        style: {
                            ...item.props.style,
                            ...props.style,
                        },
                        role: "listItem",
                    })
                })
                : "Pass a list item"}
        </div>
    )
}

addPropertyControls(Prefab_List, {
    items: {
        type: ControlType.Array,
        control: {
            type: ControlType.ComponentInstance,
        },
    },
    direction: {
        type: ControlType.Enum,
        options: ["horizontal", "vertical"],
        displaySegmentedControl: true,
        defaultValue: "vertical",
    },
    gap: {
        type: ControlType.Number,
    },
})
