package demtoolapi.enhancementapi.repository;

import demtoolapi.enhancementapi.models.Enhancement;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public class EnhancementRepository {

    private final JdbcTemplate jdbcTemplate;

    public EnhancementRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    protected static final RowMapper<Enhancement> enhancementRowMapper = (rs, rowNum) ->
            new Enhancement(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getString("description"),
                    rs.getString("type"),
                    rs.getString("manufacturer")
            );

    public List<Enhancement> getAllEnhancements() {
        String sql = "SELECT * FROM enhancements";
        return jdbcTemplate.query(sql, enhancementRowMapper);
    }

    public Optional<Enhancement> getEnhancementById(Long id) {
        String sql = "SELECT * FROM enhancements WHERE id = ?";
        return jdbcTemplate.query(sql, enhancementRowMapper, id).stream().findFirst();
    }

    public void createEnhancement(Enhancement enhancement) {
        String sql = "INSERT INTO enhancements (name, description, type, manufacturer) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, enhancement.getName(), enhancement.getDescription(), enhancement.getType(), enhancement.getManufacturer());
    }

    public int updateEnhancement(Long id, Enhancement enhancement) {
        String sql = "UPDATE enhancements SET name = ?, description = ?, type = ?, manufacturer = ? WHERE id = ?";
        return jdbcTemplate.update(sql, enhancement.getName(), enhancement.getDescription(), enhancement.getType(), enhancement.getManufacturer(), id);
    }

    public void deleteEnhancement(Long id) {
        String sql = "DELETE FROM enhancements WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
