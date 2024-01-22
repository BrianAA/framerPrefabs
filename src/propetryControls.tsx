import { ControlType } from "framer";
import { theme, palette } from "./theme";


export const propText = {
    font: {
        title: "Font",
        type: ControlType.String,
        defaultValue: theme.text.meta.font,
    },
    size: {
        title: "Size",
        type: ControlType.Number,
        defaultValue: theme.fontSize.sm,
    },
    letterSpacing: {
        title: "Spacing",
        type: ControlType.Number,
        defaultValue: theme.text.meta.letterSpacing,
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
        defaultValue: theme.text.meta.boldWeight,
    },
    lineHeight: {
        title: "Line-Height",
        type: ControlType.Number,
        defaultValue: theme.text.meta.lineHeight,
    },
    color: {
        title: "Color",
        type: ControlType.Color,
        defaultValue: theme.colors.onBackground,
    },
}

export const propShadow_light = {
    title: "Shadow",
    type: ControlType.Object,
    controls: {
        color: {
            title: "Color",
            type: ControlType.Color,
            defaultValue: palette.colors.alpha[100],
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
    }
}

export const propFocus = {
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
                defaultValue: theme.colors.signal,
            },
            style: {
                title: "Style",
                type: ControlType.Enum,
                options: ["solid", "none"],
                optionTitles: ["Solid", "None"],
            },
        },
    }
}
export const propDisabled = {
    disabled: {
        title: "Disabled",
        type: ControlType.Object,
        controls: {
            opacity: {
                title: "Opacity",
                type: ControlType.Number,
                defaultValue: 1,
            },
            color: {
                title: "Color",
                type: ControlType.Color,
                defaultValue: theme.colors.disabled,
            },
        },
    },
}

export const propPositionX = {
    positionX: {
        title: "Position",
        type: ControlType.Enum,
        options: [0, 1],
        optionTitles: ["Left", "Right"],
    }
}

export const propPositionY = {
    positionX: {
        title: "Position",
        type: ControlType.Enum,
        options: [0, 1],
        optionTitles: ["Top", "Bottom"],
    }
}

export const SharedControlProps = {
    isForm: {
        title: "Form field?",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    formID: {
        hidden: (props: any) => !props.isForm,
        title: "Text",
        type: ControlType.String,
        defaultValue: "Form control ID",
    },
    controlID: {
        title: "Control ID",
        type: ControlType.String,
        defaultValue: "Unique ID",
    },
}
