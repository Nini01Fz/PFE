var width=160;//640 160
var height=120;//480 120
var TreeLine=999;
var Jumpcounter =999; 
var dinopos=0;
var treecounter=0;
var treepos=0;
var health=50;
var frame=0;
var gamePaused = true; // Variable to track game state
var firstInteraction = false;

let palette = [0,0, 0,//0
               0,0, 255,//3
               0,255,0, //6
               0,255,255,//9
               255,0,0,//12
               255,0,255,//15
               255,255,  0,//18
               255,255,255];//21

let GameOver =  " 111   1    1 1   111     1   1 1  111  111"+
                "1     1 1  1 1 1  1      1 1  1 1  1    1 1"+
                "1     111  1 1 1  111    1 1  1 1  111  111"+ 
                "1  1  1 1  1 1 1  1      1 1   1   1    11 "+
                " 111  1 1  1   1  111     1    1   111  1 1";  
            
                
let numbers =   " 1   1   1  111 1 1 111 111 111 111 111 "+
                "1 1  1  1 1   1 1 1 1   1     1 1 1 1 1 "+
                "1 1  1    1 111 111 111 111  1  111 111 "+ 
                "1 1  1   1    1   1   1 1 1 1   1 1  1  "+
                " 1   1  111 111   1 111 111 1   111 1   ";  
         

let tree = "    1    "+
           "   111   "+
           "    1    "+
           "  11111  "+
           "    1    "+
           " 1111111 "+
           "    1    "+
           " 1111111 "+
           "    1    "+
           "    1    "+
           "    1    ";

let dino1 =  "        1111 "+  
             "       1 1111"+ 
             "       111111"+   
             "       111111"+    
             "       11    "+    
             "       111   "+         
             "1     111 11 "+                   
             "11   1111    "+                     
             "111 11111    "+   
             "111111111111 "+   
             " 11111111  1 "+   
             " 11111111    "+   
             "  1111111    "+   
             "   11 111    "+   
             "  11   1     "+  
             "  1    1     "+  
             " 11    11    "; 
     

let dino2 = "        1111 "+ 
            "       1 1111"+ 
            "       111111"+   
            "       111111"+    
            "       11    "+    
            "       11111 "+        
            "      111    "+                  
            "1    1111    "+                    
            "111 11111    "+  
            "111111111111 "+  
            "111111111  1 "+  
            " 11111111    "+  
            "  111111     "+  
            "   11 11     "+  
            "   11 1      "+  
            "    1 1      "+ 
            "    1111     ";         
            
let jumpdata=[0,3,6,8,11,13,15,17,18,20,21,22,23,23,24,24,24,
              24,23,23,22,21,20,18,17,15,13,11,8,6,3];


let trees=[100,64,50,50,64,7,64,7,64,
           90,64,50,50,64,7,64,7,64,
           80,64,7,50,64,7,64,7,64,
          70,64,50,50,64,7,64,7,64,
           60,7,50,7,64,7,64,7,64,
           50,64,40,50,64,7,64,7,64,
           50,64,50,7,64,7,35,7,64,
          50,64,50,50,64,7,64,7,64,
            50,64,30,50,64,7,64,7,64,
           50,64,7,25,64,7,64,7,64,
          50,64,7,50,64,7,25,7,64,
           50,64,7,30,64,7,64,7,64,
           50,64,7,20,64,7,25,7,64,
           50,64,7,25,64,7,64,7,7];

                                            

//Do not change
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d",{ alpha: false });
var imgData = ctx.createImageData(width, height);
var myarray = new Int8Array(width*height);


window.addEventListener('keydown', function(e){ 
  if (e.keyCode==32 && dinopos==0)
      Jumpcounter=0;
  
  if (e.keyCode==32 && health<-1000)
    Init();
    if (!firstInteraction) {
      // Start the game if it's the first interaction
      startGame();
  }
}); 

window.addEventListener("mousedown", function(){
  if ( dinopos==0)
      Jumpcounter=0;
  if ( health<-1000)
    Init();
    if (!firstInteraction) {
      // Start the game if it's the first interaction
      startGame();
  }
}); 

window.addEventListener("touchstart", function(){
  if ( dinopos==0)
      Jumpcounter=0;
  if ( health<-1000)
    Init();
    if (!firstInteraction) {
      // Start the game if it's the first interaction
      startGame();
  }
}); 

function startGame() {
  gamePaused = false; // Set game state to not paused
  firstInteraction = true; // Set first interaction flag
  requestId = window.requestAnimationFrame(animate); // Start animation
}

animationStartTime = window.performance.now();
requestId = window.requestAnimationFrame(animate);

Init();
//***********************************************
//***********************************************
//***********************************************

