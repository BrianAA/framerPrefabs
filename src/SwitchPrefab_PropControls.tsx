import { ControlType } from "framer"
import { theme, palette } from "./theme"
import { SharedControlProps, propFocus, propShadow_light, propDisabled, propPositionX, propText } from "./propetryControls"
export const SwitchProperties = {
    ...SharedControlProps,
    iconOn: {
        title: "Icon On",
        type: ControlType.ComponentInstance,
    },
    iconOff: {
        title: "Icon Off",
        type: ControlType.ComponentInstance,
    },
    useLabel: {
        title: "Use Label",
        type: ControlType.Boolean,
        defaultValue: true,
    },
    text: {
        hidden: (props: any) => !props.useLabel,
        title: "Text",
        type: ControlType.String,
        defaultValue: "Text for label",
    },
    labelStyles: {
        hidden: (props: any) => !props.useLabel,
        title: "Label",
        type: ControlType.Object,
        controls: {
            ...propPositionX,
            ...propText,
        },
    },
    controlStyles: {
        title: "Container",
        type: ControlType.Object,
        controls: {
            width: {
                title: "Width",
                type: ControlType.Number,
                defaultValue: 40
            },
            height: {
                title: "Height",
                type: ControlType.Number,
                defaultValue: 20,
            },
            inActive: {
                title: "Inactive",
                type: ControlType.Color,
                defaultValue: theme.colors.secondary,
            },
            active: {
                title: "Active",
                type: ControlType.Color,
                defaultValue: theme.colors.primary,
            },
            radius: {
                title: "Radius",
                type: ControlType.Number,
                defaultValue: theme.radius.round
            },
            disabled: { ...propDisabled },
        },
        focus: { ...propFocus },
    },

    thumbStyles: {
        title: "Thumb",
        type: ControlType.Object,
        controls: {
            inActive: {
                title: "Inactive",
                type: ControlType.Color,
                defaultValue: palette.colors.white,
            },
            active: {
                title: "Active",
                type: ControlType.Color,
                defaultValue: palette.colors.white,
            },
            shadow: { ...propShadow_light },
            disabled: { ...propDisabled },
        },
    },
}