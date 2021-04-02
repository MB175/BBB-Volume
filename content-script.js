console.log("BBB identified!");

var observer = new MutationObserver(function (mutations) {
  if (
    getElementByXpath(
      "/html/body/div/main/section/div[1]/section[2]/div/div[2]"
    ) != null
  ) {
    var menuBarDiv = getElementByXpath(
      "/html/body/div/main/section/div[1]/section[2]/div/div[2]"
    );

    var dropDown = getElementByXpath(
      "/html/body/div/main/section/div[2]/div/div/div/div[3]/div[2]/div/div/div[3]/div/div[2]/div/ul"
    );
    var container = getElementByXpath(
      "/html/body/div/main/section/div[2]/div/div/div/div[3]/div[2]/div/div"
    );

    console.log(container.childNodes.length);

    injectVolumeSlider(menuBarDiv);
    injectVolumeSlidersDropDown(container);

    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function injectVolumeSlidersDropDown(target) {
  var dorpodwnPostfix = "]/div/div[2]/div/ul";
  var dropDownPrefix =
    "/html/body/div/main/section/div[2]/div/div/div/div[3]/div[2]/div/div/div[";

  for (i = 1; i <= target.childNodes.length; i++) {
    var slider = document.createElement("INPUT");
    slider.min = 0;
    slider.max = 100;
    slider.value = 100;
    slider.type = "range";

    var liElement = document.createElement("LI");
    liElement.appendChild(slider);
    let query = dropDownPrefix + i + dorpodwnPostfix;

    let el = getElementByXpath(query);
    console.log(el);
    el.appendChild(liElement);
  }
}

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
