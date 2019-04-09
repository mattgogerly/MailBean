package api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Exception thrown as an error 401 (i.e. auth details have not been sent for a given Account in this session).
 *
 * @author mattgogerly
 */
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class NoAuthenticationDetailsProvidedException extends RuntimeException {
}
