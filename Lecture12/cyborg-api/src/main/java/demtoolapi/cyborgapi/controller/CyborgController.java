package demtoolapi.cyborgapi.controller;


import demtoolapi.cyborgapi.models.Cyborg;
import demtoolapi.cyborgapi.repository.CyborgRepository;
import demtoolapi.cyborgapi.repository.EnhancementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cyborgs")
public class CyborgController {

    private final CyborgRepository repository;
    private final EnhancementRepository enhancementRepository;

    public CyborgController(CyborgRepository repository, EnhancementRepository enhancementRepository) {
        this.repository = repository;
        this.enhancementRepository = enhancementRepository;
    }


    @GetMapping
    public List<Cyborg> getAllCyborgs() {
        return repository.getAllCyborgs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cyborg> getCyborgById(@PathVariable Long id) {
        Optional<Cyborg> cyborg = repository.getCyborgById(id);
        cyborg.ifPresent(c -> c.setEnhancements(enhancementRepository.getEnhancementsByCyborgId(id)));
        return cyborg.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createCyborg(@RequestBody Cyborg cyborg) {
        repository.createCyborg(cyborg);
        return ResponseEntity.ok("Cyborg created successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCyborg(@PathVariable Long id, @RequestBody Cyborg cyborg) {
        int updatedRows = repository.updateCyborg(id, cyborg);
        if (updatedRows > 0) {
            return ResponseEntity.ok("Cyborg updated successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCyborg(@PathVariable Long id) {
        repository.deleteCyborg(id);
        return ResponseEntity.ok("Cyborg deleted successfully!");
    }
}
