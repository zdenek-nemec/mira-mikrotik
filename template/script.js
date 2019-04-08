function getValue(id) {
	return document.getElementById(id).value;
}


function checkText(value, maxLength) {
	if (value.length < 1 || value.length > maxLength) {
		return false;
	}
	return true;
}


function printMessage(id) {
	document.getElementById(id).style.display = "block";
}


function printMessageDebug(text) {
	var current = document.getElementById("messageDebug").textContent;
	document.getElementById("messageDebug").textContent = current + text;
	document.getElementById("messageDebug").style.display = "block";
}


function resetMessageClass(messageClass) {
	var messages = document.getElementsByClassName(messageClass);
	var i;
	for (i = 0; i < messages.length; i++) {
  		messages[i].style.display = "none";
	}
}


function resetMessages(messageClass) {
	resetMessageClass("messageOk");
	resetMessageClass("messageError");
}


function checkInterface() {
	var interface = getValue("inputInterface");
	if (checkText(interface, 32)) {
		printMessage("messageInterfaceOk");
	}
	else {
		printMessage("messageInterfaceError");
	}
}


function checkIp() {
	var ipv4 = getValue("inputIp");
	var ipv4Regex = /(\d+)\.(\d+)\.(\d+)\.(\d+)/ig;
	var ipv4Parts = ipv4Regex.exec(ipv4);
	if (ipv4Parts &&
		ipv4Parts.length == 5 &&
		ipv4Parts[1] >= 1 && ipv4Parts[1] <= 255 &&
		ipv4Parts[2] >= 0 && ipv4Parts[2] <= 255 &&
		ipv4Parts[3] >= 0 && ipv4Parts[3] <= 255 &&
		ipv4Parts[4] >= 1 && ipv4Parts[4] <= 255) {
		printMessage("messageIpOk");
	}
	else {
		printMessage("messageIpError");
	}
}


function checkPort() {
	var port = getValue("inputPort");
	var portInteger = parseInt(port, 10);
	if (portInteger == port && portInteger >= 0 && portInteger <= 65535) {
		printMessage("messagePortOk");
	}
	else {
		printMessage("messagePortError");
	}
}


function checkUser() {
	var user = getValue("inputUser");
	if (checkText(user, 32)) {
		printMessage("messageUserOk");
	}
	else {
		printMessage("messageUserError");
	}
}


function checkPassword() {
	var password = getValue("inputPassword");
	if (checkText(password, 64)) {
		printMessage("messagePasswordOk");
	}
	else {
		printMessage("messagePasswordError");
	}
}


function downloadXml(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


function checkValues() {
	resetMessages();
	printMessageDebug("checkValues(): Started\n")
	checkInterface();
	checkIp();
	checkPort();
	checkUser();
	checkPassword();
	printMessageDebug("checkValues(): Finished\n")
}


function checkAndMakeXml() {
	checkValues();
	downloadXml("Settings.xml", "This is the content of my file :)");
	// TODO
}
