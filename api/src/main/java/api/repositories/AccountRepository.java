package api.repositories;

import api.models.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * JPA repository for creation, retrieval modification and deletion of Accounts in the database.
 *
 * @author mattgogerly
 */
@Repository
public interface AccountRepository extends CrudRepository<Account, String> {
}
