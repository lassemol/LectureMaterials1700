package demtoolapi.cyborgapi.models;

import java.util.ArrayList;
import java.util.List;

public class Cyborg {
    private Long id;
    private String name;
    private Integer birthYear;
    private String country;
    private String bio;
    private List<Enhancement> enhancements;

    public Cyborg(Long id, String name, Integer birthYear, String country, String bio, List<Enhancement> enhancements) {
        this.id = id;
        this.name = name;
        this.birthYear = birthYear;
        this.country = country;
        this.bio = bio;
        this.enhancements = (enhancements != null) ? enhancements : new ArrayList<>(); // Avoid null
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getBirthYear() { return birthYear; }
    public void setBirthYear(Integer birthYear) { this.birthYear = birthYear; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public List<Enhancement> getEnhancements() { return enhancements; }
    public void setEnhancements(List<Enhancement> enhancements) { this.enhancements = enhancements; }
}
