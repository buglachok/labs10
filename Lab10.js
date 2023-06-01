'use strict';

function openWindow(dog) {
    let $mwindow = $("#m-window");
    let $dogImage = $("#dog-img");
    let $dogName = $("#dog-name");
    let $dogSex = $("#dog-sex");
    let $dogAge = $("#dog-age");
    let $dogPersonality = $("#dog-personality");

    $dogImage.attr("src", "https://usersdogs.dmytrominochkin.cloud" + dog.dogImage);
    $dogName.text(dog.title);
    $dogSex.text(dog.sex);
    $dogAge.text(dog.age);
    $dogPersonality.text(dog.description);

    $mwindow.css("display", "block");
}

function closeWindow() {
    let $mwindow = $("#m-window");
    $mwindow.css("display", "none");
}

const getDogs = async function () {
    const dogs = await fetch("https://usersdogs.dmytrominochkin.cloud/dogs");
    if (!dogs.ok) throw new Error("Something went wrong");
    return await dogs.json();
};

let $mainContainer = $("#main");

getDogs()
    .then(function (dogsData) {
        dogsData.forEach(function (dog) {
            let $dogContainer = $("<div>").addClass("container");
            $dogContainer.on("click", function () {
                openWindow(dog);
            });

            let $imgContainer = $("<div>").addClass("img-centring");
            let $dogImg = $("<img>")
                .attr(
                    "src",
                    "https://usersdogs.dmytrominochkin.cloud" + dog.dogImage
                )
                .addClass("icon");
            $imgContainer.append($dogImg);

            let $shortInfoContainer = $("<div>").addClass("short-info");

            let $dogName = $("<div>")
                .addClass("name")
                .text(dog.title);

            let $dogSex = $("<div>")
                .addClass("sex")
                .text(dog.sex);

            $shortInfoContainer.append($dogName);
            $shortInfoContainer.append($dogSex);
            $dogContainer.append($imgContainer);
            $dogContainer.append($shortInfoContainer);
            $mainContainer.append($dogContainer);
        });
    })
    .catch(function (error) {
        console.error("Something went wrong");
    });