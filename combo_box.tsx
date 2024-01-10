import Fuse from "fuse.js"
import { CheckIcon, X, ChevronsUpDownIcon } from "lucide-react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Combobox, Portal } from "@ark-ui/react"
import { styled, css } from "@stitches/react"

//Only Used for demonstration unless you want fruit data?
const testData = [
    { label: "Apple", value: "Apple" },
    { label: "Banana", value: "Banana" },
    { label: "Cherry", value: "Cherry" },
    { label: "Date", value: "Date" },
    { label: "Elderberry", value: "Elderberry" },
    { label: "Fig", value: "Fig" },
    { label: "Grape", value: "Grape" },
    { label: "Honeydew", value: "Honeydew" },
]

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth 200
 * @framerSupportedLayoutHeight auto
 */
export default function Combo_box(props) {
    const {
        prefabValue,
        settings,
        hideLabel,
        labelText,
        labelStyle,
        placeholder,
        inputSettings,
        contentSettings,
        dataBy,
        dataFile,
        dataObject,
        items,
        triggerSVG,
        clearSVG,
        indicatorSVG,
        style,
        selectedValues,
        ...rest
    } = props

    const [options, setOptions] = useState([])
    const [nodes, setNodes] = useState(null)
    const [data, setData] = useState(null)
    const [inputValue, setInputValue] = useState([])

    const [test, setTestState] = useState(null)
    //Handles the initial set up of gathering all data-keys
    useEffect(() => {
        switch (dataBy) {
            case "Auto":
                setDataAuto()
                break
            case "File":
                fetchSetData()
                break
            default:
                setDataManually()
                break
        }
    }, [])

    function setDataAuto() {
        const nodeList = document.querySelectorAll("[data-prefab-value]")
        const _items = []
        const refinedList = []
        nodeList.forEach((element) => {
            const dataKeyValue = element.getAttribute("data-prefab-value")
            const dataKeyLabel = element.getAttribute("data-prefab-label")
            const dataControlID = element.getAttribute("data-prefab-control")
            const _item = { label: dataKeyLabel, value: dataKeyLabel }

            // Check if the item is not already in the array
            const isItemInArray = _items.some(
                (item) =>
                    item.label === _item.label && item.value === _item.value
            )
            if (!isItemInArray && dataControlID == settings.UID) {
                _items.push(_item)
            }
            if (dataControlID == settings.UID) {
                refinedList.push(element)
            }
        })

        if (_items.length != 0) {
            setOptions(_items)
            setNodes(refinedList)
        }
    }

    function fetchSetData() {
        fetch(dataFile)
            .then((response) => {
                const contentType = response.headers.get("content-type")
                if (contentType.includes("application/json")) {
                    return response.json()
                } else {
                    return response.text()
                }
            })
            .then((data) => {
                if (typeof data === "string") {
                    if (data.trim().startsWith("{")) {
                        try {
                            setData(JSON.parse(data))
                        } catch (e) {
                            // Handle JSON parse error
                        }
                    } else {
                        // Handle CSV parsing
                        const rows = data.split("\n")
                        setData(rows.map((row) => row.split(",")))
                    }
                } else {
                    setData(data) // JSON data
                }
            })
            .catch((error) => console.error("Error fetching data:", error))
    }

    //Sets data manaully
    function setDataManually() {
        console.log(dataObject)
        if (dataObject.length > 0) {
            setOptions(dataObject)
        } else {
            setOptions(testData)
        }
    }
    //Handles value change updating the collection
    function handleChange(details) {
        if (dataBy == "Auto") {
            const hasValue = details.value.length > 0
            nodes.forEach((element) => {
                const dataKeyValue = element.getAttribute("data-prefab-label")
                const dataControlID = element.getAttribute(
                    "data-prefab-control"
                )
                let parent = loopAndFindATag(element)

                // Check if the parent element exists to avoid null reference errors
                if (parent && dataControlID == settings.UID) {
                    if (hasValue) {
                        // Check if data-key value is in the details.value array
                        const isVisible = details.value.includes(dataKeyValue)

                        // Toggle visibility based on the data-key match
                        parent.style.display = isVisible ? "" : "none"
                    } else {
                        // When there is no value, reset CSS styles
                        console.log("resetting")
                        parent.style.cssText = ""
                    }
                }
            })
        }
        if (prefabValue) {
            prefabValue(details.value)
        }
        setInputValue(details.value)
    }

    //Loops and finds the Link Tag for CMS or any item that has a link
    function loopAndFindATag(elem) {
        let parent = elem.parentNode
        if (!parent) {
            return null
        } else if (parent.tagName === "A") {
            return parent
        } else {
            return loopAndFindATag(parent) // Recursive call
        }
    }

    //Root controls spacing between label and Input
    const Root = styled(Combobox.Root, {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        gap: labelStyle.gap,
    })
    //Styles the Label for the component
    const ComboLabel = styled(Combobox.Label, {
        variants: {
            inline: {
                true: {
                    position: "absolute",
                    visibility: "hidden",
                    transform: "translateY(-50%)",
                    color: "transparent",
                },
                false: {
                    fontWeight: labelStyle.fontWeight,
                    fontFamily: labelStyle.font,
                    fontSize: labelStyle.size,
                    color: labelStyle.color,
                    lineHeight: labelStyle.lineHeight,
                },
            },
        },
        defaultVariants: {
            inline: true,
        },
    })
    const Controls = styled(Combobox.Control, {
        position: "relative",
    })

    //Input styles
    const Input = styled(Combobox.Input, {
        fontFamily: inputSettings.fontFamily,
        fontSize: inputSettings.fontSize,
        background: inputSettings.bgColor,
        border: `1px solid ${inputSettings.borderColor}`,
        borderRadius: `${inputSettings.radius}px`,
        overflow: "hidden",
        padding: inputSettings.isMixed
            ? `${inputSettings.inputPaddingTop}px ${inputSettings.inputPaddingBottom
            }px ${inputSettings.inputPaddingRight}px ${inputSettings.inputPaddingLeft + 4
            }px`
            : inputSettings.padding + "px",
        width: "100%",
        color: inputSettings.fontColor,
        outlineColor: inputSettings.outline,
        "&::placeholder": {
            color: inputSettings.placeholderColor,
        },
    })

    //Style for Controls
    const TriggerStyle = css({
        position: "absolute",
        right: inputSettings.inputPaddingRight,
        top: "52%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        outlineColor: inputSettings.outline,
        variants: {
            native: {
                true: {
                    background: "transparent",
                    border: "none",
                },
                false: {
                    color: inputSettings.placeholderColor,
                    padding: 4,
                    background: inputSettings.bgColor,
                    border: "none",
                    "& svg": {
                        height: inputSettings.fontSize,
                        width: inputSettings.fontSize,
                    },
                    borderRadius: "32px",
                },
            },
        },
    })
    const Content = styled(Combobox.Content, {
        border: "1px solid #E9E9E9",
        overflow: "hidden",
        overflowY: "auto",
        background: contentSettings.bgColor,
        height: contentSettings.fixedHeight ? contentSettings.height : "",
        borderRadius: inputSettings.radius > 24 ? 24 : inputSettings.radius,
        boxShadow: `${contentSettings.shadow.shadowX}px ${contentSettings.shadow.shadowY}px ${contentSettings.shadow.blur}px ${contentSettings.shadow.spread} ${contentSettings.shadow.color}`,
    })
    const Item = styled(Combobox.Item, {
        display: "flex",
        gap: 8,
        cursor: "pointer",
        background: "transparent",
        fontFamily: items.font,
        fontSize: items.fontSize,
        letterSpacing: items.letterSpacing,
        fontWeight: items.fontWeight,
        lineHeight: items.lineHeight,
        color: items.fontColor,
        padding: items.mixed
            ? `${items.inputPaddingTop}px ${items.inputPaddingBottom}px ${items.inputPaddingRight
            }px ${items.inputPaddingLeft + 4}px`
            : items.padding + "px",
        transition: "background .25s, color .25s",
        "&:hover": {
            background: items.hover.bgColor,
            color: items.hover.color,
        },
        "&[disabled]": {
            color: items.disabledColor,
        },
        "&[data-highlighted]": {
            background: items.hover.bgColor,
            color: items.hover.color,
        },
    })
    const Indicator = styled(Combobox.ItemIndicator, {
        "& svg": {
            height: items.fontSize,
            width: items.fontSize,
        },
        color: inputSettings.placeholderColor,
        paddingRight: items.inputPaddingRight,
    })

    function handleClear() {
        setInputValue([])
    }

    return (
        <Root
            placeholder={placeholder}
            multiple={settings.multiSelect}
            style={...style}
            loop={settings.loop}
            items={options}
            selectOnBlur={false}
            onValueChange={handleChange}
            data-prefab-id={settings.UID}
            openOnClick={settings.openOnClick}
            value={inputValue}
        >
            <ComboLabel inline={hideLabel}>{labelText}</ComboLabel>
            <Controls>
                <Input aria-labelledby={labelText} />
                <Combobox.ClearTrigger
                    hidden={inputValue.length == 0}
                    className={TriggerStyle({
                        native: clearSVG.length > 0,
                    })}
                    style={{
                        right:
                            inputSettings.fontSize +
                            inputSettings.inputPaddingRight +
                            8,
                    }}
                >
                    {clearSVG && clearSVG[0] ? clearSVG[0] : <X />}
                </Combobox.ClearTrigger>

                <Combobox.Trigger
                    className={TriggerStyle({
                        native: triggerSVG.length > 0,
                    })}
                >
                    {triggerSVG && triggerSVG[0] ? (
                        triggerSVG[0]
                    ) : (
                        <ChevronsUpDownIcon />
                    )}
                </Combobox.Trigger>
            </Controls>

            <Portal>
                <Combobox.Positioner>
                    <Content>
                        {options.map((item) => (
                            <Item key={item.label} item={item.value}>
                                <Combobox.ItemText style={{ width: "100%" }}>
                                    {item.label}
                                </Combobox.ItemText>
                                <Indicator>
                                    {indicatorSVG && indicatorSVG[0] ? (
                                        indicatorSVG[0]
                                    ) : (
                                        <CheckIcon />
                                    )}
                                </Indicator>
                            </Item>
                        ))}
                    </Content>
                </Combobox.Positioner>
            </Portal>
        </Root>
    )
}

