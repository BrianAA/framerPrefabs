import {
    jsx as _jsx,
    jsxs as _jsxs
} from "react/jsx-runtime";
import {
    useSearch
} from "https://framerusercontent.com/modules/MyBp84Z0p9nUcMimVMnY/3IyCvPPZODdBBnAOCOav/useSearch.js";
import React, {
    useEffect,
    useState,
    useMemo,
    forwardRef,
    useRef,
    useDeferredValue,
    useLayoutEffect,
    useCallback,
    useImperativeHandle
} from "react";
import {
    Browser
} from "https://framerusercontent.com/modules/PJVBcBLmDteTEAZh3J9Z/keXJyjyE9VnzUcDMayjg/browser.js";
import {
    motion,
    clamp,
    useAnimate
} from "framer-motion";
import {
    SearchIcon,
    ClearIcon,
    SpinnerIcon
} from "https://framerusercontent.com/modules/LV9trClbmNwd5PVj9l8y/L4rFqMGNzGSwRZpGTGF3/Icons.js";
import {
    clampText,
    getFontFamily,
    localStorageDebugFlag,
    animationKeyFromLayout
} from "https://framerusercontent.com/modules/MWsEnYfRnoOQq31DN4ql/UyHGCSLuZlZBvIaCnOlc/utils.js";
import {
    useCallbackOnMouseMove
} from "https://framerusercontent.com/modules/Gzef0nFihI9m9vZG45th/lIUxbZcreiDm2GzUkt3y/useCallbackOnMouseMove.js";
import {
    scrollIntoView
} from "https://framerusercontent.com/modules/eAnjm75CdfYT1Zz4BIaz/7KDSfnnyD1T3Ap75L4m8/scrollIntoView.js";
import { // @ts-expect-error Internal API
    useLocaleInfo
} from "framer";
const MAX_DESCRIPTION_LENGTH = 120;
const MODAL_MAX_HEIGHT = 496;
const VERTICAL_SPACING_MULTIPLIER = .6;

function ClearButton({
    theme,
    type,
    onClick,
    text
}) {
    const shouldDisplayIcon = type === "icon";
    const iconOrText = shouldDisplayIcon ? /*#__PURE__*/ _jsx(ClearIcon, {
        style: {
            color: theme.inputIconColor,
            width: theme.inputIconSize,
            height: theme.inputIconSize
        }
    }) : text;
    return /*#__PURE__*/ _jsx("div", {
        style: {
            flexShrink: 0,
            fontSize: theme && theme.titleFont && theme.titleFont.fontSize ? theme.titleFont.fontSize : 15
        },
        children: /*#__PURE__*/ _jsx("button", {
            className: "__framer-search-clear-button",
            onClick: onClick,
            style: {
                fontFamily: "inherit",
                border: "none",
                background: "none",
                cursor: "pointer",
                display: "flex",
                textTransform: "uppercase",
                color: theme.inputIconColor,
                fontSize: "0.75em",
                padding: 0
            },
            children: iconOrText
        })
    });
}

