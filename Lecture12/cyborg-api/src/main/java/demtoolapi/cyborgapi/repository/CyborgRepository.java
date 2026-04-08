package demtoolapi.cyborgapi.repository;

import demtoolapi.cyborgapi.models.Cyborg;
import demtoolapi.cyborgapi.models.Enhancement;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class CyborgRepository {

    private final JdbcTemplate jdbcTemplate;

    public CyborgRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<Cyborg> cyborgRowMapper = (rs, rowNum) ->
            new Cyborg(
                    rs.getLong("id"),
                    rs.getString("name"),
                    rs.getInt("birth_year"),
                    rs.getString("country"),
                    rs.getString("bio"),
                    new ArrayList<>() // Initialize empty enhancements list
            );

    public List<Cyborg> getAllCyborgs() {
        String sql = "SELECT * FROM cyborg";
        return jdbcTemplate.query(sql, cyborgRowMapper);
    }

    public Optional<Cyborg> getCyborgById(Long id) {
        String sql = "SELECT * FROM cyborg WHERE id = ?";
        Optional<Cyborg> cyborg = jdbcTemplate.query(sql, cyborgRowMapper, id).stream().findFirst();
        return cyborg;
    }

    public void createCyborg(Cyborg cyborg) {
        String sql = "INSERT INTO cyborg (name, birth_year, country, bio) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, cyborg.getName(), cyborg.getBirthYear(), cyborg.getCountry(), cyborg.getBio());
    }

    public int updateCyborg(Long id, Cyborg cyborg) {
        String sql = "UPDATE cyborg SET name = ?, birth_year = ?, country = ?, bio = ? WHERE id = ?";
        return jdbcTemplate.update(sql, cyborg.getName(), cyborg.getBirthYear(), cyborg.getCountry(), cyborg.getBio(), id);
    }

    public void deleteCyborg(Long id) {
        String sql = "DELETE FROM cyborg WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }


}
