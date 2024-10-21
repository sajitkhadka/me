"use client";

import { X } from "lucide-react";
import * as React from "react";

import clsx from "clsx";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Label } from "@/components/ui/label";

export type DataItem = Record<"value" | "label", string>;

export function MultiSelect({
    label,
    placeholder = "Select an item",
    parentClassName,
    data = [],
    shownItems = 5,
    onChange,
    inputValue,
    onInputValueChange,
    selected,
    onSelectedChange,
}: {
    label?: string;
    placeholder?: string;
    parentClassName?: string;
    data: DataItem[];
    shownItems?: number;
    onChange: (data: string[]) => void;
    inputValue: string;
    onInputValueChange: (value: string) => void;
    selected: DataItem[];
    onSelectedChange: (items: DataItem[]) => void;
}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);

    const handleUnselect = (item: DataItem) => {
        onSelectedChange(selected.filter((s) => s.value !== item.value));
    };

    const handleCreateNewItem = () => {
        if (inputValue.trim() !== "") {
            const newItem: DataItem = {
                value: inputValue.toLowerCase().replace(/\s+/g, '-'),
                label: inputValue.trim()
            };
            onSelectedChange([...selected, newItem]);
            onInputValueChange("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "") {
                    onSelectedChange(selected.slice(0, -1));
                }
            }
            if (e.key === "Escape") {
                input.blur();
            }
            if (e.key === "Enter" && input.value.trim() !== "") {
                e.preventDefault();
                handleCreateNewItem();
            }
        }
    };

    React.useEffect(() => {
        onChange(selected.map((s) => s.label));
    }, [selected, onChange]);

    const selectables = data.filter((item) => !selected.includes(item) && item.label.toLowerCase().includes(inputValue.toLowerCase()));

    return (
        <div className={clsx(label && "gap-1.5", parentClassName, "grid w-full items-center")}>
            {label && (
                <Label className="text-[#344054] text-sm font-medium">{label}</Label>
            )}
            <CommandPrimitive onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
                <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex gap-1 flex-wrap">
                        {selected.map((item, index) => {
                            if (index > shownItems) return null;
                            return (
                                <Badge key={item.value} variant="secondary">
                                    {item.label}
                                    <button
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(item);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={() => handleUnselect(item)}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            );
                        })}
                        {selected.length > shownItems && <p>{`+${selected.length - shownItems} more`}</p>}
                        <CommandList>
                            <CommandPrimitive.Input
                                ref={inputRef}
                                value={inputValue}
                                onValueChange={onInputValueChange}
                                onBlur={() => setOpen(false)}
                                onFocus={() => setOpen(true)}
                                placeholder={placeholder}
                                className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                            />
                        </CommandList>
                    </div>
                </div>
                <div className="relative mt-2">
                    {open && selectables.length > 0 ? (
                        <div className="absolute w-full top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                                <CommandList>
                                    {selectables.map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                onInputValueChange("");
                                                onSelectedChange([...selected, framework]);
                                            }}
                                        >
                                            {framework.label}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </div>
                    ) : open && selectables.length === 0 && inputValue.trim() !== "" ? (
                        <div className="absolute w-full top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in p-2">
                            <p className="text-muted-foreground">No results found. Press Enter to create a new item.</p>
                        </div>
                    ) : null}
                </div>
            </CommandPrimitive>
        </div>
    );
}