var vars = {};

var main = function () {
	vars.pikas = 0;
	vars.picsNum = 100;
	vars.pikaLevel = 1;
	vars.gymBadges = 0;

	window.drawPikas = function () {
		var start = $("#start"),
			pikasToDraw = vars.pikas;
		$(".pikaPic").remove();
		$(".drawExtras").remove();
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

			if (i % 20 === 0) {
				start.append("<br class='drawExtras'>");
			}
		}

		if (pikasToDraw > 0) {
			start.append("<p class='drawExtras'>... And " + pikasToDraw.toLocaleString() + " More ...</p>");
		}
	};

	window.confineNum = function (low, high, num) {
		if (num > high) {
			return high;
		}
		if (num < low) {
			return low;
		}
		return num;
	};

	window.updateValues = function () {
		$("#pikas").text("You have " + vars.pikas.toLocaleString() + " Pikachus, which release " + (Math.ceil((vars.pikas + 1) / (101 - vars.pikaLevel))).toLocaleString() + " Pikachus every " + ((3000 - vars.gymBadges * 250) / 1000) + " seconds");
		$("#pikaLevel").text("Your Pikachus are level " + vars.pikaLevel);
		$("#gymBadges").text("You have " + vars.gymBadges + " gym badges");
		$("#afterGym").text("to fight the next gym. Your chances increase with the number of Pikachus you have and their level, but decrease with the amount of gyms you've already beat. Your chance is " + window.confineNum(0, 100, ((vars.pikas / Math.pow(100, (vars.gymBadges + 1))) * (vars.pikaLevel / 10)).toFixed(3)) + "%.  Each gym badge reduces the time it takes to create more Pikachus.");
		$("#afterLevelUp").text("to level up your Pikachus. All of your Pikachus will fight one another until only one remains, him being the strongest of the bunch. Will give you more levels the more Pikachus you have. You will gain " + window.confineNum(0, (101 - vars.pikaLevel), (Math.floor((Math.log(vars.pikas) / Math.log(10)) - 1))) + " levels. Next level at " + window.confineNum(100, Math.pow(10, (101 - vars.gymBadges)), (Math.pow(10, (Math.floor((Math.log(vars.pikas) / Math.log(10)) + 1))))).toLocaleString() + " Pikachus. Each level increases the effectiveness of Pikachu production.");
	};

	window.loop = function () {
		vars.pikas += Math.ceil((vars.pikas + 1) / (101 - vars.pikaLevel));
		window.updateValues();
		window.drawPikas();
		window.save();
		setTimeout(window.loop, (3000 - vars.gymBadges * 250));
	};

	window.levelUp = function () {
		if (vars.pikaLevel < 100) {
			var response = confirm("Please confirm leveling up. You will lose all of your Pikachus, but they will level up."),
				levelsGained = Math.floor((Math.log(vars.pikas) / Math.log(10)) - 1);
			if (response === true) {
				if (levelsGained > 0) {
					vars.pikaLevel += levelsGained;
					if (vars.pikaLevel > 100) {
						vars.pikaLevel = 100;
					}
					vars.pikas = 1;
					window.updateValues();
				} else {
					alert("You will not gain any levels, in fact you may even lose some. Please do not continue.");
				}
			}
		} else {
			alert("Your Pikachus are already as strong as they can get!");
		}
	};

	window.fightGym = function () {
		if (vars.gymBadges < 8) {
			var response = confirm("Please confirm fighting the gym. You have a chance to lose a large number of Pikachus, but you may also beat the gym."),
				strength = (vars.pikas / Math.pow(100, (vars.gymBadges + 1))) * (vars.pikaLevel / 10),
				luck = Math.random();
			if (response === true) {
				if (strength > luck) {
					vars.gymBadges += 1;
					console.log((strength / (vars.gymBadges + 1)));
					console.log(luck);
				} else {
					vars.pikas = Math.ceil(vars.pikas * (Math.pow(0.1, (vars.gymBadges + 1))));
					console.log((strength / (vars.gymBadges + 1)));
					console.log(luck);
				}
				window.updateValues();
			}
		} else {
			alert("You have collected all the gym badges already!");
		}
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
			if (vars.pikaLevel !== undefined) {vars.pikaLevel = loading.pikaLevel; } else {vars.pikaLevel = 1; }
			if (vars.gymBadges !== undefined) {vars.gymBadges = loading.gymBadges; } else {vars.gymBadges = 0; }
			console.log("Game Loaded!");
		} else {
			vars.pikas = 1;
			vars.picsNum = 100;
			vars.pikaLevel = 1;
			vars.gymBadges = 0;
		}
	};

	window.deleteSave = function () {
		var response = prompt("Please enter the word 'Yes' as written in order to confirm deleting save. This will erase all of your data, and will not confer any benefits.", "No");
		if (response === "Yes") {
			localStorage.removeItem("vars");
			location.reload();
		}
	};

	window.load();

	window.drawPikas();

	window.updateValues();

	setTimeout(window.loop, (3000 - vars.gymBadges * 250));

    console.log("Script Loaded!");
};

$("document").ready(main);