// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { useRef, useState, useEffect } from "react"
import {
    ControlType,
    addPropertyControls,
    RenderTarget,
    withCSS,
} from "framer"
import validator from "validator"

//Creates a HTML Input component
const _input = React.forwardRef(({ ...props }, ref) => {
    return <input ref={ref} className="prefab-input" {...props} />
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
    }`,
    `.prefab-input{
        all:unset;
        font-family:var(--prefab-input-fontFamily);
        font-size:var(--prefab-input-fontSize);
        font-weight:var(--prefab-input-fontWeight);
        color:var(--prefab-input-color);
        text-align:var(--prefab-input-textAlign);
        text-transform:var(--prefab-input-textTransform);
        letter-spacing:var(--prefab-input-letterSpacing);
        line-height:var(--prefab-input-line-height);
    }`,
    `.prefab-input::placeholder{
        color:var(--prefab-input-placeholder-color)
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
export default function Prefab_Input_Text(props) {
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
        inputType, //Supported input types email, url, text,phone
        name, //Name of the control for formID use
        formID, // The associated formID and its id.
        required, // If the control is required
        styles, // The font styles for the placeholder and text
        placeholder, // Placeholder value
        validationType, //What type of custom validation
        contains, // Validation logic
        equals, // Validation logic
        isAlpha, // Validation logic
        isAlphanumeric, // Validation logic
        isEmail, // Validation logic
        isPostalCode, // Validation logic
        isURL, // Validation logic
        matches, // Validation logic
        uid, // The unique id for this control
        autocomplete, //Sets clear button id if there is one
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
            case "isEmail":
                return validator.isEmail(_value, {
                    blacklisted_chars: isEmail.blacklisted_chars,
                    host_blacklist: isEmail.host_blacklist,
                })
            case "isLowercase":
                return validator.isLowercase(_value)
            case "isPostalCode":
                return validator.isPostalCode(_value, isPostalCode.locale)
            case "isUppercase":
                return validator.isUppercase(_value)
            case "isURL":
                return validator.isURL(_value, {
                    require_protocol: isURL.require_protocol,
                    protocols: isURL.protocols,
                })
                break
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
        "--prefab-input-fontSize": styles?.font?.fontSize,
        "--prefab-input-fontWeight": styles?.font?.fontWeight,
        "--prefab-input-fontFamily": styles?.font?.fontFamily,
        "--prefab-input-color": styles?.color,
        "--prefab-input-placeholder-color": styles?.placeholder,
        "--prefab-input-textTransform": styles?.transform,
        "--prefab-input-letterSpacing": styles?.spacing,
        "--prefab-input-lineHeight": styles?.line,
        "--prefab-input-textAlign": styles?.font?.textAlign,
    }
    return (
        <Input
            disabled={disabled}
            form={formID ? formID : undefined}
            required={required}
            type={inputType}
            ref={inputRef}
            name={name ? name : undefined}
            onFocus={() => setInputState(inputStates.focus)}
            onBlur={() => setInputState(inputStates.default)}
            style={setStyles}
            placeholder={placeholder}
            onChange={(e) => handleChange(e)}
            value={value}
            aria-describedby={ariaDescribedby ? ariaDescribedby : undefined}
            autoComplete={`${autocomplete}`}
        />
    )
}

addPropertyControls(Prefab_Input_Text, {
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
    autocomplete: {
        type: ControlType.Boolean,
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
    inputType: {
        type: ControlType.Enum,
        options: ["text", "email", "url"],
        optionTitles: ["Text", "Email", "URL"],
    },
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
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
            "isEmail",
            "isLowercase",
            "isPostalCode",
            "isUppercase",
            "isURL",
            "matches",
        ],
        optionTitles: [
            "none",
            "contains",
            "equals",
            "isAlpha",
            "isAlphanumeric",
            "isAscii",
            "isEmail",
            "isLowercase",
            "isPostalCode",
            "isUppercase",
            "isURL",
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
    isEmail: {
        hidden: (props) => props.validationType != "isEmail",
        description: "check if the string is an email.",
        type: ControlType.Object,
        controls: {
            host_blacklist: {
                type: ControlType.Array,
                description:
                    "Validation fails if the email's domain (part after the @ symbol) is on the host_blacklist",
                control: {
                    type: ControlType.String,
                },
            },
            blacklisted_chars: {
                type: ControlType.String,
                description:
                    "If blacklisted_chars receives a string, then the validator will reject emails that include any of the characters in the string, in the name part.",
            },
        },
    },
    isURL: {
        hidden: (props) => props.validationType != "isURL",
        description: "check if the string is a URL.",
        type: ControlType.Object,
        controls: {
            require_protocol: {
                type: ControlType.Boolean,
                description:
                    " If set to true isURL will return false if protocol is not present in the URL.",
            },
            protocols: {
                type: ControlType.Array,
                description:
                    "valid protocols can be modified with this option.",
                control: {
                    type: ControlType.String,
                },
                defaultValue: ["http", "https"],
            },
        },
    },
    isPostalCode: {
        hidden: (props) => props.validationType != "isPostalCode",
        description: "check if the string is a postal code.",
        type: ControlType.Object,
        controls: {
            locale: {
                type: ControlType.Enum,
                options: [
                    "AD",
                    "AT",
                    "AU",
                    "AZ",
                    "BA",
                    "BE",
                    "BG",
                    "BR",
                    "BY",
                    "CA",
                    "CH",
                    "CN",
                    "CZ",
                    "DE",
                    "DK",
                    "DO",
                    "DZ",
                    "EE",
                    "ES",
                    "FI",
                    "FR",
                    "GB",
                    "GR",
                    "HR",
                    "HT",
                    "HU",
                    "ID",
                    "IE",
                    "IL",
                    "IN",
                    "IR",
                    "IS",
                    "IT",
                    "JP",
                    "KE",
                    "KR",
                    "LI",
                    "LK",
                    "LT",
                    "LU",
                    "LV",
                    "MG",
                    "MT",
                    "MX",
                    "MY",
                    "NL",
                    "NO",
                    "NP",
                    "NZ",
                    "PL",
                    "PR",
                    "PT",
                    "RO",
                    "RU",
                    "SA",
                    "SE",
                    "SG",
                    "SI",
                    "SK",
                    "TH",
                    "TN",
                    "TW",
                    "UA",
                    "US",
                    "ZA",
                    "ZM",
                ],
                optionTitles: [
                    "AD",
                    "AT",
                    "AU",
                    "AZ",
                    "BA",
                    "BE",
                    "BG",
                    "BR",
                    "BY",
                    "CA",
                    "CH",
                    "CN",
                    "CZ",
                    "DE",
                    "DK",
                    "DO",
                    "DZ",
                    "EE",
                    "ES",
                    "FI",
                    "FR",
                    "GB",
                    "GR",
                    "HR",
                    "HT",
                    "HU",
                    "ID",
                    "IE",
                    "IL",
                    "IN",
                    "IR",
                    "IS",
                    "IT",
                    "JP",
                    "KE",
                    "KR",
                    "LI",
                    "LK",
                    "LT",
                    "LU",
                    "LV",
                    "MG",
                    "MT",
                    "MX",
                    "MY",
                    "NL",
                    "NO",
                    "NP",
                    "NZ",
                    "PL",
                    "PR",
                    "PT",
                    "RO",
                    "RU",
                    "SA",
                    "SE",
                    "SG",
                    "SI",
                    "SK",
                    "TH",
                    "TN",
                    "TW",
                    "UA",
                    "US",
                    "ZA",
                    "ZM",
                ],
            },
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
    styles: {
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
})
