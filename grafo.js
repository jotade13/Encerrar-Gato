export default class Grafo 
{
    constructor()
    {
        this.nodos = {};
    }
    // Añadir un nodo al grafo
    agregarNodo(nodo)
    {
        this.nodos[nodo]=[];
    }

  // Añadir una arista entre dos nodos
    agregarArista(nodo1, nodo2)
    {
        this.nodos[nodo1].push(nodo2);
    }
    eliminarNodoyAristas(nodo)
    {
        this.nodos[nodo].forEach(nodoFin => 
        {
            let indiceSelec = this.nodos[nodoFin].indexOf(nodo);
            this.nodos[nodoFin].splice(indiceSelec,1);
        });
        this.nodos[nodo]= [];
        delete(this.nodos[nodo]);
    }
    buscarNodo(valor)
    {
         return this.nodos.hasOwnProperty(valor);
    }
}