function Divider({
    theme,
    type
}) {
    const styles = {
        background: theme.foregroundColor,
        height: 1,
        flexShrink: 0,
        opacity: .05
    };
    if (type === "contained" && theme) {
        styles.marginLeft = theme.horizontalSpacing;
        styles.marginRight = theme.horizontalSpacing;
    }
    return /*#__PURE__*/ _jsx("div", {
        style: styles
    });
}
export const Input = /*#__PURE__*/ forwardRef(function Input(props, ref) {
    const {
        value = "", status, autofocus, theme, placeholder, iconType, clearButtonType, onChange
    } = props;
    const [inputValue, setInputValue] = useState(value);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
    useImperativeHandle(ref, () => inputRef.current);
    React.useLayoutEffect(() => { // Runs on unmount, fixes a bug in Safari that scrolls to the bottom
        // of the page when the input unmounts.
        return () => {
            const inputElement = inputRef.current;
            if (!inputElement || inputElement !== document.activeElement) return;
            inputElement.blur();
        };
    }, []);
    const handleInputClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };
    const handleClearClick = () => {
        setInputValue("");
    };
    useEffect(() => {
        onChange(inputValue);
    }, [inputValue]);
    const hasInputText = inputValue.length > 0;
    const showClearButton = inputValue.length > 0 && clearButtonType && clearButtonType !== "none";
    const verticalSpacing = Math.floor(theme ? theme.horizontalSpacing * VERTICAL_SPACING_MULTIPLIER : 0);
    const searchIcon = iconType === "custom" && theme.inputIconImage ? /*#__PURE__*/ _jsx("img", {
        alt: "icon alongside the Site Search input",
        src: theme.inputIconImage.src,
        width: theme.inputIconSize,
        height: theme.inputIconSize
    }) : /*#__PURE__*/ _jsx(SearchIcon, {
        color: theme.inputIconColor,
        width: theme.inputIconSize,
        height: theme.inputIconSize
    });
    return /*#__PURE__*/ _jsxs("div", {
        role: "search",
        style: {
            ...inputContainerStyle,
            fontFamily: getFontFamily(theme),
            paddingLeft: theme && theme.horizontalSpacing,
            paddingRight: theme && theme.horizontalSpacing,
            gap: 12,
            paddingTop: verticalSpacing,
            paddingBottom: verticalSpacing,
            touchAction: "none"
        },
        onClick: handleInputClick,
        children: [ /*#__PURE__*/ _jsx("div", {
            style: {
                flexShrink: 0,
                display: "flex"
            },
            children: status === "loading" && inputValue ? /*#__PURE__*/ _jsx(SpinnerIcon, {
                color: theme.inputIconColor,
                backgroundColor: theme.backgroundColor,
                style: {
                    height: theme && theme.inputIconSize,
                    width: theme && theme.inputIconSize
                }
            }) : searchIcon
        }), /*#__PURE__*/ _jsx("input", {
            ref: inputRef,
            spellCheck: false,
            autoFocus: autofocus,
            style: {
                ...inputStyle,
                WebkitTapHighlightColor: "rgba(0,0,0,0)",
                color: theme.foregroundColor,
                lineHeight: "2em",
                verticalAlign: "baseline",
                ...theme.titleFont,
                ...theme.inputFont,
                fontSize: theme.inputFontSize, // @ts-ignore
                "--framer-search-placeholder-color": theme.placeholderColor
            },
            onFocus: () => {
                const scrollOffset = document.documentElement.scrollTop;
                document.documentElement.scrollTop = scrollOffset;
            },
            placeholder: placeholder,
            value: inputValue,
            onChange: () => setInputValue(inputRef.current.value)
        }), showClearButton && /*#__PURE__*/ _jsx(ClearButton, {
            theme: theme,
            type: props.clearButtonType,
            text: props.clearButtonText,
            onClick: handleClearClick
        })]
    });
});
const inputContainerStyle = {
    display: "inline-flex",
    alignItems: "center",
    flexShrink: 0
};
const inputStyle = {
    outline: "none",
    border: "none",
    background: "transparent",
    fontWeight: 500,
    height: "2em",
    padding: 0,
    width: "100%"
};
export const ResultRow = /*#__PURE__*/ React.memo( /*#__PURE__*/ React.forwardRef(function ResultRow(props, ref) {
    const {
        index,
        result,
        prevMousePositionRef,
        type = "contained",
        subtitleType = "path",
        selected = false,
        theme,
        localeSlug,
        style,
        onMouseMove,
        onPointerDown,
        onNavigateTo
    } = props;
    const {
        url,
        title,
        score
    } = result;
    const urlPath = useMemo(() => {
        if (!localeSlug) return url;
        return url.replace(`/${localeSlug}`, "");
    }, [url]);
    const handleMouseMove = useCallbackOnMouseMove(event => onMouseMove(event, index), prevMousePositionRef);
    const isContained = type === "contained";
    const borderRadius = isContained ? clamp(0, Infinity, theme.borderRadius - theme.spacing) : 0;
    const subtitleText = subtitleType === "path" ? urlPath : clampText(result.description, MAX_DESCRIPTION_LENGTH);
    const handleClick = event => {
        event.preventDefault();
        onNavigateTo(result.url);
    };
    const focusTrap = event => {
        event.preventDefault();
    };
    return /*#__PURE__*/ _jsx("a", {
        ref: ref,
        style: {
            textDecoration: "none"
        },
        href: result.url,
        onClick: handleClick,
        onMouseMove: handleMouseMove,
        onMouseDown: focusTrap,
        onPointerDown: event => onPointerDown(event, index),
        children: /*#__PURE__*/ _jsxs("li", {
            style: {
                ...resultContainer,
                ...style,
                paddingTop: isContained ? 12 : 16,
                paddingBottom: isContained ? 12 : 16,
                color: theme.foregroundColor,
                position: "relative",
                paddingLeft: theme && theme.horizontalSpacing,
                paddingRight: theme && theme.horizontalSpacing
            },
            children: [ /*#__PURE__*/ _jsx("div", {
                style: {
                    backgroundColor: theme.foregroundColor,
                    position: "absolute",
                    opacity: selected ? .06 : 0,
                    borderRadius,
                    left: theme && isContained ? theme.spacing : 0,
                    right: theme && isContained ? theme.spacing : 0,
                    top: 0,
                    bottom: 0
                }
            }), /*#__PURE__*/ _jsxs("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    gap: 4
                },
                children: [ /*#__PURE__*/ _jsx("h3", {
                    style: {
                        ...resultTitle,
                        ...theme.titleFont,
                        lineHeight: "1.4em"
                    },
                    children: title
                }), /*#__PURE__*/ _jsxs("p", {
                    style: {
                        margin: 0,
                        color: theme.subtitleColor,
                        ...theme.subtitleFont,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: "1.4em"
                    },
                    children: [localStorageDebugFlag ? score : "", " ", subtitleText]
                })]
            })]
        }, result.url)
    });
}));
/**
 * Flexible gap used inside a flexbox layout to push down the quick menu
 * by 20% of the screen height, but also allow it to collapse to zero if
 * there is not enough vertical room.
 */
