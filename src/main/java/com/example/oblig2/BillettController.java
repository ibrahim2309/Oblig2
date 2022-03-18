package com.example.oblig2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BillettController {

    public final List<Billett> billettListe = new ArrayList<>();

    @PostMapping("/lagre")
    public void lagre(Billett billett){
        billettListe.add(billett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlle() {
        return billettListe;
    }

    @GetMapping("/sletAlle")
    public void slettAlle() {
        billettListe.clear();
    }
}

