
import Food from './food'
import ScorePanel from './scorePanel'
import Snake from './snake'
class GameControl {
    snake:Snake;  // 蛇
    scorePanel:ScorePanel;  // 记分器
    food:Food;  //  食物
    direction:string = '';  //  方向
    isLive = true;
    constructor(){
        this.scorePanel = new ScorePanel()
        this.food = new Food()
        this.snake = new Snake()
        this.init()   // 放在这里是因为方便，应该根据按钮去控制
    }

    init(){
        console.log(this,"000")
        //这里会产生一个问题，--因为是document创建的事件，所以回调里的this指向会指向document3
        // 如果用箭头函数，this指向GameControl，但后期不好维护
        // 加bind.(this),创建一个新的函数，然后把里面的keydownHandler函数里的this，绑定成
        // 当前的this.keydownHandler的（this.ke...）这个this
        document.addEventListener('keydown',this.keydownHandler.bind(this))
        this.run()
    }

    keydownHandler(event:KeyboardEvent){
        if(event.key){

        }
        this.direction = event.key;  // 按下键盘的时候
    }
    run(){
        let X = this.snake.X
        let Y = this.snake.Y
        // switch相当if对字符串的条件，break：退出
        switch(this.direction){
            case 'ArrowUp':  // 如果this.direction === 'ArrowUp';
            case 'Up':    // 或者 === 'Up'
                Y -= 10;
            break;          // 退出
            case 'ArrowRight':  // 
                X += 10;
            break;          // 退出
            case 'ArrowDown':  // 
                Y += 10;
            break;          // 退出
            case 'ArrowLeft':  // 
                X -= 10;
            break;          // 退出

        }
        this.checkEat(X,Y)
        try{
            // 这里调用了snake的set X()和y两个方法
            this.snake.X = X
            this.snake.Y = Y
        }catch(e:any){
            console.log(e,"000")
            this.isLive = false
        }
        // 这样写相比setInterval会更加安全一些
        // 500 - (this.scorePanel.level)*30 this.scorePanel.level 根据等级的提高而加速
        // 500 - 0*30  0级  500
        // 500 - 1*30  1级  470
        // this.isLive && 写法就是当this.isLive为true的时候就执行后面的函数
        // 相比 if() return ... ; && 还会执行下排的代码
        this.isLive && setTimeout(this.run.bind(this), 200 - (this.scorePanel.level)*30);
    }
    // 判断是否吃到食物
    checkEat(X:Number,Y:Number){
        // food 食物的坐标 return true 对于吃到食物了
        if(X === this.food.X && Y === this.food.Y){
            this.food.change();
            this.snake.addBody()
            this.scorePanel.addScore()
        }
        
    }
}


export default GameControl