function QuickMenuSpacer({
    onClick
}) {
    return /*#__PURE__*/ _jsx("div", {
        style: {
            width: "100%",
            flexBasis: "20vh"
        },
        onClick: onClick
    });
}
const layoutContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    overflow: "visible"
};

function LayoutContainer({
    layoutType,
    theme,
    onKeyDown,
    onDismiss,
    children,
    modalOptions
}) {
    const layoutStyles = getLayoutBaseStyles(layoutType, theme);
    const style = {
        ...layoutContainerStyle,
        ...layoutStyles,
        willChange: "transform",
        marginTop: layoutType === "FixedTop" ? theme.offsetTop : 0,
        height: layoutType === "Sidebar" ? "100%" : "auto",
        maxHeight: layoutType === "QuickMenu" ? "100%" : "none",
        justifyContent: layoutType === "Sidebar" ? "flex-end" : "flex-start",
        flexDirection: layoutType === "Sidebar" ? "column-reverse" : "column"
    };
    const innerStyle = {
        ...layoutContainerStyle,
        ...layoutStyles,
        height: layoutType === "Sidebar" ? "100%" : "auto",
        maxHeight: layoutType === "QuickMenu" ? "100%" : "none",
        gap: layoutType === "Sidebar" ? 0 : theme.gapBetweenStatusAndSearch,
        backgroundColor: layoutType === "Sidebar" ? theme.backgroundColor : "transparent",
        justifyContent: layoutType === "Sidebar" ? "flex-end" : "flex-start",
        flexDirection: layoutType === "Sidebar" ? "column-reverse" : "column",
        originX: .5,
        originY: .5
    };

    function getContainerAnimation() {
        switch (layoutType) {
            case "FixedTop": {
                const key = animationKeyFromLayout("FixedTop");
                const prop = modalOptions ? modalOptions[key] : undefined;
                if (prop) {
                    return prop;
                } else {
                    return {
                        y: -10,
                        opacity: .2,
                        transition: {
                            duration: Browser.isTouch() ? 0 : .15
                        }
                    };
                }
                break;
            }
            case "QuickMenu": {
                const key = animationKeyFromLayout("QuickMenu");
                const prop = modalOptions ? modalOptions[key] : undefined;
                if (prop) {
                    return prop;
                } else {
                    return {
                        scale: .95,
                        opacity: 0,
                        y: 0,
                        x: 0,
                        rotate: 0,
                        transition: {
                            type: "spring",
                            stiffness: 600,
                            damping: 40
                        }
                    };
                }
                break;
            }
            case "Sidebar": {
                const key = animationKeyFromLayout("Sidebar");
                const prop = modalOptions ? modalOptions[key] : undefined;
                if (prop) {
                    return prop;
                } else {
                    return {
                        x: -10,
                        opacity: 0,
                        transition: {
                            duration: .15
                        }
                    };
                }
                break;
            }
        }
    }
    const containerAnimation = getContainerAnimation();
    return /*#__PURE__*/ _jsxs("div", {
        style: style,
        onKeyDown: onKeyDown,
        onClick: event => event.stopPropagation(),
        children: [layoutType === "QuickMenu" && /*#__PURE__*/ _jsx(QuickMenuSpacer, {
            onClick: onDismiss
        }), /*#__PURE__*/ _jsx(motion.div, {
            initial: containerAnimation,
            animate: {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                rotate: 0
            },
            transition: containerAnimation ? containerAnimation.transition : undefined,
            exit: {
                opacity: 0,
                transition: {
                    duration: 0
                }
            },
            style: innerStyle,
            children: children
        })]
    });
}

