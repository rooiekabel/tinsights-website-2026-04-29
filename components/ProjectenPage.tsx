"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ProjectData = {
  id: string;
  title: string;
  description: string;
  url: string;
  tag: string;
  images: [string, string, string];
  bg: string;
  accent: string;
};

type Props = {
  projects: ProjectData[];
};

gsap.registerPlugin(ScrollTrigger);

export default function ProjectenPage({ projects }: Props) {
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
  });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 769px)");
    if (!media.matches) return;

    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        const textSide = section.querySelector<HTMLElement>("[data-project-text]");
        const visualSide = section.querySelector<HTMLElement>("[data-project-visual]");
        if (!textSide || !visualSide) return;
        const textX = index % 2 === 0 ? -40 : 40;
        const visualX = index % 2 === 0 ? 40 : -40;

        gsap.fromTo(
          textSide,
          { opacity: 0, x: textX },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );
        gsap.fromTo(
          visualSide,
          { opacity: 0, x: visualX },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [projects]);

  const safeProjects = useMemo(() => projects, [projects]);

  return (
    <section className="projecten-page">
      <header className="projecten-header">
        <p className="projecten-eyebrow">PORTFOLIO</p>
        <h1 className="projecten-title">Onze projecten</h1>
        <p className="projecten-subtitle">Elk project gebouwd met aandacht voor detail, snelheid en resultaat.</p>
      </header>

      <div className="desktop-projects">
        {safeProjects.map((project, index) => {
          const reverse = index % 2 === 1;
          return (
            <div
              key={project.id}
              className="project-row"
              ref={(node) => {
                sectionRefs.current[index] = node;
              }}
              style={{ direction: reverse ? "rtl" : "ltr" }}
            >
              <div className="project-text" style={{ direction: "ltr" }} data-project-text>
                <span className="project-tag">{project.tag}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <a href={project.url} target="_blank" rel="noreferrer">
                  Bekijk live demo <span aria-hidden>→</span>
                </a>
              </div>
              <div className="project-visual" data-project-visual style={{ direction: "ltr", background: project.bg }}>
                <div className="project-glow" style={{ background: `radial-gradient(ellipse, ${project.accent}30 0%, transparent 70%)` }} />
                <Image src={project.images[1]} alt={`${project.title} desktop mockup`} width={960} height={580} className="mockup-desktop" priority={index === 0} />
                <Image src={project.images[0]} alt={`${project.title} mobile mockup`} width={260} height={560} className="mockup-mobile" />
                <Image src={project.images[2]} alt={`${project.title} tablet mockup`} width={420} height={360} className="mockup-tablet" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mobile-carousel">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {safeProjects.map((project) => (
              <article key={project.id} className="embla__slide" style={{ background: project.bg }}>
                <div className="mobile-visual">
                  <Image src={project.images[1]} alt={`${project.title} desktop mockup`} width={900} height={560} className="mobile-main" />
                </div>
                <div className="mobile-content">
                  <span className="project-tag">{project.tag}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    Bekijk project →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="embla__dots" aria-label="Project carousel navigatie">
          {safeProjects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`embla__dot ${activeIndex === index ? "is-active" : ""}`}
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Ga naar ${project.title}`}
            />
          ))}
        </div>
      </div>

      <section className="projecten-cta">
        <h2>Jouw project als volgende?</h2>
        <p>We bouwen websites die werken en gevonden worden.</p>
        <Link href="/contact" className="projecten-cta-button">
          Plan een gratis gesprek
        </Link>
      </section>
    </section>
  );
}
