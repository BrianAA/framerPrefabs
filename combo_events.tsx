import type { ComponentType } from "react"
import { addPropertyControls, ControlType } from "framer"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"
import { randomColor } from "https://framer.com/m/framer/utils.js@^0.9.0"

// Learn more: https://www.framer.com/docs/guides/overrides/

const useStore = createStore({
    focused: false,
})

export function setStates(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()
        console.log(props)
        return (
            <Component
                {...props}
                onFocusOutside={(e) => console.log(e)}
                onHighlightChange={(e) => console.log(e)}
                onInputValueChange={(e) => console.log(e)}
                onInteractOutside={(e) => console.log(e)}
                onOpenChange={(e) => console.log(e)}
                onPointerDownOutside={(e) => console.log(e)}
                onValueChange={(e) => console.log(e)}
            />
        )
    }
}

export function listenForFocus(Component): ComponentType {
    return (props) => {
        const [store] = useStore()
        return (
            <Component
                {...props}
                variants={store.focused ? "open" : "default"}
            />
        )
    }
}

export function AddID(Component): ComponentType {
    return (props) => {
        const [store] = useStore()
        return (
            <Component
                {...props}
                variants={store.focused ? "open" : "default"}
            />
        )
    }
}
