class box{
    constructor(width,height,center,value,context,path=[]){
	this.width = width;
	this.height = height;
	this.center = center;
	this.value = value;
	this.context = context;
	this.path = path;
	this.current_path_index = 0;
	this.selected = false;

    }
    draw(){
	this.context.beginPath();
	if (this.selected){
	    this.context.strokeStyle = "red";
	    this.context.lineWidth = "3";
	}else{
	    this.context.strokeStyle = "blue";
	    this.context.lineWidth = "1";
	}
	this.context.rect(this.center.x, this.center.y, this.width, this.height);
	this.context.stroke();
	this.context.fillText(this.value,this.center.x+this.width/2.3,this.center.y+this.height/1.7);
    }
    
    update(){

	if (this.path.length !=0){
	    this.selected = true;
	    if (this.current_path_index < this.path.length){
		this.center = this.path[this.current_path_index];
		this.current_path_index+=1;
	    }else{
		this.current_path_index = 0;
		this.path = [];
		this.selected = false;
	    }
	}
    }
}
