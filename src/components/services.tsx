"use client";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Cloud,
  Code2,
  Cpu,
  Layers3,
  PenTool,
  ShieldCheck,
  X,
} from "lucide-react";
import { services, type Service } from "@/lib/content";
import { ButtonLink, Eyebrow, SectionHeading } from "./ui";
const icons = {
  cpu: Cpu,
  code: Code2,
  layers: Layers3,
  pen: PenTool,
  shield: ShieldCheck,
  cloud: Cloud,
};
export function Services() {
  const [selected, setSelected] = useState<Service>(services[0]);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement>(null);
  const close = () => {
    dialog.current?.close();
    lastTrigger.current?.focus();
  };
  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeading
          number="02"
          label="Our expertise"
          copy="Thoughtful design. Serious engineering. One connected approach."
        >
          From possibility.
          <br />
          To powerful products.
        </SectionHeading>
        <div className="services-grid" data-stagger>
          {services.map((service, index) => {
            const Icon = icons[service.icon];
            return (
              <article
                className="service-card"
                key={service.id}
                data-reveal
                onPointerMove={(event) => {
                  const box = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty(
                    "--pointer-x",
                    `${event.clientX - box.left}px`,
                  );
                  event.currentTarget.style.setProperty(
                    "--pointer-y",
                    `${event.clientY - box.top}px`,
                  );
                }}
              >
                <div className="service-top">
                  <Icon size={31} strokeWidth={1.35} aria-hidden="true" />
                  <span className="mono">0{index + 1}</span>
                </div>
                <h3>
                  <button
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      lastTrigger.current = event.currentTarget;
                      setSelected(service);
                      dialog.current?.showModal();
                    }}
                  >
                    {service.title}
                    <ArrowUpRight
                      className="service-arrow"
                      size={22}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
        <dialog
          ref={dialog}
          className="service-dialog"
          aria-labelledby="service-dialog-title"
          onClick={(event) => {
            if (event.target === dialog.current) close();
          }}
          onCancel={() => lastTrigger.current?.focus()}
        >
          <div className="dialog-inner">
            <button
              className="icon-button dialog-close"
              aria-label="Close service details"
              onClick={close}
            >
              <X />
            </button>
            <Eyebrow>Our expertise</Eyebrow>
            <h2 id="service-dialog-title">{selected.title}</h2>
            <p>{selected.detail}</p>
            <ul className="offering-list">
              {selected.offerings.map((item) => (
                <li key={item}>
                  <ArrowUpRight size={16} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div onClick={close}>
              <ButtonLink
                href={`/contact?service=${selected.id}`}
                direction="up"
              >
                Let’s explore your idea
              </ButtonLink>
            </div>
          </div>
        </dialog>
      </div>
    </section>
  );
}
