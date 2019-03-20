package api.repositories;

import api.models.DetailedMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<DetailedMessage, Long> {
    List<DetailedMessage> findAllByAccount_Id(String id);
    List<DetailedMessage> findAllByFolder_Id(Integer id);
}
