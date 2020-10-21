# mask-detector

This project detects faces on a camera feed and whether they are wearing a mask. 

This is accomplished by first detecting all faces in the image using FaceAPI, and then using p5's `get()` method, it will cut the rectangle from the image and pass into the mask detection model and return the probabilities the models calculates. The mask detection model has been trained on teachable machine with roughly 250 images of myself per class and for 100 epochs with the default learning rate of 0.001 with a batch size of 16, it seems to work reasonably well. 

This method of detecting faces first and then running them through the mask detection after has been chosen to improve the performance of the mask detection, which has been trained on close-ups of faces only, and also to allow for detection of multiple people in a single frame.