package api.repositories;

import api.models.DetailedFolder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JPA repository for creation, retrieval modification and deletion of DetailedFolders in the database.
 *
 * @author mattgogerly
 */
@Repository
public interface FolderRepository extends CrudRepository<DetailedFolder, String> {

    /**
     * Finds all DetailedFolders belonging to a given Account
     *
     * @param id The Account id to search for
     * @return List of DetailedFolders belonging to that Account
     */
    List<DetailedFolder> findAllByAccount_Id(String id);

    /**
     * Deletes all DetailedFolders belonging to a given Account.
     *
     * @param id The relevant Account id
     */
    void deleteAllByAccount_Id(String id);
}
