gsap.to(".intro", {
  opacity: 0,
  duration: 0,
  delay: 2,
  onComplete: () => {
    document.querySelector(".intro").style.display = "none";

    document.querySelector(".video-container").style.display = "block";

    gsap.from(".video-container", { opacity: 0, duration: 1 });

    document.body.style.overflow = "auto";

    window.scrollTo(0, 0);
  },
});

gsap.from(".info-screen", {
  opacity: 0,
  y: 100,
  duration: 1,
  stagger: 0.3, 
});

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".info-screen").forEach((section, index) => {
  const img = section.querySelector("img");
  const title = section.querySelector(".info-title");
  const text = section.querySelector(".info-text");

  const isReversed = section.classList.contains("reverse");
  const direction = isReversed ? -150 : 150;

  const delayFactor = index === 0 ? 2 : index === 1 ? 1.5 : 1;


  gsap.fromTo(
    img,
    {
      x: `${direction}vw`,
      scale: 1.1,
      opacity: 0,
    },
    {
      x: 0,
      scale: 1,
      opacity: 1,
      duration: 5 * delayFactor,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        start: "top 10%", 
        end: "top 50%",
        scrub: 2, 
        markers: false, 
        once: true, 
      },
    }
  );


  gsap.fromTo(
    [title, text],
    {
      y: 80,
      scale: 8,
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 1.8 * delayFactor,
      ease: "elastic.out(1, 0.5)",
      scrollTrigger: {
        trigger: section,
        start: "top 10%", 
        end: "top 100%",
        scrub: 1.5, 
        markers: false, 
        once: true, 
      },
    }
  );
});

document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const navPanel = document.querySelector(".nav-panel");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-panel a");

  function toggleMenu() {
    burger.classList.toggle("active");
    navPanel.classList.toggle("active");
    body.classList.toggle("lock");
  }

  burger.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      burger.classList.remove("active");
      navPanel.classList.remove("active");
      body.classList.remove("lock");
    });
  });
});

document.getElementById("next").onclick = function () {
  let lists = document.querySelectorAll(".item__carousel");
  document.getElementById("slide").appendChild(lists[0]);
};
document.getElementById("prev").onclick = function () {
  let lists = document.querySelectorAll(".item__carousel");
  document.getElementById("slide").prepend(lists[lists.length - 1]);
};

document.querySelectorAll(".buy-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      this.closest(".icon-item").classList.remove("active");
    } else {
      document
        .querySelectorAll(".buy-btn")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".icon-item")
        .forEach((icon) => icon.classList.remove("active"));

      this.classList.add("active");
      this.closest(".icon-item").classList.add("active");
    }

    e.stopPropagation();
  });
});

document.querySelectorAll(".icon-item").forEach((item) => {
  const button = item.querySelector(".buy-btn");

  item.addEventListener("click", function (e) {
    if (e.target === button) return;

    if (this.classList.contains("active")) {
      this.classList.remove("active");
      button.classList.remove("active");
    } else {
      document
        .querySelectorAll(".icon-item")
        .forEach((icon) => icon.classList.remove("active"));
      document
        .querySelectorAll(".buy-btn")
        .forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");
      button.classList.add("active");
    }
  });
});

function updateValue(id, value) {
  document.getElementById(id).innerText = id.includes("term")
    ? `${value} Jahre`
    : id.includes("interest")
    ? `${value}%`
    : `${parseInt(value).toLocaleString()}€`;
}

function calculateCredit() {
  let carPrice = parseFloat(document.getElementById("car-select-credit").value);
  let initialPayment = parseFloat(
    document.getElementById("initial-payment-credit").value
  );
  let term = parseFloat(document.getElementById("term-credit").value) * 12;
  let interest =
    parseFloat(document.getElementById("interest-credit").value) / 100 / 12;

  let loanAmount = carPrice - initialPayment;
  let monthlyPayment =
    (loanAmount * interest) / (1 - Math.pow(1 + interest, -term));

  document.getElementById(
    "credit-result"
  ).innerText = `Monatliche Rate: ${monthlyPayment.toFixed(2)}€`;
}

function calculateLease() {
  let carPrice = parseFloat(document.getElementById("car-select-lease").value);
  let initialPayment = parseFloat(
    document.getElementById("initial-payment-lease").value
  );
  let term = parseFloat(document.getElementById("term-lease").value) * 12;
  let interest =
    parseFloat(document.getElementById("interest-lease").value) / 100 / 12;
  let mileage = parseFloat(document.getElementById("mileage-lease").value);

  let leaseAmount = carPrice - initialPayment;
  let residualValue = carPrice * 0.3;
  let monthlyPayment =
    (leaseAmount * interest) / (1 - Math.pow(1 + interest, -term)) +
    residualValue / term;

  let mileageFactor = 0.01 * mileage;
  monthlyPayment += mileageFactor;

  document.getElementById(
    "lease-result"
  ).innerText = `Monatliche Rate: ${monthlyPayment.toFixed(2)}€`;
}

document
  .getElementById("calculate-credit")
  .addEventListener("click", calculateCredit);
document
  .getElementById("calculate-lease")
  .addEventListener("click", calculateLease);

function updateMileageValue(value) {
  document.getElementById("mileage-value").innerText = value;
}

document.addEventListener("DOMContentLoaded", function () {
  const testimonialsContainer = document.querySelector(".testimonials");
  const testimonials = document.querySelectorAll(".testimonial");

  const checkVisibility = () => {
    const rect = testimonialsContainer.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      testimonials.forEach((testimonial, index) => {
        testimonial.classList.add("show");
      });
    }
  };
  window.addEventListener("scroll", checkVisibility);
  checkVisibility();
});
