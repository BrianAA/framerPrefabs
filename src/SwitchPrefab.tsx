import * as Switch from "@radix-ui/react-switch"
import { styled, css } from "@stitches/react"
import React from "react"


interface DissabledProps {
    opacity: number
    background: string
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
    disabled: DissabledProps
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
    labelPosition: number
}

interface ThumbStyleProps {
    inActive: string
    active: string
    disabled: DissabledProps
}
interface SwitchPrefabProps {
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

    function handleChange(e: boolean) {
        console.log(e)
    }

    const SwitchContainer = styled("div", {
        display: "flex",
        gap: "8px",
        alignItems: "center",

    })
    const SwitchLabel = css({
        fontFamily: labelStyles.font ? labelStyles.font : "sans-serif",
        fontWeight: labelStyles.fontWeight ? labelStyles.fontWeight : "300",
        fontSize: labelStyles.size ? labelStyles.size : "14px",
        color: labelStyles.color ? labelStyles.color : "#666666",
        order: labelStyles.labelPosition ? labelStyles.labelPosition : 0
    })
    const SwitchRoot = css({
        all: "unset",
        width: controlStyles ? `${controlStyles.width}px` : 40,
        height: controlStyles ? `${controlStyles.height}px` : 22,
        backgroundColor: controlStyles
            ? `${controlStyles.inActive}`
            : "#EBEBEB",
        borderRadius: controlStyles ? `${controlStyles.radius}px` : "9999px",
        position: "relative",
        "&:disabled": {
            opacity: controlStyles ? controlStyles.disabled.opacity : 0.5,
            backgroundColor: controlStyles
                ? `${controlStyles.disabled.background}`
                : "",
        },
        "&:focus": {
            outlineOffset: controlStyles
                ? `${controlStyles.focus.offset}px`
                : "2px",
            outlineColor: controlStyles
                ? `${controlStyles.focus.color}`
                : "#282A2C",
            outlineStyle: controlStyles ? "none" : "solid",
        },
        '&[data-state="checked"]': {
            backgroundColor: controlStyles
                ? `${controlStyles.active}`
                : "#282A2C",
        },
    })

    const SwitchThumb = styled(Switch.Thumb, {
        display: "block",
        width: controlStyles ? `${controlStyles.height - 2}px` : 20,
        height: controlStyles ? `${controlStyles.height - 2}px` : 20,
        backgroundColor: thumbStyles ? `${thumbStyles.inActive}` : "white",
        borderRadius: "9999px",
        transition: "transform 200ms",
        transform: "translateX(2px)",
        willChange: "transform",
        "&[data-disabled]": {
            opacity: thumbStyles ? thumbStyles.disabled.opacity : 0.5,
            background: thumbStyles ? thumbStyles.disabled.background : "",
        },
        '&[data-state="checked"]': {
            backgroundColor: thumbStyles ? thumbStyles.active : "",
            transform: "translateX(18px)",
        },
    })


    return (
        <SwitchContainer>
            {useLabel && (
                <label
                    className={SwitchLabel()}
                    htmlFor={controlID}
                    style={{ ...labelStyles }}
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
                onCheckedChange={handleChange}
                name={name}
                id={controlID}
            >
                <SwitchThumb />
            </Switch.Root>
        </SwitchContainer>
    )
}