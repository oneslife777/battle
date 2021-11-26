
// 基礎変数
const SCREEN_W = 512;
const SCREEN_H = 256;
let mainctx,actx;
let info_msg="Jキーを押してバトルを進めよう！";
let player_msg=" ";
let enemy_msg=" ";
let player_info;
let enemy_info;

// 汎用ランダム変数
let randam=0;

// キーボード関連
let keydownflag=false;
let keyupcount=0;

// ターン管理
let turn=1;
let player_turn = turn%2==1;
let enemy_turn = turn%2==0;

// バー管理
let barmove=false;
let bar_position = [0,1];
let bar_count=0;
// バー速度
let speed=0;
// バー加速値 
let go = 7;
let stop = 0;
let addition=go;


// プレイヤーバー
let blue_bar = [0,1,2,3];
let gold_bar = [0,1,2,3];
let orange_bar = [0,1,2,3];
let red_bar = [0,1];

// エネミーバー
let dred_bar = [0,1,2,3];
let white_bar = [0,1,2,3];

// メッセージ関連変数
let msg_position = 0;
let turnmsg=false;
let msg_count=0;

// アニメーション関連
let animeflag = false;
let anime_count = 0;

// 敵体力ポイント
let enemy_hp = 1500;
//let enemy_hp = 50;

// ダメージ関連
let damage_msg;
let damage = 0;
let str_damage='';

// ダメージ位置高
let damage_hundreds = 210;
let damage_tens = 210;
let damage_ones = 210;

// ダメージ用文字
let ones = '';
let tens = '';
let hundreds = '';

// ソウルスティール動作関連
let enemy_atk=1;
let atk_count=0;
let fai = 1;
let alpha=0.9;
let fai_flag=false;
let atk_distance=290;
let atk_x=110;
let atk_y=150;
let atk_dis1=25;
let atk_dis2=50;
let atk_dis3=75;

let p_deadflag=false;
let e_deadflag=false;

let gameover=false;
let gameclear=false;

let end_count=0;
let back_color=[255,255,255,0.9];
let white_out=false;

let i=0;
let j=0;

let x_array=[];
let y_array=[];

let vanish=0;

let p_move=0;
let player_x=360;
let player_y=140;
let closeout=false;

let timing_flag=false;

let black_out=0.1;

// ターン切り替え時の変数リセット処理
function turnchange(){
    turn++;
    player_turn = turn%2==1;
    enemy_turn = turn%2==0;
    keyupcount=0;
    barflag=false;
    animeflag=false;
    speed=0;
    addition=go;
    barmove=false;
    msg_count=0;
    msg_position=0;
    damage=0;
    ones='';
    tens='';
    hundreds='';
    damage_hundreds=210;
    damage_tens=210;
    damage_ones=210;
    anime_count=0;
    str_damage='';
    bar_count=0;
    fai_flag=false;
    fai = 1;
    alpha=0.9;
    atk_distance=290;
    atk_dis1=25;
    atk_dis2=50;
    atk_dis3=75;
    info_msg=" "
    player_msg="";
    enemy_msg="";
    p_move=0;
    closeout=false;
    
    timing_flag=false;
    atk_count=0;
    player_x=360;
    player_y=140;
    

    // enemyturn２回目以降
    if(turn>=4&&enemy_turn){
        do{
            randam=Math.floor( Math.random() * 4 ) + 1;
        }while (enemy_atk == randam)
    
        enemy_atk=randam
    }

}


