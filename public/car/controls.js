class Controls{
    constructor(){
        this.forward = false; 
        this.left = false; 
        this.right = false; 
        this.reverse = false;
        this.#addKeyboardListeners(); //Detect when keyboard is pressed with private method

    }
    #addKeyboardListeners(){
        //When each key is pressed
        document.onkeydown = (event) =>   
        {
            switch(event.key) 
            {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true; 
                    break; 
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }
        //When each key is released
        document.onkeyup = (event) =>   
        {
            switch(event.key) 
            {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false; 
                    break; 
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }
    }
}