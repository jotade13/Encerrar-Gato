class Juego{
    constructor()
    {
        let casilla = [];
        for(let i=0;i<10;i++)
        {
            casilla[i] = [];
            for(let j=0;j<10;j++)
            {
                casilla[i][j] = new Casilla(i,j);
                console.log(casilla[i][j]);
            }
        }
        let gato = new Gato();
    }
}
class Casilla{
    constructor(fila,col){
        this._fila= fila;
        this._col= col;
        this._estado = false;
        this._gato = false;
    }
    
}
class Gato{
    constructor()
    {
        this._fila = 5;
        this._col = 5;
    }
}
window.onload= function()
{
    juego = new Juego();
}