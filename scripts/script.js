let my_canvas = document.getElementById("myCanvas");
my_canvas = createHiDPICanvas(1200, 500);

let context = my_canvas.getContext("2d");
context.font = "20px Arial";

document.getElementById("start").addEventListener("click",run_program);
let input_text = document.getElementById("input_numbers");

let all_boxes;
function run_program() {
    let input_nums = input_text.value.split(",");
    input_nums = input_nums.map(x => parseInt(x));
    let algorithm;
    let all_radio_buttons = document.querySelectorAll('input[type=radio]');
    for (var i = 0; i < all_radio_buttons.length; i++) {
	if (all_radio_buttons[i].checked) {
	    if (all_radio_buttons[i].value == "bubble_sort") {
		algorithm = generate_bubble_swap_orders;
		break;
	    }else if (all_radio_buttons[i].value == "insertion_sort") {
		algorithm = generate_insertion_swap_orders;
		break;
	    }else if (all_radio_buttons[i].value == "quick_sort") {
		algorithm = generate_quick_swap_orders;
		break;
	    }else if (all_radio_buttons[i].value == "merge_sort") {
		algorithm = generate_merge_swap_orders;
		break;
	    }
	}
    }
    all_boxes = new boxes(input_nums,context,algorithm(input_nums),my_canvas);
    setInterval(animate,30);
}

function animate(){
    context.clearRect(0, 0, my_canvas.width, my_canvas.height);
    all_boxes.swap_boxes();
    all_boxes.draw_them_all();
}
