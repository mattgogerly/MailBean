package api.repositories;

import api.models.DetailedMessage;
import api.models.MessageId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * JPA repository for creation, retrieval modification and deletion of DetailedMessages in the database.
 *
 * @author mattgogerly
 */
@Repository
public interface MessageRepository extends CrudRepository<DetailedMessage, MessageId> {

    /**
     * Finds all DetailedMessages belonging to a given Account
     *
     * @param id The Account id to search for
     * @return List of DetailedMessages belonging to that Account
     */
    List<DetailedMessage> findAllByAccount_Id(String id);

    /**
     * Finds all DetailedMessages belonging to a given DetailedFolder
     *
     * @param id The DetailedFolder id to search for
     * @return List of DetailedMessages belonging to that DetailedFolder
     */
    List<DetailedMessage> findAllByFolder_Id(Integer id);

    /**
     * Deletes all DetailedMessages belonging to a given Account.
     *
     * @param id The relevant Account id
     */
    void deleteAllByAccount_Id(String id);

    /**
     * Finds DetailedMessage with given UID.
     *
     * @param uid uid of the message
     * @param accountId id of the Account
     * @return DetailedMessage with that UID
     */
    DetailedMessage findByIdUidAndAccount_Id(Long uid, String accountId);
}
