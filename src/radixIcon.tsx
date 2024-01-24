import React, { useEffect, useState, ReactElement } from "react";

type IconComponentType = React.ComponentType;

interface RadixIconPrefabProps {
    name: string;
}

export function RadixIconPrefab({ name }: RadixIconPrefabProps) {
    const [SelectedIcon, setSelectedIcon] = useState<IconComponentType | null>(null);

    async function importIcon() {
        try {
            const module = await import('@radix-ui/react-icons');
            const IconComponent = (module as any)[name];
            if (IconComponent) {
                setSelectedIcon(() => IconComponent);
            } else {
                console.error("Icon not found:", name);
                setSelectedIcon(null);
            }
        } catch (e) {
            console.error(e);
            setSelectedIcon(null);
        }
    }

    useEffect(() => {
        importIcon();
    }, [name]);

    return (
        <span>{SelectedIcon ? React.createElement(SelectedIcon) : null}</span>
    );
}