function pixel(ax,ay,i){  
    imgData.data[ax*4+ay*160*4] = palette[i];
    imgData.data[ax*4+ay*160*4+1] = palette[i+1];
    imgData.data[ax*4+ay*160*4+2] = palette[i+2]; 
    imgData.data[ax*4+ay*160*4+3] = 255;   
}

function Init(){  
   TreeLine=999;
   Jumpcounter =999; 
   dinopos=0;
   treecounter=0;
   treepos=0;
   health=50;
   frame=0;
   for (j = 0; j < height; j ++)           
     for (i = 0; i < width; i ++)          
       myarray[i+j*width]=0;   
  
  for (x = 0; x < 160; x ++)   
    for (j = 100; j < 120; j ++)        
      myarray[x+j*width]=(1+Math.floor(Math.random()*3))*3;   
  
   var ofsa=0;
   for (j = 0; j < height; j ++) 
    for (i = 0; i < width; i ++)
     {                            
           imgData.data[ofsa++] = 0;
           imgData.data[ofsa++] = 0;
           imgData.data[ofsa++] = 0;
           imgData.data[ofsa++] = 255;                
     }         
}

function animate()
{
  var i,j;   
  var ofsa=0  
  var idx=0;
  var src=0;
  if (!gamePaused) {
  if (health>=0)
    {  
    //********** shift field *******
      for (j = 0; j < height; j ++)    
      {
        var a=j*width;
        var b=1+j*width;
        for (i = 0; i < width-1; i ++)          
          myarray[a++]=myarray[b++];                 
      }  
    
     //**** create ground ********
    for (j = 100; j < 120; j ++)        
      myarray[159+j*width]=(1+Math.floor(Math.random()*3))*3;    
  }
  else
    {
      //***** draw Game Over *****
      health--;
      for (var y = 0; y < 5; y ++) 
       for (var x = 0; x<GameOver.length / 5; x ++)    
         if (GameOver[x+y*GameOver.length / 5]=="1")
           myarray[60+x+(40+y)*width]=6;         
    }
  
//***** draw tree ******
if (treecounter==trees[treepos])
  {
    treepos++; 
    TreeLine=0;  
    treecounter=0;
  }
  
if (TreeLine<9) 
  for (j = 0; j < 11; j ++)      
    if (tree[TreeLine+j*9]=="1")
     myarray[159+(89+j)*width]=6;
    else 
     myarray[159+(89+j)*width]=0;
       
//******* Draw background to image *******    

for (j = 0; j < height; j ++) 
    for (i = 0; i < width; i ++)
     {                   
           idx=myarray[src++];
           imgData.data[ofsa++] = palette[idx++];
           imgData.data[ofsa++] = palette[idx++];
           imgData.data[ofsa++] = palette[idx]; 
           imgData.data[ofsa++] = 255;                
     }  
  
  var collision=false;
  
  //******Draw dino to image ********
  if (Jumpcounter<jumpdata.length)   
    dinopos = jumpdata[Jumpcounter];  
  else
    dinopos = 0;
  
  idx=18;
  for (j = 0; j < 17; j ++) 
    for (i = 0; i < 13; i ++)                 
        if ( ( (dino1[i+j*13]=="1") && ((frame & 8) ==8) ) ||
          ( (dino2[i+j*13]=="1") && ((frame & 8) ==0 ) ) )
          {                 
           if (imgData.data[(40+i)*4+(83+j-dinopos)*160*4+1]!=0)  
             {
              idx=12;  
              collision=true; 
               health--;
             }             
            pixel(40+i,83+j-dinopos,idx);             
          }           
    
  
    //********* draw health bar *********
  for (var y = 0; y < 5; y ++) 
    for (var x= 0; x < 50; x ++)   
      {
        if( x==0 || y==0 || x==49 || y==4)
            idx=18;
          else
            {
              if (x>health || y==1 || y==3)
                idx=0;   
              else
                idx=6;   
            }                  
           pixel(40+x,1+y,idx);           
      }             
  
   //********* draw score *********
  for (var d=0;d<5;d++)
  {
    var digit = String(100000+frame).charAt(1+d);                    
  for (var y = 0; y < 5; y ++) 
    for (var x= 0; x < 3; x ++)   
      {          
           if (numbers[x+digit*4+y*40]=="1")
             idx=21;
           else
             idx=0;                 
          pixel(135+d*4+x,1+y,idx);  
      }     
  }
  
  ctx.putImageData(imgData, 0, 0);    
    
  //New Frame
  requestId = window.requestAnimationFrame(animate);
  
  if (health>=0)
    {
      frame++;
      TreeLine++;
      Jumpcounter++;
      treecounter++;
      var scoreDiv = document.getElementById('score2');
            // Update the inner content with the current score
            scoreDiv.textContent = " Score: " + frame;
    }  
  }
}

