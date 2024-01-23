import { addPropertyControls } from "framer"
import {
    SwitchPrefab,
    SwitchProperties,
} from "https://www.thoughttolife.com/framerPrefabs/framerprefabs@0.0.01/index.js"

// import {
//     SwitchPrefab,
//     SwitchProperties,
// } from "http://127.0.0.1:8000/index.js?-line-dwqdw"

/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */
export default function Switch(props) {
    const {
        text,
        iconOff,
        iconOn,
        controlStyles,
        thumbStyles,
        useLabel,
        labelStyles,
    } = props
    return (
        <SwitchPrefab
            labelStyles={labelStyles}
            thumbStyles={thumbStyles}
            controlStyles={controlStyles}
            useLabel={useLabel}
            text={text}
            iconOff={iconOff}
            iconOn={iconOn}
        />
    )
}

addPropertyControls(Switch, SwitchProperties)
