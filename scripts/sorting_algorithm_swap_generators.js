function generate_bubble_swap_orders(input) {
    let main_array = input.slice();
    let all_nums = input.slice();
    let swap_orders = [];
    for (var i = 0; i < all_nums.length; i++) {
	for (var j = 0; j < all_nums.length-1; j++) {
	    if (all_nums[j] > all_nums[j+1]) {
		let temp = all_nums[j];
		all_nums[j] = all_nums[j+1];
		all_nums[j+1] = temp;
		let location_first = j;
		let location_second = j+1;
		let temp_vector = new vector(location_first,location_second);
		swap_orders.push(temp_vector);
	    }
	}
    }
    return swap_orders;
}


function generate_insertion_swap_orders(input) {
    let use_array = input.slice();
    let swap_orders = [];
    for (var i = 0; i < use_array.length; i++) {
	let start = i;
	while (start > 0 && use_array[start]<use_array[start-1]){
	    let temp = use_array[start];
	    use_array[start] = use_array[start-1];
	    use_array[start-1] = temp;
	    let location_first = start-1;
	    let location_second = start;
	    let temp_vector = new vector(location_first,location_second);
	    swap_orders.push(temp_vector);
	    start-=1;
	}
    }
    return swap_orders;
}
