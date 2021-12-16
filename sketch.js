const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var axe, backgroundImg, stone, wood, zombie1, zombie2, zombie3, zombie4;

var stones = [];

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  axe = loadImage("./assets/axe.png");
  stone = loadImage("./assets/stone.png");
  wood = loadImage("./assets/wood.png");
  zombie4 = loadImage("./assets/zombie4.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie1 = loadImage("./assets/zombie1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(100, height / 2 + 30, 600, 200, "#8d6e63", true);
  rightWall = new Base(width - 100, height / 2 + 30, 600, 200, "#8d6e63", true);
  bridge = new Bridge(15, { x: width / 2 - 400, y: height / 2 });
  jointPoint = new Base(width - 600, height / 2 + 10, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
  var x = random(width / 2 - 200, width / 2 + 300);
  var y = random(-10, 140);
  var stone = new Stone(x, y, 80, 80);
  stones.push(stone);
  }

  zombie = createSprite(width / 5, height - 140);
  zombie.addAnimation("lefttoright", zombie1,zombie2, zombie1);
  zombie.addAnimation("righttoleft", zombie3,zombie4, zombie3);
  zombie.scale = 0.26;
  zombie.velocityX = 2;
  
  breakbutton = createButton("BreakRope",100, 100);
  breakbutton.position(width - 250, height / 2 - 1);
  breakbutton.class("breakbutton");
  breakbutton.mousePressed(handleButtonPress);
}

function draw() {
  background(51);
  Engine.update(engine);

  ground.show();
  bridge.show();
  leftWall.show();
  rightWall.show();

  for (var stone of stones) {
  stone.show();
  }
  drawSprites();
}

function handleButtonPress() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 3000);
}