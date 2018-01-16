var mapSelect;
var arrayGoals = [];
var arrayBoxes = [];
var thePushedBox;

var playerCharacter = {
	yPosition		: 0, 
	xPosition		: 0,
	playerDirectionId: "",
	changePosition	: function(newY, newX) {
		var oldY = this.yPosition;
		var oldX = this.xPosition;
		
		yPosition = newY;
		xPosition = newX;
		
		
	}
};
	
function Box (y, x, id) {
	this.yPosition = y;
	this.xPosition = x;
	this.id = id;
	this.inGoal = false;
	this.representation = "pic/i3.gif";
	this.boxDirectionId = "";
}

function changeBoxId (boxNr) {
	var n1 = arrayBoxes[boxNr].yPosition.toString();
	var n2 = arrayBoxes[boxNr].xPosition.toString();
	n1 += n2;
	arrayBoxes[boxNr].id = n1;
}

function Goal(y, x, id) {
	this.yPosition = y;
	this.xPosition = x;
	this.id = id;
	this.representation = "pic/i1.gif";
	this.inGoal = false;
}


function createPlayer(yPos, xPos) {
	playerCharacter.yPosition = yPos;
	playerCharacter.xPosition = xPos;
	playerCharacter.representation = "pic/i5.gif";
}

function createBox(yPos, xPos) {
	var n1 = yPos.toString();
	var n2 = xPos.toString();
	n1 += n2;
	
	arrayBoxes.push(new Box(yPos, xPos, n1));
}

function createGoal(y, x) {
	var n1 = y.toString();
	var n2 = x.toString();
	n1 +=n2;
	arrayGoals.push(new Goal(y, x, n1));
}

function addFloor(y, x) {
	var thisId = 'pic-'+y+'-'+x;
	document.getElementById(thisId).setAttribute("src","pic/i7.gif");
}

function addWall(y, x) {
	var thisId = 'pic-'+y+'-'+x;
	document.getElementById(thisId).setAttribute("src","pic/i2.gif");
}

//Ugly, change the else if's into something less ugly
function createObject(y, x) {
	//Create floor object
	if (mapsArray[mapSelect].mapGrid[y][x] == ' ') {
		addFloor(y, x);
	}
	//Create wall object
	else if (mapsArray[mapSelect].mapGrid[y][x] == 'W') {
		addWall(y, x);
	}
	//Create box object
	else if (mapsArray[mapSelect].mapGrid[y][x] == 'B') {
		createBox(y,x);
	}
	//Create player object
	else if (mapsArray[mapSelect].mapGrid[y][x] == 'P') {
		playerCharacter.yPosition = y;
		playerCharacter.xPosition = x;
	}
	//Create goal object
	else if (mapsArray[mapSelect].mapGrid[y][x] == 'G') {
		createGoal(y, x);
	}
	else {
		var picture = "i7";
		return picture;
	}
}

function addObjects() {
	addGoal();
	addPlayer();
	addBox();
}

function addPlayer() {
	var thisId = 'pic-'+playerCharacter.yPosition+'-'+playerCharacter.xPosition;
	document.getElementById(thisId).setAttribute("src","pic/i5.gif");
}

function addBox() {
	for (i = 0; i < arrayBoxes.length; i++) {
		var thisId = 'pic-' + arrayBoxes[i].yPosition + '-' + arrayBoxes[i].xPosition;
		document.getElementById(thisId).setAttribute("src",arrayBoxes[i].representation);
	}
}

function addGoal() {
	for (i = 0; i < arrayGoals.length; i++) {
		//console.log(arrayGoals);
		var thisId = 'pic-' + arrayGoals[i].yPosition + '-' + arrayGoals[i].xPosition;
		document.getElementById(thisId).setAttribute("src",arrayGoals[i].representation);
	}
}

function buildMap() {
	mapSelect = Math.floor(Math.random() * mapsArray.length); //select which one of the maps to create
	for (var y = 0; y < mapsArray[mapSelect].height; y++) {
		
		var iDiv = document.createElement('tr');
		iDiv.id = 'square'+y;
		iDiv.className = 'yblock';
		document.getElementById('mapField').appendChild(iDiv);
		
		for (var x = 0; x < mapsArray[mapSelect].width; x++) {
			var thisId = 'square'+y+"-"+x;
			
			var iDiv = document.createElement('td');
			iDiv.id = thisId;
			iDiv.className = 'block';
			document.getElementById('square'+y).appendChild(iDiv);
			
			var iPic = document.createElement('img');
			iPic.id = 'pic-'+y+'-'+x;
			iPic.className = 'image';
			iPic.alt = 'Picture';
			document.getElementById(thisId).appendChild(iPic);
			
			createObject(y, x);
		}

	}
	
	addObjects();
}