addPropertyControls(Combo_box, {
    prefabValue: {
        type: ControlType.EventHandler,
    },

    settings: {
        title: "Settings",
        type: ControlType.Object,
        controls: {
            isForm: {
                title: "Is a Form",
                type: ControlType.Boolean,
                defaultValue: false,
            },
            openOnClick: {
                title: "Click Open",
                type: ControlType.Boolean,
                defaultValue: true,
            },
            loop: {
                title: "Loop",
                type: ControlType.Boolean,
                defaultValue: true,
            },
            multiSelect: {
                title: "Multi-Select",
                type: ControlType.Boolean,
            },
            UID: {
                title: "ID",
                type: ControlType.String,
                defaultValue: "Enter a unique id",
            },
        },
    },
    hideLabel: {
        title: "Hide Label",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    labelText: {
        title: "Label Text",
        type: ControlType.String,
        defaultValue: "Label",
    },
    labelStyle: {
        title: "Label Style",
        type: ControlType.Object,
        hidden: (props) => props.hideLabel,
        controls: {
            gap: {
                title: "Margin Bottom",
                type: ControlType.Number,
                defaultValue: 4,
            },
            font: {
                title: "Font",
                type: ControlType.String,
                defaultValue: "Inter",
            },
            size: {
                title: "Size",
                type: ControlType.Number,
                defaultValue: 14,
            },
            letterSpacing: {
                title: "Spacing",
                type: ControlType.Number,
                defaultValue: 0,
            },
            fontWeight: {
                title: "Weight",
                type: ControlType.Enum,
                options: [
                    "100",
                    "200",
                    "300",
                    "400",
                    "500",
                    "600",
                    "700",
                    "800",
                    "900",
                ],
                optionTitles: [
                    "Thin",
                    "Extra Light",
                    "Light",
                    "Regular",
                    "Medium",
                    "Semi Bold",
                    "Bold",
                    "Extra Bold",
                    "Black",
                ],
                defaultValue: "500",
            },
            lineHeight: {
                title: "Line-Height",
                type: ControlType.Number,
                defaultValue: 1.1,
            },
            color: {
                title: "Color",
                type: ControlType.Color,
                defaultValue: "#666666",
            },
        },
    },
    placeholder: {
        title: "Placeholder",
        type: ControlType.String,
        defaultValue: "Placeholder",
    },
    inputSettings: {
        title: "Input",
        type: ControlType.Object,
        controls: {
            placeholderColor: {
                title: "Placeholder",
                type: ControlType.Color,
                defaultValue: "#AAAAAA",
            },
            fontFamily: {
                title: "Font",
                type: ControlType.String,
                defaultValue: "inter",
            },
            fontSize: {
                title: "Font Size",
                type: ControlType.Number,
                defaultValue: 16,
            },
            fontColor: {
                title: "Value",
                type: ControlType.Color,
                defaultValue: "#111111",
            },
            bgColor: {
                title: "Background",
                type: ControlType.Color,
                defaultValue: "transparent",
            },
            borderColor: {
                title: "Border",
                type: ControlType.Color,
                defaultValue: "#D5D5D5",
            },
            outline: {
                title: "Outline",
                type: ControlType.Color,
                defaultValue: "#5784C5",
            },
            padding: {
                title: "Padding",
                type: ControlType.FusedNumber,
                defaultValue: 6,
                toggleKey: "isMixed",
                toggleTitles: ["Padding", "Padding per side"],
                valueKeys: [
                    "inputPaddingTop",
                    "inputPaddingBottom",
                    "inputPaddingRight",
                    "inputPaddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
            },
            radius: {
                title: "Radius",
                type: ControlType.Number,
                defaultValue: 4,
            },
        },
    },
    contentSettings: {
        title: "Content Box",
        type: ControlType.Object,
        controls: {
            bgColor: {
                title: "Background",
                type: ControlType.Color,
                defaultValue: "#FFFFFF",
            },
            fixedHeight: {
                title: "Fixed Height",
                type: ControlType.Boolean,
                defaultValue: false,
            },
            height: {
                title: "Height",
                type: ControlType.Number,
                defaultValue: 300,
            },
            radius: {
                title: "Radius",
                type: ControlType.Number,
                defaultValue: 4,
            },
            shadow: {
                title: "Shadow",
                type: ControlType.Object,
                controls: {
                    color: {
                        title: "Color",
                        type: ControlType.Color,
                        defaultValue: "rgba(0,0,0,.05)",
                    },
                    shadowX: {
                        title: "X",
                        type: ControlType.Number,
                        defaultValue: 0,
                    },
                    shadowY: {
                        title: "Y",
                        type: ControlType.Number,
                        defaultValue: 1,
                    },
                    blur: {
                        title: "Blur",
                        type: ControlType.Number,
                        defaultValue: 2,
                    },
                    spread: {
                        title: "Spread",
                        type: ControlType.Number,
                        defaultValue: 0,
                    },
                },
            },
            borderColor: {
                title: "Border",
                type: ControlType.Color,
                defaultValue: "#D5D5D5",
            },
        },
    },
    dataBy: {
        title: "Populated By",
        type: ControlType.Enum,
        options: ["Auto", "File", "Manually"],
        optionTitles: ["Auto", "File", "Manually"],
        description: "Determines how data is populated",
        defaultValue: "Manually",
    },
    dataFile: {
        hidden: (props) => props.dataBy != "File",
        title: "Data File",
        type: ControlType.File,
        allowedFileTypes: ["CSV", "JSON"],
    },
    dataObject: {
        hidden: (props) => props.dataBy != "Manually",
        title: "Data Object",
        type: ControlType.Array,
        control: {
            type: ControlType.Object,
            controls: {
                label: {
                    title: "Label",
                    type: ControlType.String,
                },
                value: {
                    title: "Value",
                    type: ControlType.String,
                },
            },
        },
    },
    items: {
        title: "Item Style",
        type: ControlType.Object,
        controls: {
            fontFamily: {
                title: "Font",
                type: ControlType.String,
                defaultValue: "inter",
            },
            fontSize: {
                title: "Font Size",
                type: ControlType.Number,
                defaultValue: 16,
            },
            fontColor: {
                title: "Color",
                type: ControlType.Color,
                defaultValue: "#111111",
            },
            disabledColor: {
                title: "Color Disabled",
                type: ControlType.Color,
                defaultValue: "#AAAAAA",
            },
            borderColor: {
                title: "Border",
                type: ControlType.Color,
                defaultValue: "#D5D5D5",
            },
            padding: {
                title: "Padding",
                type: ControlType.FusedNumber,
                defaultValue: 8,
                toggleKey: "mixed",
                toggleTitles: ["Padding", "Padding per side"],
                valueKeys: [
                    "itemPaddingTop",
                    "itemPaddingBottom",
                    "itemPaddingRight",
                    "itemPaddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                min: 0,
            },
            hover: {
                title: "Hover",
                type: ControlType.Object,
                controls: {
                    color: {
                        title: "Color",
                        type: ControlType.Color,
                        defaultValue: "#111111",
                    },
                    bgColor: {
                        title: "Bg Color",
                        type: ControlType.Color,
                        defaultValue: "#F3F3F3",
                    },
                },
            },
        },
    },
    indicatorSVG: {
        title: "Indicator Icon",
        type: ControlType.ComponentInstance,
    },
    triggerSVG: {
        title: "Open Icon",
        type: ControlType.ComponentInstance,
    },

    clearSVG: {
        title: "Clear SVG",
        type: ControlType.ComponentInstance,
    },
})
