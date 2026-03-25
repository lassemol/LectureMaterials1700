package demtoolapi.enhancementapi.controller;

import demtoolapi.enhancementapi.models.Enhancement;
import demtoolapi.enhancementapi.repository.EnhancementRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/enhancements")
public class EnhancementController {

    private final EnhancementRepository repository;

    public EnhancementController(EnhancementRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Enhancement> getAllEnhancements() {
        return repository.getAllEnhancements();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Enhancement> getEnhancementById(@PathVariable Long id) {
        Optional<Enhancement> enhancement = repository.getEnhancementById(id);
        return enhancement.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> createEnhancement(@RequestBody Enhancement enhancement) {
        repository.createEnhancement(enhancement);
        return ResponseEntity.ok("Enhancement created successfully!");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateEnhancement(@PathVariable Long id, @RequestBody Enhancement enhancement) {
        int updatedRows = repository.updateEnhancement(id, enhancement);
        if (updatedRows > 0) {
            return ResponseEntity.ok("Enhancement updated successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEnhancement(@PathVariable Long id) {
        repository.deleteEnhancement(id);
        return ResponseEntity.ok("Enhancement deleted successfully!");
    }
}
