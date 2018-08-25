enchant();

//定数定義
const FPS = 60;
const CELL_HEIGHT = 10;
const CELL_WIDTH = 10;
const COLUMN = 100;
const ROW = 100;




window.onload = function () {
  ///const game = new Game(8000, 4000);
  const game = new Game(1000, 1000);
  game.fps = FPS;
  game.keybind(32, 'a'); //spaceキー
  game.flag = 1;　//0: stop, 1: run

  game.onload = function () {
    // ここに処理を書いていきます。
    //セル画像作成
    const cellSurface = new Surface(CELL_WIDTH*2, CELL_HEIGHT);
    /*
    cellSurface.context.fillStyle = 'grey';
    cellSurface.context.fillRect(0, 0, CELL_WIDTH*2, CELL_HEIGHT);
    cellSurface.context.fillStyle = 'black';
    cellSurface.context.fillRect(1, 1, CELL_WIDTH - 2, CELL_HEIGHT - 2);
    cellSurface.context.fillStyle = '#40FF00'; //黄緑
    cellSurface.context.fillRect(CELL_WIDTH + 1, 1, CELL_WIDTH - 2, CELL_HEIGHT - 2);
    */
    cellSurface.context.fillStyle = 'black';
    cellSurface.context.fillRect(0, 0, CELL_WIDTH, CELL_HEIGHT);
    cellSurface.context.fillStyle = '#40FF00'; //黄緑
    cellSurface.context.fillRect(CELL_WIDTH, 0, CELL_WIDTH, CELL_HEIGHT);


    //フィールド用のmap配列作成
    const field = new Map(CELL_WIDTH, CELL_HEIGHT);
    field.image = cellSurface;
    const fieldArray = new Array(ROW);
    for (let i = 0; i < ROW; i++){
      fieldArray[i] = new Array(COLUMN).fill(0);
    }
    field.loadData(fieldArray);
    game.rootScene.addChild(field);

    //start, stop
    game.addEventListener('inputstart', function(){
      if (game.input.a) game.flag ^= 1;
    });

    game.rootScene.addEventListener('touchstart', function(e){
      //console.log(e.x);
      fieldArray[Math.floor(e.y / CELL_HEIGHT)][Math.floor(e.x / CELL_WIDTH)] ^= 1;
      field.loadData(fieldArray);
    });

    //フレーム処理
    game.addEventListener('enterframe', function(){
      if (game.frame % 1 == 0 && game.flag){
        let tempField = JSON.parse(JSON.stringify(fieldArray));
        //const tempField = fieldArray.concat();

        for (let row = 0; row < ROW; row++){
          for (let column = 0; column < COLUMN; column++){
            let numOfAliveCells = tempField[row][(column + COLUMN - 1) % COLUMN] + //left
                              tempField[row][(column + 1) % COLUMN] + //right
                              tempField[(row + ROW - 1) % ROW][(column + COLUMN - 1) % COLUMN] + //upper left
                              tempField[(row + ROW - 1) % ROW][column] + //upper
                              tempField[(row + ROW - 1) % ROW][(column + 1) % COLUMN] + //upper right
                              tempField[(row + 1) % ROW][(column + COLUMN - 1) % COLUMN] + //lower left
                              tempField[(row + 1) % ROW][column] +  //lower
                              tempField[(row + 1) % ROW][(column + 1) % COLUMN]; //lower right
            //console.log(row, column, numOfAliveCells);
            if (tempField[row][column] == 0 && numOfAliveCells == 3) fieldArray[row][column] = 1;//誕生
            else if (tempField[row][column] == 1 && (numOfAliveCells < 2 || numOfAliveCells > 3)) fieldArray[row][column] = 0;　//過疎、過密
          }
        }
        tempField = null;
        field.loadData(fieldArray);
    }
    });

  };
  game.start();
}
