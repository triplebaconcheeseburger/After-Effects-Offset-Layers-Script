var comp = app.project.activeItem;
if (!comp || !(comp instanceof CompItem)) {
    alert("Please select a composition");
} else {
    // Create a new dialog window
    var dialog = new Window("dialog", "Offset Z Position");

    // Add an image to the dialog
    var imageFile = File("bin/home.jpg"); // Replace with the path to your image file
    var image = dialog.add("image", undefined, imageFile);

    // Add a static text label
    var textLabel = dialog.add("statictext", undefined, "If you enjoy this script, check out our other tools to help make your life easier.");


    // Add a button to start the offset
    var offsetButton = dialog.add("button", undefined, "Start Offset");

    offsetButton.onClick = function() {
        app.beginUndoGroup("Offset Z Position");

        var layers = comp.selectedLayers;
        if (layers.length === 0) {
            alert("No layers selected. Please select at least one layer.");
        } else {
            for (var i = 0; i < layers.length; i++) {
                var layer = layers[i];
                // Assuming the layers are 3D. If not, you'll need to enable 3D for each layer.
                layer.threeDLayer = true;
                var zPos = layer.position.value[2]; // Get the current Z position
                layer.position.setValue([layer.position.value[0], layer.position.value[1], zPos + (i + 1)]); // Increment Z by 1 more for each layer
            }
        }

        app.endUndoGroup();
    };
    // Add a custom close button
    var closeButton = dialog.add("button", undefined, "Close");
    closeButton.onClick = function() {
    dialog.close();
    };

    // Show the dialog window
    dialog.show();
}

// Function to open URL in default browser
function openURL(url) {
    var cmdStr = 'open "' + url + '"';
    system.callSystem(cmdStr);
}


