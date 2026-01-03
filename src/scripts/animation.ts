import { gsap } from "gsap";

import { GSDevTools } from "gsap/GSDevTools";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(GSDevTools, SplitText);

const mainHero = document.querySelector(".hero--main");
const momentHero = document.querySelector(".hero--moment");
const mainHeroHeading = document.querySelector(".hero--main .hero__heading");
const momentHeroHeading = document.querySelector(
  ".hero--moment .hero__heading"
);

const calculatorHeading = document.querySelector(".calculator__heading");
const calculatorFormTitle = document.querySelector(".calculator__form-title");
const calculatorDateSelect = document.querySelector(".calculator__date-select");
const calculatorSubmitBtn = document.querySelector(".calculator__submit-btn");

function heroTextEntrance(tl: GSAPTimeline, split: SplitText) {
  tl.from(split.chars, {
    y: 90,
    stagger: 0.035,
    duration: 0.95,
    ease: "back.out",
  });
}

function heroTextExit(tl: GSAPTimeline, split: SplitText) {
  tl.to(split.chars, {
    y: -90,
    stagger: -0.035,
    delay: 0.75,
    duration: 0.95,
    ease: "back.in",
  });
}

function heroSequence(tl: GSAPTimeline, split: SplitText) {
  heroTextEntrance(tl, split);
  heroTextExit(tl, split);
}

function initAnimations() {
  const heroMainHeadingSplit = SplitText.create(mainHeroHeading, {
    type: "words, chars, lines",
    mask: "words",
  });

  const heroMomentHeadingSplit = SplitText.create(momentHeroHeading, {
    type: "words, chars, lines",
    mask: "words",
  });
  const calculatorHeadingSplit = SplitText.create(calculatorHeading, {
    type: "words, chars, lines",
    mask: "lines",
  });

  const pageEntranceTl = gsap.timeline();

  pageEntranceTl.to(mainHeroHeading, { autoAlpha: 1, duration: 0.1 });
  pageEntranceTl.to(momentHeroHeading, { autoAlpha: 1, duration: 0.1 });

  heroSequence(pageEntranceTl, heroMainHeadingSplit);
  pageEntranceTl.to(mainHero, { autoAlpha: 0 }).addLabel("mainHeroTimeline");

  heroSequence(pageEntranceTl, heroMomentHeadingSplit);
  pageEntranceTl
    .to(momentHero, { autoAlpha: 0, delay: 0.5, duration: 1 })
    .addLabel("momentHeroTimeline");

  // CALCULATOR FORM
  pageEntranceTl
    .fromTo(
      calculatorHeadingSplit.words,
      { y: -90 },
      { y: 0, stagger: 0.075, duration: 1.25, ease: "back.out" }
    )
    .fromTo(
      calculatorSubmitBtn,
      { autoAlpha: 0 },
      { autoAlpha: 1, delay: 0.25 }
    )
    .fromTo(calculatorFormTitle, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.5 })
    .fromTo(
      calculatorDateSelect,
      { autoAlpha: 0 },
      { autoAlpha: 1, ease: "" },
      "<+=0.15"
    );

  // GSDevTools.create({ css: { zIndex: 1000 } });
}

document.fonts.ready.then(() => {
  initAnimations();
});
