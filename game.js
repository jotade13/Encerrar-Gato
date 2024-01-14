class Juego{
    constructor()
    {
        const juego = document.getElementById("juego");
            this._casilla = [];
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
            this._casilla[i] = [];

            for(let j=0;j<10;j++)
            {
                this._casilla[i][j] = new Casilla(i,j);
                if(divfila.id)
                var div = document.createElement("div")
                div.className = "casillas";
                div.id = "cas-"+i+"-"+j;
                div.addEventListener("click",this.bloquear.bind(this,div.id,i,j))
                divfila.appendChild(div);
            }
            juego.appendChild(divfila)
        }
        this._gato = new Gato();
        this._terminado = false;
        this._empezado = false;
    }
    get terminado()
    {
        return this._terminado;
    }
    set terminado(band)
    {
        this._terminado = band
    }
    get empezado()
    {
        return this._empezado;
    }
    set empezado(band)
    {
        this._empezado = band;
    }
    bloquear(id,i,j)
    {
        if(!this._casilla[i][j].gato&&!this._casilla[i][j].estado)
        {
            this._casilla[i][j].bloquear();
            document.getElementById(id).style.backgroundColor = "#014366"
        }
        this._terminado = this.fin()
    }
    fin()
    {
        let auxPar = 0;
        let band1 = true;
        let band2 = true;
        if(this._casilla[this._gato.fila][this._gato.col].par)
        {
             auxPar=1;
        }
        for(let i=this._gato.fila-1;i<=this._gato.fila+1;i+=2)
        {
            for(let j=this._gato.col-auxPar;j<=this._gato.col-auxPar+1;j++)
            {
                if(i>=0&&i<=9&&j>=0&&j<=9)
                {
                    if(!this._casilla[i][j].estado)
                    {
                        band1=false; break;
                    } 
                }
            }
        }
        for(let j=this._gato.col-1;j<=this._gato.col+1;j+=2)
        {
            if(j>=0&&j<=9)
            {
                if(!this._casilla[this._gato.fila][j].estado)
                {
                    
                    band2= false; break;
                }
            }
        }
        if(band1&&band2)
        {
            alert("juego ganado")
            return true;
        }else
        {
            return false;   
        }
    }
}
class Casilla{
    constructor(fila,col){
        this._fila= fila;
        this._col= col;
        if(fila%2==0)
        {
            this._par = true;
        }else
        {
            this._par = false;
        }
        if(fila==4&&col==5)
        {
            this._estado = true;
            this._gato = true;
        }else
        {
            this._estado = false;
            this._gato = false;
        } 
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
    get par()
    {
        return this._par
    }

    bloquear()
    {
        this.estado = true;
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
        this._fila = 4;
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
    moverGato()
    {

    }
}
    let juego = new Juego();