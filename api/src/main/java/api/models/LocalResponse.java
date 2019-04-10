package api.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Utility class purely to allow Jackson to map the response we want to JSON.
 *
 * @author mattgogerly
 */
@Getter
@Setter
public class LocalResponse {

    private List<DetailedFolder> folders;
    private List<DetailedMessage> messages;

    /**
     * Intentionally empty constructor
     */
    public LocalResponse() {

    }

    /**
     * Create a new LocalResponse object
     *
     * @param folders list of folders
     * @param messages list of messages
     */
    public LocalResponse(List<DetailedFolder> folders, List<DetailedMessage> messages) {
        this.folders = folders;
        this.messages = messages;
    }

}
