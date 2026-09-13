import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HandSparkle, HandSwoosh } from "@/components/ui/HandMarks";
import { DoodleStar } from "@/components/ui/Doodles";

function Cutout({
  children,
  tone,
  tilt,
}: {
  children: React.ReactNode;
  tone: "cream" | "lavender" | "blush";
  tilt: string;
}) {
  return (
    <span
      className={`cutout cutout--${tone} relative inline-block px-2.5 py-0.5 align-baseline sm:px-3 sm:py-1`}
      style={{ ["--tilt" as string]: tilt }}
    >
      <em className="font-hand text-[1.05em] not-italic leading-none">
        {children}
      </em>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-line grain doodle-field"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[6%] top-3 hidden text-mustard/30 floaty md:block"
        style={{ animationDelay: "0.6s" }}
      >
        <DoodleStar className="h-8 w-8" />
      </div>

      <div className="shell pt-2 pb-6 sm:pt-3 sm:pb-8">
        <div className="grid items-center gap-6 md:grid-cols-12 md:gap-8 lg:gap-12">
          {/* Left — copy + CTAs */}
          <Reveal className="md:col-span-7">
            <p className="tape-tag">Singapore · hands-on studio</p>

            <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-indigo sm:text-3xl">
              Science Explorers
            </p>

            <p className="relative mt-4 w-fit max-w-full">
              <span className="font-hand text-[2.15rem] leading-[1.05] tracking-tight text-magenta sm:text-5xl lg:text-[3.05rem]">
                create
                <span className="mx-1.5 text-mustard/80" aria-hidden>
                  ·
                </span>
                connect
                <span className="mx-1.5 text-mustard/80" aria-hidden>
                  ·
                </span>
                explore
              </span>
              <HandSparkle className="absolute -right-5 -top-1 hidden text-mustard sm:inline-block" />
              <HandSwoosh className="text-magenta" />
            </p>

            <h1 className="mt-7 max-w-xl font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.6rem] lg:leading-[1.22]">
              Hands-on science where you{" "}
              <Cutout tone="cream" tilt="-1.5deg">
                explore
              </Cutout>
              ,{" "}
              <Cutout tone="lavender" tilt="1.4deg">
                build real things
              </Cutout>
              , and{" "}
              <Cutout tone="blush" tilt="-1.1deg">
                belong
              </Cutout>
              .
            </h1>

            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Warm sessions with Auntie Jonn — where curiosity becomes something
              you can hold, show, and take home.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/experiences">Explore workshops &amp; book</Button>
              <Button href="/about" variant="secondary">
                Meet Auntie Jonn
              </Button>
            </div>
          </Reveal>

          {/* Right — craft video frame */}
          <Reveal className="md:col-span-5">
            <HeroVideo />
            <p className="mt-3 text-center font-hand text-base text-ink-soft md:text-left">
              A little window into the making table
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