window.onload = function MainSystem(){
    
    // let player_turn;
    // let enemy_turn;
    
    // htmlの要素取り込み
    const mainscreen = document.getElementById('mainscreen');
    mainscreen.width = SCREEN_W;
    mainscreen.height = SCREEN_H;
    const atk_screen = document.getElementById('atk_screen');
    atk_screen.width = SCREEN_W;
    atk_screen.height = 20;
    
    // コンテキスト取得
    mainctx = mainscreen.getContext('2d');
    actx = atk_screen.getContext('2d');
    
    // イベントの登録（キー操作）
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener("keyup", keyUp, true);
    
    
    // msg_position=msg_position+2;
    
    // 画面上でボタン押下時処理実行させるように
    if(barmove){
        speed=speed+addition;
    }
    
    pixelart("background",SCREEN_W,SCREEN_H,0,0);

    if((end_count>=124)==false){
        pixelart("enemy",134,106,50,100);
    }

    // if(enemy_turn && animeflag && !p_deadflag){
    if(player_turn && animeflag && !p_deadflag){
        atk_count++;
        if(player_msg=="「ベーシックナギラテジー！」"||str_damage=='ミス'){
            if(atk_count<=10){
                pixelart("p_motion1",54,40,player_x,player_y);
            }else if(atk_count>=11&&atk_count<=30){
                player_x=player_x-6;
                pixelart("p_motion2",54,40,player_x,player_y);
            }else if(atk_count>=31&&atk_count<=31){
                pixelart("p_motion3",54,40,player_x,player_y);
                mainctx.beginPath() ;
                mainctx.moveTo( 155, 120 ) ;
                mainctx.lineTo( 105, 170 )
                mainctx.strokeStyle = "white" ;
                mainctx.lineWidth = 2 ;
                mainctx.stroke() ;
            }else if(atk_count>=32&&atk_count<=50){
                pixelart("p_motion1",54,40,player_x,player_y);
            }else if(atk_count>=51){
                timing_flag=true;
                if(player_x!=360){
                    player_x=player_x+6;
                }
                pixelart("player",54,40,player_x,player_y);
            }
        }else if(player_msg=="「千年バカラ！」"||"「デッドオアアライブ！！」"){
            if(atk_count<=20){
                player_x=player_x-3;
                pixelart("player",54,40,player_x,player_y);
            }else if(atk_count>=21&&atk_count<=30){
                player_x=player_x-10;
                pixelart("p_motion1",54,40,player_x,player_y);
            }else if(atk_count>=31&&atk_count<=40){
                pixelart("p_motion4",54,40,player_x,player_y);
            }else if(atk_count>=41&&atk_count<=41){
                pixelart("p_motion6",54,40,player_x,player_y);
                
                
            }else if(atk_count>=42&&atk_count<=55){
                pixelart("p_motion1",54,40,player_x,player_y);
            }else if(atk_count>=56){
                if(atk_count>=57){
                    alpha=alpha-0.1;
                }
                mainctx.fillStyle = 'rgba(255,255,0,'+ alpha +')';
                mainctx.arc(175, 125, 50, 90, Math.PI * 1);
                mainctx.fill();
                timing_flag=true;
                
                if(player_x!=360){
                    player_x=player_x+10;
                    if(player_x>=360){
                        player_x=360;
                    }
                }
                pixelart("player",54,40,player_x,player_y);
            }
        }
    }


    else if(enemy_turn && animeflag && !p_deadflag){
        if(p_move>10&& closeout){
            p_move = p_move - 3;
            pixelart("player",54,40,player_x+p_move,player_y);
        }else if(p_move<=10&& closeout){
            pixelart("player",54,40,player_x,player_y);
        }else if(p_move<=39 && !closeout){
            p_move = p_move + 3;
            pixelart("player",54,40,player_x+p_move,player_y);
        }else if(p_move>=40&&p_move<=200&& !closeout){
            pixelart("p_motion5",54,40,player_x+60,player_y);
            closeout=true;
        // }else if(p_move<=200){
        }
    }else{
        pixelart("player",54,40,player_x,player_y);
    }

    if(gameover||gameclear){
        end_count++ 
        if(gameover){
            enemy_msg="";
            player_msg = "「カジノとかクソゲーやないか...」";

            pixelart("p_motion7",54,40,360,140);

            mainctx.beginPath();
            mainctx.fillStyle = 'rgba('+back_color[0]+','+back_color[1]+','+back_color[2]+','+back_color[3]+')';
            mainctx.fillRect(0,0,SCREEN_W,SCREEN_H);

            if(back_color[3]<=0.9 && back_color[3] > 0 && !white_out){
                back_color[3] = back_color[3]-end_count/1000;
            }else if(back_color[3] <= 0){
                white_out=true;
                // back_color[3] = 1.0;
            }

            if(white_out){
                for(let i=0; i<3; i++){
                    back_color[i] = back_color[i]-5;
                }
                back_color[3] = back_color[3]+end_count/10000;
                
                if(back_color[3]>=1){
                    player_msg = "";
                    info_msg='ブラウザを更新して再戦ッッ！！';
                    mainctx.font = '30pt Arial';
                    mainctx.fillStyle = 'DarkRed';
                    mainctx.fillText('ぽぴん', 10, 50);
                }

            }

        }
    
        if(gameclear){
            player_x=360;
            // enemy_msg = "「こ、こんなはずでは...」";
            mainctx.beginPath();
            mainctx.fillStyle = 'rgba(220,220,220,255)';
            // 10,5,1間隔

            if(end_count<=20){
                vanish=6;
            }else if(end_count>=21&&end_count<=50){
                vanish=4;
                reset();
            }else if(end_count>=51&&end_count<=120){
                vanish=3;
                reset();
                enemy_msg = "「な、なぎらさんがこんなに強いなんて...」";
            }else if(end_count>=121&&end_count<=121){
                vanish=2;
                reset();
            }else if(end_count>=122&&end_count<=124){
                enemy_msg = "";
            }else if(end_count>=125+100&&end_count<=127+100){
                pixelart("player",54,40,player_x,player_y);
            }else if(end_count>=128+100&&end_count<=130+100){
                pixelart("p_motion5",54,40,player_x,player_y);
            }else if(end_count>=131+100&&end_count<=133+100){
                pixelart("player",54,40,player_x,player_y);
            }else if(end_count>=134+100&&end_count<=136+100){
                pixelart("p_motion5",54,40,player_x,player_y);
            // }
            }else if(end_count>=137+100&&end_count<=139+100){
                pixelart("player",54,40,player_x,player_y);
            }else if(end_count>=140+100&&end_count<=142+100){
                pixelart("p_motion5",54,40,player_x,player_y);
            }else if(end_count>=143+100&&end_count<=145+100){
                pixelart("player",54,40,player_x,player_y);
            }else if(end_count>=146+100&&end_count<=148+100){
                pixelart("p_motion5",54,40,player_x,player_y);
            }else if(end_count>=146+100){
                pixelart("p_motion1",54,40,player_x,player_y);
            }
            
            // if(end_count>=124){
            //     mainctx.fillRect(50,100,134,106);
            // }

            if(end_count>=196+200){
                mainctx.beginPath();
                black_out=black_out+0.1;
                mainctx.fillStyle = 'rgba(0,0,0,'+ black_out +')';
                mainctx.fillRect(0,0,SCREEN_W,SCREEN_H);
                // mainctx.fillRect(0,0,SCREEN_W,SCREEN_H);

                mainctx.font = '25pt Arial';
                mainctx.fillStyle = 'yellow';
                // mainctx.fillText('GAMECLEAR!', 10, 50);
                mainctx.fillText('Congratulation！', 10, 50);
                mainctx.fillText('なぎらさんは資金を取り戻した！！', 10, 110);
                // mainctx.font = '5pt Arial';
                // mainctx.fillStyle = 'white';
                mainctx.fillText('oneslife project', 280, 240);


            }else{
                
                while(i<=134 || j<=106){
                    // 引数,間値10,x,y,
                    if(i<=134){
                        i=i+vanish;
                        x_array.push(i);
                    }
                    if(j<=106){
                        j=j+vanish;
                        y_array.push(j);
                    }
                }
    
                for(let i=0;i<x_array.length;i++){
                    mainctx.fillRect(50+x_array[i],100,1,106);
                }
                for(let j=0;j<y_array.length;j++){
                    mainctx.fillRect(50,100+y_array[j],134,1);
                }

            }

            function reset(){
                i=0;
                j=0;
                x_array=[];
                y_array=[];
            }
            
        }
    }

    // エレメント関連（index.html Pタグ取得）
    info = document.getElementById('info');
    player_info = document.getElementById('player');
    enemy_info = document.getElementById('enemy');
    info.innerHTML = info_msg;
    player_info.innerHTML = player_msg;
    enemy_info.innerHTML = enemy_msg;
    
    // ターンメッセージ処理
    
    // if(turnmsg && turn % 2 == 1){
    if(turnmsg && player_turn){
            
            msg_count++;
            
            mainctx.font = '15pt Arial';
            mainctx.fillStyle = 'white';
        if(msg_position >= 0 && msg_count <= 80){
            if(msg_position < 46){
                msg_position=msg_position+2;
            }
        }else if(msg_count > 70){
            msg_position=msg_position-2;
        }
        mainctx.fillText('PlayerTurn', 10, 300-msg_position);

    }else if(turnmsg && enemy_turn){

        msg_count++;

        mainctx.font = '15pt Arial';
        mainctx.fillStyle = 'DarkRed';
        if(msg_position >= 0 && msg_count <= 80){
            if(msg_position < 46){
                msg_position=msg_position+2;
            }
        }else if(msg_count > 70){
            msg_position=msg_position-2;
        }
        mainctx.fillText('EnemyTurn', 5, 300-msg_position);
    }


    // バーの動作処理
    
    if(player_turn){
    
        actx.beginPath();
        actx.fillStyle = 'LightSteelBlue';
        actx.fillRect(0,0,180,20);
        actx.fillRect(334,0,180,20); 
        blue_bar = [0,180,334,334+180];
        
        actx.fillStyle = 'Gold';
        actx.fillRect(181,0,65,20);
        actx.fillRect(268,0,65,20);
        gold_bar = [181,181+65,268,268+65];
        
        actx.fillStyle = 'orange';
        actx.fillRect(247,0,7,20);
        actx.fillRect(260,0,7,20);
        orange_bar = [247,247+7,260,260+7];
        
        actx.fillStyle = 'red';
        actx.fillRect(255,0,4,20);
        red_bar = [255,255+4];
        
        // 外枠
        actx.strokeStyle = 'black';
        actx.lineWidth = 3;
        actx.strokeRect(0,0,512,20);
    
    }else if(enemy_turn){

        // バー動作中
        if(addition!=stop){
            bar_count++;
            randam = Math.floor( Math.random() * 5 );
        }

        actx.beginPath();
        actx.fillStyle = 'DarkRed';
        actx.fillRect(0,0,512,20);
        // actx.fillRect(273,0,240,20);
        dred_bar = [0,240,273,273+240];


        actx.fillStyle = 'white';
        
        //攻撃パターン何種類か
        switch(enemy_atk){

            case 1:
                actx.fillRect(241,0,32-turn,20);
                white_bar = [241,241+32-turn];
                break;

            case 2:
                actx.fillRect(200+bar_count,0,32-turn,20);
                white_bar = [200+bar_count,200+bar_count+32-turn];
                break;

            case 3:
                // randam = Math.floor( Math.random() * 5 );
                actx.fillRect(230+randam,0,15,20);
                actx.fillRect(260+randam,0,15,20);
                white_bar = [230+randam,230+randam+15,260+randam,260+randam+15];
                break;

            case 4:
                if(bar_count <= 100){
                    actx.fillRect(100,0,32-turn,20);
                    white_bar = [100,100+32-turn];
                }else if(bar_count >= 101 && bar_count <= 200){
                    actx.fillRect(400,0,32-turn,20);
                    white_bar = [400,400+32-turn];
                }else if(bar_count >= 201 && bar_count <= 300){
                    actx.fillRect(250,0,32-turn,20);
                    white_bar = [250,250+32-turn];
                }else if(bar_count >= 301 && bar_count <= 400){
                    actx.fillRect(100,0,32-turn,20);
                    white_bar = [100,100+32-turn];
                }else if(bar_count >= 401 && bar_count <= 500){
                    actx.fillRect(400,0,32-turn,20);
                    white_bar = [400,400+32-turn];
                }else if(bar_count >= 501 && bar_count <= 600){
                    actx.fillRect(250,0,32-turn,20);
                    white_bar = [250,250+32-turn];
                }else if(bar_count >= 601 && bar_count <= 700){
                    actx.fillRect(250,0,32-turn,20);
                    white_bar = [250,250+32-turn];
                }else if(bar_count >= 701){
                    bar_count=0;
                }
                
                break;

        }
        actx.strokeStyle = 'black';
        actx.lineWidth = 3;
        actx.strokeRect(0,0,512,20);
    
    }


    
    actx.fillStyle = 'black';
    
    if(barmove && player_turn){
        let bar_st = SCREEN_W-speed;
        actx.fillRect(bar_st,0,3,20);
        bar_position = [bar_st,bar_st+3];
        if(animeflag && timing_flag){

            anime_count++;

            // 攻撃アニメーション
            // pixelart();
            // ダメージエフェクト処理
            if(str_damage=='ミス'){
                mainctx.font = '9pt Arial';
            }else{
                mainctx.font = '10pt Arial';
            }
            // mainctx.font = '10pt Arial';
            mainctx.fillStyle = 'black';

            if(anime_count>=10&&anime_count<=17){
                damage_hundreds=damage_hundreds-1.3;
            }else if(anime_count>=19&&anime_count<=26){
                damage_hundreds=damage_hundreds+1.3;
            }else if(anime_count>=28){
                damage_hundreds=210;
            }
            mainctx.fillText(hundreds, 100, damage_hundreds);

            if(anime_count>=16&&anime_count<=23){
                damage_tens=damage_tens-1.3;
            }else if(anime_count>=25&&anime_count<=32){
                damage_tens=damage_tens+1.3;
            }else if(anime_count>=34){
                damage_tens=210;
            }
            mainctx.fillText(tens, 110, damage_tens);

            if(anime_count>=22&&anime_count<=29){
                damage_ones=damage_ones-1.3;
            }else if(anime_count>=31&&anime_count<=38){
                damage_ones=damage_ones+1.3;
            }else if(anime_count>=40){
                damage_ones=210;
            }
            mainctx.fillText(ones, 120, damage_ones);
            
            // mainctx.fillText(tens, 100, 200);
            // mainctx.fillText(ones, 110, 200);

        }
    }else if (barmove && enemy_turn){
        let bar_st = speed;
        actx.fillRect(bar_st,0,3,20);
        bar_position = [bar_st,bar_st+3];
        // ターン数増加で攻撃増える
        // actx.fillRect(speed-50,0,3,30);
        // actx.fillRect(speed-100,0,3,30);
        if(animeflag){
            // pixelart();

            enemy_msg = "「マネースティール」";

            mainctx.beginPath();
            mainctx.fillStyle = 'rgba(120,0,0,0.6)';
            
            // ソウルスティール大円
            if(fai<=90 && !fai_flag){
                fai = fai+5;
                if(fai>=90){
                    fai = 90;
                }
            // }else if(fai_flag && anime_count>100){
            }else if(fai_flag){
                fai = fai-5;
                if(fai<=0){
                    
                    anime_count++;

                    fai = 0;
                    mainctx.font = '10pt Arial';
                    mainctx.fillStyle = 'Red';
        
                    if(anime_count>=10&&anime_count<=17){
                        damage_tens=damage_tens-1.3;
                    }else if(anime_count>=19&&anime_count<=26){
                        damage_tens=damage_tens+1.3;
                    }else if(anime_count>=28){
                        damage_tens=210;
                    }
                    mainctx.fillText(tens, 390, damage_tens);

                    // damage_ones
                    if(anime_count>=16&&anime_count<=23){
                        damage_ones=damage_ones-1.3;
                    }else if(anime_count>=25&&anime_count<=32){
                        damage_ones=damage_ones+1.3;
                    }else if(anime_count>=34){
                        damage_ones=210;
                    }
                    mainctx.fillText(ones, 400, damage_ones);        

                }
            }
            
            // mainctx.arc( atk_x, atk_y, fai, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
            mainctx.arc( atk_x, atk_y, fai, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
            mainctx.fill() ;

            // if(fai>=60 && anime_count>30){
            if(fai>=60){
                // anime_count-30;
                mainctx.beginPath();
                mainctx.fillStyle = 'rgba(100,0,0,' + alpha + ')';
                if(atk_distance>=0){
                    // atk_count = anime_count-30;
                    atk_distance = atk_distance-10;
                    if(atk_distance<=0){
                        atk_distance = 0;
                        if(atk_dis3 == 0){
                            alpha -= 0.1;
                            if(alpha<=0){
                                fai_flag=true;
                            }
                        }
                    }
                }
                mainctx.arc( atk_x+atk_distance, atk_y, 15, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;

                if(atk_distance<265){
                    if(atk_distance==0 && atk_dis1 != 0){
                        atk_dis1=atk_dis1-5;
                    }
                    mainctx.arc( atk_x+atk_distance+atk_dis1, atk_y, 12, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
                }
                if(atk_distance<240){
                    if(atk_distance==0 && atk_dis2 != 0){
                        atk_dis2=atk_dis2-5;
                    }
                    mainctx.arc( atk_x+atk_distance+atk_dis2, atk_y, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
                }
                if(atk_distance<215){
                    if(atk_distance==0 && atk_dis3 != 0){
                        atk_dis3=atk_dis3-5;
                    }
                    mainctx.arc( atk_x+atk_distance+atk_dis3, atk_y, 8, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
                }

                mainctx.fill() ;
            }
        }
    }
    
    if(true){
        window.requestAnimationFrame(MainSystem);
    }
    
    // キーボード押下時
    function keyDown(event){
        // キーコードを取得
        let ck = event.keyCode;
        
        // Jキー(74)が押されていたらフラグを降ろす
        if(ck === 74){
            keydownflag = true;
            if(keyupcount==0){
                // ゲーム説明２
                if(turn==1){
                    info_msg="タイミングよくバーを止めて攻撃をしよう！！";
                }else if(turn==2){
                    info_msg="白いエリアにバーを止めてぽぴんを回避をしよう！！";
                }
                // ターンメッセージ表示
                turnmsg=true;
            } 
            // Jキー１回目
            if(keyupcount==1){
                // 説明非表示
                info_msg="";
                // ターンメッセージ非表示
                turnmsg=false;
                //  バーを動かす;
                barmove=true;
            }
            // Jキー２回目
            if(keyupcount==2){
                //  バーを止める;
                addition=stop;

                if(player_turn){
                    if(red_bar[0]<=bar_position[0]&&red_bar[1]>=bar_position[1]){
                        damage = 300 ;
                        damageManagement(damage);
                        player_msg = "「デッドオアアライブ！！」";
                    }

                    else if(orange_bar[0]<=bar_position[0] && orange_bar[3]>=bar_position[1]){
                            damage = 120 ;
                            damageManagement(damage);                            
                            player_msg = "「千年バカラ！」";
                        }
                        
                    else if(gold_bar[0]<=bar_position[0] && gold_bar[3]>=bar_position[1]){
                        damage = 50 ;
                        player_msg = "「ベーシックナギラテジー！」";
                        damageManagement(damage);
                        // alert();
                    }
                        
                    else if(blue_bar[0]<=bar_position[0]&&blue_bar[3]>=bar_position[1]){
                            damage = 0;
                            damageManagement(damage);
                    }
                    
                }else if(enemy_turn){

                    // 不要な分岐
                    if(white_bar[0]<=bar_position[0]&&white_bar[1]>=bar_position[1]
                        || white_bar[2]<=bar_position[0]&&white_bar[3]>=bar_position[1]){
                    }else{
                        damageManagement(18);
                        p_deadflag=true;
                        // gameover
                    }

                }

                //  攻撃アニメーションフラグ;
                animeflag=true;
                //  ダメージアニメーション表示残す
            }
            // Jキー３回目
            if(keyupcount==3){
                if(!p_deadflag && !e_deadflag){
                    player_msg = "";
                    turnchange();
                }else if(p_deadflag){
                    animeflag=false;
                    gameover=true;
                }else if(e_deadflag){
                    player_msg = "";
                    // enemy_msg = "「こ、こんなはずでは...」";
                    enemy_msg = "「ファ！？」";
                    animeflag=false;
                    // gameclear=true;
                }
            }
            // Jキー３回目
            if(keyupcount==4){
                enemy_msg = "";
                gameclear=true;                
            }

        }
        
    }
    
    function keyUp(event) {
        // キーコードを取得
        let ck = event.keyCode;
        
        // Jキー(74)が押されていたらフラグを降ろす
        if(ck === 74){
            if(keydownflag&&!gameover&&!gameclear){
                keyupcount++;
                keydownflag=false;
            }
        }
    }
}


function damageManagement(damage){
    
    // 誤差プラス10%以内
    // if(str_damage=='' && damage!=0 && player_turn){
    if(str_damage=='' && player_turn){

        if(damage!=0){
            damage += Math.floor( Math.random() * damage / 10 ) + 1;
            enemy_hp = enemy_hp-damage;
            str_damage = damage.toString(); 
        }else if(damage==0){
            str_damage='ミス';
        }

        if(str_damage.length==2){
            // alert(damage.substring(0,1)+damage.substring(1,2)) ;
            ones = str_damage.substring(1,2);
            tens = str_damage.substring(0,1);
        }else if(str_damage.length==3){
            // alert(damage.substring(0,1)+damage.substring(1,2)+damage.substring(2,3)) ;
            ones = str_damage.substring(2,3);
            tens = str_damage.substring(1,2);
            hundreds = str_damage.substring(0,1);
        }

    }else if(str_damage=='' && damage!=0 && enemy_turn){
        str_damage = damage.toString();

        // if(str_damage.length==1){
        //     // alert(damage.substring(0,1)+damage.substring(1,2)) ;
        //     ones = str_damage.substring(0,1);
        // }
        if(str_damage.length==2){
            // alert(damage.substring(0,1)+damage.substring(1,2)) ;
            ones = str_damage.substring(1,2);
            tens = str_damage.substring(0,1);
        }
    }

    if(enemy_hp<=0){
        // gameclear
        e_deadflag=true;
    }

}

// ドット絵描画関数
// 引数
// 対象ドット名,ドット縦,横,配置x,y
function pixelart(data,pix_x,pix_y,pos_x,pos_y){

    let pdata = new PixelData();
    // enemyuを引数に変更
    pdata.read(data);
    let dotData = pdata.dotData;

    // イメージデータを作成する(幅,高)
    // data[r,g,b,a(透明)]
    // var imageData = mainctx.createImageData(16, 70);
    // var imageData = mainctx.createImageData(67, 53);
    // ドットデータの高さ、幅も引数
    var imageData = mainctx.createImageData(pix_x, pix_y);

    // イメージデータにドット絵のデータを設定する(1文字毎に配列に格納)
    var dotDataArr = dotData.split("");

    for (var i = 0; i < dotDataArr.length; i++) {
        
        // alert(imageData.data);

        switch(dotDataArr[i]){

            case "1": // ■は水色
                imageData.data[i * 4 + 0] = 0; // 赤
                imageData.data[i * 4 + 1] = 0; // 緑
                imageData.data[i * 4 + 2] = 0; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "2": // ■は水色
                imageData.data[i * 4 + 0] = 255; // 赤
                imageData.data[i * 4 + 1] = 255; // 緑
                imageData.data[i * 4 + 2] = 255; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "3": // ■は水色
                imageData.data[i * 4 + 0] = 220; // 赤
                imageData.data[i * 4 + 1] = 220; // 緑
                imageData.data[i * 4 + 2] = 220; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "4": // ■は水色
                imageData.data[i * 4 + 0] = 64; // 赤
                imageData.data[i * 4 + 1] = 64; // 緑
                imageData.data[i * 4 + 2] = 64; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "5": // ■は水色
                imageData.data[i * 4 + 0] = 255; // 赤
                imageData.data[i * 4 + 1] = 0; // 緑
                imageData.data[i * 4 + 2] = 0; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "6": // ■は水色
                imageData.data[i * 4 + 0] = 255; // 赤
                imageData.data[i * 4 + 1] = 192; // 緑
                imageData.data[i * 4 + 2] = 0; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "7": // ■は水色
                imageData.data[i * 4 + 0] = 32; // 赤
                imageData.data[i * 4 + 1] = 55; // 緑
                imageData.data[i * 4 + 2] = 100; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "8": // ■は水色
                imageData.data[i * 4 + 0] = 48; // 赤
                imageData.data[i * 4 + 1] = 84; // 緑
                imageData.data[i * 4 + 2] = 150; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "9": // ■は水色
                imageData.data[i * 4 + 0] = 255; // 赤
                imageData.data[i * 4 + 1] = 80; // 緑
                imageData.data[i * 4 + 2] = 80; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "G": // ■は水色
                imageData.data[i * 4 + 0] = 112; // 赤
                imageData.data[i * 4 + 1] = 173; // 緑
                imageData.data[i * 4 + 2] = 71; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "A": // ■は水色
                imageData.data[i * 4 + 0] = 204; // 赤
                imageData.data[i * 4 + 1] = 153; // 緑
                imageData.data[i * 4 + 2] = 0; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "B": // ■は水色
                imageData.data[i * 4 + 0] = 255; // 赤
                imageData.data[i * 4 + 1] = 204; // 緑
                imageData.data[i * 4 + 2] = 102; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "C": // ■は水色
                imageData.data[i * 4 + 0] = 174; // 赤
                imageData.data[i * 4 + 1] = 170; // 緑
                imageData.data[i * 4 + 2] = 170; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "D": // ■は水色
                imageData.data[i * 4 + 0] = 244; // 赤
                imageData.data[i * 4 + 1] = 176; // 緑
                imageData.data[i * 4 + 2] = 132; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "E": // ■は水色
                imageData.data[i * 4 + 0] = 131; // 赤
                imageData.data[i * 4 + 1] = 60; // 緑
                imageData.data[i * 4 + 2] = 12; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;
            case "F": // ■は水色
                imageData.data[i * 4 + 0] = 253; // 赤
                imageData.data[i * 4 + 1] = 253; // 緑
                imageData.data[i * 4 + 2] = 253; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;

            default: // それ以外は黒色
                imageData.data[i * 4 + 0] = 220; // 赤
                imageData.data[i * 4 + 1] = 220; // 緑
                imageData.data[i * 4 + 2] = 220; // 青
                imageData.data[i * 4 + 3] = 255; // アルファ
                break;

            }
    }

    // イメージデータを作画する
    mainctx.putImageData(imageData,pos_x,pos_y); 

}