document.onkeyup = function(e) {
	var key = e.KeyCode ? e.KeyCode : e.which;
}

function checkIfWin() {
	var amountOfGoals = 0;
	for (var i = 0; i < arrayBoxes.length; i++) {
		if (arrayBoxes[i].inGoal === true) {
			amountOfGoals += 1;
		}
	}
	console.log("points: " + amountOfGoals);
	if (amountOfGoals >= arrayGoals.length) {
		alert("You won!");
		//console.log("You won!");
	}
}

function isInGoal(boxNr) {
	if (arrayGoals.find(findGoal) != undefined) {
		console.log("In Goal!");
		arrayBoxes[boxNr].representation = "pic/i4.gif";
		arrayBoxes[boxNr].inGoal = true;
		
		checkIfWin();
	}
	else {
		arrayBoxes[boxNr].representation = "pic/i3.gif";
		arrayBoxes[boxNr].inGoal = false;
	}
}

function findBox(boxItem) {
	return boxItem.id === playerCharacter.playerDirectionId;
}

function findNextBox(boxItem) {
	return boxItem.id === arrayBoxes[thePushedBox].boxDirectionId;
}

function findGoal(goalItem) {
	
	return goalItem.id === arrayBoxes[thePushedBox].id;
}

document.addEventListener('keydown', function characterReact(event) {
	if (event.code == 'ArrowUp') {
		
		//Create a key which can be used to find a spesific box, if we move into it
		var n1 = playerCharacter.yPosition-(1).toString();
		var n2 = playerCharacter.xPosition.toString();
		n1 += n2;
		playerCharacter.playerDirectionId = n1;
		
		//If you hiy a wall
		if (mapsArray[mapSelect].
		mapGrid[playerCharacter.yPosition-1][playerCharacter.xPosition] == 'W') {
			console.log("You hit a Wall to your north" + 
			playerCharacter.yPosition + playerCharacter.xPosition);
		}
		//If you hit a box
		else if (arrayBoxes.find(findBox) != undefined) {
			console.log("BOX!");
			console.log(arrayBoxes.findIndex(findBox));
			var theBox = arrayBoxes.findIndex(findBox);
			var bn1 = arrayBoxes[theBox].yPosition-(1).toString();
			var bn2 = arrayBoxes[theBox].xPosition.toString();
			bn1 += bn2;
			arrayBoxes[theBox].boxDirectionId = bn1;
			
			thePushedBox = theBox;
			//Check if box can be moved
			if (mapsArray[mapSelect].mapGrid[playerCharacter.yPosition-2][playerCharacter.xPosition] == 'W'
				|| arrayBoxes.find(findNextBox) != undefined) {
				console.log("BOX hit a wall or BOX!");
			}
			else {
			arrayBoxes[theBox].yPosition -= 1;
			changeBoxId(theBox);
			
			
			playerCharacter.yPosition -= 1;
			document.getElementById('pic-'+(playerCharacter.yPosition+1)+'-'+playerCharacter.xPosition).
			setAttribute('src','pic/i7.gif');
			
			//Check if box is in goal
			isInGoal(theBox);
			}
			
		}
			
		else {
			playerCharacter.yPosition -= 1;
			document.getElementById('pic-'+(playerCharacter.yPosition+1)+'-'+playerCharacter.xPosition).
			setAttribute('src','pic/i7.gif');
		}
	}
	else if (event.code == 'ArrowDown') {
		
		//Create a key which can be used to find a spesific box, if we move into it
		var yn = playerCharacter.yPosition+1;
		var xn = playerCharacter.xPosition;
		var n1 = yn.toString();
		var n2 = xn.toString();
		n1 += n2;
		playerCharacter.playerDirectionId = n1;
		
		//If you hit a wall
		if (mapsArray[mapSelect].
		mapGrid[playerCharacter.yPosition+1][playerCharacter.xPosition] == 'W') {
			console.log("You hit a Wall to your south" + 
			playerCharacter.yPosition + playerCharacter.xPosition);
		}
		//If you hit a box
		else if (arrayBoxes.find(findBox) != undefined) {
			console.log("BOX!");
			console.log(arrayBoxes.findIndex(findBox));
			var theBox = arrayBoxes.findIndex(findBox);
			var byn1 = arrayBoxes[theBox].yPosition+1;
			var bn2 = arrayBoxes[theBox].xPosition.toString();
			var bn1 = byn1.toString();
			bn1 += bn2;
			arrayBoxes[theBox].boxDirectionId = bn1;
			
			thePushedBox = theBox;
			//Check if box can be moved
			if (mapsArray[mapSelect].mapGrid[playerCharacter.yPosition+2][playerCharacter.xPosition] == 'W'
				|| arrayBoxes.find(findNextBox) != undefined) {
				console.log("BOX hit a wall or BOX!");
			}
			else {
			arrayBoxes[theBox].yPosition += 1;
			changeBoxId(theBox);
			
			//Check if box is in goal
			isInGoal(theBox);
			
			playerCharacter.yPosition += 1;
			document.getElementById('pic-'+(playerCharacter.yPosition-1)+'-'+playerCharacter.xPosition).
			setAttribute('src','pic/i7.gif');
			}
		}
		
		else {
			playerCharacter.yPosition += 1;
			document.getElementById('pic-'+(playerCharacter.yPosition-1)+'-'+playerCharacter.xPosition).
			setAttribute('src','pic/i7.gif');
		}
	}
	else if (event.code == 'ArrowLeft') {
		
		//Create a key which can be used to find a spesific box, if we move into it
		var n1 = playerCharacter.yPosition.toString();
		var n2 = playerCharacter.xPosition-(1).toString();
		n1 += n2;
		playerCharacter.playerDirectionId = n1;
		
		if (mapsArray[mapSelect].
		mapGrid[playerCharacter.yPosition][playerCharacter.xPosition-1] == 'W') {
			console.log("You hit a Wall to your west" + 
			playerCharacter.yPosition + playerCharacter.xPosition);
		}
		//If you hit a box
		else if (arrayBoxes.find(findBox) != undefined) {
			console.log("BOX!");
			console.log(arrayBoxes.findIndex(findBox));
			var theBox = arrayBoxes.findIndex(findBox);
			var bn1 = arrayBoxes[theBox].yPosition.toString();
			var bn2 = arrayBoxes[theBox].xPosition-(1).toString();
			bn1 += bn2;
			arrayBoxes[theBox].boxDirectionId = bn1;
			
			thePushedBox = theBox;
			//Check if box can be moved
			if (mapsArray[mapSelect].mapGrid[playerCharacter.yPosition][playerCharacter.xPosition-2] == 'W'
				|| arrayBoxes.find(findNextBox) != undefined) {
				console.log("BOX hit a wall or BOX!");
			}
			else {
			arrayBoxes[theBox].xPosition -= 1;
			changeBoxId(theBox);
			
			//Check if box is in goal
			isInGoal(theBox);
			
			playerCharacter.xPosition -= 1;
			document.getElementById('pic-'+playerCharacter.yPosition+'-'+(playerCharacter.xPosition+1)).
			setAttribute('src','pic/i7.gif');
			}
		}
		else {
			playerCharacter.xPosition -= 1;
			document.getElementById('pic-'+playerCharacter.yPosition+'-'+(playerCharacter.xPosition+1)).
			setAttribute('src','pic/i7.gif');
		}
	}
	else if (event.code == 'ArrowRight') {
		
		//Create a key which can be used to find a spesific box, if we move into it
		var yn = playerCharacter.yPosition;
		var xn = playerCharacter.xPosition+1;
		var n1 = yn.toString();
		var n2 = xn.toString();
		n1 += n2;
		playerCharacter.playerDirectionId = n1;
		
		//If you hit a wall
		if (mapsArray[mapSelect].
		mapGrid[playerCharacter.yPosition][playerCharacter.xPosition+1] == 'W') {
			console.log("You hit a Wall to your east" + 
			playerCharacter.yPosition + playerCharacter.xPosition);
		}
		//If you hit a box
		else if (arrayBoxes.find(findBox) != undefined) {
			console.log("BOX!");
			console.log(arrayBoxes.findIndex(findBox));
			var theBox = arrayBoxes.findIndex(findBox);
			var bn1 = arrayBoxes[theBox].yPosition.toString();
			var bxn2 = arrayBoxes[theBox].xPosition+1;
			var bn2 = bxn2.toString();
			bn1 += bn2;
			arrayBoxes[theBox].boxDirectionId = bn1;
			
			thePushedBox = theBox;
			//Check if box can be moved
			if (mapsArray[mapSelect].mapGrid[playerCharacter.yPosition][playerCharacter.xPosition+2] == 'W'
				|| arrayBoxes.find(findNextBox) != undefined) {
				console.log("BOX hit a wall or BOX!");
			}
			else {
			arrayBoxes[theBox].xPosition += 1;
			changeBoxId(theBox);
			
			//Check if box is in goal
			isInGoal(theBox);
			
			playerCharacter.xPosition += 1;
			document.getElementById('pic-'+playerCharacter.yPosition+'-'+(playerCharacter.xPosition-1)).
			setAttribute('src','pic/i7.gif');
			}
		}
		else {
			playerCharacter.xPosition += 1;
			document.getElementById('pic-'+playerCharacter.yPosition+'-'+(playerCharacter.xPosition-1)).
			setAttribute('src','pic/i7.gif');
		}
	}
	//Refresh all object positions
	addObjects();
}, false);

buildMap();