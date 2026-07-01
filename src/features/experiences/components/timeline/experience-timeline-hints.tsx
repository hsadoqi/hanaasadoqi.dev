export const ExperienceMobileScrollHint = () => {
  return (
    <div className="mb-6 flex flex-col items-center gap-2 sm:hidden">
      <div className="text-subtle-content text-xs motion-safe:animate-bounce">
        Scroll left and right
      </div>
      <div className="text-faded-content text-center text-[11px]">
        Or use arrow keys • Home/End to jump
      </div>
    </div>
  );
};

export const ExperienceKeyboardShortcutsHint = () => {
  return (
    <div className="mb-6 hidden justify-center sm:flex">
      <div className="text-faded-content text-center text-xs">
        Keyboard: ← → (arrow keys) • Home/End to jump to first/last
      </div>
    </div>
  );
};
