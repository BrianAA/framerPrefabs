import React, { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

export default function Controlable(props) {
    const { layer, style, control, controls, variantName, initial } = props
    const [_props, setProps] = useState({}) // Props to be applied
    const thisElem = useRef(null)
    const [dataAttributeValue, setDataAttributeValue] = useState("")

    /*
    Sets up a MutationObserver on `thisElem` to update `dataAttributeValue` state
    whenever the 'data-prefab-change' attribute changes. The observer disconnects
    on component unmount to prevent memory leaks.
    */
    useEffect(() => {
        if (!thisElem.current) return
        const handleMutation = (mutationsList) => {
            for (let mutation of mutationsList) {
                if (
                    mutation.type === "attributes" &&
                    mutation.attributeName === "data-prefab-change"
                ) {
                    setDataAttributeValue(
                        thisElem.current.getAttribute("data-prefab-change")
                    )
                }
            }
        }

        const observer = new MutationObserver(handleMutation)
        observer.observe(thisElem.current, { attributes: true })
        return () => observer.disconnect()
    }, [])

    //Updates Variant depending on the change.
    useEffect(() => {
        console.log("Change occurred to: " + dataAttributeValue)
        if (dataAttributeValue === "true") {
            ChangeVariant(variantName)
        } else {
            ChangeVariant(initial)
        }
    }, [dataAttributeValue])

    //handles change to set component to the correct variant
    function ChangeVariant(variant) {
        if (!layer || layer.length === 0) {
            return
        }

        try {
            const firstLayerProps = layer[0]?.props
            if (firstLayerProps) {
                let newProps = { ...firstLayerProps }

                if (
                    newProps.children?.props &&
                    newProps.children.type?.propertyControls?.variant
                ) {
                    const variantControls =
                        newProps.children.type.propertyControls.variant
                    const { options, optionTitles } = variantControls

                    const variantIndex = optionTitles?.findIndex(
                        (title) => title === variant
                    )
                    if (variantIndex !== -1 && options) {
                        newProps.children.props.variant = options[variantIndex]
                        // Update _props to the modified props
                        setProps(newProps)
                    }
                }
            }
        } catch (error) {
            console.error("Error occurred in ChangeVariant:", error)
        }
    }

    return (
        <div
            ref={thisElem}
            data-prefab-change={false}
            data-prefab-control={control}
            data-prefab-hide={controls}
        >
            {layer && layer[0] ? (
                <>
                    {React.cloneElement(layer[0], {
                        ..._props, // Then override with _props
                        style: { ...style },
                    })}
                </>
            ) : (
                <>🔌 Component</>
            )}
        </div>
    )
}

addPropertyControls(Controlable, {
    control: {
        title: "Controlled by",
        type: ControlType.String,
        defaultValue: "Enter UID of controller",
        description:
            "Match the UID of the input you want to control this component",
    },
    variantName: {
        title: "Variant name",
        type: ControlType.String,
        defaultValue: "Match Variant Name",
    },
    initial: {
        title: "Variant name",
        type: ControlType.String,
        defaultValue: "Match Variant Name",
    },
    layer: {
        title: "Layer",
        type: ControlType.ComponentInstance,
    },
})
