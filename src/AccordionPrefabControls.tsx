import { ControlType } from "framer";
import { theme, sizes } from "./theme";
import { SharedControlProps } from "./propetryControls";

export const AccordionControls = {
    ...SharedControlProps,
    items: {
        type: ControlType.Array,
        defaultValue: [
            { header: "Header 1", content: "Content 1" },
            { header: "Header 2", content: "Content 2" },
        ],
        control: {
            type: ControlType.Object,
            controls: {
                tag: {
                    title: "Tag",
                    type: ControlType.String,
                },
                header: {
                    title: "Header",
                    type: ControlType.String,
                    displayTextArea: true,
                },
                content: {
                    title: "content",
                    type: "richtext",
                },
            },
        },
    },
    itemGap: {
        type: ControlType.Number,
        defaultValue: sizes[50],
    },
    activeItem: {
        title: "Active",
        type: ControlType.Number,
        defaultValue: 0,
        displayStepper: true,
        step: 1,
    },
    useDefaultIcon: {
        title: "Icon",
        type: ControlType.Boolean,
        defaultValue: true,
        disabledTitle: "Custom",
        enabledTitle: "Default",
    },
    icons: {
        hidden: (props) => props.useDefaultIcon,
        type: ControlType.Array,
        maxCount: 2,
        control: {
            type: ControlType.ComponentInstance,
        },
    },
    animation: {
        type: ControlType.Object,
        controls: {
            iconDefault: {
                title: "Icon",
                hidden: (props) => !props.useDefaultIcon,
                type: ControlType.Object,
                controls: {
                    transition: { type: ControlType.Transition },
                    start: {
                        type: ControlType.Number,
                        description: "Controls intial rotation when closed",
                        defaultValue: 180,
                    },
                    end: {
                        type: ControlType.Number,
                        description: "Controls intial rotation when opened",
                        defaultValue: 0,
                    },
                },
            },
            iconCustom: {
                title: "Icons",
                hidden: (props) => props.useDefaultIcon,
                description: "Controls fade between open/close",
                type: ControlType.Transition,
            },
            expand: {
                type: ControlType.Transition,
                description:
                    "Controls transition the accordions expand/collapse",
            },
        },
    },
    header: {
        type: ControlType.Object,
        controls: {
            height: {
                type: ControlType.Number,
                defaultValue: sizes[800],
            },
            background: {
                type: ControlType.Color,
                defaultValue: theme.colors.background,
            },
            icon: {
                type: ControlType.Object,
                controls: {
                    width: {
                        type: ControlType.Number,
                        defaultValue: theme.fontSize.md,
                    },
                    height: {
                        type: ControlType.Number,
                        defaultValue: theme.fontSize.md,
                    },
                    gap: {
                        type: ControlType.Number,
                        description: "Gap between icon and text",
                        defaultValue: sizes[50],
                    },
                },
            },
            position: {
                type: ControlType.Enum,
                options: [0, 1],
                displaySegmentedControl: true,
                optionTitles: ["Left", "Right"],
            },
            text: {
                type: ControlType.Object,
                controls: {
                    font: {
                        controls: "extened",
                        type: "font",
                        title: "Font",
                        displayFontSize: true,
                        displayFontStyle: true,
                        displayTextAlignment: true,
                        textAlign: "left",
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
                        defaultValue: theme.colors.onBackground,
                    },
                    transform: {
                        type: ControlType.Enum,
                        options: [
                            "none",
                            "uppercase",
                            "lowercase",
                            "capitalize",
                        ],
                        optionTitles: [
                            "None",
                            "Uppercase",
                            "Lowercase",
                            "Capitalize",
                        ],
                    },
                },
            },
            border: {
                type: ControlType.Object,
                controls: {
                    radius: {
                        type: ControlType.FusedNumber,
                        toggleKey: "borderRadiusPerSide",
                        toggleTitles: ["Border", "Border per side"],
                        valueKeys: [
                            "borderRadiusTop",
                            "borderRadiusRight",
                            "borderRadiusBottom",
                            "borderRadiusLeft",
                        ],
                        valueLabels: ["T", "R", "B", "L"],
                        defaultValue: 0,
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.outline,
                    },
                    width: {
                        type: ControlType.FusedNumber,
                        toggleKey: "borderWidthPerSide",
                        toggleTitles: ["Border", "Border per side"],
                        valueKeys: [
                            "borderWidthTop",
                            "borderWidthRight",
                            "borderWidthBottom",
                            "borderWidthLeft",
                        ],
                        valueLabels: ["T", "R", "B", "L"],
                        defaultValue: 0,
                    },
                },
            },
            padding: {
                type: ControlType.FusedNumber,
                toggleKey: "paddingPerSide",
                toggleTitles: ["padding", "padding per side"],
                valueKeys: [
                    "paddingTop",
                    "paddingRight",
                    "paddingBottom",
                    "paddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                defaultValue: sizes[50],
            },
            focus: {
                type: ControlType.Object,
                controls: {
                    offset: {
                        type: ControlType.Number,
                        defaultValue: 0,
                    },
                    width: {
                        type: ControlType.Number,
                        defaultValue: 1,
                    },
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.signal,
                    },
                    style: {
                        type: ControlType.Enum,
                        options: ["solid", "none"],
                        optionTitles: ["Solid", "None"],
                    },
                },
            },
        },
    },
    content: {
        title: "Content",
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
                displayStepper: true,
            },
            color: {
                type: ControlType.Color,
                defaultValue: theme.colors.onBackground_subtle,
            },
            background: {
                type: ControlType.Color,
                defaultValue: theme.colors.background,
            },
            padding: {
                type: ControlType.FusedNumber,
                toggleKey: "paddingPerSide",
                toggleTitles: ["padding", "padding per side"],
                valueKeys: [
                    "paddingTop",
                    "paddingRight",
                    "paddingBottom",
                    "paddingLeft",
                ],
                valueLabels: ["T", "R", "B", "L"],
                defaultValue: sizes[100],
            },
            transform: {
                type: ControlType.Enum,
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
            },
            link: {
                type: ControlType.Object,
                controls: {
                    color: {
                        type: ControlType.Color,
                        defaultValue: theme.colors.signal,
                    },
                    transform: {
                        type: ControlType.Enum,
                        options: [
                            "none",
                            "uppercase",
                            "lowercase",
                            "capitalize",
                        ],
                        optionTitles: [
                            "None",
                            "Uppercase",
                            "Lowercase",
                            "Capitalize",
                        ],
                    },
                    decoration: {
                        type: ControlType.Enum,
                        optionTitles: ["Aa", "A͟a"],
                        options: ["none", "underline"],
                        displaySegmentedControl: true,
                    },
                },
            },
            list: {
                type: ControlType.Object,
                controls: {
                    unordered: {
                        type: ControlType.Object,
                        controls: {
                            style: {
                                type: ControlType.Enum,
                                options: [
                                    "none",
                                    "disc",
                                    "circle",
                                    "square",
                                    "custom",
                                ],
                                optionTitles: [
                                    "none",
                                    "disc",
                                    "circle",
                                    "square",
                                    "custom",
                                    ,
                                ],
                                defaultValue: "disc",
                            },
                            color: {
                                type: ControlType.Color,
                                defaultValue: theme.colors.onBackground_subtle,
                            },
                            padding: {
                                type: ControlType.FusedNumber,
                                toggleKey: "paddingPerSide",
                                toggleTitles: ["padding", "padding per side"],
                                valueKeys: [
                                    "paddingTop",
                                    "paddingRight",
                                    "paddingBottom",
                                    "paddingLeft",
                                ],
                                valueLabels: ["T", "R", "B", "L"],
                                defaultValue: sizes[100],
                            },
                        },
                    },
                    ordered: {
                        type: ControlType.Object,
                        controls: {
                            style: {
                                type: ControlType.Enum,
                                options: [
                                    "none",
                                    "decimal",
                                    "lower-alpha",
                                    "lower-roman",
                                    "upper-alpha",
                                    "upper-roman",
                                ],
                                optionTitles: [
                                    "none",
                                    "decimal",
                                    "lower-alpha",
                                    "lower-roman",
                                    "upper-alpha",
                                    "upper-roman",
                                ],
                                defaultValue: "decimal",
                            },
                            color: {
                                type: ControlType.Color,
                                defaultValue: theme.colors.onBackground_subtle,
                            },
                            padding: {
                                type: ControlType.FusedNumber,
                                toggleKey: "paddingPerSide",
                                toggleTitles: ["padding", "padding per side"],
                                valueKeys: [
                                    "paddingTop",
                                    "paddingRight",
                                    "paddingBottom",
                                    "paddingLeft",
                                ],
                                valueLabels: ["T", "R", "B", "L"],
                                defaultValue: sizes[100],
                            },
                        },
                    },
                },
            },
        },
    },
}


