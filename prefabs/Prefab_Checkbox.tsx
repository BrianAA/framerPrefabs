// MIT License

// Copyright © Framer Prefabs & Contributors

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { useState, useRef, useEffect } from "react"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"
import Prefab_EventSymbol from "https://framer.com/m/Prefab-Symbol-hrte.js@F7K3e0kG5Xl8ud1r3Rn4"

//Creates a HTML Input component
const _input = React.forwardRef(({ ...props }, ref) => {
    return (
        <input
            type="checkbox"
            ref={ref}
            className="prefab-checkbox"
            {...props}
        />
    )
})

//Define styles
const Checkbox = withCSS(_input, [
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

//Supported states
const States = {
    active: "active",
    inActive: "inActive",
    focusInactive: "focus-inActive",
    focusActive: "focus-Active",
    error: "error",
}

/**
 * @framerSupportedLayoutWidth auto-prefers-fixed
 * @framerSupportedLayoutHeight auto-prefers-fixed
 */
export default function Prefab_Checkbox(props) {
    const {
        onActive, // Event for on active
        onInActive, //Event with inactive
        onFocusInactive, //Event when in focus
        onFocusActive, //Event when in focus
        onError, //Event when checkbox is in error
        name, //Name of checkbox
        formID, // Assoc form
        required, // input required state
        defaultChecked, // If checked when mounted
        uid, // its unique id
        style, // styles from container
    } = props
    const [checked, setChecked] = useState(defaultChecked) //Handles binary state
    const [framerBtn, setFramerBtn] = useState(null)
    const checkboxRef = useRef() //Need ref to send DOM events
    const [state, setState] = useState(
        defaultChecked ? States.active : States.inActive
    )
    //Listen to Form events from Form Prefab
    useEffect(() => {
        //Form has been reseted
        function handleReset() {
            setChecked(defaultChecked)
            if (defaultChecked) {
                setState(States.active)
            } else {
                setState(States.inActive)
            }
        }
        function handleSubmit() {
            // Validation logic
            if (required && !checked) {
                // Checkbox is required but not checked, set error state
                setState(States.error)
            } else {
                // If no error, ensure the state is set correctly
                setState(checked ? States.active : States.inActive)
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
    }, [formID, checked])

    useEffect(() => {
        if (framerBtn) {
            framerBtn.setAttribute("aria-checked", `${checked}`)
        }
        if (required && !checked) {
            SendValidation(false)
        } else {
            SendValidation(true)
        }
        if (checked) {
            setState(States.active)
        } else {
            setState(States.inActive)
        }
    }, [checked, framerBtn])

    useEffect(() => {
        switch (state) {
            case States.inActive:
                onInActive && onInActive()
                break
            case States.active:
                onActive && onActive()
                break
            case States.error:
                onError && onError()
                break
            case States.focusActive:
                onFocusActive && onFocusActive()
                break
            case States.focusInactive:
                onFocusInactive && onFocusInactive()
                break
            default:
                break
        }
    }, [state])

    //Sets up parent and event listeners
    useEffect(() => {
        //Avoids overriding anything in the preview as it can get buggy
        if (checkboxRef.current && RenderTarget.current() != "CANVAS") {
            let parent = checkboxRef.current.parentNode
            while (
                parent &&
                parent !== document &&
                !parent.hasAttribute("data-framer-name")
            ) {
                parent = parent.parentNode
            }

            if (parent && parent !== document) {
                setFramerBtn(parent) //Set for reference
                parent.setAttribute("role", "checkbox")

                const handleClick = () => {
                    setChecked((currentChecked) => !currentChecked)
                }

                const handleKeyDown = (event) => {
                    // Check if key is Enter or Space
                    if (event.key === " ") {
                        event.preventDefault()
                        setChecked((currentChecked) => !currentChecked)
                    }
                }
                parent.addEventListener("click", handleClick)
                parent.addEventListener("keydown", handleKeyDown)

                // Remove event listener on cleanup
                return () => {
                    parent.removeEventListener("click", handleClick)
                    parent.removeEventListener("keydown", handleKeyDown)
                }
            }
        }
    }, [checkboxRef])

    //Sends Event to
    function SendValidation(isValid) {
        const event = new CustomEvent(`formValidate-${formID}`, {
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
    return (
        <span ref={checkboxRef} data-prefab-eventcontroller="checkbox">
            <Checkbox
                id={uid}
                name={name}
                required={required}
                value={checked}
                form={formID}
            />
            <Prefab_EventSymbol style={style} />
        </span>
    )
}

addPropertyControls(Prefab_Checkbox, {
    onActive: {
        title: "Checked",
        type: ControlType.EventHandler,
    },
    onInActive: {
        title: "unChecked",
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
