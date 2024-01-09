import type { ComponentType } from "react"
import { useEffect } from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"
import { createGlobalState } from "react-hooks-global-state"

const { useGlobalState } = createGlobalState({ dynamicKeys: {} })

// Learn more: https://www.framer.com/docs/guides/overrides/

//Empty Story will be populated by Framer Prefab components
const useStore = createStore({})

// States of a component will be updated using thie UID as a prefix
export function ComponentStates(Component): ComponentType {
    return (props) => {
        const [states, setStates] = useStore()
        const UID = formatString(props.settings.UID)

        //TO DELETE
        useEffect(() => {
            console.log("Global state updated:", states)
        }, [states])

        function handleChange(value, _state) {
            setStates({
                ...states,
                [`${UID}-valueChange`]: value,
            })
        }
        return (
            <Component
                prefabValue={(e) => handleChange(e, "valueChange")}
                {...props}
            />
        )
    }
}

//Format ID
function formatString(str) {
    return str.toLowerCase().replace(/\s+/g, "_")
}
