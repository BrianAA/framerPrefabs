// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import { cloneElement } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"

/**
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Figure(props) {
    const { uid, instance, style } = props

    return (
        <figure id={uid ? uid : undefined} style={...style}>
            {instance && instance[0] && cloneElement(instance[0], {
                style: {
                    ...instance[0].props.style,
                    width: "100%"
                }
            })}
        </figure>
    )
}

addPropertyControls(Prefab_Figure, {
    uid: {
        title: "ID",
        type: ControlType.String,
    },
    instance: {
        description:
            "Pass a component or layer that has 1 image and 1 prefab text to with the tag figcaption",
        type: ControlType.ComponentInstance,
    },
})
