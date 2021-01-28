(function () {
  let img = document.querySelectorAll("#images img");
  let currentImg = 0;
  let timer;
  let isTransitioning = false;

  function clickHandler(doIndex) {
    return function () {
      if (isTransitioning || doIndex == currentImg) {
        return;
      }
      clearTimeout(timer);
      moveImg(doIndex);
    };
  }
  function moveImg(index) {
    img[currentImg].classList.remove("onscreen");
    img[currentImg].classList.add("offscreen-left");
    if (typeof index === "number") {
      currentImg = index;
    } else {
      currentImg++;
    }
    if (currentImg == img.length) {
      currentImg = 0;
    }
    img[currentImg].classList.add("onscreen");

    isTransitioning = true;
  }
  document.addEventListener("transitionend", function (event) {
    if (event.target.classList.contains("offscreen-left")) {
      event.target.classList.remove("offscreen-left");
      isTransitioning = false;
      timer = setTimeout(moveImg, 2000);
    }
  });
  timer = setTimeout(moveImg, 2000);
})();

(function () {
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      document.getElementById("about").style.fontSize = "30px";
      document.getElementById("about").style.color = "#c94c4c";
    } else {
      document.getElementById("about").style.fontSize = "100px";
      document.getElementById("about").style.color = "#3a3f50";
    }
  }
})();
(function () {
  let logos = document.getElementById("logos");
  let links = document.querySelectorAll("#logos a");
  console.log(links);
  let left = logos.offsetLeft;
  let anim;

  function moveLogos() {
    // console.log(left);
    left--;
    // console.log(-links[0].offsetWidth);
    if (left < -links[0].offsetWidth) {
      left += links[0].offsetWidth;
      console.log(links[0]);
      logos.appendChild(links[0]);
      links = document.querySelectorAll("#logos a");
    }
    logos.style.left = left + "px";
    anim = requestAnimationFrame(moveLogos);
  }
  moveLogos();
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("mouseover", function () {
      cancelAnimationFrame(anim);
    });
    links[i].addEventListener("mouseout", function () {
      moveLogos();
    });
  }
})();
