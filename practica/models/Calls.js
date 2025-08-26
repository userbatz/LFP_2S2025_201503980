//realiznado la clase de llamadas.

class Calls {
    constructor(operator, client, stars){
        this.operator = operator; //operador, para que se relacione con la llamada
        this.client = client; //cliente, para que se relacione con la llamada
        this.stars = stars; //estrellas, para que se relacione con la llamada
    }


    //realizaremos una funcion para clasificar las llamadas:
    classifyCall() {
        if (this.stars >=4) {
            return "Buena";
        } else if (this.stars >=2 && this.stars < 4) {
            return "Media";
        } else {            
            return "Mala";
        }
    }

}


module.exports = Calls;