
var tileSize = 10;

var Snake = function(createVector)
{
    var _score = 0;
    
    //inicial x  y position of each square
    var _body = [createVector(10,28),createVector(10,29),createVector(10,30)];
    
    //inicial direction is up
    var _direction = createVector(0,-1);
    
    var _currentHeadPos = _body[0];
    
    var _canChangeDirection = true;
    
    
    var _checkDethByBoundary = function()
    {
        
        //println(round(width/tileSize)-1);
        if(_body[0].x >= round(width/tileSize) || _body[0].x < 0)
        {
            return true;
        }
        else if(_body[0].y >= round(height/tileSize) || _body[0].y <0)
        {
            return true;
        }
    };
    this.checkDeth = function()
    {
        if(_checkDethByBoundary())
        {
            return true;
        }
        for(var i = 1; i < _body.length; i++)
        {
            if(_body[0].x === _body[i].x && _body[0].y === _body[i].y)
            {
                return true;
            }
        }
        return false;
    };
    
    this.getPostion = function()
    {
        return _currentHeadPos;  
    };
    this.getScore = function()
    {
        return _score;  
    };
    this.scored = function(points)
    {
        _score += points;
        var newBodyPart = _body[_body.length-1];
        _body.push(newBodyPart);
    };
    
    this.drawSnake = function() {
        fill(255, 255, 255);
        for(var i = 0; i < _body.length; i++)
        {
            rect(_body[i].x * tileSize,_body[i].y * tileSize,tileSize,tileSize);
        }
    };
    this.move = function()
    {
        var nextPostion=createVector(_body[0].x + _direction.x, _body[0].y + _direction.y);
        _currentHeadPos = nextPostion;
        _body.pop();
        _body.unshift(nextPostion);
        _canChangeDirection = true;
    };
    //snake Control
    keyPressed = function()
    {
      
        if(!_canChangeDirection){return;}
        if(keyCode === 65 && !_direction.x)//left
            {
            
                _direction.x = -1;
                _direction.y = 0;
            }
            else if(keyCode === 87 && !_direction.y)//up
            {
                _direction.x = 0;
                _direction.y = -1;
            }
            else if(keyCode === 68 && !_direction.x)//right
            {
                _direction.x = 1;
                _direction.y = 0;
            }
            else if(keyCode === 83 && !_direction.y)//down
            {
                _direction.x = 0;
                _direction.y = 1;   
            }
        _canChangeDirection = false;
    };
};

var Food = function(createVector)
{
    var _foodPoints = 10;
    var _currentPos = createVector(200,200);
    
    this.getPostion = function()
    {
        var tilePosition = createVector(round(_currentPos.x/tileSize),round(_currentPos.y/tileSize));
        return tilePosition;  
    };
    this.getFoodPoints = function()
    {
        return _foodPoints;  
    };
    this.drawFood = function()
    {
        fill(0, 219, 26);
        rect(_currentPos.x,_currentPos.y,tileSize,tileSize);
    };
    this.randomizePostion = function()
    {
        var randomX = Math.round(random(0,390)/tileSize);
        var randomY = Math.round(random(20,380)/tileSize);
        _currentPos.x = randomX * tileSize;
        _currentPos.y = randomY * tileSize;
    };
};

var GameController = function(createVector,reset)
{
    var _snake = new Snake(createVector);
    var _food = new Food(createVector);
    var _gameIsOver = false;
    var _currentGameOverTextSize = 0;
    var _maxTextSize = 36;
    var currentScene = 0;
    _food.randomizePostion();
    
    
    var _drawScoreText = function()
    {
        fill(255, 255, 255);
        textSize(19);
        text("Score: "+_snake.getScore(),275,10,100,50);
    };
    
    var _gameOverScreen = function()
    {
        var x = 111;
        var y = 150;
        var maxTextSize = 36;
            
        if(_currentGameOverTextSize < _maxTextSize)
        {
            _currentGameOverTextSize+=2;
                
        }else
        {
            textSize(17);
            fill(255, 255, 255);
            textAlign(CENTER,CENTER);
            text("press any key to restart",320,230);
            if(keyIsPressed)
            {
                reset();
            }
        }
        var maxWidth = 213;
        var gameOverXPos = 430;
        var gameOverYPos = 100;
        fill(255, 0, 0);
        textSize(_currentGameOverTextSize);
        textAlign(CENTER,CENTER);
        text("Game over",x,y,gameOverXPos,gameOverYPos);
        
    };
    
    var _checkSnakeFoodCollision = function()
    {
     
        if(_snake.getPostion().x === _food.getPostion().x && _snake.getPostion().y ===    _food.getPostion().y)
        {
            _food.randomizePostion();
            _snake.scored(_food.getFoodPoints());
            //playSound(getSound("retro/coin"));
        }
    };
    
    var _preGameplayScene = function(){
        fill(255,255,255);
        textSize(20);
        textAlign(CENTER);
        text("Use as awsd para jogar",320, 320);
        text("pressione qualquer tecla para iniciar", 320,350);
        _snake.drawSnake();
        if(keyIsPressed){
            currentScene = 1;
        }
    }

    var _gameplayScene = function()
    {
        _food.drawFood();
        _snake.drawSnake();
        if(!_gameIsOver)
        {
            _snake.move();
            _checkSnakeFoodCollision();
            if(_snake.checkDeth())
            {
                _gameIsOver = true;
            }
        }else
        {
            _gameOverScreen();
            
        }
        _drawScoreText();
    };
    
    this.runGame = function()
    {
        if(currentScene === 0)
        {
            _preGameplayScene();
        }else{
            _gameplayScene();
        }
    };
    
};


var gameController;



var setup = function()
{
    frameRate(15);
    var cnv = createCanvas(640, 480);
    cnv.parent('canvas-holder');
    gameController = new GameController(createVector,setup);
    
};

function draw()
{
    background(0, 0, 0);
    gameController.runGame();
}