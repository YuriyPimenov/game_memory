class Card{
    constructor(id,num,fun){
        //this.state = 0;
        this.parent = document.getElementById(id);

        this.card = document.createElement('div');
        this.card.classList.add('card_'+num);
        this.parent.appendChild(this.card);

        this.card.setAttribute('data-state', '0');

        var card = this.card;
        //При клике на карту, вызываем функцию из родителя
        this.card.addEventListener('click',function (event) {
            fun(event,card);
        });
    }
}