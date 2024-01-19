// ボールを格納する配列
Ball[]balls=new Ball[150];

// カメラ位置の座標
        float camX=0;
        float camY=0;
        float camZ=500;

        void setup(){
        size(640,480,P3D);

        // 初期化
        for(int i=0;i<balls.length;i++){
        balls[i]=new Ball(random(-width/2,width/2),random(-height/2,height/2),random(-200,200),random(10,30));
        }

        // 光源の設定
        lights();
        }

        void draw(){
        background(30,30,30);

        // カメラの移動
        camera(camX,camY,camZ,0,0,0,0,1,0);

        // ボールの描画
        for(int i=0;i<balls.length;i++){
        balls[i].move();
        balls[i].draw();
        }
        }

// マウスドラッグでカメラを回転させる
        void mouseDragged(){
        float rotX=map(mouseX-pmouseX,0,width,-PI,PI);
        float rotY=map(mouseY-pmouseY,0,height,-PI,PI);
        rotateX(rotY);
        rotateY(rotX);
        }

// キー入力でカメラを移動する
        void keyPressed(){
        if(keyCode==UP)camY+=10;
        if(keyCode==DOWN)camY-=10;
        if(keyCode==LEFT)camX-=10;
        if(keyCode==RIGHT)camX+=10;
        if(key=='+')camZ+=10;
        if(key=='-')camZ-=10;
        }

// ボールクラス
class Ball {
    float x, y, z;    // 位置座標
    float vx, vy, vz; // 速度
    float r;          // 半径
    color c;          // 色

    Ball(float x, float y, float z, float r) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.r = r;
        this.vx = random(-2, 2);
        this.vy = random(-2, 2);
        this.vz = random(-2, 2);
        this.c = color(random(255), random(255), random(255), 200);
    }

    // ボールの動きを更新する
    void move() {
        x += vx;
        y += vy;
        z += vz;

        // 画面外に出たら反転する
        if (x < -width / 2 || x > width / 2) vx *= -1;
        if (y < -height / 2 || y > height / 2) vy *= -1;
        if (z < -200 || z > 200) vz *= -1;

// ボールが爆発する
        if (random(1) < 0.0005) {
            explode();
        }
    }

    // ボールを描画する
    void draw() {
        pushMatrix();
        translate(x, y, z);
        noStroke();
        fill(c);
        sphere(r);
        popMatrix();
    }

    // ボールが爆発する
    void explode() {
        for (int i = 0; i < 5; i++) {
            float newR = r / 2;
            Ball newBall = new Ball(x, y, z, newR);
            newBall.vx = random(-5, 5);
            newBall.vy = random(-5, 5);
            newBall.vz = random(-5, 5);
            balls = (Ball[]) append(balls, newBall);
        }
        r = 0;
    }
}



