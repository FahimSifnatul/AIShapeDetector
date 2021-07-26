
$(document).ready(async function(){
	const model = await tf.loadLayersModel(path_model + "ai-shape-detector-model.json");
	const shapes = ["circle.gif", "triangle.gif", "quadrilateral.gif"];


	// To preview image
	$("#image_input").change(function(){

		$("#right_image").attr("src", path_images+"show_shapes.gif");

		let reader = new FileReader();	
		reader.onload = function () {
        	let dataURL = reader.result;
        	$("#image").attr("src", dataURL);
    	}
    	let file = $("#image_input").prop("files")[0];
    	reader.readAsDataURL(file);
	});
	

	// Form to submit image
	$("#image_form").on("submit", function(e){
		e.preventDefault(); // prevent browser reloading

		$("#right_image").attr("src", path_images+"detecting_shapes.gif");

		$.ajax({
			type: "POST",
			data: $("#image_form").serialize(),
			success: function(){
				var tmp_image = $("#image").get(0); // form image value
				var image = tf.browser.fromPixels(tmp_image);
				
				image = image.resizeBilinear([32, 32]);
				const axis = 0;
				image = image.expandDims(axis);
				
				// Predict shape - detection phase
				model.predict(image).array().then(function(array){
					let mx = -Infinity, detected_shape_index;
					for(let i=0; i<3; i++)
					{
						if(array[0][i] > mx)
						{
							mx = array[0][i];
							detected_shape_index = i;
						}
					}
					$("#right_image").attr("src", path_images+shapes[detected_shape_index]);
				});
			},
			error: function(){
				alert("error");
			}
		});
	});
});