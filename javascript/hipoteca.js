function calcular_hipoteca(event) {
    // event es una propiedad para cambiar el funcionamiento natural del form
    // dentro del html, en el form, se pusieron los atributos target, que sirve para "apuntar"
    // la forma en la que la pagina respondera al recibimiento de los datos
    // dentro de la funcion puesta en action se escribe event para apoyar el cambio de funcionamiento
    // del form usando javascript
    event.preventDefault();

    let cuota = document.forms["calculo_form"]["cuota_init"].value;
    let tasa = document.forms["calculo_form"]["tasa"].value;
    let valor_total = document.forms["calculo_form"]["valor_total"].value;
    let plazo = document.forms["calculo_form"]["plazo"].value;

    const MONTHS_ON_YEAR = 12;

    if(cuota == "" || tasa == "" || valor_total == "" || plazo == ""){
        alert("Alerta: Es necesario llenar todos los campos")
    }
    else{
        const hipoteca = {
            totalPrestamo: 0,
            totalIntereses: 0,
            cuotaMensual: 0,
            costoTotal: 0
        };
        
        hipoteca.costoTotal = valor_total;
        hipoteca.totalPrestamo = valor_total - cuota;
        hipoteca.totalIntereses = (hipoteca.totalPrestamo * tasa) / 100;
        hipoteca.cuotaMensual =
            (hipoteca.totalPrestamo + hipoteca.totalIntereses) /
            (plazo * MONTHS_ON_YEAR);
    
        
        
        mostrar_info(hipoteca);
    }
}

function mostrar_info(hipotecaFinal) {
    document.getElementById("total_prestamo").innerHTML = valueToDolar(hipotecaFinal.totalPrestamo);
    document.getElementById("valor_cuota").innerHTML = valueToDolar(hipotecaFinal.cuotaMensual);
    var totalPrestamoPorcentaje = 0;

    totalPrestamoPorcentaje = hipotecaFinal.totalPrestamo * 100 / hipotecaFinal.costoTotal;
    if(totalPrestamoPorcentaje > 90){
        document.getElementById("total_prestamo").className = "alertaPorcentaje form-control";
    }
}

function resetForm(){
    document.forms["calculo_form"].reset();
    document.getElementById("total_prestamo").value = 0;
    document.getElementById("valor_cuota").value = 0;
}

function valueToDolar(value){
    const dollarformatter = new Intl.NumberFormat('en-US', {style:'currency', currency:"USD", minimumFractionDigits:2});
    return dollarformatter.format(value);
}