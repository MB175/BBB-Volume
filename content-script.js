var isSpeakingContainer = "/html/body/div/main/section/div[1]/header/div/div[2]/div/div"

var dorpodwnPostfix = "]/div/div[2]/div/ul";
var namePostfix = "]/div/div[1]/div/div[2]/span/span"
var prefix =
  "/html/body/div/main/section/div[2]/div/div/div/div[3]/div[2]/div/div/div[";

console.log("BBB identified!");

var container;
var sliderList = [];

var observer = new MutationObserver(function (mutations) {
  if (
    getElementByXpath(
      "/html/body/div/main/section/div[1]/section[2]/div/div[2]"
    ) != null
  ) {
    var menuBarDiv = getElementByXpath(
      "/html/body/div/main/section/div[1]/section[2]/div/div[2]"
    );
    container = getElementByXpath(
      "/html/body/div/main/section/div[2]/div/div/div/div[3]/div[2]/div/div"
    );

    console.log(container.childNodes.length);

    injectVolumeSlider(menuBarDiv);
    injectVolumeSlidersDropDown(container);

    observerUserList(container);
    observer.disconnect();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function observerUserList(container) {
  var userListOberserver = new MutationObserver(function (mutations) {
    userListOberserver.disconnect();
    injectVolumeSlidersDropDown(container);
    observerUserList(container);
  });

  userListOberserver.observe(container, {
    childList: true,
    subtree: true,
  });
}

function checkIfSliderIsPresent(node) {
  let presnet = false;
  node.childNodes.forEach(function (item) {
    if (item.className === "userVolumeSlider") {
      presnet = true;
    }
  });
  return presnet;
}

function addSlider(slider, name) {
  slider.addEventListener("input", function () {
    console.log("Set " + name + " volume to: " + slider.value);
  });

  sliderList.push(slider);
}

function injectVolumeSlidersDropDown(target) {

  for (i = 1; i <= target.childNodes.length; i++) {
    let query = prefix + i + dorpodwnPostfix;
    let el = getElementByXpath(query);

    if (checkIfSliderIsPresent(el)) {
      continue;
    }

    let nameQuery = prefix + i + namePostfix;
    let nameSpan = getElementByXpath(nameQuery)
    let name = nameSpan.innerHTML.replace(/\&nbsp;/g, '')

    var slider = document.createElement("INPUT");
    slider.min = 0;
    slider.max = 100;
    slider.value = 100;
    slider.type = "range";

    addSlider(slider, name);

    var liElement = document.createElement("LI");
    liElement.className = "userVolumeSlider";
    liElement.appendChild(slider);

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
