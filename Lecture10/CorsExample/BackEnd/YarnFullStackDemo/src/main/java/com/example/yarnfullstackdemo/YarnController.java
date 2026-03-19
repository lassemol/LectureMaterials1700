package com.example.yarnfullstackdemo;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/yarns")
public class YarnController {

    private final List<String> yarnBasket;

    public YarnController() {
        this.yarnBasket = new ArrayList<>();
    }

    // CREATE
    @PostMapping
    public String addYarn(@RequestBody String yarn) {
        yarnBasket.add(yarn);
        return "Yarn added successfully";
    }

    // READALL
    @GetMapping

    public List<String> getAllYarns() {
        return yarnBasket;
    }

    // READByIndex
    @GetMapping("/{index}")
    public String getYarn(@PathVariable int index) {
        return yarnBasket.get(index);
    }

    // UPDATE
    @PutMapping("/{index}")
    public String updateYarn(@PathVariable int index, @RequestBody String updatedYarn) {
        yarnBasket.set(index, updatedYarn);
        return "Yarn updated successfully";
    }

    // DELETE
    @DeleteMapping("/{index}")
    public String deleteYarn(@PathVariable int index) {
        yarnBasket.remove(index);
        return "Yarn deleted successfully";
    }
}