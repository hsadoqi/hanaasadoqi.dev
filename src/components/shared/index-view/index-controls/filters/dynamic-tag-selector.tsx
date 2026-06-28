'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type TagSelectorProps = {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
};

export function DynamicTagSelector({
  allTags,
  selectedTags,
  onTagsChange,
  placeholder = 'Search and select tags...',
  maxTags = 10,
}: TagSelectorProps) {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter available tags based on input
  const filteredTags = allTags.filter(
    (tag) =>
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && e.key !== 'ArrowDown') return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        setHighlightedIndex((prev) =>
          prev < filteredTags.length - 1 ? prev + 1 : prev,
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;

      case 'Enter':
        e.preventDefault();
        if (filteredTags[highlightedIndex]) {
          addTag(filteredTags[highlightedIndex]);
        }
        break;

      case 'Escape':
        setIsOpen(false);
        break;

      case 'Backspace':
        if (!inputValue && selectedTags.length > 0) {
          removeTag(selectedTags[selectedTags.length - 1]);
        }
        break;
    }
  };

  const addTag = (tag: string) => {
    if (selectedTags.length < maxTags && !selectedTags.includes(tag)) {
      onTagsChange([...selectedTags, tag]);
      setInputValue('');
      setHighlightedIndex(0);
      inputRef.current?.focus();
    }
  };

  const removeTag = (tag: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="relative">
        {/* Input wrapper with selected tags display */}
        <div
          className={cn(
            'border-border/40 bg-background/40 flex flex-wrap items-center gap-2 rounded-lg border p-3 backdrop-blur-sm',
            'focus-within:border-border/60 focus-within:shadow-elevation-1 motion-safe:transition-all motion-safe:duration-200',
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Selected tags */}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className={cn(
                'flex items-center gap-2 rounded-full px-3 py-1',
                'bg-border/20 text-foreground text-sm font-medium',
                'hover:bg-border/30 motion-safe:transition-colors motion-safe:duration-150',
              )}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="text-foreground/60 hover:text-foreground hover:bg-border/40 flex size-4 items-center justify-center rounded p-0"
                aria-label={`Remove ${tag}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setIsOpen(true);
              setHighlightedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedTags.length === 0 ? placeholder : ''}
            className={cn(
              'text-foreground placeholder-secondary-content min-w-[120px] flex-1 bg-transparent text-sm outline-none',
              selectedTags.length >= maxTags
                ? 'cursor-not-allowed opacity-50'
                : '',
            )}
            disabled={selectedTags.length >= maxTags}
          />

          {/* Chevron icon */}
          <ChevronDown
            size={16}
            className={cn(
              'text-secondary-content pointer-events-none flex-shrink-0 motion-safe:transition-transform motion-safe:duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && filteredTags.length > 0 && (
          <div
            className={cn(
              'border-border/40 absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border',
              'bg-background/95 shadow-elevation-2 backdrop-blur-sm',
              'overflow-hidden',
            )}
          >
            <ul className="max-h-64 overflow-y-auto">
              {filteredTags.map((tag, index) => (
                <li key={tag}>
                  <button
                    type="button"
                    onClick={() => addTag(tag)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={cn(
                      'w-full px-4 py-3 text-left text-sm font-medium',
                      'motion-safe:transition-colors motion-safe:duration-150',
                      index === highlightedIndex
                        ? 'bg-border/20 text-foreground'
                        : 'text-secondary-content hover:bg-border/10 hover:text-foreground',
                    )}
                  >
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty state message */}
        {isOpen && filteredTags.length === 0 && inputValue && (
          <div className="border-border/40 bg-background/95 shadow-elevation-2 text-secondary-content absolute top-full right-0 left-0 z-50 mt-2 rounded-lg border p-4 text-center text-sm backdrop-blur-sm">
            No tags found matching {inputValue}
          </div>
        )}
      </div>

      {/* Helper text */}
      {selectedTags.length > 0 && (
        <p className="text-tertiary-content mt-2 text-xs">
          {selectedTags.length} / {maxTags} tags selected
        </p>
      )}
    </div>
  );
}
