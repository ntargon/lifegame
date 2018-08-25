enchant();

//定数定義
const FPS = 60;
const CELL_HEIGHT = 10;
const CELL_WIDTH = 10;
const COLUMN = 200;
const ROW = 100;




window.onload = function () {
  const game = new Game(1000, 500);
  game.fps = FPS;
  game.keybind(32, 'a'); //spaceキー
  game.flag = 1;　//0: stop, 1: run

  game.onload = function () {
    // ここに処理を書いていきます。
    //セル画像作成
    const cellSurface = new Surface(CELL_WIDTH*2, CELL_HEIGHT);
    cellSurface.context.fillStyle = 'grey';
    cellSurface.context.fillRect(0, 0, CELL_WIDTH*2, CELL_HEIGHT);
    cellSurface.context.fillStyle = 'black';
    cellSurface.context.fillRect(1, 1, CELL_WIDTH - 2, CELL_HEIGHT - 2);
    cellSurface.context.fillStyle = '#40FF00'; //黄緑
    cellSurface.context.fillRect(CELL_WIDTH + 1, 1, CELL_WIDTH - 2, CELL_HEIGHT - 2);


    //フィールド用の配列作成(壁を含む)
    const field = new Array((ROW + 2)*(COLUMN + 2));
    //初期化
    for (let i = 0; i < (ROW + 2)*(COLUMN + 2); i++){
      field[i] = 0;
      //if (i % (ROW+2) == 0 || i % (ROW+2) == ROW+1) field[i] = 0;
      //if (i < ROW + 2 || i > field.length - 1 - (ROW+2)) field[i] = 0;
    }

    //フィールドを初期化＆描画
    const cells = new Array(ROW*COLUMN); //セルのスプライト用配列
    for (let i = 0; i < ROW*COLUMN; i++){
      cells[i] = new Sprite(CELL_WIDTH, CELL_HEIGHT);
      cells[i].image = cellSurface;
      cells[i].x = (i % COLUMN)*CELL_WIDTH;
      cells[i].y = Math.floor(i / COLUMN)*CELL_HEIGHT;
      cells[i].addEventListener('touchstart', function(){
        this.frame ^= 1;
        field[i + 1 + Math.floor(i / COLUMN)*2 + (COLUMN + 2)] = this.frame;
      });
      game.rootScene.addChild(cells[i]);
    }

    //start, stop
    game.addEventListener('inputstart', function(){
      if (game.input.a) game.flag ^= 1;
    })

    //フレーム処理
    game.addEventListener('enterframe', function(){
      if (game.frame % 10 == 0 && game.flag){
      const tempField = field.concat();
      for (let i = 0; i < ROW*COLUMN; i++){
        const offset = i + 1 + Math.floor(i / COLUMN)*2 + (COLUMN + 2);
        numOfAliveCells = tempField[offset - (COLUMN + 3)] +
                          tempField[offset - (COLUMN + 2)] +
                          tempField[offset - (COLUMN + 1)] +
                          tempField[offset - 1] +
                          tempField[offset + 1] +
                          tempField[offset + (COLUMN + 1)] +
                          tempField[offset + (COLUMN + 2)] +
                          tempField[offset + (COLUMN + 3)];
        if (tempField[offset] == 0 && numOfAliveCells == 3) field[offset] = 1; //誕生
        else if (tempField[offset] == 1 && numOfAliveCells < 2) field[offset] = 0; //過疎
        else if (tempField[offset] == 1 && numOfAliveCells > 3) field[offset] = 0; //過密
        //else field[offset] = 1; //生存
        cells[i].frame = field[offset];
      }
    }
    });
  };
  game.start();
}