function ModalContainer({
    layoutType,
    theme,
    children,
    heightIsStatic,
    heightTransition,
    heightDeps
}) {
    const style = { // This `willChange` is required to avoid weird rendering issues where
        // parts of the search window won't redraw, which we observed in Safari 16.4.
        willChange: "transform",
        backgroundColor: theme.backgroundColor,
        color: theme.foregroundColor,
        borderRadius: layoutType === "QuickMenu" ? theme.borderRadius : 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: layoutType !== "Sidebar" ? theme.shadow : undefined,
        maxHeight: layoutType === "QuickMenu" ? `min(${MODAL_MAX_HEIGHT}px, calc(100vh - 30px))` : undefined
    }; // Opt-in Height Animations for the Search Quick Actions menu.
    // These are disabled by default, but can be enabled via props.
    const [scope, animate] = useAnimate();
    useLayoutEffect(() => {
        if (layoutType !== "QuickMenu" || heightIsStatic) return;
        const prevHeight = scope.current.offsetHeight;
        scope.current.style.height = "auto";
        const height = scope.current.offsetHeight;
        scope.current.style.height = prevHeight + "px";
        animate(scope.current, {
            height: [prevHeight, height]
        }, heightTransition);
    }, heightDeps);
    return /*#__PURE__*/ _jsx("div", {
        ref: scope,
        role: "dialog",
        className: layoutType === "FixedTop" ? "__framer-max-height-80dvh" : undefined,
        style: style,
        children: children
    });
}
const ScrollView = /*#__PURE__*/ React.forwardRef(function ScrollView({
    theme,
    children
}, ref) {
    const isTouch = Browser.isTouch();
    const [canScroll, setCanScroll] = React.useState(true);
    React.useEffect(() => {
        if (!isTouch) return;
        const element = ref.current;
        if (!element) return;
        setCanScroll(element.scrollHeight > element.clientHeight);
    });
    return /*#__PURE__*/ _jsx("div", {
        ref: ref,
        style: {
            width: `calc(100% + ${theme.scrollBarWidth}px)`,
            overflowY: "scroll",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            touchAction: canScroll ? undefined : "none", // Make the list appear slightly under the divider
            // so that the divider is still visible when the first
            // item is selected.
            marginTop: -1
        },
        children: children
    });
});
const statusStyle = {
    backgroundColor: "#B5B5B5",
    color: "#FFF",
    boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.25)",
    fontFamily: "inherit",
    textAlign: "center",
    fontSize: 13,
    padding: "8px 0"
};

