enchant();
window.onload = function () {
  var game = new Game(600, 600);

  game.fps = 60;



  game.onload = function () {
    // ここに処理を書いていきます。

    var live = new Sprite(20, 10);
    var surface = new Surface(20, 10);
    surface.context.fillStyle = 'grey';
    surface.context.fillRect(0, 0, 20, 10)
    surface.context.fillStyle = '#40FF00';
    surface.context.fillRect(1, 1, 8, 8);
    surface.context.fillStyle = 'black';
    surface.context.fillRect(11, 1, 8, 8);
    live.image = surface;
    game.rootScene.addChild(live);


    game.rootScene.backgroundColor = 'blue';

    var map = new Map(10, 10);
    map.image = surface;
    var baseMap = [
      [ 1, 1, 1],
      [ 0, 0, 0],
      [ 1, 0, 1]
    ];
    map.loadData(baseMap);
    game.rootScene.addChild(map);

  };
  game.start();
}
