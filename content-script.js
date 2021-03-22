
console.log("BBB identified")

var observer = new MutationObserver(function (mutations) {
  if (
    getElementByXpath(
      "/html/body/div/main/section/div[1]/section[2]/div/div[2]"
    ) != null
  ) {
    var menuBarDiv = getElementByXpath(
      "/html/body/div/main/section/div[1]/section[2]/div/div[2]"
    );

    injectVolumeSlider(menuBarDiv);
    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function injectVolumeSlider(target) {
  var slider = document.createElement("INPUT");
  slider.min = 0;
  slider.max = 100;
  slider.value = 100;
  slider.type = "range";
  target.appendChild(slider);


  slider.addEventListener("input", function () {
    document.querySelector("audio").volume = slider.value / 100;
    console.log("Set volume to: " + slider.value);
  });
}

function getElementByXpath(path) {
  return document.evaluate(
    path,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}
