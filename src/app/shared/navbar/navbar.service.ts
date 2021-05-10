export class NavbarService {
    constructor(public state = '0'){};

    toggleState(){
        console.log('this.state:',this.state);
        this.state = this.state === '0'? '1' : '0';//這邊的stats的值沒有什麼有用的意義，只是為了要觸發navbar的動畫效果而已
    }
}
