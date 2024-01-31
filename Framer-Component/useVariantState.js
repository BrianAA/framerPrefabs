import * as React from "react";
import {
    cx
} from "https://framer.com/m/framer/cx.js@^1.0.0";
import {
    useAddVariantProps
} from "https://framer.com/m/framer/useAddVariantProps.js@^1.0.0";
import {
    useForceUpdate
} from "https://framer.com/m/framer/useForceUpdate.js@^1.0.0";

function createGestureVariant(variant, type) {
    return `${variant}-${type}`;
}

function nextVariant(allVariants, currentVariant) {
    const index = allVariants.indexOf(currentVariant);
    let nextIndex = index + 1;
    if (nextIndex >= allVariants.length) {
        nextIndex = 0;
    }
    return allVariants[nextIndex];
}
export var VariantSelector;
(function (VariantSelector) {
    VariantSelector["Variant"] = "v";
})(VariantSelector || (VariantSelector = {}));

function getGesture(enabledGestures, isHovered, isPressed) {
    const {
        hover,
        pressed
    } = enabledGestures || {};
    if (pressed && isPressed) return "pressed";
    if (hover && isHovered) return "hover";
}

function createVariantClassName(baseVariant, variantClassNames) {
    const mappedClassName = variantClassNames[baseVariant];
    if (mappedClassName) return mappedClassName;
    return `framer-${VariantSelector.Variant}-${baseVariant}`;
}
/**
 * Flag setVariantState as cycling variants.
 * @public
 */
export const CycleVariantState = Symbol("cycle");
/**
 * Handle stateful logic in Framer Canvas Components.
 *
 * @public
 */
export function useVariantState({
    variant,
    defaultVariant: externalDefaultVariant,
    transitions: externalTransitions,
    enabledGestures: externalEnabledGestures,
    cycleOrder: externalCycleOrder = [],
    variantProps = {},
    variantClassNames = {}
}) {
    const forceUpdate = useForceUpdate();
    const internalState = React.useRef({
        isHovered: false,
        isPressed: false,
        baseVariant: variant !== null && variant !== void 0 ? variant : externalDefaultVariant,
        gestureVariant: undefined,
        // When used in generated components, these are static values defined
        // outside of the component function that also need to not result in
        // memoized values being recalculated, so we dump them into the ref.
        defaultVariant: externalDefaultVariant,
        enabledGestures: externalEnabledGestures,
        cycleOrder: externalCycleOrder,
        transitions: externalTransitions
    });
    const resolveNextVariant = React.useCallback((nextBaseVariant = internalState.current.defaultVariant) => {
        const {
            baseVariant,
            gestureVariant,
            isPressed,
            isHovered,
            defaultVariant,
            enabledGestures,
        } = internalState.current;
        const gesture = getGesture(enabledGestures === null || enabledGestures === void 0 ? void 0 : enabledGestures[nextBaseVariant], isHovered, isPressed);
        const nextGestureVariant = gesture ? createGestureVariant(nextBaseVariant, gesture) : undefined;
        // Only force a render if the new active variants have changed.
        if (nextBaseVariant !== baseVariant || nextGestureVariant !== gestureVariant) {
            internalState.current.baseVariant = nextBaseVariant || defaultVariant;
            internalState.current.gestureVariant = nextGestureVariant;
            forceUpdate();
        }
    }, [
        forceUpdate
    ]);
    const setGestureState = React.useCallback(({
        isHovered,
        isPressed
    }) => {
        if (isHovered !== undefined) internalState.current.isHovered = isHovered;
        if (isPressed !== undefined) internalState.current.isPressed = isPressed;
        resolveNextVariant(internalState.current.baseVariant);
    }, [
        resolveNextVariant
    ]);
    const setVariant = React.useCallback((proposedVariant) => {
        const {
            defaultVariant,
            cycleOrder,
            baseVariant
        } = internalState.current;
        const nextBaseVariant = proposedVariant === CycleVariantState ? nextVariant(cycleOrder || [], baseVariant || defaultVariant) : proposedVariant;
        resolveNextVariant(nextBaseVariant || defaultVariant);
    }, [
        resolveNextVariant
    ]);
    React.useLayoutEffect(() => {
        if (variant !== internalState.current.baseVariant) setVariant(variant);
    }, [
        variant,
        setVariant
    ]);
    const {
        baseVariant
    } = internalState.current;
    const transition = React.useMemo(() => {
        const {
            transitions
        } = internalState.current;
        if (!transitions) return undefined;
        if (baseVariant) {
            const variantTransition = transitions[baseVariant];
            if (variantTransition) return variantTransition;
        }
        return transitions.default;
    }, [
        baseVariant
    ]);
    const variants = [];
    const {
        gestureVariant,
        defaultVariant,
        enabledGestures,
        isHovered,
        isPressed
    } = internalState.current;
    if (baseVariant && baseVariant !== defaultVariant) variants.push(baseVariant);
    if (gestureVariant) variants.push(gestureVariant);
    // Backwards compatibility for old components generated before
    // addVariantProps was extracted to it's own hook.
    const addVariantProps = useAddVariantProps(baseVariant, gestureVariant, variantProps);
    return {
        variants,
        baseVariant,
        gestureVariant,
        transition,
        setVariant,
        setGestureState,
        addVariantProps,
        classNames: cx(createVariantClassName(baseVariant, variantClassNames), getGesture(enabledGestures === null || enabledGestures === void 0 ? void 0 : enabledGestures[baseVariant], isHovered, isPressed))
    };
}

export const __FramerMetadata__ = {
    "exports": {
        "VariantSelector": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "useVariantState": {
            "type": "function",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "CycleVariantState": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        }
    }
}
//# sourceMappingURL=./useVariantState.map