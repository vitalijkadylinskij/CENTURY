import Header from "@/components/Header";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col">
      <Header className="lg:px-16 lg:pb-4 lg:pt-4" />

      <div className="h-px w-full bg-[var(--color-line)]" />

      <div className="hero-grid flex flex-1 flex-col justify-between px-5 pb-10 pt-8 sm:px-8 sm:pb-12 sm:pt-10 lg:px-22 lg:pb-14 lg:pt-10">
        <div className="flex justify-end">
          <h1 className="max-w-[604px] text-[60px] font-normal uppercase leading-[1] tracking-[0.02em] [font-family:var(--font-lato)]">
            Бизнес будущего
          </h1>
        </div>

        <div className="pt-16 sm:pt-24 lg:pt-32">
          <p className="select-none pl-[clamp(0rem,7vw,8rem)] text-[180px] font-[600] uppercase leading-[1] tracking-[0] [font-family:var(--font-lato)]">
            Century
          </p>
        </div>
      </div>
    </section>
  );
}
