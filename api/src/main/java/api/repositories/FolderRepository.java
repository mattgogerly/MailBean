package api.repositories;

import api.models.DetailedFolder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FolderRepository extends CrudRepository<DetailedFolder, String> {
    List<DetailedFolder> findAllByAccount_Id(String id);
    void deleteAllByAccount_Id(String id);
}
