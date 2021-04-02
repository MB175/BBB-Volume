console.log("BBB identified!");

var container;
var sliderList =  [];

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


function addSlider(slider) {
  slider.addEventListener("input", function () {
    console.log("Set UserVolume to: " + slider.value);
  });

  sliderList.push(slider)
}


function injectVolumeSlidersDropDown(target) {
  var dorpodwnPostfix = "]/div/div[2]/div/ul";
  var dropDownPrefix =
    "/html/body/div/main/section/div[2]/div/div/div/div[3]/div[2]/div/div/div[";

  for (i = 1; i <= target.childNodes.length; i++) {
    let query = dropDownPrefix + i + dorpodwnPostfix;
    let el = getElementByXpath(query);

    if (checkIfSliderIsPresent(el)) {
      continue;
    }

    var slider = document.createElement("INPUT");
    slider.min = 0;
    slider.max = 100;
    slider.value = 100;
    slider.type = "range";

    addSlider(slider)


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
