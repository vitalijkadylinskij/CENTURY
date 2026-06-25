"use client";

import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";

import Header from "@/components/Header";

const slides = [
  {
    step: "01",
    title: "Сквозная аналитика",
    lead: "Сводим данные о клиентах из всех источников в один прозрачный профиль.",
    body: "Как общаются, как платят, что пишут в поддержку, как ведут себя в цифровом пространстве: все в одном профиле. Бизнес видит, где узкие места в воронке, что оптимизировать и какое решение принять на данных.",
    tags: ["ROI ПО КАНАЛАМ", "ТОЧКИ ОТТОКА", "РЕШЕНИЕ ПО БЮДЖЕТУ"],
    mediaSrc: "/analytics-preview.png",
  },
  {
    step: "02",
    title: "Умный маршрут лида",
    lead: "Показываем, как пользователь двигается между касаниями, заявкой и сделкой.",
    body: "Система связывает рекламные каналы, CRM, чаты и поведенческие события. Команда видит, на каком этапе теряются лиды и какие точки касания дают лучший вклад в конверсию.",
    tags: ["КАСАНИЯ", "КОНВЕРСИЯ", "СКВОЗНОЙ ПУТЬ"],
    mediaSrc: "/analytics-preview.png",
  },
  {
    step: "03",
    title: "Контроль воронки",
    lead: "Подсвечиваем узкие места и показываем, где процесс тормозит рост.",
    body: "Менеджер получает не просто цифры, а понятную картину по этапам воронки. Можно быстро увидеть накопление, провалы, зависшие статусы и определить, что именно мешает пройти дальше.",
    tags: ["ЭТАПЫ", "ПОТЕРИ", "ПРОБЛЕМНЫЕ ЗОНЫ"],
    mediaSrc: "/analytics-preview.png",
  },
  {
    step: "04",
    title: "Решения на данных",
    lead: "Все ключевые сигналы собираются в единый слой для быстрых управленческих решений.",
    body: "Вместо ручной сборки отчётов команда получает готовую опору для действий: перераспределить бюджет, усилить обработку входящих, изменить сценарий коммуникации или пересобрать сегменты.",
    tags: ["ИНСАЙТЫ", "БЮДЖЕТ", "ПРИОРИТЕТЫ"],
    mediaSrc: "/analytics-preview.png",
  },
  {
    step: "05",
    title: "Прогноз и масштаб",
    lead: "Платформа помогает не только читать прошлое, но и точнее планировать следующий шаг.",
    body: "Когда данные собраны в единую систему, становится проще прогнозировать загрузку, считать окупаемость каналов и масштабировать рабочие процессы без потери контроля над качеством.",
    tags: ["ПЛАНИРОВАНИЕ", "ОКУПАЕМОСТЬ", "МАСШТАБ"],
    mediaSrc: "/analytics-preview.png",
  },
] as const;

function Stepper({
  activeIndex,
  onStepClick,
}: {
  activeIndex: number;
  onStepClick: (index: number) => void;
}) {
  const progress = (activeIndex / (slides.length - 1)) * 100;

  return (
    <div className="relative mx-auto hidden w-full max-w-[1730px] lg:block">
      <div className="absolute left-[132px] right-[88px] top-[35px] h-px bg-[rgba(17,17,17,0.18)]" />
      <div
        className="absolute left-[132px] top-[35px] h-px bg-black transition-[width] duration-500 ease-out"
        style={{ width: `calc((100% - 220px) * ${progress / 100})` }}
      />

      <div className="flex items-start justify-between px-[86px]">
        {slides.map((slide, index) => {
          const isCompleted = index <= activeIndex;

          return (
            <div key={slide.step} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={`flex h-[72px] w-[72px] items-center justify-center rounded-full border text-[22px] leading-none transition-all duration-300 ${
                  isCompleted
                    ? "border-black bg-black text-white"
                    : "border-[rgba(17,17,17,0.35)] bg-white text-[rgba(17,17,17,0.4)]"
                }`}
              >
                {slide.step}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MediaFrame({
  src,
  alt,
  currentStep,
}: {
  src: string;
  alt: string;
  currentStep: string;
}) {
  return (
    <div className="h-full lg:pr-16">
      <div
        key={currentStep}
        className="media-fade-in relative h-full overflow-hidden rounded-[18px] border border-black bg-white shadow-[0_12px_30px_rgba(0,0,0,0.04)]"
      >
        <div className="relative h-full min-h-[540px] w-full bg-[#F7F7F7]">
          <Image src={src} alt={alt} fill className="object-cover object-center" />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.03))]" />

          <div className="absolute bottom-5 left-5 rounded-full border border-[rgba(17,17,17,0.1)] bg-white/90 px-4 py-2 text-[12px] text-[#5C5C5C] shadow-[0_8px_18px_rgba(0,0,0,0.06)]">
            {currentStep} / poster / future video
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(section.offsetHeight - viewportHeight, 1);
      const currentScrolled = Math.min(Math.max(-rect.top, 0), totalScrollable);

      const progress = currentScrolled / totalScrollable;
      const nextIndex = Math.min(
        slides.length - 1,
        Math.round(progress * (slides.length - 1)),
      );

      startTransition(() => {
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const totalScrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = index / (slides.length - 1);
    const targetTop = sectionTop + totalScrollable * progress;

    startTransition(() => {
      setActiveIndex(index);
    });

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  const activeSlide = slides[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${slides.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col">
        <Header className="lg:px-28 lg:pb-6 lg:pt-6" />

        <div className="h-px w-full bg-[var(--color-line)]" />

        <div className="hero-grid flex flex-1 flex-col px-5 pb-10 pt-6 sm:px-8 lg:px-0 lg:pb-16 lg:pt-6">
          <Stepper activeIndex={activeIndex} onStepClick={scrollToSlide} />

          <div className="mx-auto mt-8 grid w-full max-w-[1730px] flex-1 gap-12 lg:mt-24 lg:grid-cols-[520px_minmax(0,1fr)] lg:items-stretch lg:gap-24">
            <div className="flex flex-col pt-0 lg:pl-20">
              <div key={activeSlide.step} className="slide-fade-in">
                <h2 className="max-w-[430px] text-[56px] font-semibold uppercase leading-[1.02] tracking-[0] text-[#3028FF] sm:text-[72px]">
                  {activeSlide.title}
                </h2>

                <p className="mt-14 max-w-[470px] text-[40px] font-normal leading-[1.12] tracking-[0] text-black">
                  {activeSlide.lead}
                </p>

                <p className="mt-14 max-w-[495px] text-[24px] font-normal leading-[1.28] tracking-[0] text-[#4F4F4F]">
                  {activeSlide.body}
                </p>
              </div>

              <div
                key={`${activeSlide.step}-tags`}
                className="slide-fade-in mt-auto flex max-w-[520px] flex-wrap gap-4 pt-12"
              >
                {activeSlide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#3028FF] px-6 py-4 text-[18px] font-medium uppercase leading-none tracking-[0] text-[#3028FF]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <MediaFrame
              src={activeSlide.mediaSrc}
              alt={activeSlide.title}
              currentStep={activeSlide.step}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
