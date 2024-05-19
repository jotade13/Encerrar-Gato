export default class Gato{
    constructor()
    {
        this._fila = 4;
        this._col = 5;
        this._mov=true;
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
    get mov()
    {
        return this._mov;
    }
    set mov(mov)
    {
        this._mov = mov;
    }
}