import React, { useState, useRef, useEffect } from "react"
import * as Framer from "framer"
import { ControlType, addPropertyControls, RenderTarget, withCSS } from "framer"
import Prefab_EventSymbol from "https://framer.com/m/Prefab-EventSymbol-StIR.js@yScBVQP1siE1M9GNONGi"

const mailchimpRegex = /^https?:\/\/([^\/]+)[^\?]+\??(.+)$/

const parseMailChimpUrl = (url) => {
    var ref
    const [, domain, parameters] =
        (ref = url.replace("&amp;", "&").match(mailchimpRegex)) !== null &&
            ref !== void 0
            ? ref
            : [null, null, null]
    return [domain, new URLSearchParams(parameters)]
}
//Exposes any properties of the component

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 * @framerDisableUnlink
 * @framerSupportedLayoutWidth auto-prefer-fixed
 * @framerSupportedLayoutHeight auto-prefer-fixed
 */
export default function Prefab_Form(props) {
    const {
        style,
        service,
        action,
        uid,
        onSuccess,
        onError,
        onDefault,
        onSending,
        resetAfter,
        timeout,
    } = props
    const [isValid, setIsValid] = useState([])
    const [formData, setFormData] = useState([])
    //Ref of this form to send DOM events
    const formRef = useRef()

    //Sends out a custom event that it the form has been submited.
    async function handleSubmit(e) {
        e.preventDefault()
        if (formRef.current) {
            const event = new CustomEvent(`formSubmit-${uid}`, {
                detail: {
                    data: "Form Submitted",
                },
                bubbles: true,
            })
            //Send event
            formRef.current.dispatchEvent(event)
            // Initialize an object to hold form data
            let formObject = {}

            const formControls = document.querySelectorAll(
                `[form="${uid}"]:not(button[type="submit"]):not(button[type="reset"])`
            )
            for (let i = 0; i < formControls.length; i++) {
                const key = formControls[i]?.name
                const value = formControls[i]?.value
                if (key && value) {
                    formObject[key] = value
                }
            }

            // Check if all form controls have been validated.
            const allControlsValidated =
                formControls.length === Object.keys(isValid).length &&
                Object.values(isValid).every((value) => value === true)

            if (allControlsValidated) {
                // Proceed with form submission
                if (service == "mailChimp") {
                    AttemptChimp()
                } else {
                    AttemptSubmit(formObject)
                }
            } else {
                // Not all controls are validated yet
            }
        }
    }

    async function AttemptSubmit(formObject) {
        onSending && onSending()
        try {
            //If custom validation check if all are valid otherwise proceed
            const allTrue = Object.values(isValid).every(
                (value) => value === true
            )

            if (allTrue && isValid.length != 0) {
                //Get all form data
                //Sends an event that a valid submit was made
                const validSubmitEvent = new CustomEvent(
                    `formValidSubmit-${uid}`,
                    {
                        detail: {
                            data: formObject,
                        },
                        bubbles: true,
                    }
                )
                //Send event
                if (formRef.current) {
                    formRef.current.dispatchEvent(validSubmitEvent)
                }
                if (action) {
                    const response = await fetch(action, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                        body: JSON.stringify(formObject),
                    })
                    if (response.ok) {
                        onSuccess && onSuccess()
                        if (resetAfter) {
                            setTimeout(() => {
                                onDefault && onDefault()
                            }, timeout * 1000)
                        }
                    } else {
                        throw Error(response.status)
                    }
                } else {
                    onSuccess && onSuccess()
                    if (resetAfter) {
                        setTimeout(() => {
                            onDefault && onDefault()
                        }, timeout * 1000)
                    }
                }
            }
        } catch (error) {
            console.error("Submission failed:", error)
            //TODO: Handle Error
            onError && onError()
            if (resetAfter) {
                setTimeout(() => {
                    onDefault && onDefault()
                }, timeout * 1000)
            }
        }
    }
    async function AttemptChimp() {
        //TODO Add mailChimp support
    }

    //Sends Reset event specfic to this form via its ID. Any control listening will reset.
    function handleReset(e) {
        onDefault && onDefault()
        const event = new CustomEvent(`formReset-${uid}`, {
            detail: {
                state: "default",
            },
            bubbles: true,
        })
        if (formRef.current) {
            formRef.current.dispatchEvent(event)
        }
    }

    useEffect(() => {
        //Will listen to validation event from inputs
        //Events coming from inputs must include name & validation True:False
        const handleValidation = (event) => {
            const validationItem = {
                [event.detail.name]: event.detail.validation,
            }
            setIsValid((currentErrors) => ({
                ...currentErrors,
                ...validationItem,
            }))
        }

        //Set up listener
        document.addEventListener(`formValidate-${uid}`, handleValidation)
        //Clean up
        return () => {
            document.removeEventListener(
                `formValidate-${uid}`,
                handleValidation
            )
        }
    }, [])

    return (
        <form
            style={props.style}
            noValidate
            ref={formRef}
            onReset={handleReset}
            id={uid}
            onSubmit={handleSubmit}
        >
            <Prefab_EventSymbol />
        </form>
    )
}

addPropertyControls(Prefab_Form, {
    uid: {
        title: "ID",
        type: ControlType.String,
    },
    onDefault: {
        type: ControlType.EventHandler,
    },
    onSending: {
        type: ControlType.EventHandler,
    },
    onSuccess: {
        type: ControlType.EventHandler,
    },
    onError: {
        type: ControlType.EventHandler,
    },
    service: {
        type: ControlType.Enum,
        options: ["formSpark", "formSpree", "custom"],
        optionTitles: ["Form Spark", "Form Spree", "Custom"],
    },
    action: {
        type: ControlType.String,
    },
    resetAfter: {
        type: ControlType.Boolean,
        description:
            "Optional Reset form after a submission (Successful or Error)",
    },
    timeout: {
        hidden: (props) => !props.resetAfter,
        type: ControlType.Number,
        description: "Units in seconds",
        defaultValue: 2,
    },
})
