import { addPropertyControls, ControlType } from "framer"
// import { SwitchPrefab } from "https://www.thoughttolife.com/framerPrefabs/framerprefabs@0.0.14/index.js?1234"
import { SwitchPrefab } from "http://127.0.0.1:8000/index.js"
/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Switch(props) {
    const { text, controlStyles, thumbStyles, useLabel, labelStyles } = props
    return (
        <SwitchPrefab
            labelStyles={labelStyles}
            thumbStyles={thumbStyles}
            controlStyles={controlStyles}
            useLabel={useLabel}
            text={text}
        />
    )
}

addPropertyControls(Switch, {
    isForm: {
        title: "Form field?",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    formID: {
        hidden: (props) => !props.isForm,
        title: "Text",
        type: ControlType.String,
        defaultValue: "Form control ID",
    },
    controlID: {
        title: "Control ID",
        type: ControlType.String,
        defaultValue: "Unique ID",
    },
    useLabel: {
        title: "Use Label",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    text: {
        hidden: (props) => !props.useLabel,
        title: "Text",
        type: ControlType.String,
        defaultValue: "Text for label",
    },
    labelStyles: {
        hidden: (props) => !props.useLabel,
        title: "Label",
        type: ControlType.Object,
        controls: {
            labelPosition: {
                title: "Position",
                type: ControlType.Enum,
                options: [0, 1],
                optionTitles: ["Left", "Right"],
            },
            font: {
                title: "Font",
                type: ControlType.String,
                defaultValue: "Inter",
            },
            size: {
                title: "Size",
                type: ControlType.Number,
                defaultValue: "14",
            },
            letterSpacing: {
                title: "Spacing",
                type: ControlType.Number,
                defaultValue: "0",
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
                defaultValue: "1.1",
            },
            color: {
                title: "Color",
                type: ControlType.Color,
                defaultValue: "#666666",
            },
        },
    },
    controlStyles: {
        title: "Container",
        type: ControlType.Object,
        controls: {
            width: {
                title: "Width",
                type: ControlType.Number,
                defaultValue: 40,
            },
            height: {
                title: "Height",
                type: ControlType.Number,
                defaultValue: 20,
            },
            inActive: {
                title: "Inactive",
                type: ControlType.Color,
                defaultValue: "#EBEBEB",
            },
            active: {
                title: "Active",
                type: ControlType.Color,
                defaultValue: "#111111",
            },
            radius: {
                title: "Radius",
                type: ControlType.Number,
                defaultValue: 32,
            },
            disabled: {
                title: "Disabled",
                type: ControlType.Object,
                controls: {
                    opacity: {
                        title: "Opacity",
                        type: ControlType.Number,
                        defaultValue: 0.5,
                    },
                    color: {
                        title: "Color",
                        type: ControlType.Color,
                        defaultValue: "rgba(0,0,0,.2)",
                    },
                },
            },
            focus: {
                title: "Focus",
                type: ControlType.Object,
                controls: {
                    offset: {
                        title: "Offset",
                        type: ControlType.Number,
                        defaultValue: 2,
                    },
                    color: {
                        title: "Color",
                        type: ControlType.Color,
                        defaultValue: "#282A2C",
                    },
                    style: {
                        title: "Style",
                        type: ControlType.Enum,
                        options: ["solid", "none"],
                        optionTitles: ["Solid", "None"],
                    },
                },
            },
        },
    },
    thumbStyles: {
        title: "Thumb",
        type: ControlType.Object,
        controls: {
            inActive: {
                title: "Inactive",
                type: ControlType.Color,
                defaultValue: "#FFFFFF",
            },
            active: {
                title: "Active",
                type: ControlType.Color,
                defaultValue: "#FFFFFF",
            },
            shadow: {
                title: "Shadow",
                type: ControlType.Object,
                controls: {
                    color: {
                        title: "Color",
                        type: ControlType.Color,
                        defaultValue: "rgba(0,0,0,.15)",
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
            disabled: {
                title: "Disabled",
                type: ControlType.Object,
                controls: {
                    opacity: {
                        title: "Opacity",
                        type: ControlType.Number,
                    },
                    color: {
                        title: "Color",
                        type: ControlType.Color,
                    },
                },
            },
        },
    },
})
