function generate_bubble_swap_orders(input,offset=0) {
    let main_array = input.slice();
    let all_nums = input.slice();
    let swap_orders = [];
    for (var i = 0; i < all_nums.length; i++) {
	for (var j = 0; j < all_nums.length-1; j++) {
	    if (all_nums[j] > all_nums[j+1]) {
		all_nums[j+1] = swap(all_nums[j],all_nums[j] = all_nums[j+1])
		let location_first = j;
		let location_second = j+1;
		let temp_vector = [new vector(location_first+offset,location_second+offset)];
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
	    use_array[start] = swap(use_array[start-1],use_array[start-1] = use_array[start])
	    let location_first = start-1;
	    let location_second = start;
	    let temp_vector = [new vector(location_first,location_second)];
	    swap_orders.push(temp_vector);
	    start-=1;
	}
    }
    return swap_orders;
}


function quick_sort(input,swap_orders,offset=0) {
    let use_array = input.slice();
    
    if (use_array.length==0) {
	return use_array;
    }else{
	let pivot = use_array.slice(-1);
	let before_arr = use_array.slice(0,-1).filter((x)=>{return x<=pivot});
	let after_arr = [];
	let arr_end = use_array.length - 1;
	let temp_counter = 0
	for (var i = 0; i < arr_end; i++) {
	    if (use_array[i]>pivot) {
		after_arr.push(use_array[i]);
	    }
	}
	after_arr.reverse();
	let total_greater = after_arr.length;
	for (var i = 0; i < total_greater; i++) {
	    let swap_orders_temp = [];
	    for (var j = 0; j < use_array.length-i-1; j++) {
		if (use_array[j]>pivot) {
		    let num = use_array[j];
		    use_array[j] = use_array[use_array.length-i-1];
		    use_array[use_array.length-i-1] = num;
		    let temp_vector = new vector(j+offset,use_array.length-i-1+offset);
		    //console.log(temp_vector,input);
		    swap_orders_temp.push(temp_vector);
		    for (var k = j; k < use_array.length-i-1-1; k++) {
			let num = use_array[k];
			use_array[k] = use_array[k+1];
			use_array[k+1] = num;
			let temp_vector = new vector(k+offset,k+1+offset);
			//console.log(temp_vector,input);
			swap_orders_temp.push(temp_vector);
		    }
		    break;
		}
	    }
	    swap_orders.push(swap_orders_temp);
	}
	let new_offset = offset+input.length - total_greater;
	return quick_sort(before_arr,swap_orders,offset).concat(pivot,quick_sort(after_arr,swap_orders,new_offset));
    }
}

function generate_quick_swap_orders(input,swap_orders=[],offset=0){
    quick_sort(input,swap_orders,offset);
    return swap_orders;
}



function merge_sort(input,swap_orders,offset=0) {
    //console.log(offset);
    if(input.length == 1){
	return input;
    }
    if (input.length==2) {
	if (input[0]>input[1]) {
	    input[0] = swap(input[1],input[1]=input[0]);
	    swap_orders.push([new vector(0+offset,1+offset)]);
	}
	return input;
	
    }
  
    let split_point = Math.floor(input.length/2);
    let set_offset_from = split_point;
    let L_arr = input.slice(0,split_point);
    let R_arr = input.slice(split_point);
    let new_offset = offset+ set_offset_from;
    //console.log(offset,new_offset);
    let Sorted_L = merge_sort(L_arr,swap_orders,offset);
    let Sorted_R  = merge_sort(R_arr,swap_orders,new_offset);
    
    let Merged = merge_them(Sorted_L,Sorted_R,swap_orders,offset,new_offset);
    return Merged;
}

function merge_them(L,R,swap_orders,L_offset = 0,R_offset = 0) {
    let L_len = L.length;
    let R_len = R.length;
    let merged=[];
    let my_L = L.slice().concat(R.slice());
    //console.log(L,R,my_L,L_offset);
    let i,j,k;
    i = j = k = 0;
    let total_swaps = 0;
    let swap_j = 0;
    while (i<L_len && j<R_len){
	total_swaps+=1;
	if (L[i]< R[j]) {
	    merged[k] = L[i];
	    i++;
	    k++;
	}else{
	    merged[k] = R[j];
	    j++;
	    k++;
	}   
    }


    while (i<L_len){
	merged[k] = L[i];
	i++;
	k++;
    }
    while (j<R_len){
	merged[k] = R[j];
	j++;
	k++;
    }
    let generated_swaps =(generate_bubble_swap_orders(my_L,L_offset));
    for (var o = 0; o < generated_swaps.length; o++) {
	swap_orders.push(generated_swaps[o]);
    }
    return merged;
}

function generate_merge_swap_orders(input,swap_orders=[],offset = 0) {
    merge_sort(input,swap_orders,offset);
    return swap_orders;
}
