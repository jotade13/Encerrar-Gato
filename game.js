const tam_fila = 10;
const tam_col = 10;
class Juego{
    constructor()
    {
        const juego = document.getElementById("juego");
        this._casilla = [];
        this._grafo = new Grafo();
        for(let i=0;i<tam_fila;i++)
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

            for(let j=0;j<tam_col;j++)
            {
                this._casilla[i][j] = new Casilla(i,j);
                this._grafo.agregarNodo(i+""+j)
                if(divfila.id)
                var div = document.createElement("div");
                div.textContent= i+""+j;
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
        this.recorrerLasCasillas(1);
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
    recorrerLasCasillas(accion) //accion = 1 recorre las casillas y agrega los vertices de los nodos alrededor de el
    {
        for(let i=0;i<tam_fila;i++)
        {
            for(let j=0;j<tam_col;j++)
            {
                if(accion==1)
                {
                    this.recorrer(2,i,j);
                }
            }
        }
    }
    bloquear(id,fila,col)
    {
        if(!this._casilla[fila][col].gato&&!this._casilla[fila][col].estado)
        {
            this._casilla[fila][col].bloquear();
            this._grafo.eliminarNodoyAristas(fila+""+col);
            document.getElementById(id).style.backgroundColor = "#014366"
        }
        this._terminado = this.recorrer(1,this._gato.fila,this._gato.col);
    }
    recorrer(accion,fila,col) //accion = 1 comprueba si perdio. accion = 2 comprueba sus alrededores y agrega los vertices
    {
        let auxPar = 0;
        let band1 = true;
        let band2 = true;
        if(this._casilla[fila][col].par)
        {
             auxPar=1;
        }
        for(let i=fila-1;i<=fila+1;i+=2)
        {
            for(let j=col-auxPar;j<=col-auxPar+1;j++)
            {
                if(i>=0&&i<=9&&j>=0&&j<=9)
                {
                    if(accion==1)
                    {
                        if(!this._casilla[i][j].estado)
                        {
                            band1=false; break;
                        }
                    }else
                    {
                        this._grafo.agregarArista(fila+""+col,i+""+j);
                    } 
                }
            }
        }
        for(let j=col-1;j<=col+1;j+=2)
        {
            if(j>=0&&j<=9)
            {
                if(accion==1)
                {
                    if(!this._casilla[fila][j].estado)
                    {
                        band2= false; break;
                    }
                }
                else
                {
                    this._grafo.agregarArista(fila+""+col,fila+""+j)
                }    
            }
        }
        if(accion==1)
        {
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
class Grafo // Definir una clase Grafo que tiene un arreglo de nodos y un objeto de aristas para el mapa
{
    constructor()
    {
        this.nodos = [];
        this.aristas = [];
    }
    // Añadir un nodo al grafo
    agregarNodo(nodo)
    {
        this.nodos.push(nodo);
        this.aristas[nodo] = [];
    }

  // Añadir una arista entre dos nodos
    agregarArista(nodo1, nodo2)
    {
        this.aristas[nodo1].push(nodo2);
    }
    eliminarNodoyAristas(nodo)
    {
        this.aristas[nodo].forEach(nodoFin => 
        {
            let indiceFin = this.nodos.indexOf(nodoFin);
            if(indiceFin>-1&&indiceFin<10)
            {
                indiceFin = "0"+indiceFin;
            }
            let indiceSelec = this.aristas[indiceFin].indexOf(nodo);
            /*if(indiceSelec>-1&&indiceSelec<10)
            {
                indiceSelec = "0"+indiceSelec;
            }*/
            this.aristas[indiceFin].splice(indiceSelec,1);
            console.log(this.aristas[indiceFin])
        });

        this.aristas[nodo]= [];
        delete(this.nodos[nodo]);
    }
}
    let juego = new Juego();