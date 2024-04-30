// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React from "react"
import { withCSS, addPropertyControls, ControlType } from "framer"
import Prefab_EventSymbol from "https://framer.com/m/Prefab-Symbol-hrte.js@F7K3e0kG5Xl8ud1r3Rn4"

interface htmlCheckboxProps {
    name?: string
    form?: string
    required?: boolean
    value: string
    checked: boolean
    defaultChecked: boolean
    uid: string
    onChange: () => void
}
//Creates a HTML Input component
const InputWithRef = React.forwardRef<HTMLInputElement, htmlCheckboxProps>(
    (props, ref) => {
        const { value, checked, defaultChecked, ...rest } = props
        return (
            <input
                type="checkbox"
                tabIndex={-1}
                aria-hidden="true"
                ref={ref}
                value={value}
                className="prefab-checkbox"
                {...rest}
                checked={checked}
                onChange={props.onChange}
            />
        )
    }
)

//Define styles
const Checkbox = withCSS(InputWithRef, [
    `.prefab-checkbox{
        border:0;
        position:absolute;
        clip:rect(1 1 1 1);
        pointer-events:none;
        opacity:0;
        transform:translate(-100%);
        height:1px;
        margin:-1px;
        overflow:hidden;
        padding:0;
        width:1px
    }`,
])

// CheckboxProps interface defining the expected props
interface CheckboxProps {
    onActive?: any
    onInActive?: any
    onError?: any
    name?: string
    formID?: string
    required?: boolean
    defaultChecked: boolean
    ariaDescribedBy?: string
    uid: string
    style: React.CSSProperties
}

// Checkbox component wrapping styles and the input with ref
export default function Prefab_Checkbox(props: CheckboxProps) {
    const checkboxRef = React.useRef<HTMLInputElement>(null)
    const [framerBtn, setFramerBtn] = React.useState<HTMLElement | null>(null)
    const [checked, setChecked] = React.useState<boolean>(
        props.defaultChecked ? props.defaultChecked : false
    )

    //Traverse up the DOM tree to find the Framer component
    //makes assumption it is the 3rd parent.
    React.useEffect(() => {
        if (checkboxRef.current) {
            let parent: HTMLElement | null = checkboxRef.current
                .parentNode as HTMLElement | null
            parent = parent.parentNode as HTMLElement
            parent = parent.parentNode as HTMLElement
            if (parent) {
                setFramerBtn(parent) // Set for reference
                parent.setAttribute("role", "checkbox")
                parent.setAttribute(
                    "aria-checked",
                    props?.defaultChecked?.toString()
                )
                function assignLabel(e) {
                    // Handle the AssignLabel event
                    if (e.detail.label) {
                        console.log("setting label")
                        parent.setAttribute(
                            "aria-labelledby",
                            `${e.detail.label}`
                        )
                    }
                }
                document.addEventListener(
                    `AssignLabel-${props.uid}`,
                    assignLabel
                )
                return () => {
                    document.removeEventListener(
                        `AssignLabel-${props.uid}`,
                        assignLabel
                    )
                }
            }
        }
    }, [checkboxRef])

    React.useEffect(() => {
        //Handles Validation
        const required = props.required
        const formID = props.formID
        if (required && !checked) {
            SendValidation(false)
        } else {
            SendValidation(true)
        }
        //Form has been reseted
        function handleReset() {
            setChecked(props.defaultChecked ? props.defaultChecked : false)
            if (props.defaultChecked) {
                props.onActive && props.onActive()
            } else {
                props.onInActive && props.onInActive()
            }
        }
        function handleSubmit() {
            // Validation logic
            if (required && !checked) {
                props.onError && props.onError()
            }
        }

        // //Event listeners
        document.addEventListener(`formReset-${formID}`, handleReset)
        document.addEventListener(`formSubmit-${formID}`, handleSubmit)
        //Clean up
        return () => {
            document.removeEventListener(`formReset-${formID}`, handleReset)
            document.removeEventListener(`formSubmit-${formID}`, handleSubmit)
        }
    }, [props.formID, props.uid, checked, props.defaultChecked])

    //Sends Event to
    function SendValidation(isValid) {
        const event = new CustomEvent(`formValidate-${props.formID}`, {
            detail: {
                validation: isValid,
                name: name,
            },
            bubbles: true,
        })
        if (checkboxRef.current) {
            checkboxRef.current.dispatchEvent(event)
        }
    }
    // Event listener for click and keyboard interactions
    React.useEffect(() => {
        if (framerBtn) {
            const toggleChecked = () => setChecked((current) => !current) // Toggle checked state
            framerBtn.addEventListener("click", toggleChecked) // Click event
            framerBtn.addEventListener("keydown", (event) => {
                if (event.key === " ") {
                    // Check for spacebar key
                    event.preventDefault()
                    toggleChecked()
                }
            })
            document.addEventListener(
                `label-clicked-${props.uid}`,
                toggleChecked
            ) // Custom label click event

            return () => {
                framerBtn.removeEventListener("click", toggleChecked) // Clean up listeners
                framerBtn.removeEventListener("keydown", toggleChecked)
                document.removeEventListener(
                    `label-clicked-${props.uid}`,
                    toggleChecked
                )
            }
        }
    }, [framerBtn, props.uid])

    React.useEffect(() => {
        if (!framerBtn) return
        if (checked) {
            props.onActive && props.onActive()
            framerBtn.setAttribute("aria-checked", "true")
        } else {
            props.onInActive && props.onInActive()
            framerBtn.setAttribute("aria-checked", "false")
        }
    }, [checked])

    const handleCheckboxChange = () => {
        setChecked((current) => !current)
    }
    return (
        <span>
            <Checkbox
                ref={checkboxRef}
                name={props.name}
                uid={props.uid}
                form={props.formID}
                value={checked == true ? "true" : "false"}
                required={props.required}
                checked={checked}
                onChange={handleCheckboxChange}
            />
            <Prefab_EventSymbol style={props.style} />
        </span>
    )
}

addPropertyControls(Prefab_Checkbox, {
    onActive: {
        title: "Checked",
        type: ControlType.EventHandler,
    },
    onInActive: {
        title: "Unchecked",
        type: ControlType.EventHandler,
    },
    onError: {
        type: ControlType.EventHandler,
    },
    defaultChecked: {
        title: "Default Active",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    required: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    uid: {
        title: "ID",
        description: "Enter a unique id",
        type: ControlType.String,
    },
    name: {
        title: "name*",
        description: "Required to use in a form",
        type: ControlType.String,
    },
    formID: {
        title: "Form ID",
        description: "Set form ID to the ID of the form prefab.",
        type: ControlType.String,
    },
})
