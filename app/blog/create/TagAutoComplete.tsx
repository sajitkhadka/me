import { useState } from 'react';

interface Option {
    id: number;
    label: string;
}

const SearchOptions = () => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Option | null>(null);

    const options: Option[] = [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const foundOption = options.find(option => option.label.toLowerCase() === query.toLowerCase());
            if (foundOption) {
                setSelected(foundOption);
            }
            setQuery('');
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border p-2 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type and hit enter to select"
            />
            {selected && (
                <div className="text-center">
                    <p className="text-lg text-green-500">Selected: {selected.label}</p>
                </div>
            )}
        </div>
    );
};

export default SearchOptions;