function StatusMessage({
    status,
    layoutType,
    theme
}) {
    const verticalSpacing = Math.floor(theme ? theme.horizontalSpacing * VERTICAL_SPACING_MULTIPLIER : 0);
    const style = {
        ...statusStyle,
        userSelect: "none",
        fontFamily: getFontFamily(theme),
        paddingLeft: theme && theme.horizontalSpacing,
        paddingRight: theme && theme.horizontalSpacing,
        fontWeight: 500,
        lineHeight: `calc(${theme.inputFontSize} * 2)`,
        paddingTop: verticalSpacing,
        paddingBottom: verticalSpacing,
        ...theme.titleFont,
        zIndex: theme.zIndex + 1,
        maxWidth: layoutType === "FixedTop" ? "none" : theme.width,
        width: layoutType === "FixedTop" ? `calc(100% - ${verticalSpacing * 2}px` : "100%",
        boxShadow: layoutType !== "Sidebar" && statusStyle.boxShadow,
        borderRadius: layoutType !== "Sidebar" && theme.borderRadius
    }; // Show less text on fixed text to look nicer on mobile
    const previewInfoText = layoutType === "FixedTop" ? "Preview Mode" : "Preview Mode. Publish your Site to Search.";
    if (status === "no-meta-tag-found") {
        return /*#__PURE__*/ _jsx("div", {
            style: style,
            children: previewInfoText
        });
    }
    if (status === "pending-index-generation") {
        return /*#__PURE__*/ _jsx("div", {
            style: style,
            children: "Site is being indexed"
        });
    }
    return null;
}
const resultTitle = {
    textOverflow: "ellipsis",
    maxWidth: "100%",
    overflow: "hidden",
    fontWeight: 500,
    whiteSpace: "nowrap",
    flex: 1,
    margin: 0
};
const resultContainer = {
    padding: "16px 20px",
    listStyle: "none",
    fontWeight: 500
};
const sidebarStyles = {
    left: 0,
    width: 500
};
const fixedTopStyles = {
    top: 0,
    width: "100%"
};
const quickMenuStyles = {
    width: 500
};

