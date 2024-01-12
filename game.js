class Juego{
    constructor()
    {
        const juego = document.getElementById("juego");
        let casilla = [];
        for(let i=0;i<10;i++)
        {
            var divfila = document.createElement("div");
            divfila.className="fila";
            
            if(i%2==0)
            {
                divfila.id = "fila-par"
            }else{
                divfila.id = "filaimpar"
            }
            casilla[i] = [];

            for(let j=0;j<10;j++)
            {
                casilla[i][j] = new Casilla(i,j);
                var div = document.createElement("div")
                div.className = "casillas";
                div.id = "cas-"+i+"-"+j;
                divfila.appendChild(div);
            }
            juego.appendChild(divfila)
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

   /* crearJuego()
    {
        
        
        for(let i=0;i<10;i++)
        {
            for(let j=0;j<10;j++)
            {
                var div = document.createElement("div")
                div.className = "hexagono";
                div.id = "hex-"+i+"-"+j;
                juego.appendChild(div);
            }
        }
    }
    */
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