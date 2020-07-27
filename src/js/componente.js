import '../css/componente.css';


export const saludar = ( nombre ) => {


    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${nombre}, como estas?`;

    document.body.append(h1);

}