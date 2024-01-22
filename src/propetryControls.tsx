import { ControlType } from "framer";
import { theme, palette } from "./theme";

export const text = {
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
}

export const shadowLight = {
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

export const width = {
    title: "Width",
    type: ControlType.Number,
}
export const height = {
    title: "Height",
    type: ControlType.Number,
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
