package api.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LocalResponse {

    private List<DetailedFolder> folders;
    private List<DetailedMessage> messages;

    public LocalResponse(List<DetailedFolder> folders, List<DetailedMessage> messages) {
        this.folders = folders;
        this.messages = messages;
    }

    public LocalResponse() {

    }

}
