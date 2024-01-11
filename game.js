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
            }
        }
        let gato = new Gato();
        _terminado=false;
        _empezado=false;
    }
    get terminado()
    {
        return this._terminado;
    }
    get empezado()
    {
        return this._empezado;
    }
    set empezado(band)
    {
        return this._empezado = band;
    }
}
class Casilla{
    constructor(fila,col){
        this._fila= fila;
        this._col= col;
        this._estado = false;
        this._gato = false;
    }
    get fila()
    {
        return this._fila
    }
    get col()
    {
        return this._col
    }
    get estado()
    {
        return this._estado
    }
    get gato()
    {
        return this._gato
    }

    set estado(band)
    {
        this._estado = band;
    }
    set gato(band)
    {
        this._gato = band;
    }
    
}
class Gato{
    constructor()
    {
        this._fila = 5;
        this._col = 5;
    }
    get fila()
    {
        return this._fila;
    }
    set fila(fila)
    {
        this._fila = fila;
    }
    get col()
    {
        return this._col;
    }
    set col(col)
    {
        this._col = col;
    }
}
    let juego = new Juego();