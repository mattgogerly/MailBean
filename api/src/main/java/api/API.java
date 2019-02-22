package api;

import io.javalin.Javalin;
import static io.javalin.apibuilder.ApiBuilder.*;

public class API {

    public static void main(String[] args) {
        Javalin app = Javalin.create()
                .enableRouteOverview("/routes")
                .start(7000);

        app.routes(() -> {
           get("/connect", ctx -> ctx.result("WIP"));
        });
    }

}
