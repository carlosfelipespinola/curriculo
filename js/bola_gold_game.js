
var speed = 4;
var pontos = 0;//pontos
var pontoAlto = pontos;//high score
var cenaAtual=0;//indica a cena
var multi=1;//Speed multiplier, aumenta 0.05 a cada 10 pontos
var lives=2;
var blocks = [];


//objetos

var Bola = function(x,y){
    this.x = x;
    this.y = y;
};//função construtora bola
var Obstaculos = function(x,y,move,speedMove){
    this.x = x;
    this.y = y;
    this.move = move;//move up and down(true or false)
    this.speedMove = speedMove;//velocidade com que o bloco sobe ou desce
    this.inverte = -1;//indica se o block sobe ou desce
};// função construtora de obstaculos
var CaixasDificuldade = function(x, active,text,speedPara,livesPara){
    this.x = x;
    this.y = 257;
    this.active = active;
    this.text = text;
    this.speed = speedPara;//cada tipo de dificuldade tem uma velocidade
    this.lives = livesPara;//e derterminada quantidade de vida
};//função construtora das caixas de dificuldade

//metodos bola

Bola.prototype.draw = function(){
    var x;
    var y;
    x = this.x;
    y = this.y;
    fill(161, 143, 24);
    ellipse(x,y,20,20);
    
};//render ball
Bola.prototype.pula = function(){

       if(keyIsPressed && keyCode === 115){
             this.y+=7;
            if(this.y>=355){
               this.y-=10;
           } 
       }else
           if(keyIsPressed && keyCode ===  119){
                 this.y-=7;
                if(this.y<=56){
                    this.y +=10;
                }
           }
};//Ball controller
Bola.prototype.cai = function(){
    this.y+=3;
};//Makes ball falling down when game is over

//metodos obstaculos

Obstaculos.prototype.draw = function() {
    //this.y = random(0,400);
    fill(51, 173, 40);
    rect(this.x,this.y,30,50);
};//função desenha obstaculos
Obstaculos.prototype.anda = function() {
    this.x -= speed * multi;
    
    if(this.x<-200){
        this.x=width;//ao chegar a 0, reposiciona os obstaculos no pixel definido.
    }
};//move the scenario
Obstaculos.prototype.sobeDesce = function() {
        this.y = this.y - (1 * this.inverte * this.speedMove);
};//move block up and down
Obstaculos.prototype.verifica = function(){
    if(this.move===true){//as verificações são validas somente para os objetos que se movem
        if(this.y<=100){
            this.y = 102;
            this.inverte = -1;
        }else
            if(this.y>=265){
                this.y = 263;
                this.inverte = 1;
            }   
    }
        
};//verifica se deve subir ou descer

//metodo caixas de dificuldade

CaixasDificuldade.prototype.draw = function(){
    if(this.active === true)
    {
        fill(46, 92, 44);
    }else
    {
        fill(153, 130, 153,90);
    }
    //fill(cor);
    rect(this.x,257,100,40);
    fill(247, 247, 247);
    text(this.text,this.x+5,this.y+10,100,40);
   
};

CaixasDificuldade.prototype.SetActive = function(active)//Set active chosen difficulty
{
    this.active = active;
    if(this.active === true)
    {
       speed = this.speed;
       lives = this.lives; 
    }
};



//incio criando novos objetos

//bola 

var bola = new Bola(40,182);

//obstaculos


var obstaculo = new Obstaculos(400,50);
blocks.push(obstaculo);
var obstaculo2 = new Obstaculos(400,200,true,0.8);//move up and down === true speed ===1
blocks.push(obstaculo2);
var obstaculo3 = new Obstaculos(400,310);
blocks.push(obstaculo3);
var obs = new Obstaculos(600,50);
blocks.push(obs);
var obs2 = new Obstaculos(600,200,true,1.3);//move up  and down === true speed ===2
blocks.push(obs2);
var obs3 = new Obstaculos(600,310);
blocks.push(obs3);

var obs4 = new Obstaculos(800,50);
blocks.push(obs4);
var obs5 = new Obstaculos(800,200,true,1.8);//move up and down===true speed===3
blocks.push(obs5);
var obs6 = new Obstaculos(800,310);
blocks.push(obs6);


//Difficulties buttons
                             //x pos //is default?//text //speed //lives
var medium = new CaixasDificuldade(26,true,"NORMAL",4,2);
var hard = new CaixasDificuldade(141,false,"HARD",4,0);
var expert = new CaixasDificuldade(261,false,"EXPERT",6,0);
//fim criando objetos


