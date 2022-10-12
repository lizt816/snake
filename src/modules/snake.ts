class Snake{
    head:HTMLElement;  // 蛇头
    bodies:HTMLCollection;  // 蛇身体包括头   Collection：集合会自动补充新元素
    element:HTMLElement;
    constructor(){
        this.element = document.getElementById('snake')!;
        //  as HTMLElement这里使用这，而不是！，是因为获取这标签返回的认为不是HTMLElement元素了。
        //  称为类型断言
        //  querySelector获取标签的集合的第一个元素
        this.head = document.querySelector('#snake > div') as HTMLElement;
        //  蛇的身体如果用document.querySelectorAll('#snake > div') // 返回的是所以数组
        //  但是是固定的
        //  获取蛇的身体包括头
        this.bodies = this.element.getElementsByTagName('div');
    }
    // 获取蛇头的坐标
    get X(){
        return this.head.offsetLeft;
    }
    get Y(){
        return this.head.offsetTop;
    }

    set X(value:number){
        // set方法会在get的值改变的时候调用
        // this.X === get X()...
        if(this.X === value)return;  // 如果相同则不改变
        if(value < 0 || value > 290){
            throw new Error('撞墙了');  // 向控制台报错
        }
        // 掉头判断--1 一个头的时候也许掉头，有身体的时候在判断是否回头了
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value){
            console.log(value,this.Y,"diaotou")
            // 在有身体的情况下，如果身体的位置和头的位置重叠了，就对于头回头了，
            // 这里理解：头回头 就对于 身体的位置 所以 ：value === (this.bodies[1] as HTMLElement).offsetLeft
            if(value > this.X){
                // 这时候 key键是反方向，所以需要不停往反方向加减,
                value = this.X - 10;
            }else{
                value = this.X + 10;
            }
        };
        this.moveBody()
        this.head.style.left = value + 'px'
        this.checkHeadBody()
    }
    set Y(value:number){
        if(value < 0 || value > 290){
            throw new Error('撞墙了');   // 向控制台报错
        }
        if(this.Y === value)return;  // 如果相同则不改变
        if(this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value){
            if(value > this.Y){
                value = this.Y - 10;
            } else{
                value = this.Y + 10;
            }
        };
        this.moveBody()
        this.head.style.top = value + 'px'
        this.checkHeadBody()
    }
    addBody(){
        // insertAdjacentHTML两个参数，第一个是位置，beforeend表示结束标签之前，第二参数就是添加标签
        this.element.insertAdjacentHTML('beforeend','<div></div>')
    }

    moveBody(){
        for(let i = this.bodies.length-1 ; i>0 ; i--){
            // 注意 this.bodies.length-1 必须减去1 i 需要 > 0
            let X = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i-1] as HTMLElement).offsetTop;
            // as HTMLElement :类型断言，告诉解析器this.bodies[i-1] == HTMLElement类型
            // this.bodies[i]就是当前的身体部分
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    checkHeadBody(){
        // 获取所有的身体，检查身体是否和头从叠加
        for (let i = 1; i < this.bodies.length; i++) {
            // let i =1 ,表示头部之后开始
            let bd = this.bodies[i] as HTMLElement;
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop){
                throw new Error("吃到自己了")
            }
            
        }
    }

}

export default Snake