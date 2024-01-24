import { useEffect, useState } from "react"

export function RadixIconPrefab(props) {
    const [SelectedIcon, setSelectedIcon] = useState(null);

    async function importIcon(iconName: any) {
        try {
            const module = await import('@radix-ui/react-icons');
            const IconComponent = module[`${iconName}`];
            setSelectedIcon(() => IconComponent);
        } catch (e) {
            console.error(e);
            setSelectedIcon(null);
        }
    }

    useEffect(() => {
        importIcon("BoxIcon"); // Use the correct icon name here
    }, []);

    return (
        <span>{SelectedIcon ? <SelectedIcon /> : null}</span>
    );
}