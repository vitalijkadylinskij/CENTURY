type HeaderProps = {
  className?: string;
};

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header
      className={`relative z-10 flex items-center justify-end px-5 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-7 ${className}`.trim()}
    >
      <button
        type="button"
        className="h-12 w-[136px] cursor-pointer rounded-full border border-[rgba(172,172,172,0.3)] bg-black px-5 text-center text-[12px] font-semibold leading-[1] tracking-[0] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition [font-family:var(--font-montserrat)]"
      >
        КНОПКА
      </button>
    </header>
  );
}
