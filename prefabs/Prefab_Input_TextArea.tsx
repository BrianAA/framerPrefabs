// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { useRef, useState, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"
import validator from "validator"

//Creates a HTML Input component
const _input = React.forwardRef(({ ...props }, ref) => {
    return (
        <textarea tabIndex="-1" ref={ref} className="prefab-input" {...props} />
    )
})

//Applies the styles to the input. Removes all others styles for empty box
const Input = withCSS(_input, [
    `:root {
        --prefab-input-fontSize: 14px;
        --prefab-input-fontWeight:300;
        --prefab-input-fontFamily:'inter'; 
        --prefab-input-color:black;
        --prefab-input-placeholder-color:grey;
        --prefab-input-textTransform:blue;  
        --prefab-input-letterSpacing:blue; 
        --prefab-input-lineHeight:1.1;
        --prefab-input-textAlign:left;
        --prefab-input-resize:vertical;
        --prefab-input-scrollbarWidth:8px;
        --prefab-input-scrollbarBorderRadius:8px;
        --prefab-input-scrollbarBackground:#f8f9fa;
        --prefab-input-thumbBorderRadius:4px;
        --prefab-input-thumbColor:#dee2e6;
        --prefab-input-hoverColor:#ced4da;
        --prefab-input-focusColor:#ced4da;
        --prefab-input-resize-area:transparent;

    }`,
    `.prefab-input{
        all:unset;
        overflow:auto;
        font-family:var(--prefab-input-fontFamily);
        font-size:var(--prefab-input-fontSize);
        font-weight:var(--prefab-input-fontWeight);
        color:var(--prefab-input-color);
        text-align:var(--prefab-input-textAlign);
        text-transform:var(--prefab-input-textTransform);
        letter-spacing:var(--prefab-input-letterSpacing);
        line-height:var(--prefab-input-line-height);
        resize:var(--prefab-input-resize);

    }`,
    `.prefab-input::placeholder{
        color:var(--prefab-input-placeholder-color)
    }`,
    `.prefab-input::-webkit-scrollbar {
            width: var(--prefab-input-scrollbarWidth);
        }`,
    `.prefab-input::-webkit-scrollbar-track {
        background:var(--prefab-input-scrollbarBackground);
        padding: 4px;
        border-radius: var(--prefab-input-scrollbarBorderRadius);,
    }`,
    `.prefab-input::-webkit-scrollbar-thumb {
        background-color: var(--prefab-input-thumbColor);
        border: transparent;
        border-radius:var(--prefab-input-thumbBorderRadius);
    }`,
    `.prefab-input::-webkit-scrollbar-thumb:hover {
        background-color: var(--prefab-input-hoverColor);
    }`,
    `.prefab-input::-webkit-scrollbar-thumb:active {
        background-color: var(--prefab-input-focusColor);
    }`,
    `.prefab-input::-webkit-resizer {
        border: var(--prefab-input-resize-area);
        background: transparent;
        outline: none;
    }`,
])

