import * as Switch from "@radix-ui/react-switch"
import { styled, css } from "@stitches/react"
import React from "react"
interface DisabledProps {
    opacity: number
    color: string
}

interface FocusProps {
    offset: number
    color: string
    style: boolean
}
interface ControlStyleProps {
    height: number
    width: number
    inActive: string
    active: string
    disabled: DisabledProps
    focus: FocusProps
    radius: number
}
interface LabelStyleProps {
    font: string,
    size: number,
    lineHeight: number,
    color: string,
    letterSpacing: number,
    fontWeight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800,
    position: number
}

interface ShadowProps {
    shadowX: number,
    shadowY: number,
    blur: number,
    spread: number,
    color: string
}
interface ThumbStyleProps {
    inActive: string
    active: string
    disabled: DisabledProps
    shadow: ShadowProps
}
interface SwitchPrefabProps {
    iconOff: any
    iconOn: any
    nativeLabel: any
    controlStyles: ControlStyleProps
    thumbStyles: ThumbStyleProps
    labelStyles: LabelStyleProps
    useLabel: boolean
    text: string
    disabled: boolean
    formID: string
    controlID: string
    required: boolean
    defaultChecked: boolean
    name: string
}

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export function SwitchPrefab({
    iconOff,
    iconOn,
    nativeLabel,
    controlStyles,
    thumbStyles,
    labelStyles,
    text,
    disabled,
    formID,
    required,
    defaultChecked,
    useLabel,
    name,
    controlID,
}: SwitchPrefabProps) {


    const SwitchContainer = styled("div", {
        display: "flex",
        gap: "8px",
        alignItems: "center",

    })
    const SwitchLabel = css({
        fontFamily: labelStyles.font ? `${labelStyles.font}` : "sans-serif",
        fontWeight: labelStyles.fontWeight ? labelStyles.fontWeight : "300",
        fontSize: labelStyles.size ? labelStyles.size + "px" : "14px",
        color: labelStyles.color ? labelStyles.color : "#666666",
        order: labelStyles.position ? labelStyles.position : 0
    })
    const SwitchRoot = css({
        all: "unset",
        width: controlStyles ? `${controlStyles.width}px` : 32,
        height: controlStyles ? `${controlStyles.height}px` : 16,
        padding: 2,
        backgroundColor: controlStyles
            ? `${controlStyles.inActive}`
            : "#EBEBEB",
        borderRadius: controlStyles ? `${controlStyles.radius}px` : "9999px",
        position: "relative",
        "&:disabled": {
            opacity: controlStyles ? controlStyles.disabled.opacity : 0.5,
            backgroundColor: controlStyles
                ? `${controlStyles.disabled.color}`
                : "",
        },
        "&:focus": {
            outlineOffset: controlStyles
                ? `${controlStyles.focus.offset}px`
                : "2px",
            outlineColor: controlStyles
                ? `${controlStyles.focus.color}`
                : "#282A2C",
            outlineStyle: controlStyles.focus.style ? controlStyles.focus.style : "solid",
        },
        '&[data-state="checked"]': {
            backgroundColor: controlStyles
                ? `${controlStyles.active}`
                : "#282A2C",
        },
    })

    const SwitchThumb = styled(Switch.Thumb, {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: controlStyles ? `${controlStyles.height}px` : 16,
        height: controlStyles ? `${controlStyles.height}px` : 16,
        backgroundColor: thumbStyles ? `${thumbStyles.inActive}` : "white",
        borderRadius: controlStyles ? `${controlStyles.radius}px` : "9999px",
        transition: "transform 200ms",
        transform: "translateX(0px)",
        willChange: "transform",
        boxShadow: `${thumbStyles.shadow.shadowX}px ${thumbStyles.shadow.shadowY}px ${thumbStyles.shadow.blur}px ${thumbStyles.shadow.spread} ${thumbStyles.shadow.color}`,
        "&[data-disabled]": {
            opacity: thumbStyles ? thumbStyles.disabled.opacity : 0.5,
            background: thumbStyles ? thumbStyles.disabled.color : "",
        },
        '&[data-state="checked"]': {
            backgroundColor: thumbStyles ? thumbStyles.active : "",
            transform: `translateX(${controlStyles.width - controlStyles.height}px)`,
            "& .inactive-icon": {
                display: "none"
            },
            "& .active-icon": {
                display: "block"
            }
        },
        '&[data-state="unchecked"]': {
            "& .inactive-icon": {
                display: "block"
            },
            "& .active-icon": {
                display: "none"
            }
        },
    })


    const onValueChange = (e: boolean) => {
        const customEventData = { value: e };
        const event = new CustomEvent('SwitchPrefab', { detail: customEventData });
        document.dispatchEvent(event);
        console.log("event" + event)
    };

    return (
        <SwitchContainer>
            {useLabel && (
                <label
                    className={SwitchLabel()}
                    htmlFor={controlID}
                >
                    {text ? text : "Label"}
                </label>
            )}
            <Switch.Root
                className={SwitchRoot()}
                form={formID}
                defaultChecked={defaultChecked}
                required={required}
                disabled={disabled}
                onCheckedChange={onValueChange}
                name={name}
                id={controlID}
            >
                <SwitchThumb>
                    <span className="active-icon">
                        {iconOff && iconOn}
                    </span>
                    <span className="inactive-icon">
                        {iconOff && iconOff}
                    </span>
                </SwitchThumb>
            </Switch.Root>
        </SwitchContainer>
    )
}