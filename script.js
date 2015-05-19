var vars = {};

var main = function () {
	vars.pikas = 0;
	vars.picsNum = 100;

	window.drawPikas = function () {
		var start = $("#start"),
			pikasToDraw = vars.pikas;
		$(".pikaPic").remove();
		$(".picBreak").remove();
		for (i = 1; i <= vars.picsNum && pikasToDraw > 0; i++) {
			if (pikasToDraw >= 1000000000000) {
				start.append("<img src='images/pikaTrillion.jpg' class='pikaPic'>");
				pikasToDraw -= 1000000000000;
			} else if (pikasToDraw >= 10000000000) {
				start.append("<img src='images/pikaTenBillion.jpg' class='pikaPic'>");
				pikasToDraw -= 10000000000;
			} else if (pikasToDraw >= 100000000) {
				start.append("<img src='images/pikaHundredMillion.jpg' class='pikaPic'>");
				pikasToDraw -= 100000000;
			} else if (pikasToDraw >= 1000000) {
				start.append("<img src='images/pikaMillion.jpg' class='pikaPic'>");
				pikasToDraw -= 1000000;
			} else if (pikasToDraw >= 10000) {
				start.append("<img src='images/pikaTenThousand.jpg' class='pikaPic'>");
				pikasToDraw -= 10000;
			} else if (pikasToDraw >= 100) {
				start.append("<img src='images/pikaHundred.jpg' class='pikaPic'>");
				pikasToDraw -= 100;
			} else {
				start.append("<img src='images/pikaOne.jpg' class='pikaPic'>");
				pikasToDraw -= 1;
			}

			if (i % 10 === 0) {
				start.append("<br class='picBreak'>");
			}
		}
	};

	window.updateValues = function () {
		$("#pikas").text("You have " + vars.pikas.toLocaleString() + " Pikachus, which release " + (Math.ceil((vars.pikas + 1) / 100)).toLocaleString() + " Pikachus every three seconds.");
	};

	window.loop = function () {
		vars.pikas += Math.ceil((vars.pikas + 1) / 100);
		window.updateValues();
		window.drawPikas();
		window.save();
	};

	window.save = function () {
		localStorage.setItem("vars", JSON.stringify(vars));
		console.log("Game Saved!");
	};

	window.load = function () {
		var loading = JSON.parse(localStorage.getItem("vars"));
		if (loading !== null) {
			if (vars.pikas !== undefined) {vars.pikas = loading.pikas; } else {vars.pikas = 1; }
			if (vars.picsNum !== undefined) {vars.picsNum = loading.picsNum; } else {vars.picsNum = 100; }
			console.log("Game Loaded!");
		} else {
			vars.pikas = 1;
			vars.picsNum = 100;
		}
	};

	window.deleteSave = function () {
		var response = prompt("Please enter the word 'Yes' as written in order to confirm deleting save.", "No");
		if (response === "Yes") {
			localStorage.removeItem("vars");
			location.reload();
		}
	};

	window.load();

	window.drawPikas();

	window.updateValues();

	setInterval(window.loop, 3000);

    console.log("Script Loaded!");
};

$("document").ready(main);