function getLayoutBaseStyles(layoutOption, theme) {
    switch (layoutOption) {
        case "Sidebar":
            return {
                ...sidebarStyles, width: theme.width
            };
        case "FixedTop":
            return fixedTopStyles;
        case "QuickMenu":
            return {
                ...quickMenuStyles, width: theme.width
            };
    }
}
export var SearchInputClearButtonType;
(function (SearchInputClearButtonType) {
    SearchInputClearButtonType["Icon"] = "icon";
    SearchInputClearButtonType["Text"] = "text";
    SearchInputClearButtonType["None"] = "none";
})(SearchInputClearButtonType || (SearchInputClearButtonType = {}));
export var SearchInputDividerType;
(function (SearchInputDividerType) {
    SearchInputDividerType["None"] = "none";
    SearchInputDividerType["FullWidth"] = "fullWidth";
    SearchInputDividerType["Contained"] = "contained";
})(SearchInputDividerType || (SearchInputDividerType = {}));
export var SearchResultTitleType;
(function (SearchResultTitleType) {
    SearchResultTitleType["H1"] = "h1";
    SearchResultTitleType["Title"] = "title";
})(SearchResultTitleType || (SearchResultTitleType = {}));
export var SearchResultSubtitleType;
(function (SearchResultSubtitleType) {
    SearchResultSubtitleType["Description"] = "description";
    SearchResultSubtitleType["Path"] = "path";
})(SearchResultSubtitleType || (SearchResultSubtitleType = {}));
export var SearchResultItemType;
(function (SearchResultItemType) {
    SearchResultItemType["FullWidth"] = "fullWidth";
    SearchResultItemType["Contained"] = "contained";
})(SearchResultItemType || (SearchResultItemType = {}));
export var SearchLayoutType;
(function (SearchLayoutType) {
    SearchLayoutType["Sidebar"] = "Sidebar";
    SearchLayoutType["FixedTop"] = "FixedTop";
    SearchLayoutType["QuickMenu"] = "QuickMenu";
})(SearchLayoutType || (SearchLayoutType = {}));
export var SearchEntryType;
(function (SearchEntryType) {
    SearchEntryType["Icon"] = "icon";
    SearchEntryType["Text"] = "text";
})(SearchEntryType || (SearchEntryType = {}));
export var SearchIconType;
(function (SearchIconType) {
    SearchIconType["Default"] = "default";
    SearchIconType["Custom"] = "custom";
})(SearchIconType || (SearchIconType = {}));
/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export function SearchModal(props) {
    const {
        layoutType,
        theme,
        urlScope,
        inputOptions,
        backdropOptions,
        modalOptions,
        resultOptions,
        onDismiss
    } = props;
    const {
        activeLocale
    } = useLocaleInfo();
    const localeId = activeLocale === null || activeLocale === void 0 ? void 0 : activeLocale.id;
    const localeSlug = activeLocale === null || activeLocale === void 0 ? void 0 : activeLocale.slug;
    const input = useRef();
    const selectedResultRow = useRef();
    const scrollView = useRef();
    const [selected, setSelected] = useState({
        index: 0,
        scroll: true
    });
    const prevMousePositionRef = useRef(null);
    const [isKeyboardNavigationDisabled, setIsKeyboardNavigationDisabled] = useState(Browser.isTouch);
    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const {
        results,
        status
    } = useSearch(deferredQuery, localeId, {
        minimumScore: 0,
        urlScope,
        titleType: resultOptions.titleType
    });
    const selectedResult = results[selected.index];
    const verticalSpacing = Math.floor(theme ? theme.horizontalSpacing * VERTICAL_SPACING_MULTIPLIER : 0);
    useEffect(() => { // Reset the selection to the top if the query changes.
        setSelected({
            index: 0,
            scroll: true
        });
    }, [deferredQuery]);
    const handleResultRowPointerDown = useCallback((event, index) => {
        if (event.pointerType !== "touch") return;
        setIsKeyboardNavigationDisabled(true);
        setSelected({
            index,
            scroll: false
        });
    }, []);
    const handleResultRowMouseMove = useCallback((event, index) => {
        setSelected(previousSelected => {
            if (previousSelected.index === index) {
                return previousSelected;
            }
            return {
                index,
                scroll: false
            };
        });
    }, []);
    const navigateTo = useCallback(url => {
        if (status === "no-meta-tag-found") {
            return;
        }
        window.location.href = url;
    }, [status]);
    const handleKeyDown = event => {
        const maxIndex = results.length - 1;
        switch (event.code) {
            case "ArrowUp":
                event.preventDefault();
                if (isKeyboardNavigationDisabled) {
                    setIsKeyboardNavigationDisabled(false);
                    break;
                }
                setSelected(previousSelected => ({
                    index: clamp(0, maxIndex, previousSelected.index - 1),
                    scroll: true
                }));
                break;
            case "ArrowDown":
                event.preventDefault();
                if (isKeyboardNavigationDisabled) {
                    setIsKeyboardNavigationDisabled(false);
                    break;
                }
                setSelected(previousSelected => ({
                    index: clamp(0, maxIndex, previousSelected.index + 1),
                    scroll: true
                }));
                break;
            case "Escape":
                break;
            case "Enter":
                if (selectedResult) {
                    navigateTo(selectedResult.url);
                }
                break;
            default:
                event.stopPropagation();
        }
    };
    const showNoResults = results.length === 0 && deferredQuery.length > 1 && status !== "loading";
    const showDivider = Boolean((deferredQuery.length > 0 && results.length > 0 || showNoResults) && status !== "loading" && props.inputOptions && props.inputOptions.dividerType !== "none");
    const isItemContained = Boolean(props.resultOptions && props.resultOptions.itemType === "contained");
    const spacing = isItemContained ? theme.spacing : 10;
    const listPaddingTop = showDivider && isItemContained ? spacing + theme.gapBetweenResults * 2 : 0;
    useEffect(() => {
        if (!selected.scroll) return;
        const element = selectedResultRow.current;
        if (!element) return;
        scrollIntoView(element, scrollView.current, {
            offsetTop: showDivider && isItemContained ? listPaddingTop : 0,
            offsetBottom: isItemContained ? spacing : 0
        }); // `showDivider` and `isItemContained` are not dependencies because
        // they will be the latest values when `selected` changes. And including
        // them will cause unnecessary scrolling into view.
    }, [selected]);
    return /*#__PURE__*/ _jsxs(LayoutContainer, {
        layoutType: layoutType,
        modalOptions: modalOptions,
        theme: theme,
        onKeyDown: handleKeyDown,
        onDismiss: onDismiss,
        children: [ /*#__PURE__*/ _jsxs(ModalContainer, {
            layoutType: layoutType,
            theme: theme,
            heightIsStatic: modalOptions.heightIsStatic,
            heightTransition: modalOptions.heightTransition,
            heightDeps: [results.length, showNoResults],
            children: [ /*#__PURE__*/ _jsx(Input, {
                autofocus: true,
                ref: input,
                onChange: setQuery,
                value: query,
                theme: theme,
                status: status,
                iconType: inputOptions.iconOptions.iconType,
                placeholder: inputOptions.placeholderOptions.placeholderText,
                clearButtonType: inputOptions ? inputOptions.clearButtonType : undefined,
                clearButtonText: inputOptions.clearButtonText
            }), showDivider && /*#__PURE__*/ _jsx(Divider, {
                theme: theme,
                type: inputOptions.dividerType
            }), /*#__PURE__*/ _jsx(ScrollView, {
                ref: scrollView,
                theme: theme,
                children: /*#__PURE__*/ _jsxs("ul", {
                    "aria-live": "polite",
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        width: `calc(100% - ${theme.scrollBarWidth}px)`,
                        padding: 0,
                        paddingTop: listPaddingTop,
                        paddingBottom: results.length && isItemContained ? spacing : 0,
                        gap: theme.gapBetweenResults,
                        margin: 0
                    },
                    children: [results.map((result, index) => {
                        const isSelected = index === selected.index;
                        return /*#__PURE__*/ _jsx(ResultRow, {
                            ref: isSelected ? selectedResultRow : null,
                            index: index,
                            result: result,
                            prevMousePositionRef: prevMousePositionRef,
                            selected: !isKeyboardNavigationDisabled && isSelected,
                            type: props.resultOptions.itemType,
                            subtitleType: props.resultOptions.subtitleOptions.subtitleType,
                            theme: theme,
                            localeSlug: localeSlug,
                            onMouseMove: handleResultRowMouseMove,
                            onPointerDown: handleResultRowPointerDown,
                            onNavigateTo: navigateTo
                        }, result.url);
                    }), showNoResults && /*#__PURE__*/ _jsx("li", {
                        style: {
                            paddingTop: verticalSpacing - listPaddingTop,
                            paddingBottom: verticalSpacing,
                            lineHeight: "2em",
                            paddingLeft: theme && theme.horizontalSpacing,
                            paddingRight: theme && theme.horizontalSpacing,
                            height: "Sidebar" ? "100%" : "auto"
                        },
                        children: /*#__PURE__*/ _jsx("h3", {
                            style: {
                                ...resultTitle,
                                textAlign: "center",
                                lineHeight: `calc(${theme.inputFontSize} * 2)`,
                                color: theme.subtitleColor,
                                ...theme.titleFont
                            },
                            children: "No results"
                        })
                    })]
                })
            })]
        }), /*#__PURE__*/ _jsx(StatusMessage, {
            status: status,
            layoutType: layoutType,
            theme: theme
        })]
    });
}
export const __FramerMetadata__ = {
    "exports": {
        "Input": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchModal": {
            "type": "reactComponent",
            "name": "SearchModal",
            "slots": [],
            "annotations": {
                "framerContractVersion": "1",
                "framerSupportedLayoutHeight": "fixed",
                "framerSupportedLayoutWidth": "fixed"
            }
        },
        "SearchResultTitleType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchEntryType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchProps": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchLayoutType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchInputClearButtonType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchResultItemType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchInputDividerType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchTheme": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchIconType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "SearchResultSubtitleType": {
            "type": "tsType",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "ResultRow": {
            "type": "variable",
            "annotations": {
                "framerContractVersion": "1"
            }
        },
        "__FramerMetadata__": {
            "type": "variable"
        }
    }
}