//These are the supported states of the component
const inputStates = {
    default: "default",
    error: "error",
    focus: "focus",
    disabled: "disabled", //TODO Account for disabled
}
/**
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Input_TextArea(props) {
    const {
        onDefault, //onBlur
        ariaDescribedby,
        onDefaultHasValue,
        onFocus, //Event onFocus
        onFocusHasValue,
        onError,
        onErrorHasValue,
        onDisabled,
        onDisabledHasValue,
        style, //Framer styles
        disabled, //If input is disabled
        name, //Name of the control for formID use
        formID, // The associated formID and its id.
        required, // If the control is required
        textStyles, // The font styles for the placeholder and text
        placeholder, // Placeholder value
        validationType, //What type of custom validation
        contains, // Validation logic
        equals, // Validation logic
        isAlpha, // Validation logic
        isAlphanumeric, // Validation logic
        matches, // Validation logic
        uid, // The unique id for this control
        setMaxLength, //Sets if there is a maxlength
        maxLength, //the character count
        resize, //sets resize prop
        scrollbar,
    } = props

    const inputRef: any = useRef() //Ref used to send out events
    const [value, setValue] = useState("") //Controls tha value
    const [inputState, setInputState] = useState(inputStates.default) //Controls the states
    const [framerComponent, setFramerComponent] = useState(null) //Main parent
    const [clearBtn, setClearBtn] = useState(null)

    //This effect handles formID reset and force focus
    useEffect(() => {
        const Clear = (event) => { }
        document.addEventListener(`clear-${uid}`, Clear)
        return () => {
            document.removeEventListener(`clear-${uid}`, Clear)
        }
    }, [])
    useEffect(() => {
        if (disabled) {
            setInputState(inputStates.disabled)
        }
        //When Associated formID button resets
        const handleReset = (event) => {
            setValue("")
            setInputState(inputStates.default)
        }

        const handleSubmit = (event) => {
            const validate = handleValidation(value)
            if (!validate) {
                setInputState(inputStates.error)
            }
        }

        //Event listeners
        document.addEventListener(`formReset-${formID}`, handleReset)

        document.addEventListener(`formSubmit-${formID}`, handleSubmit)
        //Clean up
        return () => {
            document.removeEventListener(`formReset-${formID}`, handleReset)
            document.removeEventListener(`formSubmit-${formID}`, handleSubmit)
        }
    }, [value])

    //When input state changes send update
    useEffect(() => {
        const isValid = handleValidation(value)
        SendValidation(isValid)
        handleStateChange()
    }, [inputState, value])

    useEffect(() => {
        // Avoid overriding anything in the preview as it can get buggy

        if (inputRef.current && RenderTarget.current() != "CANVAS") {
            let parent = inputRef.current.parentNode
            while (
                parent &&
                parent !== document &&
                !parent.hasAttribute("data-framer-name")
            ) {
                parent = parent.parentNode
            }

            if (parent && parent !== document) {
                setFramerComponent(parent) // Set for reference
                parent.addEventListener("focusin", () => {
                    if (inputState != inputStates.focus) {
                        inputRef.current.focus()
                    }
                })
                // Force focus if the main component is clicked, but not on the clear button
                const handleClick = (e) => {
                    if (inputState != inputStates.focus) {
                        inputRef.current.focus()
                    }
                }

                // Handle Click Handler
                parent.addEventListener("click", handleClick)

                // Remove event listener on cleanup
                return () => {
                    parent.removeEventListener("click", handleClick)
                }
            }
        }
    }, [inputRef])

    //Handles validation of the input returns true if valid and false if its not
    function handleValidation(_value) {
        switch (validationType) {
            case "contains":
                return validator.contains(_value, contains.seed, {
                    ignoreCase: contains.ignoreCase,
                    minOccurrences: contains.minOccurences,
                })
            case "equals":
                return validator.equals(_value, equals)
            case "isAlpha":
                return validator.isAlpha(_value, isAlpha.locale)
            case "isAlphanumeric":
                return validator.isAlphanumeric(_value, isAlphanumeric.locale)
            case "isLowercase":
                return validator.isLowercase(_value)
            case "isUppercase":
                return validator.isUppercase(_value)
            case "matches":
                // Converting string patterns to RegExp objects
                let regexPatterns = []
                matches.forEach((pattern) => {
                    try {
                        const regex = new RegExp(pattern)
                        regexPatterns.push(regex)
                    } catch (e) {
                        console.error(`Invalid regex pattern: ${pattern}`, e)
                    }
                })

                // Testing if _value matches all regex patterns
                const allMatch = regexPatterns.every((pattern) =>
                    pattern.test(_value)
                )

                return allMatch
            default:
                return required ? _value.length > 0 : true //If required and empty it is not valid
        }
    }
    function SendValidation(isValid) {
        const event = new CustomEvent(`formValidate-${formID}`, {
            detail: {
                validation: isValid,
                name: name,
            },
            bubbles: true,
        })
        if (inputRef.current) {
            inputRef.current.dispatchEvent(event)
        }
    }

    //Sets value change.
    function handleChange(e) {
        setValue(e.target.value)
    }

    //Handles all state changes
    function handleStateChange() {
        const hasValue = value.length > 0

        switch (inputState) {
            case inputStates.default:
                hasValue
                    ? onDefaultHasValue && onDefaultHasValue()
                    : onDefault && onDefault()
                break
            case inputStates.focus:
                hasValue
                    ? onFocusHasValue && onFocusHasValue()
                    : onFocus && onFocus()
                break
            case inputStates.error:
                hasValue
                    ? onErrorHasValue && onErrorHasValue()
                    : onError && onError()
                break
            case inputStates.disabled:
                hasValue
                    ? onDisabledHasValue && onDisabledHasValue()
                    : onDisabled && onDisabled()
                break
            default:
                hasValue
                    ? onDefaultHasValue && onDefaultHasValue()
                    : onDefault && onDefault()
                break
        }
    }

    //Sets styles for font applies a outline border only on the canvas
    const setStyles = {
        ...style,
        "--prefab-input-fontSize": textStyles?.font?.fontSize,
        "--prefab-input-fontWeight": textStyles?.font?.fontWeight,
        "--prefab-input-fontFamily": textStyles?.font?.fontFamily,
        "--prefab-input-color": textStyles?.color,
        "--prefab-input-placeholder-color": textStyles?.placeholder,
        "--prefab-input-textTransform": textStyles?.transform,
        "--prefab-input-letterSpacing": textStyles?.spacing,
        "--prefab-input-lineHeight": textStyles?.line,
        "--prefab-input-textAlign": textStyles?.font?.textAlign,
        "--prefab-input-scrollbarWidth": scrollbar?.trackWidth,
        "--prefab-input-scrollbarBorderRadius": scrollbar?.trackRadius,
        "--prefab-input-scrollbarBackground": scrollbar?.track,
        "--prefab-input-thumbBorderRadius": scrollbar?.thumbRadius,
        "--prefab-input-thumbColor": scrollbar?.thumb,
        " --prefab-input-hoverColor": scrollbar?.thumbHover,
        "--prefab-input-focusColor": scrollbar?.thumbFocus,
    }
    return (
        <Input
            disabled={disabled}
            form={formID ? formID : undefined}
            required={required}
            ref={inputRef}
            name={name ? name : undefined}
            onFocus={() => setInputState(inputStates.focus)}
            onBlur={() => setInputState(inputStates.default)}
            style={{
                ...setStyles,
                "--prefab-input-resize": resize,
                "--prefab-input-resize-area":
                    RenderTarget.current() == "CANVAS"
                        ? "1px dashed black"
                        : "transparent",
            }}
            placeholder={placeholder}
            cols={props.cols}
            rows={props.rows}
            onChange={(e) => handleChange(e)}
            value={value}
            aria-describedby={ariaDescribedby ? ariaDescribedby : undefined}
            maxLength={setMaxLength ? maxLength : undefined}
        />
    )
}

addPropertyControls(Prefab_Input_TextArea, {
    onDefault: {
        type: ControlType.EventHandler,
    },
    onDefaultHasValue: {
        type: ControlType.EventHandler,
    },
    onFocus: {
        type: ControlType.EventHandler,
    },
    onFocusHasValue: {
        type: ControlType.EventHandler,
    },
    onError: {
        type: ControlType.EventHandler,
    },
    onErrorHasValue: {
        type: ControlType.EventHandler,
    },
    onDisabled: {
        type: ControlType.EventHandler,
    },
    onDisabledHasValue: {
        type: ControlType.EventHandler,
    },
    id: {
        type: ControlType.String,
    },
    name: {
        title: "name*",
        type: ControlType.String,
    },
    formID: {
        type: ControlType.String,
    },
    required: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    placeholder: {
        type: ControlType.String,
        defaultValue: "Placeholder",
    },
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    rows: {
        type: ControlType.Number,
        displayStepper: true,
        defaultValue: 8,
    },
    cols: {
        type: ControlType.Number,
        displayStepper: true,
        defaultValue: 50,
    },
    resize: {
        type: ControlType.Enum,
        options: ["none", "vertical", "horizontal", "both"],
        optionTitles: ["None", "Vertical", "Horizontal", "Both"],
    },
    setMaxLength: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    maxLength: {
        hidden: (props) => !props.setMaxLength,
        type: ControlType.Number,
        defaultValue: 500,
    },
    ariaDescribedby: {
        type: ControlType.String,
    },
    validationType: {
        type: ControlType.Enum,
        options: [
            "none",
            "contains",
            "equals",
            "isAlpha",
            "isAlphanumeric",
            "isAscii",
            "isLowercase",
            "isUppercase",
            "matches",
        ],
        optionTitles: [
            "none",
            "contains",
            "equals",
            "isAlpha",
            "isAlphanumeric",
            "isAscii",
            "isLowercase",
            "isUppercase",
            "matches",
        ],
    },
    contains: {
        hidden: (props) => props.validationType != "contains",
        description: "check if the string contains the seed.",
        type: ControlType.Object,
        controls: {
            seed: {
                type: ControlType.String,
            },
            ignoreCase: {
                type: ControlType.Boolean,
            },
            minOccurences: {
                type: ControlType.Number,
            },
        },
    },
    equals: {
        hidden: (props) => props.validationType != "equals",
        description: "check if the string matches the comparison.",
        type: ControlType.String,
    },
    matches: {
        hidden: (props) => props.validationType != "matches",
        description: "check if the string matches the pattern.",
        type: ControlType.Array,
        control: {
            type: ControlType.String,
        },
    },
    isAlpha: {
        hidden: (props) => props.validationType != "isAlpha",
        description: "check if the string contains only letters (a-zA-Z).",
        type: ControlType.Object,
        controls: {
            locale: {
                type: ControlType.Enum,
                options: [
                    "ar",
                    "ar-AE",
                    "ar-BH",
                    "ar-DZ",
                    "ar-EG",
                    "ar-IQ",
                    "ar-JO",
                    "ar-KW",
                    "ar-LB",
                    "ar-LY",
                    "ar-MA",
                    "ar-QA",
                    "ar-QM",
                    "ar-SA",
                    "ar-SD",
                    "ar-SY",
                    "ar-TN",
                    "ar-YE",
                    "bg-BG",
                    "bn",
                    "cs-CZ",
                    "da-DK",
                    "de-DE",
                    "el-GR",
                    "en-AU",
                    "en-GB",
                    "en-HK",
                    "en-IN",
                    "en-NZ",
                    "en-US",
                    "en-ZA",
                    "en-ZM",
                    "es-ES",
                    "fa-IR",
                    "fi-FI",
                    "fr-CA",
                    "fr-FR",
                    "he",
                    "hi-IN",
                    "hu-HU",
                    "it-IT",
                    "kk-KZ",
                    "ko-KR",
                    "ja-JP",
                    "ku-IQ",
                    "nb-NO",
                    "nl-NL",
                    "nn-NO",
                    "pl-PL",
                    "pt-BR",
                    "pt-PT",
                    "ru-RU",
                    "si-LK",
                    "sl-SI",
                    "sk-SK",
                    "sr-RS",
                    "sr-RS@latin",
                    "sv-SE",
                    "th-TH",
                    "tr-TR",
                    "uk-UA",
                ],
                optionTitles: [
                    "ar",
                    "ar-AE",
                    "ar-BH",
                    "ar-DZ",
                    "ar-EG",
                    "ar-IQ",
                    "ar-JO",
                    "ar-KW",
                    "ar-LB",
                    "ar-LY",
                    "ar-MA",
                    "ar-QA",
                    "ar-QM",
                    "ar-SA",
                    "ar-SD",
                    "ar-SY",
                    "ar-TN",
                    "ar-YE",
                    "bg-BG",
                    "bn",
                    "cs-CZ",
                    "da-DK",
                    "de-DE",
                    "el-GR",
                    "en-AU",
                    "en-GB",
                    "en-HK",
                    "en-IN",
                    "en-NZ",
                    "en-US",
                    "en-ZA",
                    "en-ZM",
                    "es-ES",
                    "fa-IR",
                    "fi-FI",
                    "fr-CA",
                    "fr-FR",
                    "he",
                    "hi-IN",
                    "hu-HU",
                    "it-IT",
                    "kk-KZ",
                    "ko-KR",
                    "ja-JP",
                    "ku-IQ",
                    "nb-NO",
                    "nl-NL",
                    "nn-NO",
                    "pl-PL",
                    "pt-BR",
                    "pt-PT",
                    "ru-RU",
                    "si-LK",
                    "sl-SI",
                    "sk-SK",
                    "sr-RS",
                    "sr-RS@latin",
                    "sv-SE",
                    "th-TH",
                    "tr-TR",
                    "uk-UA",
                ],
                defaultValue: "en-US",
            },
        },
    },
    isAlphanumeric: {
        hidden: (props) => props.validationType != "isAlphanumeric",
        description:
            "check if the string contains only letters and numbers (a-zA-Z0-9).",
        type: ControlType.Object,
        controls: {
            locale: {
                type: ControlType.Enum,
                options: [
                    "ar",
                    "ar-AE",
                    "ar-BH",
                    "ar-DZ",
                    "ar-EG",
                    "ar-IQ",
                    "ar-JO",
                    "ar-KW",
                    "ar-LB",
                    "ar-LY",
                    "ar-MA",
                    "ar-QA",
                    "ar-QM",
                    "ar-SA",
                    "ar-SD",
                    "ar-SY",
                    "ar-TN",
                    "ar-YE",
                    "bg-BG",
                    "bn",
                    "cs-CZ",
                    "da-DK",
                    "de-DE",
                    "el-GR",
                    "en-AU",
                    "en-GB",
                    "en-HK",
                    "en-IN",
                    "en-NZ",
                    "en-US",
                    "en-ZA",
                    "en-ZM",
                    "es-ES",
                    "fa-IR",
                    "fi-FI",
                    "fr-CA",
                    "fr-FR",
                    "he",
                    "hi-IN",
                    "hu-HU",
                    "it-IT",
                    "kk-KZ",
                    "ko-KR",
                    "ja-JP",
                    "ku-IQ",
                    "nb-NO",
                    "nl-NL",
                    "nn-NO",
                    "pl-PL",
                    "pt-BR",
                    "pt-PT",
                    "ru-RU",
                    "si-LK",
                    "sl-SI",
                    "sk-SK",
                    "sr-RS",
                    "sr-RS@latin",
                    "sv-SE",
                    "th-TH",
                    "tr-TR",
                    "uk-UA",
                ],
                optionTitles: [
                    "ar",
                    "ar-AE",
                    "ar-BH",
                    "ar-DZ",
                    "ar-EG",
                    "ar-IQ",
                    "ar-JO",
                    "ar-KW",
                    "ar-LB",
                    "ar-LY",
                    "ar-MA",
                    "ar-QA",
                    "ar-QM",
                    "ar-SA",
                    "ar-SD",
                    "ar-SY",
                    "ar-TN",
                    "ar-YE",
                    "bg-BG",
                    "bn",
                    "cs-CZ",
                    "da-DK",
                    "de-DE",
                    "el-GR",
                    "en-AU",
                    "en-GB",
                    "en-HK",
                    "en-IN",
                    "en-NZ",
                    "en-US",
                    "en-ZA",
                    "en-ZM",
                    "es-ES",
                    "fa-IR",
                    "fi-FI",
                    "fr-CA",
                    "fr-FR",
                    "he",
                    "hi-IN",
                    "hu-HU",
                    "it-IT",
                    "kk-KZ",
                    "ko-KR",
                    "ja-JP",
                    "ku-IQ",
                    "nb-NO",
                    "nl-NL",
                    "nn-NO",
                    "pl-PL",
                    "pt-BR",
                    "pt-PT",
                    "ru-RU",
                    "si-LK",
                    "sl-SI",
                    "sk-SK",
                    "sr-RS",
                    "sr-RS@latin",
                    "sv-SE",
                    "th-TH",
                    "tr-TR",
                    "uk-UA",
                ],
                defaultValue: "en-US",
            },
        },
    },
    textStyles: {
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
                description: "EM units",
                displayStepper: true,
            },
            color: {
                type: ControlType.Color,
                defaultValue: "#5f3dc4",
            },
            placeholder: {
                type: ControlType.Color,
                defaultValue: "#666666",
            },
            transform: {
                type: ControlType.Enum,
                options: ["none", "uppercase", "lowercase", "capitalize"],
                optionTitles: ["None", "Uppercase", "Lowercase", "Capitalize"],
            },
        },
    },
    scrollbar: {
        type: ControlType.Object,
        controls: {
            track: {
                type: ControlType.Color,
                defaultValue: "#5f3dc4",
            },
            trackWidth: {
                type: ControlType.Number,
                defaultValue: 8,
            },
            trackRadius: {
                type: ControlType.Number,
                defaultValue: 8,
            },
            thumb: {
                type: ControlType.Color,
                defaultValue: "#666666",
            },
            thumbFocus: {
                type: ControlType.Color,
                defaultValue: "#666666",
            },
            thumbHover: {
                type: ControlType.Color,
                defaultValue: "#666666",
            },
            thumbRadius: {
                type: ControlType.Number,
                defaultValue: 8,
            },
        },
    },
})
