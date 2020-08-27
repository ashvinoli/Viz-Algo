class boxes{
    constructor(all_nums,context,swap_array,my_canvas){
	this.total_boxes = all_nums.length;
	this.context = context;
	this.all_nums = all_nums;
	this.boxes = [];
	this.canvas = my_canvas;
	this.create_boxes();
	this.swap_array = swap_array;
	this.current_swap_index = 0;


    }
    create_boxes(){
	let total_avail_width = this.canvas.width;
	let padding = 10
	let width = total_avail_width/this.total_boxes;
	let height = width;
	let start_x = 0;
	let const_y = 200;
	for (var i = 0; i < this.total_boxes; i++) {
	    let temp_box = new box(width,height,new vector(start_x,const_y),this.all_nums[i],this.context);
	    this.boxes.push(temp_box);
	    start_x += width;
	}
    }
    swap_boxes(){
	let swappable = false;
	let swap_allowed = this.check_if_new_swap_allowed();
	if (swap_allowed == true && (this.current_swap_index < this.swap_array.length)){
	    let swap_vector = this.swap_array[this.current_swap_index];
	    this.current_swap_index+=1;
	    let first = swap_vector.x;
	    let second = swap_vector.y;
	    let first_center = this.boxes[first].center;
	    let second_center = this.boxes[second].center;
	    let generated_path = gen_path(first_center,second_center);
	    let reverse_path = rev_path(generated_path);
	    this.boxes[first].path = generated_path;
	    this.boxes[second].path = reverse_path;
	    let temp_vector = this.boxes[first];
	    this.boxes[first] = this.boxes[second];
	    this.boxes[second] = temp_vector;
	    swappable = true
	}
	return swappable;
    }
    draw_them_all(){
	for (var i = 0; i < this.total_boxes; i++) {
	    this.boxes[i].update();
	    this.boxes[i].draw();
	}
    }
    check_if_new_swap_allowed(){
	let swap_allowed = true;
	for (var i = 0; i < this.total_boxes; i++) {
	    if (this.boxes[i].selected == true) {
		swap_allowed = false;
		break;
	    }
	}
	return swap_allowed;
    }
}
