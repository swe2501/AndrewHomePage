export class NavbarService {
    constructor(public state = 'init'){};

    toggleState(){
        this.state = this.state === 'init' ? 'load' : 'init';
    }
}
