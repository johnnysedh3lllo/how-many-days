import { gsap } from "gsap";

export const counterEffect = {
  name: "counter",
  extendTimeline: true,
  defaults: {
    end: 0,
    duration: 0.5,
    ease: "power1",
    increment: 1,
  },
  effect: (targets: any, config: any) => {
    let timeline = gsap.timeline();

    console.log("targets", targets[0].innerText);
    let num = targets[0].innerText.replace(/\,/g, "");
    console.log("num", num);

    targets[0].innerText = num;

    timeline.to(
      targets,
      {
        duration: config.duration,
        innerText: config.end,
        modifiers: {
          innerText: function (innerText) {
            return gsap.utils
              .snap(config.increment, innerText)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
        ease: config.ease,
      },
      0
    );

    return timeline;
  },
};