var flagPoints = 0;//garante que sera contado apenas um ponto, toda vez q a bola passar //entre os blocos
var flagLives = 0;
var verifica = function(bolaX,bolaY,obsX,obsY,obs2X,obs2Y,obs3X,obs3Y){
    if(bolaX>obsX-1 && bolaX<obsX+30 && bolaY<obsY+60 && bolaY>obsY-50){
        
        if(flagLives===0){
            lives--;    
            flagLives=1;
        }
        if(lives<0){
            cenaAtual = 2;
            speed=0;
        }
       // cenaAtual = 2;    
        
    }else
        if(bolaX>obs2X-1 && bolaX<obs2X+30 && bolaY<obs2Y+57 && bolaY>obs2Y-8){
            //cenaAtual = 2;
            if(flagLives===0){
                lives--;    
                flagLives=1;
            }
            if(lives<0){
                cenaAtual = 2;
                speed=0;
            }
        }else
            if(bolaX>obs3X-1 && bolaX<obs3X+30 && bolaY<obs3Y+60 && bolaY>obs3Y-8){
               // cenaAtual = 2;
                if(flagLives===0){
                    lives--;    
                    flagLives=1;
                }
                if(lives<0){
                    cenaAtual = 2;
                    speed=0;
                }
            }else
                if(bolaX>=obsX && bolaX<=obsX+30 && flagPoints ===0){
                    pontos++;
                    if(pontos%10===0 && pontos !==0){
                        multi +=0.05;
                        if(multi>2.5){
                            multi=2.5;
                        }
                    }
                    flagPoints = 1;
                }else
                    if(bolaX>=obsX-30 && bolaX<=obsX-1){
                        flagPoints = 0;
                        flagLives = 0;
                    }
};//check if
//something collides with the ball and increase score

//função que renderiza o cenario
var scenarioDraw = function(){
    background(0, 0, 0);
    fill(28, 166, 60);
    rect(0,0,404,50);
    rect(0,360,404,49);
    //blocks
    for(var i in blocks){
        var block = blocks[i];
        block.draw();
        block.anda();
        if(block.move===true){
            block.sobeDesce();
            block.verifica();
        }
    }
    obstaculo2.verifica();
    //bola
    bola.draw();
    
    //lives
    fill(245, 245, 245);
    if(lives < 0){
        lives = 0;
    }
    text("Vidas = "+lives,53,17,150,50);
};//parte do cenario que esta em todas as cenas

//funcao que inicia o game

var StartGame = function()
{
    pontos = 0;
    flagPoints = 0;
    cenaAtual = 1;
    multi = 1;
    obstaculo.x = 400;
    obstaculo2.x = 400;
    obstaculo3.x = 400;
    obs.x = 600;
    obs2.x = 600;
    obs3.x = 600; 
    obs4.x = 800;
    obs5.x = 800;
    obs6.x = 800;
    bola.y = 200;
};


//cena menu principal
var scene0 = function(){
    if(pontos>pontoAlto){
        pontoAlto = pontos;
    }
    scenarioDraw();
    fill(0, 0, 0);
    textSize(20);
    
    
    //seta para cima
    fill(255, 255, 255);
   
    //textos
    text("Move the ball   ",5,147,359,359);//pra cima
    text("with W and S  ",7,202,359,359);
    text("Press any key to start",82,340,359,359);
    text("HIGH SCORE "+pontoAlto,99,56,208,100);
    
    //dificulty
    if(mouseIsPressed && mouseX>26 && mouseX<26+100 && mouseY>256 && mouseY<256+40){
        medium.SetActive(true);
        hard.SetActive(false);
        expert.SetActive(false);
    }else if(mouseIsPressed && mouseX>141 && mouseX<141+100 && mouseY>256 && mouseY<256+40){
            medium.SetActive(false);
            hard.SetActive(true);
            expert.SetActive(false);
    }else if(mouseIsPressed && mouseX>261 && mouseX<261+100 && mouseY>256 && mouseY<256+40             ){
                medium.SetActive(false);
                hard.SetActive(false);
                expert.SetActive(true);
            }

    //dificulty boxes
    medium.draw();
    hard.draw();
    expert.draw();
    
    
    //restabelece os valores de incio do game
    if(keyIsPressed){
        StartGame();
    }
};

//cena jogo
var scene1 = function(){
    scenarioDraw();
    bola.pula();
    
    //verifica se a bola encosta em um dos 9 obstaculos
    verifica(bola.x,bola.y,obstaculo.x,obstaculo.y,obstaculo2.x,obstaculo2.y,obstaculo3.x,obstaculo3.y);
    verifica(bola.x,bola.y,obs.x,obs.y,obs2.x,obs2.y,obs3.x,obs3.y);
    verifica(bola.x,bola.y,obs4.x,obs4.y,obs5.x,obs5.y,obs6.x,obs6.y);
    
    //score
    fill(255, 255, 255);
    textSize(25);
    text("Score "+pontos,274,21);
 
        
   
};
//gameOverScene
var scene2 = function(){
    scenarioDraw();
    bola.cai();
    
    //textos
    textSize(30);
    fill(255, 255, 255);
    textSize(25);
    text("Score = "+pontos,133,167);
    fill(107, 107, 107);
    
    //main menu box
    rect(118,181,136,60);
    fill(245, 245, 245);
    text("Main Menu",121,220);
    
    //game over text
    fill(255, 0, 0);
    text("GAME OVER",109,116);
    
    //chama a cena menu e restabelece os valores padrao das variaveis
    if(mouseIsPressed && mouseX>118 && mouseX<118+136 && mouseY>181 && mouseY<181+60){
            multi =1;
            medium.SetActive(true);
            hard.SetActive(false);
            expert.SetActive(false);
            bola.y = 182;
            cenaAtual = 0;
            
    }
};


var setup = function()
{
    frameRate(60);
    var cnv = createCanvas(400, 400);
    cnv.parent('canvas-holder');
    
};

function draw()
{
    if(cenaAtual === 0){
        scene0();  
   }else
        if(cenaAtual===2){
            scene2();    
        }else{
            scene1();   
        }
}