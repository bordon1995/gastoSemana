let cliente;

class Cliente {
    constructor(balorInicial){
        this.base=balorInicial,
        this.resto=balorInicial
        this.array=[];
    };

    gastos(object){
        this.array.push(object);
        this.restante();
    }

    restante(){
        const result=this.array.reduce((total,gasto) => total + gasto.cantidad,0);
        this.resto=this.base - result;
    };

    upDateArrey(id){
        const newArray=this.array.filter(element => element.id !== id);
        this.array=[...newArray];

        this.restante();
    }
};

class UI {

    viewHtml(base,resto){
        document.querySelector('#total').textContent=`${base}`;
        document.querySelector('#restante').textContent=`${resto}`;

        if(resto <= 0){
            this.messeg('te quedaste sin saldo','error');
            document.getElementById('agregar-gasto').querySelector('button[type="submit"]').disabled = true;
        } else {
            document.getElementById('agregar-gasto').querySelector('button[type="submit"]').disabled = false;
        }
        
    };

    viewList(gasto){

        this.before();

        gasto.forEach(element => {
            const li=document.createElement('li');
            const span=document.createElement('span');
            const buttom=document.createElement('button');

            li.className='list-group-item d-flex justify-content-between align-items-center';
            li.innerText=`${element.nombre}`;
            li.dataset.id=element.id;
            span.className='badge badge-primary badge-pill';
            span.innerText=`${element.cantidad}`;
            buttom.className='btn btn-danger borrar-gasto';
            buttom.innerText='x';
            buttom.onclick = () => {
                deleteInfo(element.id);
            }

            document.querySelector('.list-group').appendChild(li).appendChild(span);
            li.appendChild(buttom);
        });
    };
    before(){
        const etiqueta=document.querySelector('ul')
        while (etiqueta.firstChild) {
            etiqueta.removeChild(etiqueta.firstChild);
        };
    };

    messeg(messe,typo){

        const div=document.createElement('div');
        div.classList.add('text-center','alert');

        if(typo === 'error'){
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        };

        div.innerText=`${messe}`;
        document.querySelector('.primario').insertBefore(div,document.querySelector('#agregar-gasto'))
        
        setTimeout(() =>{
            div.remove();
        },2000)
    };
};

const ui=new UI();

document.addEventListener('DOMContentLoaded', () =>{
    const getInfo=Number(prompt('ingrese un monto'));

    if(getInfo === '' || getInfo === null || isNaN(getInfo) || getInfo <= 0){
        return window.location.reload();
    };

    cliente=new Cliente(getInfo);
    ui.viewHtml(cliente.base,cliente.resto);
});

eventListeners();
function eventListeners(){
    document.querySelector('#agregar-gasto').addEventListener('submit',getInfo);
}

function getInfo(e){
    e.preventDefault();
    const nombre=document.querySelector('#gasto').value;
    const cantidad=Number(document.querySelector('#cantidad').value);

    if(nombre === '' || cantidad === ''){
        return ui.messeg('Todos los Campos son Obligatorios','error');     
    } else if(cantidad <= 0 || isNaN(cantidad)){
       return ui.messeg('Cantidad no Valida','error');
    };

    ui.messeg('Se Agrego Correctamente','correcto');

    getArray(nombre,cantidad);

    ui.viewHtml(cliente.base,cliente.resto);

    document.getElementById('agregar-gasto').reset();
};

function getArray(nombre,cantidad){
    const object={id:Date.now(),nombre,cantidad};

    cliente.gastos(object);
    
    ui.viewList(cliente.array);
    
}

function deleteInfo(id){
    cliente.upDateArrey(id);
    
    ui.viewHtml(cliente.base,cliente.resto);

    ui.viewList(cliente.array);
}