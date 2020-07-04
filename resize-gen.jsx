const possibleWidths = [4096, 2048, 1024, 512, 256, 128, 64, 32, 16]

String.prototype.removeExtension = function() {
	return this.split('.').slice(0, -1).join('.')
}

Array.prototype.filter = function(func) {
	var newArr = []

	for (var i = 0; i < this.length; ++i)
		if (func(this[i]))
			newArr.push(this[i])
		
	return newArr
}

var saveOptions = new PNGSaveOptions()
saveOptions.compression = 9
saveOptions.interlaced = true

app.preferences.rulerUnits = Units.PIXELS


// MAIN >>>
var file = app.openDialog()[0]
app.open(file)

const ratio = app.activeDocument.width / app.activeDocument.height

var widthsToGenerate = possibleWidths.filter(function(x) { return x < app.activeDocument.width })

for (var i = 0; i < widthsToGenerate.length; ++i) {
	currentWidth = widthsToGenerate[i]
	currentHeight = currentWidth / ratio

	app.activeDocument.resizeImage(currentWidth, currentHeight)

	app.activeDocument.saveAs(new File(file.path + '\\' + file.name.removeExtension() + '-' + currentWidth + 'px-' + currentHeight + 'px.png'), saveOptions)
}

alert("Les icônes ont bien été générés dans le répertoire " + file.path + '.')