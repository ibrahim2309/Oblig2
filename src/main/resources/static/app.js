$(() => {

})





function kjop() {

    //lager objekt for å lagre verdiene

    let billett = {

        film : $("#filmer").val(),
        antall : $("#antall").val(),
        fornavn : $("#fornavn").val(),
        etternavn : $("#etternavn").val(),
        telefonnr : $("#telefonnr").val() ,
        epost :  $("#epost").val()

    };

    if (inputValidering(billett))
        $.post("/lagre", billett, function () {
            hentAlle();
        })


    //Validerer at alle inputsene har verdi


    const slett = document.getElementById("slett");

    //lager en eventlistner for å slette
    slett.addEventListener("click", () => {

        document.getElementById("alle-billetter").innerHTML = null;
        console.log("hvis at det slettet")
    });




}


function inputValidering(billett) {
    //Validerer at alle inputsene har verdi
    let skjekk = true;

    if (billett.film === "Velg film") {
        $("#feilFilm").html("Velg en av filmene")
        skjekk = false;
        console.log("velg film kom igjen")
    }
    else {
        $("#feilFilm").html("");
    }



    if (billett.antall === '' ) {
        $("#feilAntall").html( "Må skrive noe inn for antall");
        skjekk = false;
        console.log("Velg antall kom igjen");
    }
    else if (billett.antall <= 0 || isNaN(billett.antall)) {
        $("#feilAntall").html( "Må skrive inn et tall for antall");
    }
    else {
        $("#feilAntall").html("");
    }

    if (billett.fornavn === ''){
        $("#feilFornavn").html( "Må skrive noe inn for fornavn");
        skjekk = false;
    }
    else {
        $("#feilFornavn").html("")
    }

    if (billett.etternavn === ''){
        $("#feilEtternavn").html("Må skrive noe inn for etternavn");
        skjekk = false;
    }
    else {
        $("#feilEtternavn").html("")
    }

    if (billett.telefonnr === ''){
        $("#feilTelefonnr").html( "Må skrive noe inn for telefonnr");
        skjekk = false;
    }
    else {
        $("#feilTelefonnr").html("");
    }

    if (billett.epost === ''){
        $("#feilEpost").html( "Må skrive noe inn for Epost");
        skjekk = false;
    }
    else {
        $("#feilEpost").html("");
    }

    if (skjekk) {




        //billetter.push(billett);

        //Nullstiller feilmeldingene etter det er pushet
        $("#feilAntall").html("")
        $("#feilFornavn").html( "");
        $("#feilEtternavn").html("")
        $("#feilTelefonnr").html("")
        $("#feilEpost").html("")




        //Nullstiller input-verdiene etter det er pushet
        document.getElementById("filmer").selectedIndex = 0;
        //$("#filmer").val(""),
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");

        $.post("/lagre", billett, function () {
            hentAlle();
        })




        console.log("skriv ut")


    }

}

function hentAlle() {
    $.get("/hentAlle", function (data) {
        formaterBilletter(data)
    })
}

function formaterBilletter(data) {
    let ut = "<table class='table table-striped'><tr>" + "<th>Film</th> <th>Antall</th> <th>Fornavn</th> <th>Etternavn</th>" +
        " <th>telefonnummer</th>  <th>Epost</th>";

    //lager for-løkke for å skrive ut verdiene
    for (let person of data){



        ut += "<tr><td>"+ person.film +"</td><td>" + person.antall  + "</td><td>"  + person.fornavn  + "</td><td>" +
            person.etternavn  + "</td><td>"  + person.telefonnr  + "</td><td>" + person.epost + "<td>"



    }

    ut += "</table>"

    $("#alle-billetter").html(ut)

}

function slettAlle() {
    $.get("/slettAlle", function () {
        hentAlle()
    })
}