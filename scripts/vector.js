class vector{
    constructor(x,y){
	this.x = x;
	this.y = y
    }
    inc_x(value){
	this.x += value;
    }
    inc_y(value){
	this.y += value;
    }
    inc_both(value){
	this.inc_x(value);
	this.inc_y(value);
    }
}

function subtract(vector_one,vector_two) {
    return new vector(vector_one.x-vector_two.x,vector_one.y-vector_two.y);
}

function gen_path(vector_first,vector_second) {
    let generated_path = [];
    let difference = subtract(vector_second,vector_first);
    let pieces = 100;
    let increment = new vector(difference.x/pieces,difference.y/pieces);
    let y_increment = 5;
    for (var i = 1; i<= pieces; i++) {
	let temp_vector;
	temp_vector = new vector(vector_first.x+i*increment.x,vector_first.y+i*increment.y);    
	generated_path.push(temp_vector);
    }
    return generated_path;
    
}

function rev_path(path){
    return path.slice().reverse();
}
