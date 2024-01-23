import * as Accordion from "@radix-ui/react-accordion"
import { styled, css } from "@stitches/react"
import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion } from "framer-motion"
import { cloneDeep } from 'lodash';
/**
 * These annotations control how your component sizes
 * Learn more: https://www.framer.com/developers/#code-components-auto-sizing
 *
 * @framerSupportedLayoutWidth 200
 * @framerSupportedLayoutHeight 100
 */
export function AccordionPrefab({ useFramer, items, trigger, content, style }) {
    const [newProps, setNewProps] = useState([]);
    function findPrefabProperty(obj, titleToFind) {
        for (let key in obj) {
            const title = obj[key]?.title
            if (title && title.toLowerCase() === titleToFind.toLowerCase()) {
                return key
            }

            if (typeof obj[key] === "object" && obj[key] !== null) {
                const result = findPrefabProperty(obj[key], titleToFind)
                if (result) return result
            }
        }
        return null
    }

    useEffect(() => {
        const _UpdatedProps = [];
        const titleToFind = "$-header";
        let headerProp = "";

        if (trigger && trigger[0]) {
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                // Clone newProps for each item
                let newProps = cloneDeep(trigger[0].props)
                // Assign Header Prop if one does not exist.
                if (newProps.children?.type?.propertyControls) {
                    // Looks for header property name
                    headerProp = findPrefabProperty(
                        newProps.children.type.propertyControls,
                        titleToFind
                    );
                    // Only if a header prop was found
                    if (headerProp) {
                        newProps.children.key = i;
                        newProps.children.props[`${headerProp}`] = item.header;
                    }
                }
                _UpdatedProps.push(newProps);
            }
        }
        setNewProps(_UpdatedProps);
    }, [items, trigger, content, simple]);

    const basicStyle = css({ width: 300, height: 60 })
    //For Simple Accordion Items
    const SimpleAccordionItems = () => {
        if (items.length == 0) {
            return <p>🪗 Add a accordion Item</p>
        }
        return items.map((item, i) => (
            <Accordion.Item
                className={css({ padding: 0, margin: 0 })}
                value={`item-${i}`}
                key={i}
            >
                <Accordion.Header className={css({ padding: 0, margin: 0 })}>
                    <Accordion.Trigger className={basicStyle()}>
                        {item.header}
                    </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>{item.content}</Accordion.Content>
            </Accordion.Item>
        ))
    }

    return (
        <Accordion.Root
            style={{ ...style }}
            className={css({ padding: 0, margin: 0, "& h3": { margin: 0 } })}
            collapsible
        >
            {useFramer &&
                newProps.map((_prop, i) => {
                    return (<Accordion.Item
                        className={css({ padding: 0, margin: 0 })}
                        value={`item-${i}`}
                        key={i}
                    >
                        <Accordion.Header className={css({ padding: 0, margin: 0 })}>
                            <Accordion.Trigger className={basicStyle()}>
                                {React.cloneElement(trigger[0], {
                                    ..._prop,
                                    style: { width: "100%" },
                                    className: ""
                                })}
                            </Accordion.Trigger>
                        </Accordion.Header>
                        <Accordion.Content>Content goes here</Accordion.Content>
                    </Accordion.Item>)
                })
            }
            {!useFramer &&
                <SimpleAccordionItems />
            }
        </Accordion.Root>
    )
}


